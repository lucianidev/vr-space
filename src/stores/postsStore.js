import {
    get,
    writable
} from "svelte/store";
import {
    Client,
    Databases,
    Storage,
    Query,
    Permission,
    ID,
    Role,
} from "appwrite";
import {
    splitTags
} from "../utils/splitTags";
import {
    imagesToId
} from "../utils/convertImagesToId";
import {
    userState
} from "./userStores";

const createPostsStore = () => {
    const {
        set,
        update,
        subscribe
    } = writable({
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
                        ID.unique(), {
                        title: title,
                        description: description,
                        username: get(userState).username,
                        image_id: createFile,
                        avatar_id: get(userState).avatarId,
                    },
                    
                    [
                        Permission.delete(Role.user(get(userState).id)),
                        Permission.update(Role.user(get(userState).id)),
                    ]
                    );
                } else {
                    await database.createDocument(
                        "6492fa03477ec93ae650",
                        "6492fa0b59b3b4f615fa",
                        ID.unique(),
                        {
                            title: title,
                            description: description,
                            username: get(userState).username,
                            image_id: null,
                            avatar_id: get(userState).avatarId,
                        },

                        [
                            Permission.delete(Role.user(get(userState).id)),
                            Permission.update(Role.user(get(userState).id)),
                        ]
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
                    ID.unique(), {
                    title: title,
                    description: description,
                    username: get(userState).username,
                    images_id: await imagesToId(storage, file, ID.unique()),
                    price: price,
                    tags: splitTags(tags),
                    avatar_id: get(userState).avatarId,
                    email: get(userState).email,
                },
                    [
                        Permission.delete(Role.user(get(userState).id)),
                        Permission.update(Role.user(get(userState).id)),
                    ]
                );

            } catch (error) {
                console.error(error);
            }
        },

        listProducts: async () => {
            try {
                const [database,] = start();
                return (await database.listDocuments("6492fa03477ec93ae650", "649c37a515560d0fd35f")).documents;
            } catch (error) {
                console.error(error);
            }
        },

        likePost: async (postId, likedPostUser) => {
            try {
                console.log(postId, likedPostUser);
                const [database,] = start();
                await database.createDocument('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', ID.unique(), {
                    from: get(userState).username,
                    post_id: postId,
                    to: likedPostUser,
                });

                const post = await database.getDocument('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', postId);
                (post)
                await database.updateDocument('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa', postId, {
                    title: post.title,
                    description: post.description,
                    username: post.username,
                    date: post.date,
                    image_id: post.image_id,
                    avatar_id: post.avatar_id,
                    likes: post.likes + 1,
                });
            } catch (error) {
                (error)
            }
        },

        getUserProducts: async (user) => {
            try {
                const [database,] = start();
                const products = (await database.listDocuments('6492fa03477ec93ae650', '649c37a515560d0fd35f',
                    [Query.equal('username', user)])).documents;
                return products;
            } catch (error) {
                console.error(error);
            }
        },

        getUserPosts: async (user) => {
            try {
                const [database,] = start();
                const posts = (await database.listDocuments('6492fa03477ec93ae650', '6492fa0b59b3b4f615fa',
                    [Query.equal('username', user)])).documents;
                return posts;
            } catch (error) {
                (error);
            }
        },

        getUserAvatar: async (user) => {
            try {
                const [database,] = start();
                const profileAvatar = (await database.listDocuments('64a553299087271a8aea', '64a5533cd148431c27fd',
                    [Query.equal('username', user)])).documents[0].avatar_id;
                return profileAvatar;
            } catch (error) {
                (error);
            }
        },

        ispostIsLiked: async (postId,postCreator) => {
            try {
                console.log(postId);
                const [database,] = start();
                const likes = (await database.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', [
                    Query.equal("from", get(userState).username),
                    Query.equal("post_id", postId),
                ])).documents.length;

                if (likes >= 1) return {
                    isLiked : true,
                };
                return {
                    isLiked : false,
                    postId : postId,
                    postCreator : postCreator,
                };
            } catch (error) {
                (error);
            }
        },

        getPostLikes: async (postId) => {
            try {
                const [database,] = start();
                const likes = (await database.listDocuments('649dfdee9174011b6657', '649dfe6a7af113c3e3e5', [
                    Query.equal("post_id", postId),
                ])).documents.length;

                return likes;
            } catch (error) {
                (error)
            }
        },

        getProductDetail: async (productId) => {
            try {
                const [database,] = start();
                const productDetails = (await database.getDocument('6492fa03477ec93ae650', '649c37a515560d0fd35f', productId));
                return productDetails;
            } catch (error) {
                console.error(error);
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
                        (error)
                    }
                },
        */


        preview: (bucketId, id) => {
            try {
                const [, storage] = start();
                (storage)
                return storage.getFilePreview(bucketId, id);
            } catch (error) {
                console.error(error);
            }
        },


        async modifyDocument(dbId, collectionId, id, data) {
            console.log(dbId, collectionId, id,data);
            try {
                const [database] = start();
                await database.updateDocument(dbId, collectionId, id, data);
            } catch (error) {
                console.error(error)
            }
        },

        async removeDocument(dbId, collectionId, id, imagePresence) {
            try {
                const [database] = start();
                await database.deleteDocument(dbId, collectionId, id);
            } catch (error) {
                console.error(error)
            }
        },

        async removeImage(bucketId, id) {
            console.log(id);
            try {
                const [,storage] = start();
                await storage.deleteFile(bucketId, id);
            } catch (error) {
                console.error(error)
            }
        },

        async getContent(dbId, collectionId, id) {
            try {
                const [database] = start();
                const post = await database.getDocument(dbId, collectionId, id);
                return await post;
            } catch (error) {
                console.error(error)
            }
        },
        
        getPost: async (id) => {
            console.log(id);
            try {
                const [database, storage] = start();
                const post = await database.getDocument("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa", id);
                return await post;
            } catch (error) {
                console.error(error)
            }
        },

        readPosts: async () => {
            try {
                const [database, storage] = start();
                const posts = (await database.listDocuments("6492fa03477ec93ae650", "6492fa0b59b3b4f615fa",)).documents;
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