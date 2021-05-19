import { AES, encode, decode } from "./deps.ts";

function fillKey(key: string): string {
  if (key === "") {
    throw Error("The key cannot be an empty string.");
  }
  if (key.length > 16) {
    return key.slice(0, 16);
  }
  return key.padStart(16, key);
}

export class SecretStore
  implements Pick<Storage, "removeItem" | "clear" | "key" | "length">
{
  #aes: AES;

  constructor(data: { key: string; iv?: string }) {
    this.#aes = new AES(fillKey(data.key), {
      mode: "cbc",
      iv: data.iv ?? "97f4386c2230ebe1",
    });
  }

  /** Sets the named value into the `localStorage` encrypted via AES. */
  async setItem(name: string, value: string): Promise<void> {
    const encryptedBytes = await this.#aes.encrypt(
      encode(new TextEncoder().encode(value))
    );
    const hash = encode(encryptedBytes);
    localStorage.setItem(name, new TextDecoder().decode(hash));
  }

  /**
   * Gets the named encrypted value from the `localStorage` and decrypts it
   * using the key specified in the constructor.
   */
  async getItem(name: string): Promise<null | string> {
    const encrypted = localStorage.getItem(name);
    if (encrypted === null) return null;
    const decrypted = await this.#aes
      .decrypt(decode(new TextEncoder().encode(encrypted)))
      .catch(() => null);
    if (decrypted === null) return null;
    return new TextDecoder().decode(
      decode(decode(new TextEncoder().encode(decrypted.hex())))
    );
  }

  // These are getters to not create a `localStorage` resource until needed.

  get removeItem() {
    return Object.call(localStorage.key, localStorage);
  }

  get clear() {
    return Object.call(localStorage.key, localStorage);
  }

  get key() {
    return Object.call(localStorage.key, localStorage);
  }

  get length() {
    return Object.call(localStorage.length, localStorage);
  }
}
