<script>
  import { createEventDispatcher } from "svelte";

  export let defaults;
  export let prompt;

  let newTodo = {
    title: defaults.title,
    desc: defaults.desc,
    dueDate: defaults.dueDate,
  };

  const dispatch = createEventDispatcher();

  function submit() {
    dispatch("submit", {
      ...newTodo,
      dueDate: newTodo.dueDate ?? null,
    });
    newTodo = {
      title: "",
      desc: "",
      dueDate: new Date().toString(),
    };
  }
</script>

<div class="container">
  <h3>{prompt ?? "Todo:"}</h3>
  <div class="todo-container">
    <div class="small title-label">Title:</div>
    <input class="title" type="text" bind:value={newTodo.title} />
    <div class="small desc-label">Description:</div>
    <textarea class="desc" bind:value={newTodo.desc} />
    <div class="small due-date-label">Due Date:</div>
    <input
      class="due-date"
      type="datetime-local"
      bind:value={newTodo.dueDate}
    />
    <button class="btn submit-new-todo" on:click={submit}>Ok</button>
  </div>
</div>

<style lang="scss">
  .todo-container {
    margin-top: 0.75rem;
    display: grid;
    column-gap: 1rem;
    row-gap: 2rem;
    grid-template-rows: min-content min-content min-content min-content;
    grid-template-columns: min-content auto;
    grid-template-areas: "title-label title" "desc-label desc" "due-date-label due-date";
  }

  .title-label {
    grid-area: title-label;
  }

  .title {
    grid-area: title;
  }

  .desc-label {
    grid-area: desc-label;
  }

  .desc {
    grid-area: desc;

    height: 5rem;
  }

  .due-date-label {
    grid-area: due-date-label;
  }

  .due-date {
    grid-area: due-date;
  }

  .container {
    margin-bottom: 1.5rem;
    @media only screen and (max-width: $mobile-size) {
      margin-bottom: 0.5rem;
    }
    padding: 1.5rem;
    background-color: $bg-light;
    border-radius: 4px;
    max-width: 30rem;

    h3 {
      margin-bottom: 1.5rem;
    }
  }

  .small {
    font-size: 14px;
    margin-bottom: 0.2em;
  }

  .submit-new-todo {
    background-color: $accent-light;
    &:hover {
      background-color: lighten($accent-light, 5);
    }
    color: $bg-dark;
    margin-bottom: 0;
  }

  h3 {
    margin: 0;
  }
</style>
