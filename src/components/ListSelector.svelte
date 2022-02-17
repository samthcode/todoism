<script>
  export let todoLists;
</script>

{#each todoLists as list}
  <span class="selector-item">{list.name}</span>
{/each}

<style lang="scss">
  .selector-item {
    background-color: $bg-light;
    color: $text;
  }
</style>