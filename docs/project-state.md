# Project state

## Current focus

None. The intended-feature state presentation and source synchronization are verified.

## Capability inventory

| ID | Capability or outcome | State | Factual dependency | Goals |
| --- | --- | --- | --- | --- |
| S001 | Visitors can discover, filter, and open data-driven project detail pages | verified | — | G001 |
| S002 | Every project detail lists granular intended capabilities with verified, partial, blocked, or missing state and names the comparison baseline when one exists | verified | S001 | G001 |
| S003 | Portfolio facts are traceable to each project's canonical goals and state documents | verified | S002 | G001 |
| S004 | Responsive project pages expose source links, technology context, and representative media | verified | S001 | G001 |

## Capability details

### S001 — Project discovery

Evidence: the Vue routes, category filters, cards, and data registry build and serve the catalogue and
detail pages from one source of truth.

### S002 — Stateful intended features

Evidence: each detail page renders every generated capability with its stable source ID, canonical
`verified`, `partial`, `blocked`, or `missing` label, a text-and-colour state key, and a direct link to
the project's state authority. When a project state names a comparison baseline, the detail page
places it above the list so user-visible differences are understandable without source inspection.

### S003 — Project-source traceability

Evidence: `tools/sync_project_features.py` reads all 20 mapped `docs/project-state.md` authorities,
refuses missing or malformed inventories and empty comparison-baseline sections, generates the
committed TypeScript snapshot, and reports the project/feature denominator in `--check` mode so a
stale or empty result cannot look current.

### S004 — Project context and media

Evidence: detail routes expose source/live actions, technology lists, responsive screenshots, captions,
metadata, and related-project navigation.
