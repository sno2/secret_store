# secret_store

A secure key/value storage using AES encryption for values using `localStorage`
for Deno.

## Usage

First, you need to import the `SecretStore`. After that, you just need to pass
in the key that you wish to use to sign your data. Note: this only needs to be
16 characters. If you create a key longer than that, then it will just truncate
the rest off. If you create a key shorter than that, then it will repeat the
characters of your key and push them to the front of the string until it is 16
characters.

```ts
import { SecretStore } from "https://deno.land/x/secret_store/mod.ts";

const store = new SecretStore({ key: "myawesomekey" });

await store.setItem("password", "my-secret-password");

// This is the encrypted value that any other application can access.
localStorage.getItem("password"); // d2eedcad9e0c285cb95d3c04381c60ae3ad99077642aecdb4c0781c2c0b8032b0e3ffac399060f803d86296a9c7d3d90

// The `SecretStore` automagically decrypts the data using AES and your key.
await store.getItem("password"); // my-secret-password
```

You can also pass in an `iv` into the `SecretStore` constructor which will be
the initializer vector used in the encryption/decryption.

## API

The API matches completely to the [`localStorage` object](https://developer.mozilla.org/en-US/docs/Web/API/Storage), except that the `getItem` and `setItem` properties are asynchronous to allow for the cryptographic algorithms to run.

## License

[Unlicense](./UNLICENSE) (More open than MIT and in the Public Domain)
