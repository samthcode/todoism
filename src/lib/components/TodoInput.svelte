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
    <textarea class="editor-desc" bind:value={newTodo.desc} />
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
  .container {
    margin-top: 0.5rem;
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

  .submit-new-todo {
    background-color: $accent-light;
    &:hover {
      background-color: lighten($accent-light, 5);
    }
    color: $bg-dark;
    margin-bottom: 0;
  }

  .editor-desc {
    grid-area: desc;
  }

  .editor-desc {
    grid-area: desc;

    height: 5rem;
  }

  h3 {
    margin: 0;
  }
</style>
