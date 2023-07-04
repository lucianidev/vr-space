import { writable, get } from "svelte/store";
import { Account, Client, Storage, Databases, Query, ID } from "appwrite";
import { navigate } from "svelte-routing";

const searchstore = () => {
    const { set, update, subscribe } = writable({
        username: "",
        // TODO : implemnent image 
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
        set, subscribe,
        searchUsers: async (who) => {
            try {
                const [, , db] = start();
                const users = (await db.listDocuments('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa',
                    [Query.search('username', who)])).documents;
                return users;
            } catch (error) {
                console.log(error)
            }
        },

        searchProductsByTitle: async (what) => {
            try {
                const [, , db] = start();
                const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f',
                    [Query.search('title', what)])).documents;
                return products;
            } catch (error) {
                console.log(error)
            }
        },

        searchProductsByTag: async (what) => {
            try {
                const [, , db] = start();
                const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f',
                    [Query.search('tags', what)])).documents;
                return products;
            } catch (error) {
                console.log(error)
            }
        },
    }

}

export const searchStore = searchstore();