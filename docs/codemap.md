# Codemap

This site is a static Vue application. The router composes one catalogue view and one data-driven
project detail view. Project facts live in the project registry; intended feature state is a committed
snapshot generated from each showcased repository's canonical `docs/project-state.md`.

```text
index.html
  └─ src/main.ts (Vue + router composition)
       └─ src/App.vue (site-wide shell)
            ├─ src/views/HomeView.vue (root catalogue and filtering)
            ├─ src/views/ProjectDetailView.vue (individual project pages)
            ├─ src/components/ProjectCard.vue (shared project summary)
            ├─ src/data/projects.ts (project facts and category definitions)
            ├─ src/data/project-features.generated.ts (stateful intended-feature snapshot)
            └─ src/data/wasm-publications.generated.ts (source-build links)
src/lib/metadata.ts (document and social metadata)
tools/sync_project_features.py (project-state snapshot generator and stale check)
tools/sync_wasm_publications.py (browser-release metadata generator and stale check)
tools/import_wasm_release.py (reviewed browser artifact import into public/<slug>/)
public/<slug>/ (asset-free WebAssembly site copied into the deployment bundle)
.github/workflows/deploy-pages.yml (single GitHub Pages publisher)
```

## Ownership

| Subsystem | Responsibility | Current/target location | Entry point | Deep doc |
| --- | --- | --- | --- | --- |
| Application composition | Vue startup, routes, scroll behavior, and GitHub Pages fallback | `src/main.ts`, `vite.config.ts` | `src/main.ts` | — |
| Page metadata | Document title, description, and social-preview tags | `src/lib/metadata.ts` | `applyPageMetadata` | — |
| Site shell | Global header, navigation, footer, and route outlet | `src/App.vue` | `App.vue` | — |
| Project catalogue | Hero, featured selection, category filters, and public-project index | `src/views/HomeView.vue` | `/` | — |
| Project details | Feature list, stack, source/live links, related work, and route metadata | `src/views/ProjectDetailView.vue` | `/projects/:slug` | — |
| Project summaries | Reusable cards for featured, directory, and related-project lists | `src/components/ProjectCard.vue` | `ProjectCard.vue` | — |
| Portfolio content | Categories, project facts, source/live and published-release links, asset platforms, and featured status | `src/data/projects.ts` | `projects` | — |
| Intended feature state | Parse canonical sibling project-state registries, including comparison baselines, into the committed portable snapshot used by detail pages | `tools/sync_project_features.py`, `src/data/project-features.generated.ts` | `featuresFor`, `comparisonBaselineFor` | `docs/project-state.md` |
| WebAssembly publication | Replace each reviewed asset-free title bundle at its public route, derive detail-page provenance, and publish all routes through the site's one Pages workflow | `tools/import_wasm_release.py`, `tools/sync_wasm_publications.py`, `public/<slug>/`, `src/data/wasm-publications.generated.ts`, `.github/workflows/deploy-pages.yml` | `import_wasm_release.py` | `AGENTS.md` |
| Visual system | Theme tokens, responsive layouts, motion, and component styling | `src/styles.css` | `src/main.ts` | — |
| Social identity | Favicon, social card, and root-page metadata | `public/`, `index.html` | `index.html` | — |

## Where does new work go?

| Responsibility | Owner |
| --- | --- |
| Add or correct a showcased project | `src/data/projects.ts` |
| Add or correct intended feature state | The showcased project's `docs/project-state.md`, then `tools/sync_project_features.py` |
| Publish a WebAssembly package | Source project's verified CI artifact, then `tools/import_wasm_release.py` and `public/<slug>/` |
| Change card presentation | `src/components/ProjectCard.vue` |
| Change root-page discovery or filters | `src/views/HomeView.vue` |
| Change an individual project page | `src/views/ProjectDetailView.vue` |
| Change routes or GitHub Pages fallback | `src/main.ts` and `vite.config.ts` |
| Change global theme or responsive behavior | `src/styles.css` |
| Change site-wide navigation or footer | `src/App.vue` |
