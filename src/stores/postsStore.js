import { writable } from "svelte/store";
import { Client, Databases, ID } from "appwrite";

const createPostsStore = () => {
    const { set, update, subscribe } = writable({
        title : "",
        message : "",
        isOnFocus : false,
        // TODO : implemnent image 
    });

    const start = () => {
        const client = new Client();
        const database = new Databases(client);

        client
        .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
        .setProject("648f118e178c4607ca18"); // Your project ID

        return database;
    }

    return {
        subscribe,
        createPost : () => {

        },
        OnFocus : (title, message) => {
            set({
                title : title,
                message : message,
                isOnFocus : true,
            });
        },
        
        removeFocus : () => {
            set({
                title : "",
                message : "",
                isOnFocus : false,
            });
        },
    }
}

// implemnet stores for user preferences(like password) and posts

export const postsStore = createPostsStore();