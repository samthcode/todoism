<script>
  import { page } from "$app/stores";
  import { lists } from "$lib/stores/lists";
  let theid = $page.params.todo;
  let todo;
  for (const l of $lists) {
    todo = l.todos.find(({ id }) => id === theid);
    if (todo) {
      break;
    }
  }

  import { goto } from "$app/navigation";

  function goBack() {
    goto("/");
  }
</script>

<main>
  <button class="btn" on:click={goBack}>Back</button>
  {#if todo}
    <h2>{todo.title}</h2>
  {:else}
    <h2>Error: Could not find todo with id '{theid}'</h2>
  {/if}
</main>
