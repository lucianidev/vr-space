import { readable, writable } from "svelte/store";
import { Account, Client } from "appwrite";
import { init } from "svelte/internal";

const createUserState = () => {
    const { set, update, subscribe } = writable({
        username: null,
        isLogged : null,
        // TODO : implemnent loading state
    });

    return {
        set,
        update,
        subscribe,
        start: () => {
            const client = new Client();
            const account = new Account(client);

            client
                .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
                .setProject("648f118e178c4607ca18"); // Your project ID
            return account;
        },

        isLogged : async () => {
            const account = start();
            const userdata = await account.get();

            if(userdata) {
                init(userdata.name, true);
            } else {
                init("", false)
            }
        },

        init : async(username = null, isLogged = false) => {
            return set({
                username : username,
                isLogged : false,
            });
        }
    }
}

export const userState = createUserState();