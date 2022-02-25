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

  function removeList(name) {
    dispatch("removelist", name);
  }
</script>

<div class="selector">
  {#each $lists as list}
    <div class="selector-item" on:click={(e) => selectList(list.name)}>
      <div class="list-name">{list.name}</div>
      <button
        class="remove-list"
        on:click|stopPropagation={() => {
          removeList(list.name);
        }}>X</button
      >
    </div>
  {/each}
  <div class="selector-item">
    <input type="text" class="new-list-inp" bind:value={newListName} />
    <button class="btn new-list-btn" on:click={newList}>New List</button>
  </div>
</div>

<style lang="scss">
  .new-list-inp {
    flex: 1 1 0;
  }
  .list-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remove-list {
    text-align: center;
    vertical-align: middle;
    flex-shrink: 0;
    display: none;
    @media (hover: none) {
      display: inline;
    }
    width: 23px;
    height: 23px;
    font-size: 14px;
    border-radius: 50%;

    background-color: $warning-colour;
    border: none;
    color: white;
  }
  .selector-item:hover .remove-list {
    display: inline;
  }
  .new-list-btn {
    margin-left: 0.5rem;
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
    display: flex;
    justify-content: space-between;

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
