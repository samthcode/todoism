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

  function editList(name, newValue) {
    dispatch("editlist", { listName: name, newValue });
  }

  let editingLists = false;
</script>

<div class="selector">
  {#each $lists as list}
    <div class="selector-item" on:click={(e) => selectList(list.name)}>
      {#if editingLists}
        <input
          class="list-name"
          value={list.name}
          on:click|stopPropagation
          on:change={(e) => {
            editList(list.name, e.target.value);
          }}
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

<button
  class="btn-accent edit-lists-btn"
  on:click={() => {
    editingLists = !editingLists;
  }}
  >{#if !editingLists}Edit Lists{:else}Done{/if}</button
>

<style lang="scss">
  .edit-lists-btn {
    margin: 1.5rem;
    margin-top: 0;
  }
  .new-list-inp {
    flex: 1 1 0;
  }
  .list-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
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

    margin-left: 0.5rem;

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
    flex-shrink: 0;
  }
  .selector {
    width: 17rem;
    overflow-x: clip;

    margin-top: 1.5rem;
    margin-left: 1.5rem;
    margin-bottom: 1rem;

    @media only screen and (max-width: $mobile-size) {
      width: auto;
      margin-right: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }
  .selector-item {
    display: flex;
    justify-content: space-between;

    border-radius: 4px;
    background-color: $bg-light;
    color: $text;
    padding: 0.75em 0.5em;
    &:not(:first-child) {
      margin-top: 1rem;
      @media only screen and (max-width: $mobile-size) {
        margin-top: 0.5rem;
      }
    }
    @media only screen and (max-width: $mobile-size) {
      margin: 0;
    }

    font-size: 1.25rem;
  }
  .selector-item:hover {
    background-color: lighten($bg-light, 5);
  }
</style>
