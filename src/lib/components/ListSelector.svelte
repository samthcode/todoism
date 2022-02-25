<script>
  import { createEventDispatcher } from "svelte";
  import { lists } from "$lib/stores/lists";

  let dispatch = createEventDispatcher();

  function selectList(name) {
    dispatch("select", name);
  }

  let newListName = "";

  function newList() {
    if (newListName === "") return;
    dispatch("newlist", newListName);
    newListName = "";
  }
</script>

<div class="selector">
  {#each $lists as list}
    <div class="selector-item" on:click={(e) => selectList(list.name)}>
      {list.name}
    </div>
  {/each}
  <div class="selector-item new-list">
    <input type="text" bind:value={newListName} />
    <button class="btn new-list-btn" on:click={newList}>New List</button>
  </div>
</div>

<style lang="scss">
  .new-list {
    display: flex;
    justify-content: space-between;
  }
  .new-list-btn {
    background-color: $accent-light;
    &:hover {
      background-color: lighten($accent-light, 5);
    }
    color: $bg-dark;
    margin-bottom: 0;
  }
  .selector {
    width: 17rem;
    overflow-x: clip;

    margin-left: 1.5rem;
    margin-top: 1.5rem;

    margin-bottom: 0.5rem;

    @media only screen and (max-width: $mobile-size) {
      width: auto;
      margin: 1.5rem;
    }
  }
  .selector-item {
    border-radius: 4px;
    background-color: $bg-light;
    color: $text;
    padding: 0.75em 0.5em;
    margin-top: 1rem;
    @media only screen and (max-width: $mobile-size) {
      margin: 0;

      &:not(:first-child) {
        margin-top: 0.5rem;
      }
    }

    font-size: 1.25rem;
  }
  .selector-item:hover {
    background-color: lighten($bg-light, 5);
  }
</style>
