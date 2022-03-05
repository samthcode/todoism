<script>
  import ListSelector from "$lib/components/list-selector/Selector.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import { lists } from "$lib/stores/lists";
  import { currentList } from "$lib/stores/currentList";
  import { onMount } from "svelte";
  import { browser } from "$app/env";

  import { v4 as uuidGeneratorV4 } from "uuid";
  import { defaultFilterValues, filterValues } from "$lib/stores/filterValues";

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
    $filterValues = defaultFilterValues;
  }

  function addNewTodo({ detail: { todo, listName } }) {
    if (!$lists.find(({ name }) => name === listName)) {
      console.log(`addNewTodo(): Couldn't find list with name: "${listName}"`);
      return;
    }
    if (todo.title === undefined) return;
    $lists
      .find(({ name }) => name === listName)
      .todos.unshift({
        ...todo,
        desc: todo.desc ?? "",
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

  function editList({ detail: { listName, newValue } }) {
    let ind = $lists.findIndex(({ name }) => name === listName);
    if (ind === -1) {
      console.log(`editList(): Couldn't find list with name: "${listName}"`);
      return;
    }

    $lists[ind].name = newValue;

    if (listName === $currentList) {
      $currentList = newValue;
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
      on:editlist={editList}
    />
  </div>
  <main>
    {#if selectedList}
      {#key selectedList || $lists}
        <TodoList
          list={selectedList}
          on:addtodo={addNewTodo}
          on:completed={updateCompleted}
        />
      {/key}
    {/if}
  </main>
</div>

<style lang="scss">
  .row-container {
    display: flex;
    flex-direction: row;

    .ls {
      flex: 0 0 0;
      margin-bottom: 0;
    }

    @media only screen and (max-width: $mobile-size) {
      display: block;
    }

    main {
      flex: 1 1 auto;
      @media only screen and (max-width: $mobile-size) {
        margin-top: 0;
      }
    }
  }
</style>
