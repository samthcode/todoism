<script>
  import { settings } from "$lib/stores/settings";

  function updateTaskView(e) {
    $settings.taskView = e.target.value;
    $settings = $settings;
  }

  function updateListOptions(e) {
    $settings.showListOptions = e.target.checked;
    $settings = $settings;
  }
</script>

<main>
  <h2>Settings</h2>

  <div class="setting">
    <h3>Task Viewing</h3>
    <div class="explanation">
      This contols how tasks are viewed in the list view. Options:
      <ul>
        <li>Default - title, description, and tags will be showed</li>
        <li>
          Expanded - same as default but the description will be rendered with
          newlines (as you wrote it)
        </li>
        <li>Compact - only the title will be shown</li>
      </ul>
    </div>
    <select on:change={updateTaskView}>
      <option value="default">Default</option>
      <option value="expanded">Expanded</option>
      <option value="compact">Compact</option>
    </select>
  </div>

  <div class="setting">
    <h3>List Options</h3>
    <div class="explanation">
      This determines whether the list view will show the "New List" and "Edit
      Lists" options (make sure to turn it back on if you want to add or edit
      lists). This is a convenience option mainly for mobile users.
    </div>
    <input class="checkbox" type="checkbox" on:change={updateListOptions} />
  </div>
</main>

<style>
  .setting:not(:first-child) {
    margin-top: 1rem;
  }
  h3 {
    margin-bottom: 1rem;
  }
  .checkbox {
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 1rem;
  }
</style>
