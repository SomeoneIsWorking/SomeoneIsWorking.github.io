# Project state

## Current focus

Centralize existing WebAssembly deployments and release-info updates under this repository.

## Capability inventory

| ID | Capability or outcome | State | Factual dependency | Goals |
| --- | --- | --- | --- | --- |
| S001 | Visitors can discover, filter, and open data-driven project detail pages | verified | — | G001 |
| S002 | Every project detail lists granular intended capabilities with verified, partial, blocked, or missing state and names its comparison baseline | verified | S001 | G001 |
| S003 | Portfolio facts are traceable to each project's canonical goals and state documents | verified | S002 | G001 |
| S004 | Responsive project pages expose source links, technology context, and representative media | verified | S001 | G001 |
| S005 | WebAssembly releases and their project details are published through this single Pages site | partial | The X-Men 2 and LF2 bundles are imported locally; the central deployment and retirement of their source-repository Pages jobs remain to verify. Benefactor's in-flight release still has a direct deploy job. | G002 |

## Capability details

### S001 — Project discovery

Evidence: the Vue routes, category filters, cards, and data registry build and serve the catalogue and
detail pages from one source of truth.

### S002 — Stateful intended features

Evidence: each detail page renders every generated capability with its stable source ID, canonical
`verified`, `partial`, `blocked`, or `missing` label, a text-and-colour state key, and a direct link to
the project's state authority. Each project state names a comparison baseline and the detail page
places it above the list so user-visible differences are understandable without source inspection.

### S003 — Project-source traceability

Evidence: `tools/sync_project_features.py` reads every mapped `docs/project-state.md` authority,
refuses missing or malformed inventories and missing or empty comparison-baseline sections,
generates the committed TypeScript snapshot, and reports the project/feature denominator in
`--check` mode so a stale or empty result cannot look current.

### S004 — Project context and media

Evidence: detail routes expose source/live actions, technology lists, responsive screenshots, captions,
metadata, and related-project navigation.

### S005 — Central WebAssembly releases

Evidence: `tools/import_wasm_release.py` validates and replaces complete asset-free routes, records the
source CI provenance in each route's `publication.json`, and has accepted the latest successful X-Men 2
and LF2 browser artifacts. The site build includes both bundles; the hosted routes and source workflow
migration still need verification. Benefactor's existing route is hosted here, but its active source
release workflow still has a separate Pages job.
