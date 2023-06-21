import { user } from "../stores/userStores"
import { Account, Client } from "appwrite";

export function getUserName() {
    let name;
    user.subscribe(data => {
        name = data.name;
    });

    if (name.length != 0) return name;

    const client = new Client();
    const account = new Account(client);

    client
        .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
        .setProject("648f118e178c4607ca18"); // Your project ID
    account.get().then(data => {
        user.set({
            name: data.name,
            isLogged: true,
        })
        name = data.name;
    }).catch(() => { name = "a"})
    return name;
}