/**
 * App Module
 * @module /libs/Images.js
 *
 * @author Jacopo Luciani <lucianidev@gmail.com>
 * @description the class is a library for interacting with the appwrite Storage properties and methods, specifically the image realated ones
 */

import { Storage } from "appwrite";



export default class Image {
        /**
 * @param {Storage} storage Storage appwrite Object
 * @param {string}  databaseId Bucket ID
 */
    constructor(storage,bucketID) {
        this.storage = storage;
        this.bucketID = bucketID;
    }
/**
 * @description create a file in a bucket
 * @function create
 * @param {string} fileId ID for the file (required)
 * @param {File} file uploaded file
 * @param {Array} permissions an Array representing the permission for that document (optional)
 * @example Images.create('ID', new File(), [])
 */
    async create(fileId, file, permissions) {
        try {
            return await
            this.storage.createFile(
                this.bucketID,
                fileId,
                file,
                permissions ? permissions : []
            );
        } catch (error) {
            throw new Error(error);        
        }
    }
/**
 * @description get a specific file
 * @function get
 * @param {string}  fileId id of the file
 * @example Images.get('ID')
 */
    async get(fileId) {
        try {
            return await
            this.storage.getFile(
                this,
                fileId,
            );
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description get a the url that redirects to the previview of an image
 * @function preview
 * @param {string}  fileId id of the file
 * @example Images.preview('ID')
 */
    preview(fileId) {
        try {
            return this.storage.getFilePreview(
                this.bucketID,
                fileId,
            );
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description delete a specific File
 * @function delete
 * @param {String} fileId id of the specific document
 * @example Images.delete('ID')
 */
    async delete(fileId) {
        return await
            this.storage.delete(
                this.bucketID,
                fileId,
            )
    }
}