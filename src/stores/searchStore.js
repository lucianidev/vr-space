import { writable, get } from "svelte/store";
import { Account, Client, Storage, Databases, Query, ID } from "appwrite";

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
        const db = new Databases(client);
        return [db];
    }

    return {
        set, subscribe,
        searchUsers: async (who) => {
            try {
                console.log(who);
                const [db] = start();
                const users = (await db.listDocuments('64a553299087271a8aea', '64a5533cd148431c27fd',
                    [Query.search('username', who)])).documents;
                    console.log(users);
                return users;
            } catch (error) {
                console.log(error)
            }
        },

        searchProductsByTitle: async (what) => {
            try {
                const [db] = start();
                const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f',
                    [Query.search('title', what)])).documents;
                console.log(products);
                return products;
            } catch (error) {
                console.log(error)
            }
        },

        searchProductsByTag: async (what) => {
            try {
                const  [db] = start();
                const products = (await db.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f',
                    [Query.search('tags', what)])).documents;
                console.log(products);
                return products;
            } catch (error) {
                console.log(error)
            }
        },
    }

}

export const searchStore = searchstore();