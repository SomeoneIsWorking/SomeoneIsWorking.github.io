# Pages repository ownership

This repository is the single deployment owner for the portfolio and every project WebAssembly site.
Projects build and verify asset-free browser packages in their own repositories; their CI uploads a
normal artifact. This repository imports the reviewed package under `public/<project-slug>/`, and its
`main` deployment workflow publishes that route. Source projects do not deploy separate Pages sites.

For a project release, update its canonical `docs/project-state.md` first. Then, in this repository:

1. Add or refresh its facts, source/live links, published release tag and actual platform assets,
   and release-relevant media in `src/data/projects.ts`. List only downloadable, verified assets.
2. Run `python3 tools/sync_project_features.py` from a workspace with the sibling project checkouts;
   commit the generated `src/data/project-features.generated.ts`. Add a new project to
   `PROJECT_PATHS` when its first release makes it part of the catalogue.
3. For a WASM release, inspect the source artifact's file list and provenance, confirm the producer's
   asset-free gate, then import it with the source repository, full commit SHA, and successful CI run ID:

   ```sh
   python3 tools/import_wasm_release.py --slug PROJECT --artifact ARTIFACT \
     --source-repo OWNER/REPO --source-sha COMMIT_SHA --run-id RUN_ID
   ```

   The importer replaces the complete route, including old files, and writes `publication.json` so
   deployment ownership and source provenance can be checked at the live URL. It also regenerates
   `src/data/wasm-publications.generated.ts`, which updates the source-build link on the project
   detail page. It refuses unsafe paths and obvious game-file candidates. It does not prove the bytes
   are licensed; review the producer's package manifest before importing.
4. Run `python3 -m unittest discover -s tests`, `python3 tools/sync_wasm_publications.py --check`,
   `npm run lint`, and `npm run build`. Check the generated feature snapshot with
   `python3 tools/sync_project_features.py --check` when sibling repositories are available. Commit
   and push `main`, wait for `.github/workflows/deploy-pages.yml`, and verify the project detail page
   and live route. A major source release that has no browser package still refreshes steps 1 and 2.

Do not change a capability to `verified` because a bundle exists. The source project's state and
evidence own that claim. Never commit game files, saves, or translation caches here.
