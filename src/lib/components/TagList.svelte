<script>
  import {
    priorityToCss,
    getPriority,
    priorityToString,
    hasMaybe,
  } from "$lib/utils/todo";

  export let title;
  let priority = getPriority(title);
</script>

<div class="tag-container">
  <div class="tag" style={priorityToCss(priority)}>
    {priorityToString(priority)}
  </div>
  {#if hasMaybe(title)}
  <div class="tag maybe-tag">Maybe</div>
  {/if}
</div>

<style lang="scss">
  .tag-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1rem;
    column-gap: 1rem;
  }
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 50vh;
    width: fit-content;
    padding: 0.25rem 0.5rem;
    background-color: rgba($accent-light, 0.5);
    border: 1px solid $accent-light;
    color: $bg-dark;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
