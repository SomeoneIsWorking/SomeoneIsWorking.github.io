<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Code2 } from "@lucide/vue";
import { findProject } from "./data/projects";
import { applyPageMetadata } from "./lib/metadata";

const route = useRoute();

watchEffect(() => {
  const project = route.name === "project" ? findProject(String(route.params.slug)) : undefined;

  if (project) {
    applyPageMetadata({
      title: `${project.name} — SomeoneIsWorking`,
      description: project.summary,
      path: route.fullPath,
      image: project.screenshots?.[0]?.src,
    });
    return;
  }

  if (route.name === "project") {
    applyPageMetadata({
      title: "Project not found — SomeoneIsWorking",
      description: "Open-source project portfolio by SomeoneIsWorking.",
      path: route.fullPath,
    });
    return;
  }

  applyPageMetadata({
    title: "SomeoneIsWorking — Open-source projects",
    description: "Game ports, porting infrastructure, developer tools, and desktop applications.",
    path: "/",
  });
});
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
      <p>Open-source projects by SomeoneIsWorking.</p>
      <a href="https://github.com/SomeoneIsWorking" target="_blank" rel="noreferrer">
        GitHub / SomeoneIsWorking
      </a>
    </footer>
  </div>
</template>
