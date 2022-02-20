import { writable } from "svelte/store";
import { v4 as uuidGeneratorV4 } from "uuid";
import { browser } from "$app/env";

export let lists = writable(
  browser && window.localStorage.getItem("lists")
    ? JSON.parse(window.localStorage.getItem("lists"))
    : [
        {
          name: "List1",
          todos: [
            {
              title: "Hello",
              desc: "World!",
              completed: true,
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
              dueDate: new Date(2032, 0, 1),
              id: uuidGeneratorV4(),
            },
          ],
        },
        {
          name: "List3",
          todos: [],
        },
      ]
);

lists.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("lists", JSON.stringify(value));
  }
});
