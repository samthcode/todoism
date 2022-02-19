<script>
  import {page} from "$app/stores";
  import {todos} from "$lib/stores/todos";
  let theid = $page.params.todo;
  let todo = $todos.find(({id}) => theid == id);
</script>

<main>
{#if todo}
  <h2>{todo.title}</h2>
{:else}
  <h2>Error: Could not find todo with id '{theid}'</h2>
{/if}
</main>