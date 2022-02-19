import { writable } from "svelte/store";
import { v4 as uuidGeneratorV4 } from "uuid";

export let todos = writable([
  {
    title: "Hello",
    desc: "World",
    completed: true,
    dueDate: new Date(),
    list: "Hello",
    id: uuidGeneratorV4(),
  },
  {
    title: "Hello",
    desc: "World",
    completed: false,
    dueDate: new Date(),
    list: "Hello",
    id: uuidGeneratorV4(),
  },
  {
    title: "Goodbye",
    desc: "World",
    completed: false,
    dueDate: new Date(9999, 1, 1, 1, 1),
    list: "World",
    id: uuidGeneratorV4(),
  },
]);
