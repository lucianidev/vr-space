import { readable, writable } from "svelte/store";
import { Account, Client } from "appwrite";


const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: "",
        isLogged: null,
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
        set,
        update,
        subscribe,



        isLogged: async () => {
            const account = start();
            try {
                const userdata = await account.get();

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
    }
}

export const userState = createUserState();