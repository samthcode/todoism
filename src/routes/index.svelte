<script>
  import ListSelector from "$lib/components/ListSelector.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import { lists } from "$lib/stores/lists";
  import { currentList, unsubscribe } from "$lib/stores/currentList";
  // import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";

  onDestroy(() => {
    unsubscribe();
    unsub();
  });

  // let listToOpen;
  // if ($page.url.searchParams.get("list")) {
  //   try {
  //     listToOpen = decodeURI($page.url.searchParams.get("list"));
  //   } catch (e) {
  //     console.log("Could not decode URI (malformed)\nError message: " + e);
  //   }
  // } else {
  //   listToOpen = null;
  // }

  import { v4 as uuidGeneratorV4 } from "uuid";

  let selectedList;
  const unsub = currentList.subscribe((value) => {
    selectedList = $lists.find(({ name }) => name === value);
  });

  function selectList(e) {
    setSelectedListByListName(e.detail);
  }

  function setSelectedListByListName(someName) {
    $currentList = someName;
    console.log(`currentList = ${$currentList}`);
  }

  function updateCompleted({ detail: { id: someId, list } }) {
    // list in e.detail helps me find the correct list to look in
    // instead of having to search every list
    if (
      $lists
        .find(({ name }) => name === list)
        ?.todos.find(({ id }) => id === someId)
    )
      $lists
        .find(({ name }) => name === list)
        .todos.find(({ id }) => id === someId).completed = !$lists
        .find(({ name }) => name === list)
        .todos.find(({ id }) => id === someId).completed;
    else
      console.log(
        `updateCompleted() failed: couldn't find list: "${list}" or todo with id: "${someId}"`
      );
  }

  onMount(() => {
    if (!$currentList && $lists.length > 0) $currentList = $lists[0]?.name;
  });

  // $: if (listToOpen) {
  //   setSelectedListByListName(listToOpen);
  // }
</script>

<svelte:head>
  <title>Home | Todoism</title>
</svelte:head>

<div class="row-container">
  <div class="ls">
    <ListSelector on:select={selectList} />
  </div>
  <main>
    {#if selectedList}
      <TodoList list={selectedList} on:completed={updateCompleted} />
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
