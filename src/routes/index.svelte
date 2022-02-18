<script>
  import ListSelector from "$lib/components/ListSelector.svelte";
  import TodoList from "$lib/components/TodoList.svelte";

  import { v4 as uuidGeneratorV4 } from "uuid";

  let selectedList;
  let selectedTodos;

  function selectList(e) {
    selectedList = e.detail;
    selectedTodos = todos.filter(({ list }) => list === selectedList);
  }

  let todos = [
    {
      title: "Hello",
      desc: "World",
      completed: true,
      dueDate: new Date(),
      list: "Hello",
      id: uuidGeneratorV4(),
    },
    {
      title: "Hello",
      desc: "World",
      completed: true,
      dueDate: new Date(),
      list: "Hello",
      id: uuidGeneratorV4(),
    },
    {
      title: "Goobye",
      desc: "World",
      completed: false,
      dueDate: new Date(9999, 1, 1, 1, 1),
      list: "World",
      id: uuidGeneratorV4(),
    },
  ];
</script>

<svelte:head>
  <title>Home | Todoism</title>
</svelte:head>

<div class="row-container">
  <ListSelector {todos} on:select={selectList} />
  <main>
    {#if selectedList}
      <h2>{selectedList}</h2>
      <TodoList {selectedTodos} />
    {/if}
  </main>
</div>

<style lang="scss">
  .row-container {
    display: flex;
    flex-direction: row;
  }
  h2 {
    margin-bottom: 1rem;
  }
</style>
