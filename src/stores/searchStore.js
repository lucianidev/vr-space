import { writable, get } from "svelte/store";
import { Account, Client, Storage, Databases, Query, ID } from "appwrite";
import Document from "../libs/Document";
import constants from "../utils/constants";

/**
 * svelte store for storing searching methods based on differents search parameters
 */



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
                const document = new Document(db, constants.ID.DATABASE.PROFILES, constants.ID.COLLECTIONS.AVATARS,)
                const users = (await document.getAllDocuments([Query.search('username', who)])).documents;
                return users;
            } catch (error) {
                console.log(error)
            }
        },

        searchProductsByTitle: async (what) => {
            try {
                const [db] = start();
                const document = new Document(db, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS)
                const products = (await document.getAllDocuments(
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
                const document = new Document(db, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS)
                const products = (await document.getAllDocuments(
                    [Query.search('tags', what)])).documents;
                return products;
            } catch (error) {
                console.log(error)
            }
        },
    }

}

export const searchStore = searchstore();