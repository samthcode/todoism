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
  <button on:click={goBack}>Back</button>
{#if todo}
  <h2>{todo.title}</h2>
{:else}
  <h2>Error: Could not find todo with id '{theid}'</h2>
{/if}
</main>

<style lang="scss">
  main button {
    color: $text;
    background-color: $bg-light;
    border: none;
    border-radius: 4px;
    width: 4rem;
    height: 2rem;
    margin-bottom: 1rem;

    &:hover {
      background-color: lighten($bg-light, 5);
    }
  }
</style>