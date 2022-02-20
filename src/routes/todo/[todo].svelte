<script>
  import {page} from "$app/stores";
  import {todos} from "$lib/stores/todos";
  let theid = $page.params.todo;
  let todo = $todos.find(({id}) => theid == id);

  import { goto } from "$app/navigation";

  function goBack() {
    if (todo && todo.list) {
      goto(`/?list=${encodeURI(todo.list)}`)
    }
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