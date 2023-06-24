import { writable } from "svelte/store";

const createPostsStore = () => {
    const { set, update, subscribe } = writable({
        title : "",
        message : "",
        isOnFocus : false,
        // TODO : implemnent image
    });

    return {
        subscribe,
        setMessage : (title, message) => {
            set({
                title : title,
                message : message,
                isOnFocus : true,
            });
        }
    }
}

// implemnet stores for user preferences(like password) and posts

export const postsStore = createPostsStore();