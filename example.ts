import { SecretStore } from "https://deno.land/x/secret_store/mod.ts";

const store = new SecretStore({ key: "fooboi123" });

await store.setItem("password", "fooboirulez123");

console.log(localStorage.getItem("password"));

console.log(await store.getItem("password"));
