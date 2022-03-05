import { writable } from "svelte/store";

export const defaultFilterValues = {
  priority: "all",
  status: "all",
  maybe: "show"
};

export const filterValues = writable(defaultFilterValues);
