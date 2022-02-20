<script>
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import { lists } from "$lib/stores/lists";
  import { v4 as uuidGeneratorV4 } from "uuid";
  let theid = $page.params.todo;
  let todo;
  $: for (const l of $lists) {
    todo = l.todos.find(({ id }) => id === theid);
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
        ({ todos }) => !!todos.find(({ id }) => id === theid)
      );
      if (listIndex === -1) {
        console.log(`updateTodo(): Couldn't find todo with id: "${theid}"`);
        return;
      }
      if (newTodo.title)
        $lists[listIndex].todos.find(({ id }) => id === theid).title =
          newTodo.title;

      if (newTodo.desc)
        $lists[listIndex].todos.find(({ id }) => id === theid).desc =
          newTodo.desc;

      if (newTodo.dueDate)
        $lists[listIndex].todos.find(({ id }) => id === theid).dueDate =
          newTodo.dueDate;

      $lists = $lists;
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
  <!-- <button
    class="btn"
    on:click={() => {
      updateTodo({
        title: "boo",
        desc: "boo!",
      });
    }}
    >Change the title and description to "boo" and "boo!" respectively.</button
  > -->
  {#if todo}
    <h3 class="small">Title:</h3>
    <h2>
      {todo.title}{#if isOverdue(dueDateAsDate) && !todo.completed}<span
          class="text-warn">&nbsp;(Overdue)</span
        >{/if}
    </h2>

    <h3 class="small">Description:</h3>
    <h3 class="desc">{todo.desc}</h3>

    {#if dueDateFormatted}
    <h3 class="small">Due Date:</h3>
      <div class="due-date">Due {dueDateFormatted}</div>
    {/if}
  {:else}
    <h2>Error: Could not find todo with id '{theid}'</h2>
  {/if}
</main>

<style>
  .small {
    font-size: 0.9em;
    margin-bottom: 0.5em;
  }

  .desc {
    margin-bottom: 1.5rem;
  }
</style>
