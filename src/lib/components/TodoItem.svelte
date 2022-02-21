<script>
  export let title;
  export let desc;
  export let completed;
  export let dueDate;
  export let id;

  let dueDateAsDate = new Date(dueDate);

  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/env";

  import {isOverdue, formatDueDate} from "$lib/dateUtils.js";

  let dispatch = createEventDispatcher();

  import { goto } from "$app/navigation";

  function goToPage(e) {
    goto(`/todo/${id}`);
  }

  let dueDateFormatted = formatDueDate(dueDateAsDate);
</script>

<div on:click={goToPage} class="card">
  <h3 class:completed>
    {title}{#if isOverdue(dueDateAsDate) && !completed}<span class="text-warn"
        >&nbsp;(Overdue)</span
      >{/if}
  </h3>
  <input
    type="checkbox"
    class="complete"
    bind:checked={completed}
    on:click|stopPropagation={() => {
      dispatch("completed", id);
    }}
  />
  <div class="desc" class:completed>{desc}</div>
  <div class="due-date" class:completed>Due {dueDateFormatted}</div>
</div>

<style lang="scss">
  .card {
    max-width: 100%;
    background-color: $bg-light;
    margin-bottom: 2rem;
    padding: 1rem 1rem;
    border-radius: 4px;

    display: grid;
    grid-template-columns: auto min-content;
    grid-template-rows: auto auto;
    grid-template-areas:
      "title complete"
      "desc ."
      "due-date .";
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;

    h3 {
      grid-area: title;
    }

    .desc {
      grid-area: desc;

      text-overflow: ellipsis; /* IE, Safari (WebKit) */
      overflow: hidden; /* don't show excess chars */
      white-space: nowrap; /* force single line */
    }

    .due-date {
      grid-area: due-date;
    }

    .complete {
      grid-area: complete;

      width: 2em;
      height: 2em;
    }

    .completed {
      text-decoration: line-through;
      font-style: italic;
    }

    &:hover {
      background-color: lighten($bg-light, 5);
    }
  }
</style>
