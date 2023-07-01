import { writable } from "svelte/store";
import { Client, Databases, Storage, Query, ID } from "appwrite";
import { splitTags } from "../utils/splitTags";
import { imagesToId } from "../utils/convertImagesToId";
import { userState } from "./userStores";

const createPostsStore = () => {
    const { set, update, subscribe } = writable({
        title: "",
        message: "",
        username: "",
        image: "",
        avatar: "",
        postId: "",
        isOnFocus: false,
        // TODO : implemnent image 
    });

    const start = () => {
        const client = new Client();
        const database = new Databases(client);
        const storage = new Storage(client);
        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18"); // Your project ID

        return [database, storage];
    }

    return {
        subscribe,
        createPost: async (title, description, file) => { // implement file upload
            try {
                const [database, storage] = start();

                if (file) {
                    const createFile = (await storage.createFile("6499546407c2dc5f2d10", ID.unique(), file)).$id;
                    await database.createDocument(
                        "6492fa03477ec93ae650",
                        "6492fa0b59b3b4f615fa",
                        ID.unique(),
                        {
                            title: title,
                            description: description,
                            username: await userState.getUserName(),
                            date: new Date(Date.now()).toISOString(),
                            image_id: createFile,
                            avatar_id: (await userState.getAvatar()),
                        }
                    );
                } else {
                    await database.createDocument(
                        "6492fa03477ec93ae650",
                        "6492fa0b59b3b4f615fa",
                        ID.unique(),
                        {
                            title: title,
                            description: description,
                            username: await userState.getUserName(),
                            date: new Date(Date.now()).toISOString(),
                            image_id: null,
                        }
                    );
                }
            } catch (error) {
                console.error(error);
            }
        },

        createProduct: async (title, description, file, tags, price) => {
            try {
                const [database, storage] = start();

                await database.createDocument(
                    "6492fa03477ec93ae650",
                    "649c37a515560d0fd35f",
                    ID.unique(),
                    {
                        title: title,
                        description: description,
                        username: await userState.getUserName(),
                        images_id: await imagesToId(storage, file, ID.unique()),
                        price: price,
                        tags: splitTags(tags),
                        avatar_id: (await userState.getAvatar()),
                    }
                );

            } catch (error) {
                console.error(error);
            }
        },

        listProducts: async () => {
            try {
                const [database,] = start();
                return await database.listDocuments("6492fa03477ec93ae650", "649c37a515560d0fd35f")
            } catch (error) {
                console.error(error);
            }
        },

        likePost: async (postId, likedPostUser) => {
            console.log(likedPostUser)
            try {
                console.log(postId)
                const [database,] = start();
                console.log(await userState.getUserName())
                await database.createDocument('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', ID.unique(), {
                    from: await userState.getUserName(),
                    post_id: postId,
                    to: likedPostUser,
                });
            } catch (error) {
                console.log(error)
            }
        },

        ispostIsLiked: async (postId) => {
            try {
                console.log(postId)
                const [database,] = start();
                const likes = (await database.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', [
                    Query.equal("from", await userState.getUserName()),
                    Query.equal("post_id", postId),
                ])).documents.length;

                console.log(likes)
                if (likes >= 1) return true;
                return false;
            } catch (error) {
                console.log(error);
            }

        },
        /*
                removeLike : async(id) => {
                    try {
                        const [database,] = start();
                        const post = (await database.getDocument('6492fa03477ec93ae650', id)).documents[0];
        
                        database.updateDocument('6492fa03477ec93ae650', id, {
                            title: post.title,
                            description: post.description,
                            username: post.username,
                            date: post.date,
                            image_id : post.image_id,
                            avatar_id : post.avatar_id,
                            likes : post.likes--,
                        })
                    } catch(error) {
                        console.log(error)
                    }
                },
        */
        deletedProduct: async () => { }, // todo
        modifyProduct: async () => { }, // TODO

        preview: (bucketId, id) => {
            try {
                const [, storage] = start();
                console.log(storage)
                return storage.getFilePreview(bucketId, id);
            } catch (error) {
                console.error(error);
            }
        },
        deletePost: async (id) => {
            try {
                const [database,] = start();
                await database.deleteDocument(
                    "6492fa03477ec93ae650",
                    "6492fa0b59b3b4f615fa",
                    id
                );
            } catch (error) {
                console.error(error);
            }
        },

        modifiyPost: async (title, message, id) => {
            try {
                const [database, storage] = start();
                await database.updateDocument("6492fa03477ec93ae650",
                    "6492fa0b59b3b4f615fa", id, {
                    title: title,
                    description: message,
                    username: userState.subscribe((data) => { return data.username }),
                    date: new Date(Date.now()).toISOString(),
                }
                );

            } catch (error) {
                console.error(error);
            }
        },

        readPosts: async () => {
            try {
                const [database, storage] = start();
                const posts = await database.listDocuments("6492fa03477ec93ae650",
                    "6492fa0b59b3b4f615fa",); // implement query
                return posts;
            } catch (error) {
                console.error(error);
            }
        },

        OnFocus: (title, message, username, image, avatar, id) => {
            set({
                title: title,
                message: message,
                isOnFocus: true,
                image: image,
                username: username,
                avatar: avatar,
                postId: id,
            });
        },

        removeFocus: () => {
            set({
                title: "",
                message: "",
                isOnFocus: false,
                image: "",
                username: "",
                avatar: "",
                postId: "",
            });
        },
    }
}

// implemnet stores for user preferences(like password) and posts

export const postsStore = createPostsStore();