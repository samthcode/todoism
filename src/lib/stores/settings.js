import { browser } from "$app/env";

import { writable } from "svelte/store";

const defaultValue = {
  taskView: "default",
  showListOptions: false,
};

const initialValue =
  browser && window.localStorage.getItem("settings")
    ? JSON.parse(window.localStorage.getItem("settings"))
    : defaultValue;

export const settings = writable(initialValue);

settings.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("settings", JSON.stringify(value));
  }
});
