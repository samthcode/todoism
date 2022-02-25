<script>
  import TodoItem from "$lib/components/TodoItem.svelte";
  import { lists } from "$lib/stores/lists";

  export let list;

  import { createEventDispatcher } from "svelte";
  import { v4 as uuidGeneratorV4 } from "uuid";
  import TodoInput from "./TodoInput.svelte";

  let dispatch = createEventDispatcher();

  function addNewTodo(e) {
    dispatch("addtodo", { todo: e.detail, listName: list.name });
  }
</script>

<h2>{list.name}</h2>

{#each list.todos as todo (todo.id)}
  <TodoItem
    {...todo}
    on:completed={(e) => {
      dispatch("completed", { id: e.detail, list: list.name });
    }}
  />
{/each}

<TodoInput defaults={{}} prompt="Add Todo:" on:submit={addNewTodo} />
