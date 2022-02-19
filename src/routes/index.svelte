<script>
  import ListSelector from "$lib/components/ListSelector.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import { todos } from "$lib/stores/todos";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let listToOpen;
  if ($page.url.searchParams.get("list")) {
    try {
      listToOpen = decodeURI($page.url.searchParams.get("list"));
    } catch (e) {
      console.log("Could not decode URI (malformed)\nError message: " + e);
    }
  } else {
    listToOpen = null;
  }

  import { v4 as uuidGeneratorV4 } from "uuid";

  let selectedList;
  let selectedTodos;
  let lists;

  function selectList(e) {
    listToOpen = null;
    selectedList = e.detail;
    selectedTodos = $todos.filter(({ list }) => list === selectedList);
  }

  function updateCompleted(e) {
    $todos[$todos.findIndex(({ id }) => id === e.detail)].completed =
      !$todos[$todos.findIndex(({ id }) => id === e.detail)].completed;
  }

  lists = [...new Set($todos.map(({ list }) => list))];

  onMount(() => {
    if (lists.length > 0) {
      selectedList = lists[0];
      selectedTodos = $todos.filter(({ list }) => list === selectedList);
    }
  });

  $: if (listToOpen) {
    if (lists.includes(listToOpen)) {
      selectedList = listToOpen;
      selectedTodos = $todos.filter(({ list }) => list === selectedList);
    }
  }
</script>

<svelte:head>
  <title>Home | Todoism</title>
</svelte:head>

<div class="row-container">
  <ListSelector listNames={lists} on:select={selectList} />
  <main>
    {#if selectedList}
      <TodoList
        name={selectedList}
        todos={selectedTodos}
        on:completed={updateCompleted}
      />
    {/if}
  </main>
</div>

<style lang="scss">
  .row-container {
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: $mobile-size) {
      display: block;
    }

    main {
      flex: 1 1 auto;
    }
  }
</style>
