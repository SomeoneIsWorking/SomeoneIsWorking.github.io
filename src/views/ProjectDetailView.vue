<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft, ArrowUpRight, Code2 } from "@lucide/vue";
import ProjectCard from "../components/ProjectCard.vue";
import { categoryByName, findProject, projects } from "../data/projects";

const route = useRoute();
const project = computed(() => findProject(String(route.params.slug)));
const category = computed(() =>
  project.value ? categoryByName[project.value.category] : undefined,
);
const related = computed(() =>
  project.value
    ? projects
        .filter(
          (candidate) =>
            candidate.category === project.value?.category && candidate.slug !== project.value.slug,
        )
        .slice(0, 3)
    : [],
);

watchEffect(() => {
  const title = project.value
    ? `${project.value.name} — SomeoneIsWorking`
    : "Project not found — SomeoneIsWorking";
  const description =
    project.value?.summary ?? "Open-source project portfolio by SomeoneIsWorking.";
  document.title = title;
  const values = new Map([
    ['meta[name="description"]', description],
    ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description],
    ['meta[name="twitter:title"]', title],
    ['meta[name="twitter:description"]', description],
  ]);
  values.forEach((content, selector) => {
    const element = document.querySelector<HTMLMetaElement>(selector);
    if (element) element.content = content;
  });
  document
    .querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')
    .forEach((node) => node.remove());
});
</script>

<template>
  <main v-if="project && category" class="detail-page">
    <section class="detail-hero" :style="{ '--accent': category.accent }">
      <RouterLink class="back-link" to="/#projects"
        ><ArrowLeft :size="16" aria-hidden="true" /> All projects</RouterLink
      >
      <div class="detail-title-row">
        <div>
          <p class="section-index">{{ project.category }} / {{ project.status }}</p>
          <h1>{{ project.name }}</h1>
        </div>
        <div class="detail-orbit" aria-hidden="true"><span></span><i></i></div>
      </div>
      <p class="detail-summary">{{ project.summary }}</p>
      <div class="detail-actions">
        <a class="primary-action" :href="project.github" target="_blank" rel="noreferrer"
          ><Code2 :size="17" aria-hidden="true" /> View source
          <ArrowUpRight :size="16" aria-hidden="true"
        /></a>
        <a
          v-if="project.liveUrl"
          class="secondary-action"
          :href="project.liveUrl"
          target="_blank"
          rel="noreferrer"
          >Open live project <ArrowUpRight :size="16" aria-hidden="true"
        /></a>
      </div>
    </section>

    <section class="detail-content">
      <div class="detail-intro">
        <p class="section-index">01 / The project</p>
        <p>{{ project.narrative }}</p>
      </div>
      <div class="feature-panel">
        <p class="section-index">02 / What it does</p>
        <ol>
          <li v-for="(feature, index) in project.features" :key="feature">
            <span>{{ String(index + 1).padStart(2, "0") }}</span
            >{{ feature }}
          </li>
        </ol>
      </div>
      <aside class="stack-panel">
        <p class="section-index">03 / Built with</p>
        <ul class="detail-stack">
          <li v-for="language in project.languages" :key="language">{{ language }}</li>
        </ul>
      </aside>
    </section>

    <section v-if="related.length" class="related-section" aria-labelledby="related-title">
      <div class="directory-heading">
        <div>
          <p class="section-index">04 / Keep exploring</p>
          <h2 id="related-title">Related work.</h2>
        </div>
      </div>
      <div class="directory-grid">
        <ProjectCard
          v-for="(relatedProject, index) in related"
          :key="relatedProject.slug"
          :project="relatedProject"
          :index="index"
          compact
        />
      </div>
    </section>
  </main>

  <main v-else class="not-found-page">
    <p class="section-index">404 / No project here</p>
    <h1>That trail ends here.</h1>
    <RouterLink class="primary-action" to="/#projects"
      ><ArrowLeft :size="16" aria-hidden="true" /> Back to projects</RouterLink
    >
  </main>
</template>
