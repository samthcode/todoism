<script>
  import ListSelector from "../components/ListSelector.svelte";

  let todoLists = [{ name: "hi" }];

  import { v4 as uuidGeneratorV4 } from "uuid";
</script>

<svelte:head>
  <title>Home | Todoism</title>
</svelte:head>

<ListSelector {todoLists} />
