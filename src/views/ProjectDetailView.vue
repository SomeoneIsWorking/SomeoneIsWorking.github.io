<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft, ArrowUpRight, Code2 } from "@lucide/vue";
import ProjectCard from "../components/ProjectCard.vue";
import { categoryByName, findProject, projects } from "../data/projects";
import {
  comparisonBaselineFor,
  type ProjectFeatureState,
  type ProjectSlug,
} from "../data/project-features.generated";

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
const comparisonBaseline = computed(() =>
  project.value ? comparisonBaselineFor(project.value.slug as ProjectSlug) : undefined,
);

const featureStateLabels: Record<ProjectFeatureState, string> = {
  verified: "Verified",
  partial: "Partial",
  blocked: "Blocked",
  missing: "Missing",
};
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
        <figure v-if="project.screenshots?.[0]" class="detail-lead-image">
          <img :src="project.screenshots[0].src" :alt="project.screenshots[0].alt" />
        </figure>
        <div v-else class="detail-orbit" aria-hidden="true"><span></span><i></i></div>
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
        <div class="feature-panel-heading">
          <div>
            <p class="section-index">02 / Intended features</p>
            <h2>{{ comparisonBaseline ? "Features and differences." : "Capability state." }}</h2>
          </div>
          <ul class="feature-legend" aria-label="Feature state key">
            <li v-for="(label, state) in featureStateLabels" :key="state" :data-state="state">
              <span aria-hidden="true"></span>{{ label }}
            </li>
          </ul>
        </div>
        <p v-if="comparisonBaseline" class="comparison-baseline">
          <span>Compared with</span>{{ comparisonBaseline }}
        </p>
        <ol>
          <li
            v-for="feature in project.features"
            :key="feature.sourceId"
            class="feature-item"
            :data-state="feature.state"
          >
            <span class="feature-source">{{ feature.sourceId }}</span>
            <span class="feature-label">{{ feature.label }}</span>
            <span class="feature-state">{{ featureStateLabels[feature.state] }}</span>
          </li>
        </ol>
        <a
          class="feature-source-link"
          :href="`${project.github}/blob/main/docs/project-state.md`"
          target="_blank"
          rel="noreferrer"
          >View project state source <ArrowUpRight :size="14" aria-hidden="true"
        /></a>
      </div>
      <aside class="stack-panel">
        <p class="section-index">03 / Built with</p>
        <ul class="detail-stack">
          <li v-for="language in project.languages" :key="language">{{ language }}</li>
        </ul>
      </aside>
    </section>

    <section
      v-if="project.screenshots?.length"
      class="gallery-section"
      aria-labelledby="gallery-title"
    >
      <div class="directory-heading">
        <div>
          <p class="section-index">04 / Project images</p>
          <h2 id="gallery-title">Project images.</h2>
        </div>
      </div>
      <div class="screenshot-grid">
        <figure v-for="screenshot in project.screenshots" :key="screenshot.src">
          <img :src="screenshot.src" :alt="screenshot.alt" loading="lazy" decoding="async" />
          <figcaption v-if="screenshot.caption">{{ screenshot.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <section v-if="related.length" class="related-section" aria-labelledby="related-title">
      <div class="directory-heading">
        <div>
          <p class="section-index">{{ project.screenshots?.length ? "05" : "04" }} / Related</p>
          <h2 id="related-title">Related projects.</h2>
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
    <p class="section-index">404</p>
    <h1>Project not found.</h1>
    <RouterLink class="primary-action" to="/#projects"
      ><ArrowLeft :size="16" aria-hidden="true" /> Back to projects</RouterLink
    >
  </main>
</template>
