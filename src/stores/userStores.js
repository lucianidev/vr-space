import { writable,get } from "svelte/store";
import { Account, Client, Storage ,Databases,Query, ID } from "appwrite";
import router from "page"
const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: "",
        email : "",
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
                        email : userdata.email,
                    });
                } else {
                    set({
                        username: "",
                        isLogged: false,
                        avatarId : "",
                        email : "",
                    });
                }
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                    email : "",
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
                    email : email,
                });

                await userState.login(email, password);
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                    email : "",
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
                    email : userInfo.email,
                });
                router.redirect('/');
            } catch(error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId : "",
                    email : "",
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
                    email : "",
                });
                router.redirect('/signup')
            } catch(error) {
                set({
                    username: "",
                    isLogged: false,
                    email : "",
                });
                router.redirect('/signup')
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

        updateEverywhere : async(what, value,) => {
            const [,,db] = start();
            const messages = await userState.getCurrentUserPosts();
            const products = await userState.getCurrentuserProducts();
            const profile = (await db.listDocuments('64a553299087271a8aea', '64a5533cd148431c27fd', 
            [Query.equal('username', get(userState).username)])).documents[0];


            messages.forEach(async post => {
                post[what] = value;
                await db.updateDocument('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', post.$id, {
                    title: post.title,
                    description: post.description,
                    username: post.username,
                    date: post.date,
                    image_id: post.image_id,
                    avatar_id: post.avatar_id,
                });
            })

            products.forEach(async product => {
                product[what] = value;
                await db.updateDocument('6492fa03477ec93ae650', '649c37a515560d0fd35f', product.$id, {
                    title: product.title,
                    description: product.description,
                    username: product.username,
                    images_id: product.images_id,
                    price: product.price,
                    tags: product.tags,
                    avatar_id: product.avatar_id,
                });
            })

            if(!profile) {
                await db.createDocument('64a553299087271a8aea', '64a5533cd148431c27fd', ID.unique(), {
                    username : get(userState).username,
                    avatar_id : get(userState).avatarId,
                })
            } else {
                profile[what] = value;
                await db.updateDocument('64a553299087271a8aea', '64a5533cd148431c27fd', profile.$id, {
                    username : profile.username,
                    avatar_id : profile.avatar_id,
                });
            }

        },

        changeUsername : async(name) => {
            try {
                const [account,,db] = start();
                const receivedActions = (await db.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', 
                [Query.equal('to', get(userState).username)])).documents;
                const sentActions = (await db.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', [
                    Query.equal("from", get(userState).username),
                ])).documents;

                receivedActions.forEach(action => {
                    action['to'] = name;
                    console.log(action);
                    db.updateDocument('649dfdee9174011b6657', '649dfe6a7af113c3e3e5',action.$id ,{
                        to : action.to,
                        from : action.from,
                        post_id : action.post_id,
                    });
                })

                sentActions.forEach(action => {
                    action['from'] = name;
                    db.updateDocument('649dfdee9174011b6657', '649dfe6a7af113c3e3e5',action.$id ,{
                        to : action.to,
                        from : action.from,
                        post_id : action.post_id
                    });
                })
                await userState.updateEverywhere('username', name);
                await account.updateName(name);

            } catch(error) {
                console.error(error)
            }
        },

        changePassword : async(oldPassword, newPassword) => {
            try {
                const [account,,] = start();
                await account.updatePassword(oldPassword, newPassword)
            } catch (error) {
                console.error(error)
            }
        },

        changeEmail : async(email, password) => {
            try {
                const [account,,] = start();
                await account.updateEmail(email, password);
            } catch (error) {
                console.error(error)
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

        getCurrentUserNotification : async() => {
            try {
                const [,,db] = start();
                const notifications = (await db.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', 
                [Query.equal('to', get(userState).username)])).documents;
                if(notifications.length <= 3) return notifications;
                return notifications.slice(0, 3);
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

        changeAvatarEverywhere : async (avatarId) => {
            try {
                userState.updateEverywhere('avatar_id', avatarId)
            } catch (error) {
                console.error(error);
            }
        },

        updateAvatar : async(file) => {
            // i know this is bad, really bad but no time to refactor LMAO!!!!!:)
            try {
                console.log(file);
                const [account,storage,db] = start();

                const currentAvatarId = (await account.getPrefs()).avatar_id;

                if(currentAvatarId) {
                    //storage.deleteFile('649aee3bd70a6aa2cb34',currentAvatarId);

                    const avatarId = (await storage.createFile('649aee3bd70a6aa2cb34',ID.unique(),file)).$id;
                    await userState.changeAvatarEverywhere(avatarId, account, db);
                    
                } else {
                    const avatarId = (await storage.createFile('649aee3bd70a6aa2cb34',ID.unique(),file)).$id;
                    userState.changeAvatarEverywhere(avatarId, account, db);
                }

            } catch(error) {
                return;
            }
        },

        deleteAvatar : async() => {
            try {
                const [account,storage,db,] = start();
// delete entry in the db
                const avatarId = (await account.getPrefs()).avatar_id;
                console.log(avatarId)
                await storage.deleteFile('649aee3bd70a6aa2cb34', avatarId);
                userState.changeAvatarEverywhere('');
            } catch(error) {
                console.error(error);
            }
        },
    }
}

// implemnet stores for user preferences(like password) and posts

export const userState = createUserState();