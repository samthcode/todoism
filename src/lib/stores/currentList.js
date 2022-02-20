import { browser } from "$app/env";

import { writable } from "svelte/store";

const initialValue = browser
  ? window.localStorage.getItem("currentList")
  : null;

export const currentList = writable(initialValue);

export const unsubscribe = currentList.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("currentList", value);
  }
});
