<script>
  import { createEventDispatcher } from 'svelte';
  export let user = {};
  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', user);
  }

  function handleDelete() {
    dispatch('delete', user?.id);
  }
</script>

<tr>
  <td>{user?.name ?? '—'}</td>
  <td>{user?.email ?? '—'}</td>
  <td>{user?.role ?? '—'}</td>
  <td class="row-actions">
    <button class="edit" type="button" on:click={handleEdit}>Edit</button>
    <button class="delete" type="button" on:click={handleDelete}>Delete</button>
  </td>
</tr>

<style>
  .row-actions button { margin-right:8px; padding:6px 10px; border-radius:6px; border:none; cursor:pointer; }
  .row-actions .edit { background:#3b82f6; color:white; }
  .row-actions .delete { background:#ef4444; color:white; }
</style>