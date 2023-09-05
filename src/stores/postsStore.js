/**
 * App Module
 * @module /stores/postStore.js
 *
 * @author Jacopo Luciani <lucianidev@gmail.com>
 * @description this store keeps methods and data for accessing posts, the data contained in it will be used when focusing on single post
 */

import Document from "../libs/Document";
import Image from "../libs/Images";
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
import constants from "../utils/constants";

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
    });
/**
 * @description returns the appwrite services as an array
 * @function start
 */
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
/**
 * @description create a post, if it contains an image it's id will be included
 * @function createPost
 * @param {string} title the title of the post/message (required)
 * @param {string} description the description of the post/message (required)
 * @param {File} file the uploaded image
 */
        createPost: async (title, description, file) => { 
            try {
                const [database, storage] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.MESSAGES)
                if (file) {                    
                    const createFile = await new Image(storage, constants.ID.BUCKETS.images).create(ID.unique(), file).$id;
                    document.create(
                        ID.unique(), {
                        title: title,
                        description: description,
                        username: get(userState).username,
                        image_id: createFile,
                        avatar_id: get(userState).avatarId,
                        }, 
                        [
                            Permission.delete(Role.user(get(userState).id)),
                            Permission.update(Role.user(get(userState).id)), // only the user can delete or modify his post
                        ]
                    )
                } else {
                    // document without image
                    document.create(
                    ID.unique(), {
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
                )
                }
            } catch (error) {
                console.error(error);
            }
        },
/**
 * @description create a product, the images are required and are stored as an array
 * @function createProduct
 * @param {string} title  title of the product (required)
 * @param {string} description description of the product(required)
 * @param {File} file uploaded image/s of the product (required)
 * @param {Array} tags string splitted by space into an array, it's a list of tags for optimising the search of products
 * @param {number} price price of the product
 */
        createProduct: async (title, description, file, tags, price) => {
            try {
                const [database, storage] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                await document.create(
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
                        Permission.update(Role.user(get(userState).id)),// only the user can delete or modify his post
                    ]
                );

            } catch (error) {
                console.error(error);
            }
        },
/**
 * @description list the product inserted into the collection
 * @function listProducts
 */
        listProducts: async () => {
            try {
                const [database,] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                return (await document.getAllDocuments()).documents;
            } catch (error) {
                console.error(error);
            }
        },
/**
 * @description Adds a like to a post
 * @function createProduct
 * @param {string} postId  id of the liked post (required)
 * @param {string} username  name of the post creator (required)
 */
        likePost: async (postId, likedPostUser) => {
            try {
                const [database,] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                await document.create(ID.unique(), {
                    from: get(userState).username,
                    post_id: postId,
                    to: likedPostUser,
                });

                document.databaseId = constants.ID.DATABASE.POSTS;
                document.collectionId = constants.ID.COLLECTIONS.MESSAGES;
                // questa operazione deve essere eseguita sul server
                await document.update( postId, {
                    likes: post.likes + 1,
                });
            } catch (error) {
                console.error(error)
            }
        },
/**
 * @description get the products from a specific user
 * @function getUserProducts
 * @param {string} user  username of the products creator (required)
 */
        getUserProducts: async (user) => {
            try {
                const [database,] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                const products = (await document.getAllDocuments([Query.equal('username', user)])).documents;
                return products;
            } catch (error) {
                console.error(error);
            }
        },
        /**
 * @description get the posts from a specific user
 * @function getUserPosts
 * @param {string} user  username of the posts creator (required)
 */
        getUserPosts: async (user) => {
            try {
                const [database,] = start();
                const document = new Document(database,constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.MESSAGES);
                const posts = (await document.getAllDocuments([Query.equal('username', user)])).documents;
                return posts;
            } catch (error) {
                console.error(error);
            }
        },
        /**
 * @description get the avatar from a specific user
 * @function getUserProducts
 * @param {string} user  username of the posts creator (required)
 */
        getUserAvatar: async (user) => {
            try {
                const [database,] = start();
                const document = new Document(database, constants.ID.DATABASE.PROFILES, constants.ID.COLLECTIONS.AVATARS);
                const profileAvatar = (await document.getAllDocuments([Query.equal('username', user)])).documents[0].avatar_id;
                return profileAvatar;
            } catch (error) {
                console.error(error);
            }
        },
/**
 * @description checks if a user has already liked a post
 * @function ispostIsLiked
 * @param {string} postId  id of the liked post (required)
 * @param {string} username  name of the post creator (required)
 */
        ispostIsLiked: async (postId,postCreator) => {
            try {
                const [database,] = start();
                const document = new Document(database, constants.ID.DATABASE.PROFILES, constants.ID.COLLECTIONS.LIKES);
                const likes = (await document.getAllDocuments([
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
                console.error(error);
            }
        },
        /**
 * @description get a post number of likes
 * @function getPostLikes
 * @param {string} postId  id of the post (required)
 */
        getPostLikes: async (postId) => {
            try {
                const [database,] = start();
                const document = new Document(database, constants.ID.DATABASE.PROFILES, constants.ID.COLLECTIONS.LIKES);
                const likes = (await document.getAllDocuments([
                    Query.equal("post_id", postId),
                ])).documents.length;

                return likes;
            } catch (error) {
                console.error(error)
            }
        },
        /**
 * @description get the details  of a product
 * @function getProductDetail
 * @param {string} postId  id of the post (required)
 */
        getProductDetail: async (productId) => {
            try {
                const [database,] = start();
                const document = new Document(database, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                const productDetails = await document.get(productId);
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

        /**
 * @description get a string containing a url redirecting to an image
 * @function preview
 * @param {string} id id of the file (required)
 * @param {string} bucketId id of the bucket where the file is contained (required)

        */
        preview: (bucketId, id) => {
            try {
                const [, storage] = start();
                const image = new Image(storage, bucketId);
                return image.preview(id).href;
            } catch (error) {
                console.error(error);
            }
        },
        /**
 * @description get a post details (ex:title, description) 
 * @function getPost
 * @param {string} id id of the post (required)

        */        
        getPost: async (id) => {
            try {
                const [database, storage] = start();
                const document = new Document(database, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.PRODUCTS);
                const post = await document.get(id);
                return await post;
            } catch (error) {
                console.error(error)
            }
        },
/**
 * @description get all the posts 
 * @function readPosts
 */
        readPosts: async () => {
            try {
                const [database, storage] = start();
                const document = new Document(database, constants.ID.DATABASE.POSTS, constants.ID.COLLECTIONS.MESSAGES);
                const posts = (await document.getAllDocuments()).documents;
                return posts;
            } catch (error) {
                console.error(error);
            }
        },
        /**
 * @description set the properties of the store, used when a post is clicked
 * @function OnFocus
 * @param {string} title title of the post (required)
 * @param {string} description description of the post (required)
 * @param {string} username creator of the post (required)
 * @param {string} image if present, image id of the post (optional)
 * @param {string} avatar if present, avatar id of the post (optional)
 * @param {string} id id of the post (required)

        */ 
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
        /**
 * @description set the properties of the store to empty, used when post is unfocused
 * @function removeFocus


        */ 
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