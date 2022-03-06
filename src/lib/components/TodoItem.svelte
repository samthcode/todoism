<script>
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { isOverdue, formatDueDate } from "$lib/utils/date";
  import { getTitle, renderSimpleMarkdown } from "$lib/utils/todo";
  import TagList from "./shared/TagList.svelte";
  import { settings } from "$lib/stores/settings";

  export let title;
  export let desc;
  export let completed;
  export let dueDate;
  export let id;

  let dueDateAsDate, dueDateFormatted;

  $: if (dueDate) {
    dueDateAsDate = new Date(dueDate);
    dueDateFormatted = formatDueDate(dueDateAsDate);
  }

  let dispatch = createEventDispatcher();

  function goToPage(e) {
    goto(`/todo/${id}`);
  }
</script>

<div
  on:click={goToPage}
  class="card"
  class:uncompact-card={$settings.taskView !== "compact"}
  class:compact-card={$settings.taskView === "compact"}
>
  <h3 class="title" class:completed>
    {getTitle(title)}{#if isOverdue(dueDateAsDate) && !completed}<span
        class="text-warn">&nbsp;(Overdue)</span
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
  {#if $settings.taskView !== "compact"}
    <div
      class:expanded-desc={$settings.taskView === "expanded"}
      class:unexpanded-desc={$settings.taskView !== "expanded"}
      class:completed
      class="desc"
    >
      {#if $settings.taskView === "expanded"}
        {@html renderSimpleMarkdown(desc)}
      {:else}
        {desc}
      {/if}
    </div>
    {#if dueDate}<div class="due-date" class:completed>
        Due {dueDateFormatted}
      </div>{/if}
    <div class="tag-list">
      <TagList {title} />
    </div>
  {/if}
</div>

<style lang="scss">
  .compact-card {
    grid-template-rows: min-content;
    grid-template-areas: "title complete";
  }
  .uncompact-card {
    grid-template-rows: min-content min-content min-content min-content;
    grid-template-areas:
      "title complete"
      "desc ."
      "due-date ."
      "priority .";
  }
  .card {
    h3 {
      grid-area: title;
      margin: auto 0;
    }

    max-width: 100%;
    background-color: $bg-light;
    margin-bottom: 1.5rem;
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
    padding: 1rem 1rem;
    border-radius: 4px;

    display: grid;
    grid-template-columns: auto min-content;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;

    .expanded-desc {
      white-space: pre-line;
    }

    .unexpanded-desc {
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

    .tag-list {
      grid-area: priority;
    }

    &:hover {
      background-color: lighten($bg-light, 5);
    }
  }
</style>
