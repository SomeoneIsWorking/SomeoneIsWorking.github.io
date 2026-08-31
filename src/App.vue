<script setup lang="ts">
import { Code2 } from "@lucide/vue";
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="wordmark" to="/" aria-label="SomeoneIsWorking home">
        <span class="wordmark-mark" aria-hidden="true">S/W</span>
        <span>SomeoneIsWorking</span>
      </RouterLink>
      <nav class="header-nav" aria-label="Primary navigation">
        <RouterLink to="/#projects">Projects</RouterLink>
        <RouterLink to="/#about">Approach</RouterLink>
        <a
          class="icon-link"
          href="https://github.com/SomeoneIsWorking"
          target="_blank"
          rel="noreferrer"
          aria-label="SomeoneIsWorking on GitHub"
        >
          <Code2 :size="18" aria-hidden="true" />
        </a>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <p>Built in the open. Made to last.</p>
      <a href="https://github.com/SomeoneIsWorking" target="_blank" rel="noreferrer">
        GitHub / SomeoneIsWorking
      </a>
    </footer>
  </div>
</template>
