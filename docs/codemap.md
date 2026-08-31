# Codemap

This site is a static Vue application. The router composes one catalogue view and one data-driven
project detail view; the project registry is the only source of truth for showcased work.

```text
index.html
  └─ src/main.ts (Vue + router composition)
       └─ src/App.vue (site-wide shell)
            ├─ src/views/HomeView.vue (root catalogue and filtering)
            ├─ src/views/ProjectDetailView.vue (individual project pages)
            ├─ src/components/ProjectCard.vue (shared project summary)
            └─ src/data/projects.ts (project facts and category definitions)
```

## Ownership

| Subsystem | Responsibility | Current/target location | Entry point | Deep doc |
| --- | --- | --- | --- | --- |
| Application composition | Vue startup, routes, scroll behavior, and GitHub Pages fallback | `src/main.ts`, `vite.config.ts` | `src/main.ts` | — |
| Site shell | Global header, navigation, footer, and route outlet | `src/App.vue` | `App.vue` | — |
| Project catalogue | Hero, featured selection, category filters, and public-project index | `src/views/HomeView.vue` | `/` | — |
| Project details | Feature list, stack, source/live links, related work, and route metadata | `src/views/ProjectDetailView.vue` | `/projects/:slug` | — |
| Project summaries | Reusable cards for featured, directory, and related-project lists | `src/components/ProjectCard.vue` | `ProjectCard.vue` | — |
| Portfolio content | Categories, project facts, features, links, and featured status | `src/data/projects.ts` | `projects` | — |
| Visual system | Theme tokens, responsive layouts, motion, and component styling | `src/styles.css` | `src/main.ts` | — |
| Social identity | Favicon, social card, and root-page metadata | `public/`, `index.html` | `index.html` | — |

## Where does new work go?

| Responsibility | Owner |
| --- | --- |
| Add or correct a showcased project | `src/data/projects.ts` |
| Change card presentation | `src/components/ProjectCard.vue` |
| Change root-page discovery or filters | `src/views/HomeView.vue` |
| Change an individual project page | `src/views/ProjectDetailView.vue` |
| Change routes or GitHub Pages fallback | `src/main.ts` and `vite.config.ts` |
| Change global theme or responsive behavior | `src/styles.css` |
| Change site-wide navigation or footer | `src/App.vue` |
