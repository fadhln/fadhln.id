#!/usr/bin/env python3
"""Create a tiny PNG data URL for an image placeholder.

The low resolution creates the blur when the placeholder is displayed at full size.
Requires macOS `sips`.
"""

from __future__ import annotations

import argparse
import base64
import shutil
import subprocess
import tempfile
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="Source image")
    parser.add_argument("output", type=Path, help="Output text file for the data URL")
    parser.add_argument("--width", type=int, default=30, help="Placeholder width in pixels")
    args = parser.parse_args()

    if not args.input.is_file():
        parser.error(f"input does not exist: {args.input}")
    if not shutil.which("sips"):
        parser.error("sips is required. Run this script on macOS.")
    if args.width < 1:
        parser.error("--width must be at least 1")
    with tempfile.TemporaryDirectory() as directory:
        resized = Path(directory) / "placeholder.png"
        subprocess.run(
            [
                "sips",
                "--resampleWidth",
                str(args.width),
                "--setProperty",
                "format",
                "png",
                str(args.input),
                "--out",
                str(resized),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
        )

        encoded = base64.b64encode(resized.read_bytes()).decode("ascii")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(f"data:image/png;base64,{encoded}\n", encoding="ascii")
    print(f"Wrote {args.output} ({args.width}px PNG data URL)")


if __name__ == "__main__":
    main()
