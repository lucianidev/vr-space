import { writable,get } from "svelte/store";
import { Account, Client, Storage ,Databases,Query, ID } from "appwrite";

const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: "",
        isLogged: false,
        avatarId : "",
    });
    const start = () => {
        const client = new Client();


        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18"); // Your project ID
        const account = new Account(client);
        const storage = new Storage(client);
        const db = new Databases(client);
        return [account, storage, db];
    }


    return {
        subscribe,

        isLogged: async () => {
            try {
                const [account,,] = start();
                const userdata = await account.get();
                const avatarId = (await account.getPrefs()).avatar_id;

                if (userdata) {
                    set({
                        username: userdata.name,
                        isLogged: true,
                        avatarId : avatarId,
                    });
                } else {
                    set({
                        username: "",
                        isLogged: false,
                        avatarId : ""
                    });
                }
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                });
            }
        },

        signup: async (email, password, username) => {
            
            try {
                const [account,,] = start();
                await account.create(ID.unique(), email, password, username);
                account.updatePrefs({
                    avatar_id : "",
                });
                set({
                    username: username,
                    isLogged: true,
                    avatarId : "",
                });

                navigate('/', {replace : true});
                (username)
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                });
            }
        },

        login: async (email, password) => {
            try {
                const [account,,] = start();
                await account.createEmailSession(email, password);
                const userInfo = await account.get();
                const avatarId = (await account.getPrefs()).avatar_id;
                set({
                    username: userInfo.name,
                    isLogged: true,
                    avatarId : avatarId,
                });
                navigate('/', {replace : true});
            } catch(error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                });
            }
        },
        logout: async () => {
            try {
                const [account,,] = start();
                await account.account.deleteSessions();
                set({
                    username: "",
                    isLogged: false,
                });
            } catch(error) {
                set({
                    username: "",
                    isLogged: false,
                });
            }
        },

        getUserName : async() => {
            try {
                const [account,,] = start();
                const name = (await account.get()).name;
                return await name;
            } catch(error) {
                return;
            }
        },

        getCurrentuserProducts : async() => {
        try {
            const [,,db] = start();
            const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f', 
            [Query.equal('username', get(userState).username)])).documents;
            return products;
        } catch(error) {
            (error);
        }
        },

        getCurrentUserPosts : async() => {
            try {
                const [,,db] = start();
                const posts = (await db.listDocuments('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', 
                [Query.equal('username', get(userState).username)])).documents;
                return posts;
            } catch(error) {
                (error);
            }
        },

        updateAvatar : async(file) => {
            // i know this is bad, really bad but no time to refactor LMAO!!!!!:)
            try {
                const [account,storage,db] = start();

                const currentAvatarId = (await account.getPrefs()).avatar_id;

                if(currentAvatarId) {
                    storage.deleteFile('649aee3bd70a6aa2cb34',currentAvatarId);

                    const avatarId = (await storage.createFile('649aee3bd70a6aa2cb34',ID.unique(),file)).$id;
                    await account.updatePrefs({
                        avatar_id : avatarId,
                    });

                    const posts = (await db.listDocuments('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', 
                    [Query.equal('username', get(userState).username)])).documents;
                    (posts)
                    const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f', 
                    [Query.equal('username', get(userState).username)])).documents;
                    const profile = (await db.listDocuments('64a553299087271a8aea', '64a5533cd148431c27fd', 
                    [Query.equal('username', get(userState).username)])).documents;

                    posts.forEach(async post => {

                        await db.updateDocument('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', post.$id, {
                            title: post.title,
                            description: post.description,
                            username: post.username,
                            date: post.date,
                            image_id : post.image_id,
                            avatar_id : avatarId,
                        });
                    })

                    products.forEach(async product => {
                        await db.updateDocument('6492fa03477ec93ae650', '649c37a515560d0fd35f', product.$id, {
                            title: product.title,
                            description: product.description,
                            username: product.username,
                            prize: product.prize,
                            images_id : product.images_id,
                            avatar_id : avatarId,
                            tags : product.tags,
                        });
                    })
                    await db.updateDocument('64a553299087271a8aea', '64a5533cd148431c27fd', profile.$id, {
                        username : profile.username,
                        avatar_id : avatarId,
                    })
                } else {
                    const avatarId = (await storage.createFile('649aee3bd70a6aa2cb34',ID.unique(),file)).$id;
                    await account.updatePrefs({
                        avatar_id : avatarId,
                    });  
                    await db.createDocument('64a553299087271a8aea', '64a5533cd148431c27fd', ID.unique(), {
                        username : get(userState).username,
                        avatar_id : avatarId,
                    })
                }

            } catch(error) {
                return;
            }
        },

        deleteAvatar : async() => {
            try {
                const [account,storage,,] = start();
// delete entry in the db
                const avatarId = (await account.getPrefs()).avatar_id;
                console.log(avatarId)
                await storage.deleteFile('649aee3bd70a6aa2cb34', avatarId);
                await account.updatePrefs({
                    avatar_id : '',
                })
            } catch(error) {
                console.error(error);
            }
        },
    }
}

// implemnet stores for user preferences(like password) and posts

export const userState = createUserState();