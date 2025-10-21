<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchQuery = '';

  function handleInput(event) {
    searchQuery = event.target.value;
    dispatch('search', searchQuery);
  }
</script>

<div class="search-bar">
  <input
    type="text"
    placeholder="Search by name or email"
    bind:value={searchQuery}
    on:input={handleInput}
  />
</div>

<style>
  .search-bar {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>