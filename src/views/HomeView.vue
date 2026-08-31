<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowDown, ArrowRight } from "@lucide/vue";
import ProjectCard from "../components/ProjectCard.vue";
import { categories, featuredProjects, projects, type ProjectCategory } from "../data/projects";

type CategoryFilter = "All" | ProjectCategory;
const activeCategory = ref<CategoryFilter>("All");
const visibleProjects = computed(() =>
  activeCategory.value === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory.value),
);
</script>

<template>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-kicker">
        <span class="status-dot" aria-hidden="true"></span>Independent open-source work
      </div>
      <h1 id="hero-title">Open-source<br /><span>projects.</span></h1>
      <div class="hero-bottom">
        <p>Game ports, porting infrastructure, developer tools, and desktop applications.</p>
        <a class="round-link" href="#projects" aria-label="Explore projects"
          ><ArrowDown :size="22" aria-hidden="true"
        /></a>
      </div>
      <div class="hero-meta" aria-label="Portfolio overview">
        <span
          ><b>{{ projects.length }}</b> selected projects</span
        >
        <span
          ><b>{{ categories.length }}</b> disciplines</span
        >
        <span><b>100%</b> public source</span>
      </div>
      <div class="hero-grid" aria-hidden="true"><span v-for="index in 12" :key="index"></span></div>
    </section>

    <section id="projects" class="projects-section" aria-labelledby="projects-title">
      <div class="section-heading">
        <div>
          <p class="section-index">01 / Featured work</p>
          <h2 id="projects-title">Featured projects.</h2>
        </div>
        <p class="section-note">
          Selected public projects with source links, intended capabilities, and evidence-backed
          state.
        </p>
      </div>
      <div class="featured-grid">
        <ProjectCard
          v-for="(project, index) in featuredProjects.slice(0, 6)"
          :key="project.slug"
          :project="project"
          :index="index"
        />
      </div>
    </section>

    <section class="directory-section" aria-labelledby="directory-title">
      <div class="directory-heading">
        <div>
          <p class="section-index">02 / Project index</p>
          <h2 id="directory-title">All projects.</h2>
        </div>
        <a
          class="text-link"
          href="https://github.com/SomeoneIsWorking?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowRight :size="16" aria-hidden="true" />
        </a>
      </div>
      <div class="filter-row" role="group" aria-label="Filter projects by category">
        <button
          type="button"
          :class="{ active: activeCategory === 'All' }"
          @click="activeCategory = 'All'"
        >
          All <span>{{ projects.length }}</span>
        </button>
        <button
          v-for="category in categories"
          :key="category.name"
          type="button"
          :class="{ active: activeCategory === category.name }"
          @click="activeCategory = category.name"
        >
          {{ category.short }}
          <span>{{ projects.filter((project) => project.category === category.name).length }}</span>
        </button>
      </div>
      <TransitionGroup name="card-list" tag="div" class="directory-grid">
        <ProjectCard
          v-for="(project, index) in visibleProjects"
          :key="project.slug"
          :project="project"
          :index="index"
          compact
        />
      </TransitionGroup>
    </section>

    <section id="about" class="approach-section" aria-labelledby="approach-title">
      <p class="section-index">03 / Approach</p>
      <div>
        <h2 id="approach-title">Reverse engineering.<br />Native systems.<br />Verification.</h2>
        <p>
          The projects focus on understanding existing systems, assigning clear subsystem ownership,
          and verifying the result against real software and hardware.
        </p>
      </div>
    </section>
  </main>
</template>
