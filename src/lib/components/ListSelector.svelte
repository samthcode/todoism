<script>
  export let todos;

  let listNames = [...new Set(todos.map(({ list }) => list))];

  import { createEventDispatcher, onMount } from "svelte";

  let dispatch = createEventDispatcher();

  onMount(() => {
    if (todos && todos.length > 0) {
      selectList(todos[0].list);
    }
  });

  function selectList(name) {
    dispatch("select", name);
  }
</script>

<div class="selector">
  {#each listNames as list}
    <div class="selector-item" on:click={(e) => selectList(list)}>{list}</div>
  {/each}
</div>

<style lang="scss">
  .selector {
    width: 17rem;
    overflow-x: clip;
  }
  .selector-item {
    background-color: $bg-light;
    color: $text;
    width: 100%;
    padding: 0.25em;
    margin-top: 4px;
    margin-left: 4px;

    font-size: 1.25rem;
  }
  .selector-item:hover {
    background-color: lighten($bg-light, 5);
  }
</style>
