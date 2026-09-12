from __future__ import annotations

import io
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from tools.import_wasm_release import import_release
from tools.sync_wasm_publications import render

SOURCE_REPO = "SomeoneIsWorking/example"
SOURCE_SHA = "a" * 40
RUN_ID = 123


class ImportWasmReleaseTest(unittest.TestCase):
    def setUp(self) -> None:
        build = Path(__file__).resolve().parents[1] / "build" / "tests"
        build.mkdir(parents=True, exist_ok=True)
        self.directory = tempfile.TemporaryDirectory(dir=build)
        self.root = Path(self.directory.name)
        (self.root / "public").mkdir()

    def tearDown(self) -> None:
        self.directory.cleanup()

    def make_tar(self, name: str, files: dict[str, bytes]) -> Path:
        artifact = self.root / name
        with tarfile.open(artifact, "w") as archive:
            for path, content in files.items():
                member = tarfile.TarInfo(path)
                member.size = len(content)
                archive.addfile(member, io.BytesIO(content))
        return artifact

    def test_replaces_old_route_and_preserves_hidden_files(self) -> None:
        previous = self.root / "public" / "example"
        previous.mkdir()
        (previous / "stale.js").write_text("stale")
        artifact = self.make_tar(
            "release.tar",
            {"./index.html": b"<html></html>", "./app.wasm": b"\0asm", "./.nojekyll": b""},
        )

        self.assertEqual(import_release(artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root), 3)
        self.assertEqual((previous / "app.wasm").read_bytes(), b"\0asm")
        self.assertTrue((previous / ".nojekyll").is_file())
        self.assertFalse((previous / "stale.js").exists())
        self.assertIn(SOURCE_SHA, (previous / "publication.json").read_text())
        self.assertIn(SOURCE_SHA, (self.root / "src" / "data" / "wasm-publications.generated.ts").read_text())

    def test_rejects_traversal_before_replacing_current_route(self) -> None:
        current = self.root / "public" / "example"
        current.mkdir()
        (current / "index.html").write_text("current")
        artifact = self.make_tar(
            "unsafe.tar",
            {"index.html": b"new", "app.wasm": b"\0asm", "../escape": b"bad"},
        )

        with self.assertRaisesRegex(ValueError, "unsafe artifact path"):
            import_release(artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)
        self.assertEqual((current / "index.html").read_text(), "current")
        self.assertFalse((self.root / "escape").exists())

    def test_rejects_missing_wasm_and_game_inputs(self) -> None:
        missing = self.make_tar("missing.tar", {"index.html": b"<html></html>"})
        with self.assertRaisesRegex(ValueError, "WASM module"):
            import_release(missing, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)
        restricted = self.make_tar(
            "restricted.tar",
            {"index.html": b"<html></html>", "app.wasm": b"\0asm", "game.iso": b"bad"},
        )
        with self.assertRaisesRegex(ValueError, "restricted-input candidates"):
            import_release(restricted, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)

    def test_imports_normal_actions_artifact_directory(self) -> None:
        artifact = self.root / "artifact"
        artifact.mkdir()
        (artifact / "index.html").write_text("<html></html>")
        (artifact / "app.wasm").write_bytes(b"\0asm")

        self.assertEqual(import_release(artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root), 2)
        self.assertEqual((self.root / "public" / "example" / "app.wasm").read_bytes(), b"\0asm")

    def test_reimport_updates_detail_page_source_build(self) -> None:
        artifact = self.make_tar("release.tar", {"index.html": b"<html></html>", "app.wasm": b"\0asm"})
        import_release(artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)
        newer_sha = "b" * 40
        import_release(artifact, "example", SOURCE_REPO, newer_sha, RUN_ID + 1, self.root)

        summary = (self.root / "src" / "data" / "wasm-publications.generated.ts").read_text()
        self.assertIn(newer_sha, summary)
        self.assertNotIn(SOURCE_SHA, summary)
        self.assertEqual(summary, render(self.root))

    def test_bad_publication_elsewhere_refuses_import(self) -> None:
        existing = self.root / "public" / "other"
        existing.mkdir()
        (existing / "publication.json").write_text('{"publisher":"other"}')
        artifact = self.make_tar("release.tar", {"index.html": b"<html></html>", "app.wasm": b"\0asm"})

        with self.assertRaisesRegex(ValueError, "invalid publication fields"):
            import_release(artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)
        self.assertFalse((self.root / "public" / "example").exists())

    def test_summary_write_failure_restores_previous_route(self) -> None:
        old_artifact = self.make_tar("old.tar", {"index.html": b"old", "app.wasm": b"\0asm-old"})
        import_release(old_artifact, "example", SOURCE_REPO, SOURCE_SHA, RUN_ID, self.root)
        new_artifact = self.make_tar("new.tar", {"index.html": b"new", "app.wasm": b"\0asm-new"})

        with patch("tools.import_wasm_release.output_path", return_value=self.root / "public"):
            with self.assertRaises(OSError):
                import_release(new_artifact, "example", SOURCE_REPO, "b" * 40, RUN_ID + 1, self.root)

        route = self.root / "public" / "example"
        self.assertEqual((route / "app.wasm").read_bytes(), b"\0asm-old")
        self.assertIn(SOURCE_SHA, (route / "publication.json").read_text())


if __name__ == "__main__":
    unittest.main()
