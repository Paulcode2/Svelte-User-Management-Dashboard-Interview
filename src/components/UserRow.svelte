<script>
  import { createEventDispatcher } from 'svelte';
  export let user = {};
  export let searchQuery = '';
  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', user);
  }

  function handleDelete() {
    dispatch('delete', user?.id);
  }

  // split a string into an array of {text, match} parts for safe rendering
  function partsFor(text = '', query = '') {
    const t = String(text);
    const q = String(query ?? '').trim();
    if (!q) return [{ text: t, match: false }];

    const qi = q.toLowerCase();
    const lo = t.toLowerCase();
    const parts = [];
    let idx = 0;

    while (true) {
      const found = lo.indexOf(qi, idx);
      if (found === -1) {
        parts.push({ text: t.slice(idx), match: false });
        break;
      }
      if (found > idx) parts.push({ text: t.slice(idx, found), match: false });
      parts.push({ text: t.slice(found, found + qi.length), match: true });
      idx = found + qi.length;
    }
    return parts;
  }
</script>

<tr>
  <td data-label="Name">
    {#each partsFor(user?.name ?? '', searchQuery) as part}
      {#if part.match}
        <span class="hl">{part.text}</span>
      {:else}
        <span>{part.text}</span>
      {/if}
    {/each}
  </td>

  <td data-label="Email">
    {#each partsFor(user?.email ?? '', searchQuery) as part}
      {#if part.match}
        <span class="hl">{part.text}</span>
      {:else}
        <span>{part.text}</span>
      {/if}
    {/each}
  </td>

  <td data-label="Role">{user?.role ?? '—'}</td>

  <td class="row-actions" data-label="Actions">
    <button class="edit" type="button" on:click={handleEdit}>Edit</button>
    <button class="delete" type="button" on:click={handleDelete}>Delete</button>
  </td>
</tr>

<style>
  .row-actions{
    display: flex;
    gap: .5rem;
  }
  .row-actions button { margin-right:8px; padding:6px 10px; border-radius:6px; border:none; cursor:pointer; }
  .row-actions .edit { background:#3b82f6; color:white; }
  .row-actions .delete { background:#ef4444; color:white; }

  /* highlight style */
  .hl {
    display:inline-block;
    padding:2px 6px;
    border-radius:4px;
    font-weight:700;
    color: inherit;
    background: rgba(250,204,21,0.22); /* light-mode highlight */
  }

  /* td[data-label] { word-break:break-word; } */

  /* dark-mode highlight override */
  :global(html.dark) .hl {
    background: rgba(96,165,250,0.18); /* blueish in dark mode */
  }
</style>