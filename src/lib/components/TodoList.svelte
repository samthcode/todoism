<script>
  import TodoItem from "$lib/components/TodoItem.svelte";

  export let list;

  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
</script>

<h2>{list.name}</h2>

{#each list.todos as todo (todo.id)}
  <TodoItem
    {...todo}
    on:completed={(e) => {
      dispatch("completed", {id: e.detail, list: list.name});
    }}
  />
{/each}
