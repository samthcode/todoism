<script>
  export let name;
  export let todos;
</script>

<h2>{name}</h2>

{#each todos as todo (todo.id)}
  <div class="card">
    <h3>{todo.title}</h3>
  </div>
{/each}

<style lang="scss">
  .card {
    max-width: 100%;
    background-color: $bg-light;
    margin-bottom: 2rem;
    padding: 1px 16px;
    border-radius: 4px;
  }
</style>
