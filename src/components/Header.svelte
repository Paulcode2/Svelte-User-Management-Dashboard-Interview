<script>
  import { onMount } from 'svelte';

  let dark = false;

  function applyTheme(isDark) {
    dark = !!isDark;
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('umd-theme', dark ? 'dark' : 'light'); } catch {}
  }

  function toggle() {
    applyTheme(!dark);
  }

  onMount(() => {
    let saved;
    try { saved = localStorage.getItem('umd-theme'); } catch {}
    if (saved === 'dark') applyTheme(true);
    else if (saved === 'light') applyTheme(false);
    else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark);
    }
  });
</script>

<header class="app-header">
  <div class="header-left">
    <div class="header-title">Management Dashboard - Interview</div>
  </div>

  <div class="header-right">
    <button
      class="theme-toggle"
      aria-label="Toggle theme"
      aria-pressed={dark}
      on:click={toggle}
    >
      {#if dark} 🌙 {:else} ☀️ {/if}
    </button>
  </div>
</header>

<style>
  .theme-toggle {
    background: transparent;
    border: 1px solid var(--border);
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 180ms, color 180ms, border-color 180ms;
  }
</style>