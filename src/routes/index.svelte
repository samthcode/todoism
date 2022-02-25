<script>
  import ListSelector from "$lib/components/ListSelector.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import { lists } from "$lib/stores/lists";
  import { currentList } from "$lib/stores/currentList";
  import { onMount } from "svelte";
  import { browser } from "$app/env";

  import { v4 as uuidGeneratorV4 } from "uuid";

  let selectedList;
  currentList.subscribe((value) => {
    selectedList = $lists.find(({ name }) => name === value);
  });

  function selectList(e) {
    setSelectedListByListName(e.detail);
  }

  function setSelectedListByListName(someName) {
    $currentList = someName;
    console.log(`currentList = ${$currentList}`);
  }

  function addNewTodo(e) {
    if (!$lists.find(({ name }) => name === e.detail.listName)) {
      console.log(
        `addNewTodo(): Couldn't find list with name: "${e.detail.listName}"`
      );
      return;
    }
    $lists
      .find(({ name }) => name === e.detail.listName)
      .todos.push({
        ...e.detail.todo,
        id: uuidGeneratorV4(),
        completed: false,
      });
    $lists = $lists;
    if (browser) location.reload();
  }

  function updateCompleted({ detail: { id: someId, list } }) {
    // list in e.detail helps me find the correct list to look in
    // instead of having to search every list
    if (
      $lists
        .find(({ name }) => name === list)
        ?.todos.find(({ id }) => id === someId)
    ) {
      $lists
        .find(({ name }) => name === list)
        .todos.find(({ id }) => id === someId).completed = !$lists
        .find(({ name }) => name === list)
        .todos.find(({ id }) => id === someId).completed;

      $lists = $lists;
    } else {
      console.log(
        `updateCompleted() failed: couldn't find list: "${list}" or todo with id: "${someId}"`
      );
    }
  }

  onMount(() => {
    if (!$currentList && $lists.length > 0) $currentList = $lists[0]?.name;
  });

  function addNewList(e) {
    if ($lists.find(({ name }) => name === e.detail)) return;
    $lists.push({
      name: e.detail,
      todos: [],
    });
    $lists = $lists;
    $currentList = e.detail;
  }

  function removeList(e) {
    let ind = $lists.findIndex(({ name }) => name === e.detail);
    if (ind == -1) {
      console.log(`removeList(): Couldn't find list with name: "${e.detail}"`);
      return;
    }
    if (
      !confirm(
        `Are you sure you want to remove list: "${e.detail}" and all the todos contained within?\n\nTHIS ACTION IS IRREVERSIBLE!`
      )
    )
      return;
    $lists.splice(ind, 1);
    $lists = $lists;

    if ($currentList === e.detail) {
      setSelectedListByListName($lists[0]?.name);
    }
  }
</script>

<svelte:head>
  <title>Home | Todoism</title>
</svelte:head>

<div class="row-container">
  <div class="ls">
    <ListSelector
      on:removelist={removeList}
      on:newlist={addNewList}
      on:select={selectList}
    />
  </div>
  <main>
    {#if selectedList}
      <TodoList
        list={selectedList}
        on:addtodo={addNewTodo}
        on:completed={updateCompleted}
      />
    {/if}
  </main>
</div>

<style lang="scss">
  .row-container {
    display: flex;
    flex-direction: row;

    .ls {
      flex: 0 0 0;
    }

    @media only screen and (max-width: $mobile-size) {
      display: block;
    }

    main {
      flex: 1 1 auto;
    }
  }
</style>
