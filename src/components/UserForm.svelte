<script>
  import { createEventDispatcher } from 'svelte';
  import { addUser, editUser } from '../stores/users.js';

  const dispatch = createEventDispatcher();

  export let user = null;

  let name = '';
  let email = '';
  let role = '';

  
  $: if (user) {
    name = user.name ?? '';
    email = user.email ?? '';
    role = user.role ?? '';
  } else {

  }

  function close() {
    dispatch('close');
  }

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = String(name ?? '').trim();
    const trimmedEmail = String(email ?? '').trim();
    const trimmedRole = String(role ?? '').trim() || 'User';

    if (!trimmedName) return alert('Name is required');
    if (!validateEmail(trimmedEmail)) return alert('Enter a valid email');

    const newUser = {
      id: user?.id ?? Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      role: trimmedRole
    };

    if (user) editUser(newUser);
    else addUser(newUser);

    dispatch('close');
  }
</script>

<div class="form-card" role="dialog" aria-modal="true" aria-label={user ? 'Edit user' : 'Add new user'}>
  <header class="form-header">
    <h3>{user ? 'Edit User' : 'Add New User'}</h3>
  </header>

  <form class="form-body" on:submit={handleSubmit}>
    <label class="field">
      <span class="field-label">Name</span>
      <input type="text" bind:value={name} placeholder="Full name" required />
    </label>

    <label class="field">
      <span class="field-label">Email</span>
      <input type="email" bind:value={email} placeholder="name@example.com" required />
    </label>

    <label class="field">
      <span class="field-label">Role</span>
      <select bind:value={role} aria-label="Role">
        <option value="" disabled selected hidden>Select role</option>
        <option>Admin</option>
        <option>Editor</option>
        <option>User</option>
      </select>
    </label>

    <div class="form-actions" style="display:flex;justify-content:flex-end;gap:10px;margin-top:12px;">
      <button type="button" class="btn btn-ghost" on:click={close}>Cancel</button>
      <button type="submit" class="btn btn-primary">{user ? 'Update' : 'Save'}</button>
    </div>
  </form>
</div>

<style>
  .form-card { background: var(--card, #fff); border-radius:12px; padding:16px; width:360px; box-shadow:0 18px 50px rgba(10,20,40,0.12); border:1px solid var(--border, #e6eef9); }
  .form-header h3 { margin:0 0 8px 0; font-size:18px; font-weight:700; }
  .form-body { display:flex; flex-direction:column; gap:12px; }
  .field { display:flex; flex-direction:column; gap:6px; }
  .field-label { font-size:13px; color:var(--muted, #6b7280); font-weight:600; }
  input[type="text"], input[type="email"], select { padding:10px 12px; border-radius:8px; border:1px solid var(--border, #e6eef9); background:var(--card, #fff); font-size:14px; }
  .btn { padding:8px 14px; border-radius:8px; font-weight:700; cursor:pointer; border:none; }
  .btn-ghost { background:#fff; border:1px solid #e5e7eb; color:#111827; }
  .btn-primary { background:#10b981; color:white; box-shadow:0 8px 22px rgba(16,185,129,0.14); }
</style>