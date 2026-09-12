"""Protect the user-facing baseline from internal registry prose and Markdown syntax."""

import tempfile
import unittest
from pathlib import Path

from tools.sync_project_features import parse_comparison_baseline


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


if __name__ == "__main__":
    unittest.main()
