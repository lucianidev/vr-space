import { writable, get } from "svelte/store";
import { Account, Client, Storage, Databases, Query, ID } from "appwrite";
import router from "page"
import constants from "../utils/constants";
import Document from "../libs/Document";
/**
 * App Module
 * @module /stores/postStore.js
 *
 * @author Jacopo Luciani <lucianidev@gmail.com>
 * @description this store keeps methods and data for about the user and his posts
 */
const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: "",
        email: "",
        isLogged: false,
        avatarId: "",
        id: '',
    });
    /**
 * @description returns the appwrite services as an array
 * @function start
 */
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
        set,
        subscribe,
/**
 * @description checks if the user is logged, if true sets the store with the info about him. if not it will be redirected to signup
 * @function isLogged
 */
        isLogged: async () => {
            try {
                const [account, ,] = start();
                const userdata = await account.get();
                const avatarId = (await account.getPrefs()).avatar_id;

                if (userdata) {
                    set({
                        username: userdata.name,
                        isLogged: true,
                        avatarId: avatarId,
                        email: userdata.email,
                        id: userdata.$id,
                    });
                } else {
                    set({
                        username: "",
                        isLogged: false,
                        avatarId: "",
                        email: "",
                        id: '',
                    });
                }
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId: "",
                    email: "",
                    id: '',
                });
                router.redirect('/signup')
            }
        },
/**
 * @description create user by providing email,password and username
 * @function signup
 * @param {string} email user email (required)
 * @param {string} password  user password(required)
 * @param {string} username  username of the account(required)
 */
        signup: async (email, password, username) => {

            try {
                const [account, ,] = start();
                const userData = await account.create(ID.unique(), email, password, username);
                account.updatePrefs({
                    avatar_id: "",
                });
                set({
                    username: username,
                    isLogged: true,
                    avatarId: "",
                    email: email,
                    id: userData.$id,
                });

                await userState.login(email, password);
                router.redirect('/');
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId: "",
                    email: "",
                    id: '',
                });
            }
        },
/**
 * @description login into account by providing email,password then sets the store with account info
 * @function login
 * @param {string} email user email (required)
 * @param {string} password  user password(required)
 */
        login: async (email, password) => {
            try {
                const [account, ,] = start();
                await account.createEmailSession(email, password);
                const userInfo = await account.get();
                const avatarId = (await account.getPrefs()).avatar_id;

                set({
                    username: userInfo.name,
                    isLogged: true,
                    avatarId: avatarId,
                    email: userInfo.email,
                    id: userInfo.$id,
                });
                router.redirect('/');
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    avatarId: "",
                    email: "",
                    id: '',
                });
            }
        },
        /**
 * @description deletes the account session and sets to the store to empty
 * @function isLogged
 */
        logout: async () => {
            try {
                const [account, ,] = start();
                await account.account.deleteSessions();
                set({
                    username: "",
                    isLogged: false,
                    email: "",
                    id: '',
                });
                router.redirect('/signup')
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                    email: "",
                    id: '',
                });
                router.redirect('/signup')
            }
        },
/**
 * @description get a specific property from the object returned from account.get()
 * @function getUserInfo
 * @param {string} property property to return  (required)
 */
        getUserInfo: async (property) => {
            try {
                const [account, ,] = start();
                const info = await account.get();
                return await info[property];
            } catch (error) {
                return;
            }
        },
/**
 * @description change a specific property in an Array of objects, then update the records 
 * @function getUserInfo
 * @param {string} property property to return  (required)
 */
        updateEverywhere: async (records, what, value) => {
            const [, , db] = start();
            if(!records) return;
            records.forEach(async (record) => {
                record[what] = value;
                await db.updateDocument(record.$databaseId, record.$collectionId, record.$id, {
                    [what] : value,
                });
            })
        },
/**
 * @description change the username in every record that contains the username of the current account and in the account info
 * @function getUserInfo
 * @param {string} property property to return  (required)
 */
        changeUsername: async (name) => {
            try {
                const [account, , db] = start();
                const document = new Document(db,constants.ID.DATABASE.ACTIONS, constants.ID.COLLECTIONS.LIKES);
                const receivedActions = (await document.getAllDocuments([Query.equal('to', get(userState).username)])).documents;
                const sentActions = (await document.getAllDocuments([
                    Query.equal("from", get(userState).username),
                ])).documents;

                document.databaseId = constants.ID.DATABASE.PROFILES;
                document.collectionId = constants.ID.COLLECTIONS.AVATARS;
                
                const profile = (await document.getAllDocuments([Query.search('username', get(userState).username)])).documents;
                await userState.updateEverywhere(receivedActions, 'to', name);
                await userState.updateEverywhere(sentActions, 'from', name);

                await userState.updateEverywhere([
                    ...await userState.getCurrentUserPosts(), 
                    ...await userState.getCurrentuserProducts(), 
                    ...await profile] 
                ,'username', name);
                await account.updateName(name);
            } catch (error) {
                console.error(error)
            }
        },
/**
 * @description change the password of the account if the old password matches
 * @function changePassword
 * @param {string} oldPassword property to return  (required)
 * @param {string} newPassword property to return  (required)
 */
        changePassword: async (oldPassword, newPassword) => {
            try {
                const [account, ,] = start();
                await account.updatePassword(oldPassword, newPassword)
            } catch (error) {
                console.error(error)
            }
        },
/**
 * @description change the password of the account if the old password matches
 * @function changePassword
 * @param {string} oldPassword property to return  (required)
 * @param {string} newPassword property to return  (required)
 */
        changeEmail: async (email, password) => {
            try {
                const [account, ,] = start();
                const document = new Document(db,constants.ID.DATABASE.ACTIONS, constants.ID.COLLECTIONS.TRANSACTIONS);
                const receivedTransactions = await document.getAllDocuments([Query.equal('vendor', get(userState).username)]);
                await userState.updateEverywhere(receivedTransactions,'vendor', email);
                await account.updateEmail(email, password);
            } catch (error) {
                console.error(error)
            }
        },

        getCurrentuserProducts: async () => {
            try {
                const [, , db] = start();
                const document = new Document(db, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                const products = (await document.getAllDocuments([Query.equal('username', get(userState).username)])).documents;
                return products;
            } catch (error) {
                (error);
            }
        },

        getCurrentUserNotification: async () => {
            try {
                const [, , db] = start();
                const document = new Document(db, constants.ID.DATABASE.ACTIONS, constants.ID.COLLECTIONS.LIKES);
                const notifications = (await document.getAllDocuments([Query.equal('to', get(userState).username)])).documents;

                if (notifications.length <= 3) return notifications;
                return notifications.slice(0, 3);
            } catch (error) {
                (error);
            }
        },

        getCurrentUserPosts: async () => {
            try {
                const [, , db] = start();
                const document = new Document(db,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.MESSAGES);
                const posts = (await document.getAllDocuments([Query.equal('username', get(userState).username)])).documents;
                return posts;
            } catch (error) {
                (error);
            }
        },

        getRecordThatContainAvatar : async() => {
            try {
                const [,,db] = start();
                const document = new Document(db, constants.ID.DATABASE.PROFILES, constants.ID.COLLECTIONS.AVATARS);
                return [
                    ...await userState.getCurrentUserPosts(),
                     ...await userState.getCurrentuserProducts(),
                     ...(await document.getAllDocuments([Query.search('username', get(userState).username)])).documents
                    ];
            } catch (error) {
                console.error(error);
            }
        },

        updateAvatar: async (file) => {
            // i know this is bad, really bad but no time to refactor LMAO!!!!!:)
            try {
                const [account, storage,] = start();
                const currentAvatarId = (await account.getPrefs()).avatar_id;
                const newAvatarId = (await storage.createFile(constants.ID.BUCKETS.AVATARS, ID.unique(), file)).$id;
                set({
                    username: get(userState).username,
                    email: get(userState).email,
                    isLogged: get(userState).isLogged,
                    avatarId: newAvatarId,
                })
                await account.updatePrefs({
                    avatar_id: newAvatarId,
                });

                if (currentAvatarId) {
                    storage.deleteFile(constants.ID.BUCKETS.AVATARS, currentAvatarId);
                    await userState.updateEverywhere(await userState.getRecordThatContainAvatar()
                         ,'avatar_id', newAvatarId);
                } else {
                    await userState.updateEverywhere(await userState.getRecordThatContainAvatar()
                         ,'avatar_id', newAvatarId);
                }
            } catch (error) {
                console.error(error);
            }
        },

        deleteAvatar: async () => {
            try {
                const [account, storage,] = start();
                const avatarId = (await account.getPrefs()).avatar_id;
                await storage.deleteFile(constants.ID.BUCKETS.AVATARS, avatarId);
                await userState.updateEverywhere(await userState.getRecordThatContainAvatar()
                ,'avatar_id', '');
                await account.updatePrefs({
                    avatar_id : '',
                })
            } catch (error) {
                console.error(error);
            }
        },
    }
}

// implemnet stores for user preferences(like password) and posts

export const userState = createUserState();