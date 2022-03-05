<script>
  import TodoItem from "$lib/components/TodoItem.svelte";

  export let list;

  let filteredAndSortedTodos = list.todos;

  import { onMount } from "svelte";

  import { getPriority } from "$lib/utils/todo.js";

  onMount(sort);

  function sort() {
    // Ordering by priority
    filteredAndSortedTodos = filteredAndSortedTodos.sort((a, b) => {
      return getPriority(b.title) - getPriority(a.title);
    });

    // Ordering by date; takes precedence over priority
    filteredAndSortedTodos = filteredAndSortedTodos.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Ordering by completed; takes precedence over other attributes
    filteredAndSortedTodos = filteredAndSortedTodos.sort((a, b) => {
      if (a.completed) return 1;
      if (b.completed) return -1;
      return 0;
    });
  }

  function filtered({ detail }) {
    filteredAndSortedTodos = detail;
    sort();
  }

  import { createEventDispatcher } from "svelte";
  import TodoInput from "./TodoInput.svelte";
  import FilterTodos from "./FilterTodos.svelte";

  let dispatch = createEventDispatcher();

  function addNewTodo(e) {
    dispatch("addtodo", { todo: e.detail, listName: list.name });
  }

  let addingTodo = false;
</script>

<h2>{list.name}</h2>

<button
  class="btn-accent add-todo-btn"
  on:click={() => {
    addingTodo = !addingTodo;
  }}
  >{#if !addingTodo}Add Todo{:else}Cancel{/if}</button
>
{#if addingTodo}
  <TodoInput defaults={{}} prompt="Add Todo:" on:submit={addNewTodo} />
{/if}

<FilterTodos todos={list.todos} on:filter={filtered} />

{#each filteredAndSortedTodos as todo (todo.id)}
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
    margin-bottom: 1.5rem;
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
  }
</style>
