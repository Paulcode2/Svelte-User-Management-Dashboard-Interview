<script>
  import Header from './components/Header.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import UserTable from './components/UserTable.svelte';
  import UserForm from './components/UserForm.svelte';
  import { users, deleteUser } from './stores/users.js';
  import { fade, scale } from 'svelte/transition';

  let searchQuery = '';
  let showForm = false;
  let editingUser = null;

  $: filteredUsers = ($users || []).filter(u => {
    const name = String(u?.name ?? '').toLowerCase();
    const email = String(u?.email ?? '').toLowerCase();
    const q = String(searchQuery ?? '').toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  function handleAddClick() {
    editingUser = null;
    showForm = true;
  }

  function handleEdit(event) {
    editingUser = event.detail ?? null;
    showForm = true;
  }

  function handleDelete(event) {
    const id = event.detail;
    if (typeof id !== 'undefined') deleteUser(id);
  }

  function handleClose() {
    showForm = false;
    editingUser = null;
  }
</script>

<div class="app-shell">
  <Header />

  <main class="container">
    <div class="toolbar">
      <div class="search-wrap">
        <label class="search-label">Search Users:</label>
        <!-- <SearchBar bind:searchQuery /> -->
      </div>

      <div class="actions">
        <button class="btn primary" on:click={handleAddClick}>+ Add New User</button>
      </div>
    </div>

    <section class="card">
      <UserTable on:delete={handleDelete} on:edit={handleEdit} />
    </section>
  </main>

  {#if showForm}
    <!-- backdrop with fade -->
    <div class="modal-backdrop" on:click={handleClose} transition:fade={{ duration: 180 }}></div>

    <!-- modal scales in/out -->
    <div class="modal" on:click|stopPropagation transition:scale={{ duration: 220, start: 0.98 }}>
      <UserForm user={editingUser} on:close={handleClose} />
    </div>
  {/if}
</div>