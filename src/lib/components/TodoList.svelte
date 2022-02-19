<script>
  import TodoItem from "$lib/components/TodoItem.svelte";

  export let name;
  export let todos;

  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
</script>

<h2>{name}</h2>

{#each todos as todo (todo.id)}
  <TodoItem {...todo} on:completed={(e) => {
    dispatch("completed", e.detail)
  }} />
{/each}
