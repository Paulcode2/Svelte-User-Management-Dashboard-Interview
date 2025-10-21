<script>
  import { onMount } from 'svelte';
  import { users, deleteUser } from '../stores/users';
  import UserRow from './UserRow.svelte';
  import SearchBar from './SearchBar.svelte';

  let searchQuery = '';
 export let filteredUsers = [];

  // Modal state for editing
  let isEditing = false;
  let editingUser = { id: null, name: '', email: '', role: '' };

  // Initialize user list on mount
  onMount(() => {
    filteredUsers = Array.isArray($users) ? $users : [];
  });

  // Reactive statement to filter users when searchQuery or $users change
  $: filteredUsers = (Array.isArray($users) ? $users : []).filter(user => {
    const name = (user?.name ?? '').toLowerCase();
    const email = (user?.email ?? '').toLowerCase();
    const query = (searchQuery ?? '').toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  //  Handle user edit event (from UserRow)
  function handleRowEdit(event) {
    const user = event.detail;
    editingUser = { ...user };
    isEditing = true; // open edit modal
  }

  // Handle user delete event (from UserRow)
  function handleRowDelete(event) {
    const id = event.detail;
    deleteUser(id);
  }

  // Save edited user to store
  function saveEdit() {
    users.update(currentUsers =>
      currentUsers.map(u => (u.id === editingUser.id ? editingUser : u))
    );
    closeModal();
  }

  function closeModal() {
    isEditing = false;
    editingUser = { id: null, name: '', email: '', role: '' };
  }
</script>

<div>
  <SearchBar bind:searchQuery />

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        {#if Array.isArray(filteredUsers) && filteredUsers.length}
          {#each filteredUsers as user (user?.id)}
            {#if user}
              <!-- Listen for edit and delete events -->
              <UserRow {user} on:edit={handleRowEdit} on:delete={handleRowDelete} />
            {:else}
              <tr>
                <td colspan="4">Invalid user entry</td>
              </tr>
            {/if}
          {/each}
        {:else}
          <tr>
            <td colspan="4" style="text-align:center;">No users found</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Edit Modal -->
  {#if isEditing}
    <div class="modal-overlay">
      <div class="modal">
        <h3>Edit User</h3>
        <label>
          Name:
          <input type="text" bind:value={editingUser.name} />
        </label>
        <label>
          Email:
          <input type="email" bind:value={editingUser.email} />
        </label>
        <label>
          Role:
          <select bind:value={editingUser.role}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>

        <div class="modal-buttons">
          <button on:click={saveEdit}>Save</button>
          <button on:click={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  html.dark .modal-overlay .modal{
    background-color: black;
  }
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

  /* Responsive table container */
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
  }

  thead tr th {
    text-align: left;
    padding: 12px;
    font-weight: 700;
  }

  tbody tr td {
    padding: 12px;
    vertical-align: middle;
  }

  /* Modal styling */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 320px;
  }

  .modal h3 {
    margin-bottom: 10px;
  }

  .modal label {
    display: block;
    margin: 10px 0;
  }

  .modal input,
  .modal select {
    width: 100%;
    padding: 6px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .modal-buttons button {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .modal-buttons button:first-child {
    background: #007bff;
    color: white;
  }

  .modal-buttons button:last-child {
    background: #ccc;
  }
</style>
