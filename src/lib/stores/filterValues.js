import { writable } from "svelte/store";

export const defaultFilterValues = {
  priority: "all",
  status: "all",
  tags: [],
};

export const filterValues = writable(defaultFilterValues);
