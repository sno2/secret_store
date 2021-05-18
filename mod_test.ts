import {
  assertEquals,
  assertThrows,
  assertNotEquals,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { SecretStore } from "./mod.ts";

localStorage;

Deno.test("Filling Keys", () => {
  new SecretStore({ key: "helo" });
  new SecretStore({ key: "asdfa".repeat(5) });
  assertThrows(() => {
    new SecretStore({ key: "" });
  });
});

Deno.test("Getting/Setting Keys", async () => {
  const store = new SecretStore({ key: "jackman54" });
  const val = "jackmanrulez23";
  await store.setItem("password", val);
  assertEquals(val, await store.getItem("password"));
});

Deno.test("Data is Encrypted", async () => {
  const store = new SecretStore({ key: "asdf" });
  await store.setItem("data-id", "asdf");
  assertNotEquals(localStorage.getItem("data-id"), "asdf");
});
