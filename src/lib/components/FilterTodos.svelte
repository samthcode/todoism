<script>
  import { filterValues } from "$lib/stores/filterValues";
  import { getPriority, hasMaybe } from "$lib/utils/todo";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let todos;

  onMount(() => {
    filter($filterValues);
  });

  $: filter($filterValues);

  function filter({ priority, status, maybe }) {
    dispatch(
      "filter",
      todos.filter((todo) => {
        let correctPriority = true;
        switch (priority) {
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
          case "todo":
            correctStatus = !todo.completed;
            break;
          case "completed":
            correctStatus = todo.completed;
            break;
        }
        let correctMaybe = true;
        switch (maybe) {
          case "hide":
            correctMaybe = !hasMaybe(todo.title);
            break;
          case "only":
            correctMaybe = hasMaybe(todo.title);
            break;
        }
        return correctPriority && correctStatus && correctMaybe;
      })
    );
  }
</script>

<div id="filter-dialogue">
  <span>
    <label for="priority">Priority:</label>
    <select id="priority" bind:value={$filterValues.priority}>
      <option value="all">All</option>
      <option value="none">None</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </span>

  <span>
    <label for="status">Status:</label>
    <select id="status" bind:value={$filterValues.status}>
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="completed">Completed</option>
    </select>
  </span>

  <span>
    <label for="maybe">Maybe:</label>
    <select id="maybe" bind:value={$filterValues.maybe}>
      <option value="show">Show</option>
      <option value="hide">Hide</option>
      <option value="only">Only</option>
    </select>
  </span>
</div>

<style lang="scss">
  #filter-dialogue {
    margin-bottom: 1.5rem;
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    & > span {
      flex-shrink: 0;
    }
  }
</style>
