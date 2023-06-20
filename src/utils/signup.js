import { Account, Client, ID } from "appwrite";

const signup = async (username,email, password) => {
    const client = new Client();
    const account = new Account(client);

    client
    .setEndpoint('http://127.0.0.1:81/v1') // Your API Endpoint
    .setProject('648f118e178c4607ca18') // Your project ID
;

    const request = account.create(ID.unique(), email, password, username);
    return request;
};

export default signup;