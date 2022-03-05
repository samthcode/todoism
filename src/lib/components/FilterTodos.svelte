<script>
  import { filterValues } from "$lib/stores/filterValues";
  import { getPriority, getTags } from "$lib/utils/todo";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let todos;

  let tags = [];
  onMount(() => {
    for (const { title } of todos) {
      tags = [...tags, ...getTags(title)];
    }
    tags = [...new Set(tags)];

    filter($filterValues);
  });

  $: filter($filterValues);

  function filter({ priority, status, tags }) {
    dispatch(
      "filter",
      todos.filter((todo) => {
        let correctPriority = true;
        switch (priority) {
          case "all":
            break;
          case "none":
            correctPriority = getPriority(todo.title) === 0;
            break;
          case "low":
            correctPriority = getPriority(todo.title) === 1;
            break;
          case "medium":
            correctPriority = getPriority(todo.title) === 2;
            break;
          case "high":
            correctPriority = getPriority(todo.title) >= 3;
            break;
        }
        let correctStatus = true;
        switch (status) {
          case "all":
            break;
          case "todo":
            correctStatus = !todo.completed;
            break;
          case "completed":
            correctStatus = todo.completed;
            break;
        }
        return correctPriority && correctStatus;
      })
    );
  }
</script>

<div class="filter-dialogue">
  <label for="priority">Priority:</label>
  <select id="priority" bind:value={$filterValues.priority}>
    <option value="all">All</option>
    <option value="none">None</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <label for="status">Status:</label>
  <select id="status" bind:value={$filterValues.status}>
    <option value="all">All</option>
    <option value="todo">Todo</option>
    <option value="completed">Completed</option>
  </select>
</div>

<style lang="scss">
  .filter-dialogue {
    margin-bottom: 1.5rem;
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
  }
</style>
