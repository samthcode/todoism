<script>
  import TodoItem from "$lib/components/TodoItem.svelte";

  export let list;

  import { onMount } from "svelte";

  onMount(() => {
    list.todos = list.todos.sort((a, b) => {
      if (a.completed) return 1;
      if (b.completed) return -1;
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return -1;
      if (!b.dueDate) return 1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  });

  import { createEventDispatcher } from "svelte";
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
