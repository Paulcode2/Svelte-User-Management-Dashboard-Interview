<script>
  import { onMount } from 'svelte';
  import { users, deleteUser } from '../stores/users';
  import UserRow from './UserRow.svelte';
  import SearchBar from './SearchBar.svelte';

  let searchQuery = '';
  let filteredUsers = [];

  onMount(() => {
    filteredUsers = Array.isArray($users) ? $users : [];
  });

  $: filteredUsers = (Array.isArray($users) ? $users : []).filter(user => {
    const name = (user?.name ?? '').toLowerCase();
    const email = (user?.email ?? '').toLowerCase();
    const query = (searchQuery ?? '').toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  function handleDeleteUser(event) {
    const id = event.detail;
    deleteUser(id);
  }
</script>

<div>
  <SearchBar bind:searchQuery />

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#if filteredUsers.length > 0}
        {#each filteredUsers as user (user.id)}
          <UserRow {user} on:delete={handleDeleteUser} />
        {/each}
      {:else}
        <tr><td colspan="4" style="text-align:center;">No users found</td></tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
</style>
