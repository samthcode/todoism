<script>
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { lists } from "$lib/stores/lists";
  import { v4 as uuidGeneratorV4 } from "uuid";
  let theId = $page.params.todo;
  let todo;
  $: for (const l of $lists) {
    todo = l.todos.find(({ id }) => id === theId);
    if (todo) {
      break;
    }
  }

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
        $lists[listIndex].todos[todoIndex].dueDate = newTodo.dueDate;

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

  function isToday(someDate) {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  }

  function isOverdue(someDate) {
    return someDate - new Date() < 0;
  }

  let dueDateAsDate;
  $: if (todo) dueDateAsDate = new Date(todo.dueDate);

  let dueDateFormatted;
  $: if (todo)
    dueDateFormatted = isToday(dueDateAsDate)
      ? `Today, ${dueDateAsDate.toLocaleDateString(
          browser ? navigator.language : "en-UK",
          {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}`
      : dueDateAsDate.toLocaleDateString(
          browser ? navigator.language : "en-UK",
          {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
</script>

<main>
  <button class="btn" on:click={goBack}>Back</button>
  <button class="btn-warn delete" on:click={deleteTodo}>Delete</button>
  {#if todo}
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

<style>
  .delete {
    margin-left: 1rem;
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

  .desc-label {
    grid-area: desc-label;
  }

  .due-date {
    grid-area: due-date;
  }

  .due-date-label {
    grid-area: due-date-label;
  }

  h2 {
    margin: 0;
  }
</style>
