"""Protect the user-facing baseline from internal registry prose and Markdown syntax."""

import tempfile
import unittest
from pathlib import Path

from tools.sync_project_features import Feature, parse_comparison_baseline, parse_table


class ComparisonBaselineTest(unittest.TestCase):
    def test_uses_plain_first_paragraph(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "project-state.md"
            path.write_text(
                "# Project state\n\n## Comparison baseline\n\n"
                "The original *game* runs through [`Dolphin`](https://example.test).\n"
                "The port adds native controls.\n\n"
                "This inventory tracks internal evidence and issues.\n\n"
                "## Current focus\n\nSomething else.\n",
                encoding="utf-8",
            )
            self.assertEqual(
                parse_comparison_baseline(path),
                "The original game runs through Dolphin. The port adds native controls.",
            )


class StateTableTest(unittest.TestCase):
    def test_reads_numbered_and_named_ids_but_not_the_header(self) -> None:
        text = (
            "| ID | Capability | State | Evidence |\n|---|---|---|---|\n"
            "| S1 | Boots | verified | ran |\n"
            "| ST-APPIMAGE | Linux package | partial | built |\n"
        )
        self.assertEqual(
            parse_table(text),
            [Feature("S1", "Boots", "verified"), Feature("ST-APPIMAGE", "Linux package", "partial")],
        )

    def test_reads_the_state_word_that_starts_the_cell_and_skips_unreadable_rows(self) -> None:
        text = (
            "| S1 | Boots | partial — menus only |\n"
            "| S2 | Saves | unknown | x | y | z |\n"
            "| S3 | Links | `missing` | — | G1 |\n"
        )
        self.assertEqual(
            parse_table(text),
            [Feature("S1", "Boots", "partial"), Feature("S3", "Links", "missing")],
        )


class LooseBaselineTest(unittest.TestCase):
    def baseline(self, text: str) -> str:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "project-state.md"
            path.write_text(text, encoding="utf-8")
            return parse_comparison_baseline(path)

    def test_reads_a_bold_inline_paragraph(self) -> None:
        self.assertEqual(
            self.baseline("# State\n\n**Comparison baseline:** the original\ngame.\n\nNext.\n"),
            "the original game.",
        )

    def test_missing_baseline_is_empty(self) -> None:
        self.assertEqual(self.baseline("# State\n\n| S1 | Boots | verified |\n"), "")


if __name__ == "__main__":
    unittest.main()
