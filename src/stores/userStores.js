import { writable } from "svelte/store";
import { Account, Client, ID } from "appwrite";


const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: "",
        isLogged: false,
        // TODO : implemnent loading state
    });
    const start = () => {
        const client = new Client();
        const account = new Account(client);

        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18"); // Your project ID
        return account;
    }


    return {
        subscribe,

        isLogged: async () => {
            try {
                const account = start();
                const userdata = await account.get();
                console.log(userdata)
                if (userdata) {
                    set({
                        username: userdata.name,
                        isLogged: true
                    });
                } else {
                    set({
                        username: "",
                        isLogged: false,
                    });
                }
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                });
            }
        },

        signup: async (email, password, username) => {
            
            try {
                const account = start();
                await account.create(ID.unique(), email, password, username);
                set({
                    username: username,
                    isLogged: true,
                });
                console.log(username)
                // router actions
            } catch (error) {
                set({
                    username: "",
                    isLogged: false,
                });
            }
        },

        login: async (email, password) => {
            try {
                const account = start();
                await account.createEmailSession(email, password);
                const userInfo = await account.get();
                console.log(userInfo)
                set({
                    username: userInfo.name,
                    isLogged: true,
                });
            } catch(error) {
                set({
                    username: "",
                    isLogged: false,
                });
            }
        },
        logout: async (email, password) => {
            try {
                const account = start();
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

    }
}

export const userState = createUserState();