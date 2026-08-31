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
      <h1 id="hero-title">Built close to<br /><span>the metal.</span></h1>
      <div class="hero-bottom">
        <p>
          Native ports, portable runtimes, and focused tools—engineered from first principles and
          shared in public.
        </p>
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
          <h2 id="projects-title">Projects with a pulse.</h2>
        </div>
        <p class="section-note">
          Complete products and foundational systems, selected for the depth of the problem and the
          quality of the engineering boundary.
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
          <h2 id="directory-title">Browse the workshop.</h2>
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
      <p class="section-index">03 / The throughline</p>
      <div>
        <h2 id="approach-title">Small layers.<br />Clear ownership.<br />Real hardware.</h2>
        <p>
          The work ranges from reverse engineering to interface design, but the method stays the
          same: understand the system, give each responsibility a home, and verify what ships.
        </p>
      </div>
    </section>
  </main>
</template>
