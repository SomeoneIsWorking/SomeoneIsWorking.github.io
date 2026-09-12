#!/usr/bin/env python3
"""Install a reviewed, asset-free WASM release under this site's project route."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import tarfile
from pathlib import Path, PurePosixPath

if __package__:
    from .sync_wasm_publications import output_path, render as render_publications
else:
    from sync_wasm_publications import output_path, render as render_publications


ROOT = Path(__file__).resolve().parents[1]
MAX_FILES = 512
MAX_BYTES = 256 * 1024 * 1024
RESTRICTED_SUFFIXES = {".iso", ".cue", ".chd", ".rom", ".xex", ".exe", ".dll", ".zip", ".7z", ".rar"}


def member_path(name: str) -> Path:
    if name.startswith("/") or "\\" in name:
        raise ValueError(f"unsafe artifact path: {name}")
    parts = [part for part in PurePosixPath(name).parts if part != "."]
    if not parts or ".." in parts:
        raise ValueError(f"unsafe artifact path: {name}")
    return Path(*parts)


def inspect_artifact(source: Path) -> list[tuple[Path, int]]:
    entries: list[tuple[Path, int]] = []
    seen: set[Path] = set()
    total = 0

    if source.is_dir():
        candidates = ((path.relative_to(source).as_posix(), path) for path in source.rglob("*"))
        for name, path in candidates:
            relative = member_path(name)
            if path.is_symlink():
                raise ValueError(f"artifact symlink is forbidden: {relative}")
            if path.is_dir():
                continue
            if not path.is_file():
                raise ValueError(f"artifact entry is not a regular file: {relative}")
            size = path.stat().st_size
            if relative in seen:
                raise ValueError(f"duplicate artifact path: {relative}")
            seen.add(relative)
            entries.append((relative, size))
            total += size
    else:
        with tarfile.open(source, "r:*") as archive:
            for member in archive:
                if member.name in (".", "./") and member.isdir():
                    continue
                relative = member_path(member.name)
                if member.isdir():
                    continue
                if not member.isfile():
                    raise ValueError(f"artifact entry is not a regular file: {relative}")
                if relative in seen:
                    raise ValueError(f"duplicate artifact path: {relative}")
                seen.add(relative)
                entries.append((relative, member.size))
                total += member.size

    if len(entries) > MAX_FILES or total > MAX_BYTES:
        raise ValueError(f"artifact exceeds budget: {len(entries)} files, {total} bytes")
    names = {relative for relative, _ in entries}
    if Path("index.html") not in names or not any(path.suffix == ".wasm" for path in names):
        raise ValueError("artifact needs index.html and a WASM module")
    if Path("publication.json") in names:
        raise ValueError("artifact may not supply Pages publication metadata")
    restricted = [str(path) for path in names if path.suffix.lower() in RESTRICTED_SUFFIXES]
    if restricted:
        raise ValueError(f"artifact contains restricted-input candidates: {', '.join(sorted(restricted))}")
    return entries


def populate_stage(source: Path, stage: Path, entries: list[tuple[Path, int]]) -> None:
    if stage.exists():
        shutil.rmtree(stage)
    stage.mkdir(parents=True)
    if source.is_dir():
        for relative, _size in entries:
            target = stage / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source / relative, target)
        return

    with tarfile.open(source, "r:*") as archive:
        for member in archive:
            if not member.isfile():
                continue
            relative = member_path(member.name)
            target = stage / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            stream = archive.extractfile(member)
            if stream is None:
                raise ValueError(f"cannot read artifact member: {relative}")
            with stream, target.open("wb") as output:
                remaining = member.size
                while remaining:
                    chunk = stream.read(min(1024 * 1024, remaining))
                    if not chunk:
                        raise ValueError(f"truncated artifact member: {relative}")
                    output.write(chunk)
                    remaining -= len(chunk)


def import_release(
    source: Path, slug: str, source_repo: str, source_sha: str, run_id: int, root: Path = ROOT
) -> int:
    if not slug or any(character not in "abcdefghijklmnopqrstuvwxyz0123456789-" for character in slug):
        raise ValueError(f"invalid project slug: {slug!r}")
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", source_repo):
        raise ValueError(f"invalid source repository: {source_repo!r}")
    if not re.fullmatch(r"[0-9a-f]{40}", source_sha) or run_id <= 0:
        raise ValueError("source SHA must be a full lowercase commit ID and run ID must be positive")
    source = source.resolve(strict=True)
    public = root / "public" / slug
    work = root / "build" / "wasm-import"
    stage = work / "stage" / slug
    previous = work / "previous" / slug
    if any(source == path or source.is_relative_to(path) for path in (public, stage, previous)):
        raise ValueError("artifact source overlaps the destination or staging path")
    entries = inspect_artifact(source)
    publication = {
        "publisher": "pages",
        "sourceRepository": source_repo,
        "sourceCommit": source_sha,
        "sourceRunId": run_id,
    }
    summary = render_publications(root, (slug, publication))
    populate_stage(source, stage, entries)
    (stage / "publication.json").write_text(
        json.dumps(publication, indent=2) + "\n",
        encoding="utf-8",
    )
    summary_stage = work / "wasm-publications.generated.ts"
    summary_stage.write_text(summary, encoding="utf-8")
    if previous.exists():
        shutil.rmtree(previous)
    previous.parent.mkdir(parents=True, exist_ok=True)
    if public.exists():
        public.rename(previous)
    try:
        stage.rename(public)
        summary_target = output_path(root)
        summary_target.parent.mkdir(parents=True, exist_ok=True)
        summary_stage.replace(summary_target)
    except OSError:
        if public.exists():
            shutil.rmtree(public)
        if previous.exists():
            previous.rename(public)
        raise
    if previous.exists():
        shutil.rmtree(previous)
    return len(entries)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="portfolio project slug and public route")
    parser.add_argument("--artifact", required=True, type=Path, help="reviewed directory or Pages artifact tar")
    parser.add_argument("--source-repo", required=True, help="GitHub owner/repository that built the artifact")
    parser.add_argument("--source-sha", required=True, help="full commit ID of the source build")
    parser.add_argument("--run-id", required=True, type=int, help="successful source CI run ID")
    args = parser.parse_args()
    try:
        count = import_release(args.artifact, args.slug, args.source_repo, args.source_sha, args.run_id)
    except (FileNotFoundError, OSError, ValueError, tarfile.TarError) as error:
        parser.exit(2, f"wasm import refused: {error}\n")
    print(f"wasm import: installed {count} files at public/{args.slug}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
