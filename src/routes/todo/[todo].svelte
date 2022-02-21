<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { lists } from "$lib/stores/lists";
  import { isOverdue, formatDueDate } from "$lib/dateUtils.js";
  let theId = $page.params.todo;
  let todo, dueDateAsDate, dueDateFormatted, newTodo;
  onMount(() => {
    for (const l of $lists) {
      todo = l.todos.find(({ id }) => id === theId);
      if (todo) {
        dueDateAsDate = new Date(todo.dueDate);
        dueDateFormatted = formatDueDate(dueDateAsDate);
        newTodo = {
          title: todo.title,
          desc: todo.desc,
          dueDate: todo.dueDate,
        };
        break;
      }
    }
  });

  import { goto } from "$app/navigation";

  function goBack() {
    goto("/");
  }

  function updateTodo(newTodo) {
    if (todo) {
      let listIndex = $lists.findIndex(
        ({ todos }) => !!todos.find(({ id }) => id === theId)
      );
      if (listIndex === -1) {
        console.log(`updateTodo(): Couldn't find todo with id: "${theId}"`);
        return;
      }
      let todoIndex = $lists[listIndex].todos.findIndex(
        ({ id }) => id === theId
      );

      if (newTodo.title)
        $lists[listIndex].todos[todoIndex].title = newTodo.title;

      if (newTodo.desc) $lists[listIndex].todos[todoIndex].desc = newTodo.desc;

      if (newTodo.dueDate)
        $lists[listIndex].todos[todoIndex].dueDate = new Date(newTodo.dueDate);

      $lists = $lists;
    }
  }

  function deleteTodo() {
    if (!browser) return;
    if (
      todo &&
      window.confirm(`Are you sure you want to delete todo "${todo.title}"?`)
    ) {
      let listIndex = $lists.findIndex(
        ({ todos }) => !!todos.find(({ id }) => id === theId)
      );
      if (listIndex === -1) {
        console.log(`updateTodo(): Couldn't find todo with id: "${theId}"!`);
        return;
      }
      let todoIndex = $lists[listIndex].todos.findIndex(
        ({ id }) => id === theId
      );
      $lists[listIndex].todos.splice(todoIndex);
      $lists = $lists;
      goBack();
    }
  }

  let editorVisible = false;

  function submitNewTodo() {
    updateTodo(newTodo);
    editorVisible = false;
    if (browser) location.reload();
  }
</script>

<main>
  {#if todo}
    <button class="btn" on:click={goBack}>Back</button>
    <button
      class="btn edit"
      on:click={() => {
        editorVisible = !editorVisible;
      }}
      >{#if editorVisible}Cancel{:else}Edit{/if}</button
    >
    <button class="btn-warn delete" on:click={deleteTodo}>Delete</button>

    <div class="edit-todo" class:visible={editorVisible}>
      <h3>Edit Todo:</h3>
      <div class="todo-container">
        <div class="small title-label">Title:</div>
        <input class="title" type="text" bind:value={newTodo.title} />
        <div class="small desc-label">Description:</div>
        <textarea class="editor-desc" bind:value={newTodo.desc} />
        <div class="small due-date-label">Due Date:</div>
        <input
          class="due-date"
          type="datetime-local"
          bind:value={newTodo.dueDate}
        />
        <button class="btn submit-new-todo" on:click={submitNewTodo}>Ok</button>
      </div>
    </div>

    <div class="todo-container">
      <div class="small title-label">Title:</div>
      <h2 class="title">
        {todo.title}{#if isOverdue(dueDateAsDate) && !todo.completed}<span
            class="text-warn">&nbsp;(Overdue)</span
          >{/if}
      </h2>
      <div class="small desc-label">Description:</div>
      <div class="desc">{todo.desc}</div>
      {#if dueDateFormatted}
        <div class="small due-date-label">Due Date:</div>
        <div class="due-date">Due {dueDateFormatted}</div>
      {/if}
    </div>
  {:else}
    <h2>Error: Could not find todo with id '{theId}'</h2>
  {/if}
</main>

<style lang="scss">
  .edit-todo {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    display: none;
    padding: 1.5rem;
    background-color: $bg-light;
    border-radius: 4px;
    max-width: 30rem;

    h3 {
      margin-bottom: 1.5rem;
    }
  }

  .submit-new-todo {
    background-color: $accent-light;
    color: $bg-dark;
    margin-bottom: 0;
  }

  .visible {
    display: block;
  }

  .delete {
    margin-left: 1rem;
  }

  .edit {
    margin-left: 1rem;
    background-color: $accent-light;
    color: $bg-dark;
  }

  .todo-container {
    margin-top: 0.75rem;
    display: grid;
    column-gap: 1rem;
    row-gap: 2rem;
    grid-template-rows: min-content min-content min-content;
    grid-template-columns: min-content auto;
    grid-template-areas: "title-label title" "desc-label desc" "due-date-label due-date";
  }

  .small {
    font-size: 14px;
    margin-bottom: 0.2em;
  }

  .title {
    grid-area: title;
  }

  .title-label {
    grid-area: title-label;
  }

  .desc {
    font-size: 22px;
    font-weight: bold;
    grid-area: desc;
  }

  .editor-desc {
    grid-area: desc;
  }

  .desc-label {
    grid-area: desc-label;
  }

  .due-date {
    grid-area: due-date;
  }

  .due-date-label {
    grid-area: due-date-label;
  }

  h2,
  h3 {
    margin: 0;
  }
</style>
