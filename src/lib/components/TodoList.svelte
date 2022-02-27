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

  let addingTodo = false;
</script>

<h2>{list.name}</h2>

<button class="btn-accent add-todo-btn" class:not-adding-todo={!addingTodo} on:click={() => {
  addingTodo = !addingTodo;
}}>{#if !addingTodo}Add Todo{:else}Cancel{/if}</button>
{#if addingTodo}
<TodoInput defaults={{}} prompt="Add Todo:" on:submit={addNewTodo} />
{/if}

{#each list.todos as todo (todo.id)}
  <TodoItem
    {...todo}
    on:completed={(e) => {
      dispatch("completed", { id: e.detail, list: list.name });
    }}
  />
{/each}

<style lang="scss">
  h2 {
    word-wrap: break-word;
    margin-bottom: 1.5rem;
  }

  .add-todo-btn {
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
  }

  .not-adding-todo {
    margin-bottom: 1.5rem;
  }
</style>
