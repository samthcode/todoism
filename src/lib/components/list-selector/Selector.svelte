<script>
  import { createEventDispatcher } from "svelte";
  import { lists } from "$lib/stores/lists";
  import Item from "./Item.svelte";
  import { settings } from "$lib/stores/settings";

  let dispatch = createEventDispatcher();

  function selectList({ detail: name }) {
    dispatch("select", name);
  }

  let newListName = "";

  function newList() {
    if (newListName === "") return;
    dispatch("newlist", newListName);
    newListName = "";
  }

  function removeList({ detail: name }) {
    dispatch("removelist", name);
  }

  function editList({ detail: { name, value } }) {
    dispatch("editlist", { listName: name, newValue: value });
  }

  let editingLists = false;
</script>

<div
  class="selector"
  class:selector-no-list-options={!$settings.showListOptions}
>
  {#each $lists as list}
    <Item
      on:edit={editList}
      on:select={selectList}
      on:remove={removeList}
      {editingLists}
      {list}
    />
  {/each}
  {#if $settings.showListOptions}
    <div class="list-selector-item inp">
      <input type="text" class="new-list-inp" bind:value={newListName} />
      <button class="btn-accent new-list-btn" on:click={newList}
        >New List</button
      >
    </div>
  {/if}
</div>

{#if $settings.showListOptions}
  <button
    class="btn-accent edit-lists-btn"
    on:click={() => {
      editingLists = !editingLists;
    }}
    >{#if !editingLists}Edit Lists{:else}Done{/if}</button
  >
{/if}

<style lang="scss">
  .inp:hover {
    background-color: $bg-dark;
  }
  .edit-lists-btn {
    margin: 1.5rem;
    margin-top: 0;
  }
  .new-list-inp {
    flex: 1 1 0;
    width: 0;
  }
  .new-list-btn {
    margin-left: 0.5rem;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  .selector {
    width: 17rem;
    overflow-x: clip;

    @media only screen and (max-width: $mobile-size) {
      width: auto;
    }
  }
  .selector-no-list-options {
    margin-bottom: 1.5rem;
  }
</style>
