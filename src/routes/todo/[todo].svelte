<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { lists } from "$lib/stores/lists";
  import { isOverdue, formatDueDate } from "$lib/utils/date.js";
  import TodoInput from "$lib/components/TodoInput.svelte";
  import {
    getTitle,
    renderSimpleMarkdown,
    sanitiseInput,
  } from "$lib/utils/todo";
  import TagList from "$lib/components/shared/TagList.svelte";

  let theId = $page.params.todo;
  let todo, dueDateAsDate, dueDateFormatted;

  onMount(() => {
    for (const l of $lists) {
      todo = l.todos.find(({ id }) => id === theId);
      if (todo) {
        if (todo.dueDate) {
          dueDateAsDate = new Date(todo.dueDate);
          dueDateFormatted = formatDueDate(dueDateAsDate);
        }
        break;
      }
    }
  });

  function goBack() {
    if (browser) history.back();
  }

  function updateTodo(theNewOne) {
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

      if (theNewOne.title)
        $lists[listIndex].todos[todoIndex].title = theNewOne.title;

      if (theNewOne.hasOwnProperty("desc"))
        $lists[listIndex].todos[todoIndex].desc = theNewOne.desc;

      if (theNewOne.dueDate)
        $lists[listIndex].todos[todoIndex].dueDate = new Date(
          theNewOne.dueDate
        );

      if (theNewOne.hasOwnProperty("completed"))
        $lists[listIndex].todos[todoIndex].completed = theNewOne.completed;

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
      $lists[listIndex].todos.splice(todoIndex, 1);
      $lists = $lists;
      goBack();
    }
  }

  let editorVisible = false;

  function updateTodoFromEditor(e) {
    updateTodo(e.detail);
    editorVisible = false;
    if (browser) location.reload();
  }
</script>

<main>
  <button class="btn" on:click={goBack}>Back</button>
  {#if todo}
    <button
      class="btn edit"
      on:click={() => {
        editorVisible = !editorVisible;
      }}
      >{#if editorVisible}Cancel{:else}Edit{/if}</button
    >
    <button class="btn-warn delete" on:click={deleteTodo}>Delete</button>

    <div class="todo-inp-cont" class:visible={editorVisible}>
      <TodoInput
        defaults={todo}
        prompt="Edit Todo:"
        on:submit={updateTodoFromEditor}
      />
    </div>

    <div class="todo-container">
      <div class="small title-label">Title:</div>
      <h2 class="title" class:completed={todo.completed}>
        {getTitle(
          todo.title
        )}{#if isOverdue(dueDateAsDate) && !todo.completed}<span
            class="text-warn">&nbsp;(Overdue)</span
          >{/if}
      </h2>
      <div class="small desc-label">Description:</div>
      <div class="desc" class:completed={todo.completed}>
        {@html renderSimpleMarkdown(todo.desc)}
      </div>
      <div class="small due-date-label">Due Date:</div>
      {#if todo.dueDate}
        <div class="due-date" class:completed={todo.completed}>
          {dueDateFormatted}
        </div>
      {:else}
        <div class="due-date" class:completed={todo.completed}>
          &lt; Not Set &gt;
        </div>
      {/if}
      <div class="small completed-label">Completed:</div>
      <input
        type="checkbox"
        class="completed-bool completed-checkbox"
        bind:checked={todo.completed}
        on:change={() => {
          updateTodo({ completed: todo.completed });
        }}
      />
    </div>
    <div class="tag-list">
      <TagList title={todo.title} />
    </div>
  {:else}
    <h2>Error: Could not find todo with id '{theId}'</h2>
  {/if}
</main>

<style lang="scss">
  .tag-list {
    margin-top: 2rem;
  }

  .todo-container {
    margin-top: 0.75rem;
    display: grid;
    column-gap: 1rem;
    row-gap: 2rem;
    grid-template-rows: min-content min-content min-content min-content;
    grid-template-columns: min-content auto;
    grid-template-areas: "title-label title" "desc-label desc" "due-date-label due-date" "completed-label completed";
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
    grid-area: desc;
    white-space: pre-wrap;
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

  .completed-bool {
    grid-area: completed;
  }

  .completed-label {
    grid-area: completed-label;
  }

  .todo-inp-cont {
    display: none;
  }

  .completed-checkbox {
    width: 1rem;
  }

  .visible {
    display: block;
    margin-bottom: 1.5rem;
  }

  .delete {
    margin-left: 1rem;
  }

  .edit {
    margin-left: 1rem;
    background-color: $accent-light;
    &:hover {
      background-color: lighten($accent-light, 5);
    }
    color: $bg-dark;
  }

  h2 {
    margin: 0;
  }
</style>
