<script>
  import { createEventDispatcher } from "svelte";
  import { lists } from "$lib/stores/lists";
  import ListSelectorItem from "./ListSelectorItem.svelte";
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

<div class="selector">
  {#each $lists as list}
    <ListSelectorItem
      on:edit={editList}
      on:select={selectList}
      on:remove={removeList}
      {editingLists}
      {list}
    />
  {/each}
  {#if $settings.showListOptions}
    <div class="list-selector-item">
      <input type="text" class="new-list-inp" bind:value={newListName} />
      <button class="btn-accent new-list-btn" on:click={newList}
        >New List</button
      >
    </div>
  {/if}
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
</style>
