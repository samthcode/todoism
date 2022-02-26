<script>
  import { createEventDispatcher } from "svelte";
  import { lists } from "$lib/stores/lists";
  import { fix_and_destroy_block } from "svelte/internal";

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

  function editList(name, newValue) {
    dispatch("editlist", {listName: name, newValue})
  }

  let editingLists = false;
</script>

<button
  class="btn-accent edit-lists-btn"
  on:click={() => {
    editingLists = !editingLists;
  }}>{#if !editingLists}Edit Lists{:else}Done{/if}</button
>

<div class="selector">
  {#each $lists as list}
    <div class="selector-item" on:click={(e) => selectList(list.name)}>
      {#if editingLists}
        <input
          class="list-name"
          value={list.name}
          on:click|stopPropagation
          on:change={(e) => {editList(list.name, e.target.value)}}
        />
      {:else}
        <div class="list-name">{list.name}</div>
      {/if}
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
    <button class="btn-accent new-list-btn" on:click={newList}>New List</button>
  </div>
</div>

<style lang="scss">
  .edit-lists-btn {
    margin: 1.5rem;
    margin-bottom: 0rem;
  }
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
    flex-grow: 0;
    display: none;
    @media (hover: none) {
      display: inline;
    }
    font-size: 14px;
    border-radius: 4px;
    padding: auto 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    background-color: $warning-colour;
    border: none;
    color: white;
  }
  .selector-item:hover .remove-list {
    display: inline;
  }
  .new-list-btn {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  .selector {
    width: 17rem;
    overflow-x: clip;

    margin-left: 1.5rem;

    margin-bottom: 0.5rem;

    @media only screen and (max-width: $mobile-size) {
      width: auto;
      margin: 1.5rem;
      marin-top: 0;
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
