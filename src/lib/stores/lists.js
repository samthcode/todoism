import { writable } from "svelte/store";
import { v4 as uuidGeneratorV4 } from "uuid";

export let lists = writable([
  {
    name: "List1",
    todos: [
      {
        title: "Hello",
        desc: "World!",
        completed: false,
        dueDate: new Date(),
        id: uuidGeneratorV4(),
      },
    ],
  },
  {
    name: "List2",
    todos: [
      {
        title: "Goodbye",
        desc: "Mes amis.",
        completed: true,
        dueDate: new Date(2022, 12, 12),
        id: uuidGeneratorV4(),
      },
    ],
  },
  {
    name: "List3",
    todos: [],
  },
]);
