import { writable } from "svelte/store";
import { v4 as uuidGeneratorV4 } from "uuid";

export let todos = writable([
  {
    title: "Hello",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quos
voluptas facere? Saepe vitae suscipit in doloremque cumque iste, aperiam
accusantium nulla placeat perspiciatis tenetur deserunt sit quam nihil
voluptate. Repellat non tempora unde dicta officiis quae nihil maxime ut!
Tempore perspiciatis omnis iusto deserunt, magni dolorem fuga adipisci
doloremque.`,
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
