import { readable, writable } from "svelte/store";

export const user = writable({
    name : "",
    isLogged : false,
});

