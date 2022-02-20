<script>
  import { createEventDispatcher } from "svelte";
  import { lists } from "$lib/stores/lists";

  let dispatch = createEventDispatcher();

  function selectList(name) {
    dispatch("select", name);
  }
</script>

<div class="selector">
  {#each $lists as list}
    <div class="selector-item" on:click={(e) => selectList(list.name)}>
      {list.name}
    </div>
  {/each}
</div>

<style lang="scss">
  .selector {
    width: 17rem;
    overflow-x: clip;

    margin-left: 1.5rem;
    margin-top: 1.5rem;

    @media only screen and (max-width: $mobile-size) {
      width: calc(100% - 3rem);
      margin: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }
  .selector-item {
    border-radius: 4px;
    background-color: $bg-light;
    color: $text;
    padding: 0.75em 0.5em;
    margin-top: 1rem;
    @media only screen and (max-width: $mobile-size) {
      // width: 100%;
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
