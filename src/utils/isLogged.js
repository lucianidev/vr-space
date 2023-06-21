import { user } from "../stores/userStores"
import { Account, Client } from "appwrite";

export function isLogged() {
    const isLogged = user.subscribe(data => {
        return data.isLogged;
    });
    if(isLogged) {
        console.log("g")
        return true;
    } else {
        const client = new Client();
        const account = new Account(client);
      console.log("f")
        client
          .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
          .setProject("648f118e178c4607ca18"); // Your project ID
          account.get().then(data => {
            user.set({
                name : data.name,
                isLogged : true,
            })
          }).catch(() => {return false})
    }
}