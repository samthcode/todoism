<script>
  import { currentList } from "$lib/stores/currentList";
  import { createEventDispatcher } from "svelte";

  export let list;
  export let editingLists;

  const dispatch = createEventDispatcher();

  function selectList() {
    dispatch("select", list.name);
  }

  function editList(e) {
    dispatch("edit", { name: list.name, value: e.target.value });
  }

  function removeList() {
    dispatch("remove", list.name);
  }
</script>

<div
  class="list-selector-item"
  class:list-selector-item-selected={$currentList === list.name}
  on:click={selectList}
>
  {#if editingLists}
    <input
      class="list-name"
      value={list.name}
      on:click|stopPropagation
      on:change={editList}
    />
  {:else}
    <div class="list-name">{list.name}</div>
  {/if}
  <span class="number-completed"
    >{list.todos.filter(({ completed }) => completed).length}/{list.todos
      .length}</span
  >
  <button class="remove-list" on:click|stopPropagation={removeList}>X</button>
</div>

<style lang="scss">
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

  .number-completed {
    flex-shrink: 0;
    flex-grow: 0;
    display: none;
    @media (hover: none) {
      display: inline;
    }

    padding-left: 0.5rem;

    margin-left: 0.5rem;
  }

  .list-selector-item:hover {
    .remove-list {
      display: inline;
    }
    .number-completed {
      display: inline;
    }
  }

  .list-selector-item-selected {
    background-color: lighten($bg-light, 5);
  }

  .list-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
</style>
