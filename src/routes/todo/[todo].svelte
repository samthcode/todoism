<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { lists } from "$lib/stores/lists";
  import { isOverdue, formatDueDate } from "$lib/utils/date.js";
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

  import { goto } from "$app/navigation";
  import TodoInput from "$lib/components/TodoInput.svelte";

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

      if (theNewOne.desc)
        $lists[listIndex].todos[todoIndex].desc = theNewOne.desc;

      if (theNewOne.dueDate)
        $lists[listIndex].todos[todoIndex].dueDate = new Date(
          theNewOne.dueDate
        );

      if (theNewOne.completed !== undefined)
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
      $lists[listIndex].todos.splice(todoIndex);
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
        {todo.title}{#if isOverdue(dueDateAsDate) && !todo.completed}<span
            class="text-warn">&nbsp;(Overdue)</span
          >{/if}
      </h2>
      <div class="small desc-label">Description:</div>
      <div class="desc" class:completed={todo.completed}>{todo.desc}</div>
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
  {:else}
    <h2>Error: Could not find todo with id '{theId}'</h2>
  {/if}
</main>

<style lang="scss">
  .todo-inp-cont {
    display: none;
  }
  .completed-checkbox {
    width: 1rem;
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
    &:hover {
      background-color: lighten($accent-light, 5);
    }
    color: $bg-dark;
  }

  h2 {
    margin: 0;
  }
</style>
