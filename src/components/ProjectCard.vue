<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue";
import type { Project } from "../data/projects";
import { categoryByName } from "../data/projects";

const props = defineProps<{ project: Project; compact?: boolean; index?: number }>();
const category = categoryByName[props.project.category];
</script>

<template>
  <article class="project-card" :class="{ compact }">
    <div class="card-signal" :style="{ '--accent': category.accent }"></div>
    <div v-if="project.screenshots?.[0]" class="card-media">
      <img
        :src="project.screenshots[0].src"
        :alt="project.screenshots[0].alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="card-topline">
      <span>{{ project.eyebrow }}</span>
      <span v-if="index !== undefined">{{ String(index + 1).padStart(2, "0") }}</span>
    </div>
    <div class="card-body">
      <span class="status-pill">{{ project.status }}</span>
      <h3>
        <RouterLink :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink>
      </h3>
      <p>{{ project.summary }}</p>
    </div>
    <div class="card-footer">
      <ul class="language-list" :aria-label="`${project.name} technologies`">
        <li v-for="language in project.languages.slice(0, compact ? 3 : 4)" :key="language">
          {{ language }}
        </li>
      </ul>
      <RouterLink
        class="card-arrow"
        :to="`/projects/${project.slug}`"
        :aria-label="`View ${project.name}`"
      >
        <ArrowUpRight :size="18" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>
