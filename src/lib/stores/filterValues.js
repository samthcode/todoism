import { writable } from "svelte/store";

export const defaultFilterValues = {
  priority: "all",
  status: "all",
};

export const filterValues = writable(defaultFilterValues);
