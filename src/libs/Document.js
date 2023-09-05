/**
 * App Module
 * @module /libs/Document.js
 *
 * @author Jacopo Luciani <lucianidev@gmail.com>
 * @description the class is a library for interacting with the appwrite Document properties and methods
 */

import { Databases } from "appwrite";
export default class Document {
    /**
 * @param {Databases} database Database appwrite Object
 * @param {string}  databaseId Databse id
 * @param  {string} collectionId collection id
 */
    constructor(database,databaseId,collectionId) {
        this.database = database;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
    }
/**
 * @description create a record from an object passed as an argument
 * @function create
 * @param {string} documentId ID for the document (required)
 * @param {object} data the object that represents the data (required)
 * @param {Array} permissions an Array representing the permission for that document (optional)
 * @example Document.create('ID', {}, [])
 */
    async create(documentId,data, permissions) {
        try {
           return await this.database.createDocument(this.databaseId, this.collectionId,documentId, data, permissions ? permissions : []);
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description get all the documents from a collection
 * @function getAllDocuments
 * @param {Array} query an array representing a query for selecting data
 * @example Document.getAllDocuments()
 */
    async getAllDocuments(query) {
        try {
           return await this.database.listDocuments(this.databaseId, this.collectionId, query ? query : []);
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description get a specific document 
 * @function get
 * @param {string}  documentId id of the document 
 * @example Document.get('ID')
 */
    async get(documentId) {
        try {
            return await this.database.getDocument(this.databaseId, this.collectionId, documentId);
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description modify a specific record property from an object passed as an argument
 * @function update
 * @param {string} documentId ID for the document (required)
 * @param {object} data the object that represents the data (required)
 * @example Document.create('ID', {}, [])
 */
    async update(documentId, data) {
        try {
            return await this.database.updateDocument(this.databaseId, this.collectionId, documentId, data);   
        } catch (error) {
            throw new Error(error);
        }
    }
/**
 * @description delete a specific document 
 * @function update
 * @param {String} documentId id of the specific document
 * @example Document.delete('ID')
 */
    async delete(documentId) {
        try {
            return await this.database.deleteDocument(this.databaseId, this.collectionId, documentId);   
        } catch (error) {
            throw new Error(error);
        }
    }
}