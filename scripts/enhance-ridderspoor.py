#!/usr/bin/env python3
"""Enhance Ridderspoor portfolio photos for web.

Idempotent: stores originals in public/images/portfolio/originals/ on first run,
and restores from there on every subsequent run before re-applying enhancements.
This way you can tweak parameters and re-run without cumulative degradation.
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

try:
    RESAMPLE_LANCZOS = Image.Resampling.LANCZOS
except AttributeError:
    RESAMPLE_LANCZOS = Image.LANCZOS

try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

PORTFOLIO_DIR = Path("public/images/portfolio")
BACKUP_DIR = PORTFOLIO_DIR / "originals"
GLOB_PATTERN = "ridderspoor*.jpg"
MAX_DIMENSION = 2000
JPEG_QUALITY = 90

CONTRAST = 1.15
BRIGHTNESS = 1.05
SATURATION = 1.20
SHARPNESS = 1.30
WARMTH_RED = 1.03
WARMTH_BLUE = 0.97
VIGNETTE_STRENGTH = 0.20
VIGNETTE_START = 0.60
VIGNETTE_GAMMA = 1.5


def apply_warmth(img: Image.Image) -> Image.Image:
    r, g, b = img.split()
    r = r.point(lambda x: min(255, int(round(x * WARMTH_RED))))
    b = b.point(lambda x: int(round(x * WARMTH_BLUE)))
    return Image.merge("RGB", (r, g, b))


def apply_vignette(img: Image.Image) -> Image.Image:
    w, h = img.size
    if HAS_NUMPY:
        ys = np.linspace(-1.0, 1.0, h, dtype=np.float32).reshape(-1, 1)
        xs = np.linspace(-1.0, 1.0, w, dtype=np.float32).reshape(1, -1)
        dist = np.sqrt(xs * xs + ys * ys) / np.sqrt(2.0)
        t = np.clip((dist - VIGNETTE_START) / (1.0 - VIGNETTE_START), 0.0, 1.0)
        factor = 1.0 - VIGNETTE_STRENGTH * (t ** VIGNETTE_GAMMA)
        arr = np.asarray(img, dtype=np.float32)
        arr *= factor[:, :, None]
        arr = np.clip(arr, 0.0, 255.0).astype(np.uint8)
        return Image.fromarray(arr, mode="RGB")

    from PIL import ImageDraw
    mask = Image.new("L", (w, h), 255)
    draw = ImageDraw.Draw(mask)
    cx, cy = w / 2.0, h / 2.0
    max_r = (cx * cx + cy * cy) ** 0.5
    steps = int(max_r)
    for i in range(steps, 0, -1):
        n = i / max_r
        if n <= VIGNETTE_START:
            v = 255
        else:
            t = (n - VIGNETTE_START) / (1.0 - VIGNETTE_START)
            v = int(round(255 * (1.0 - VIGNETTE_STRENGTH * (t ** VIGNETTE_GAMMA))))
        draw.ellipse([cx - i, cy - i, cx + i, cy + i], fill=v)
    black = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(img, black, mask)


def enhance(src: Path, dst: Path) -> None:
    with Image.open(src) as raw:
        img = ImageOps.exif_transpose(raw)
        if img.mode != "RGB":
            img = img.convert("RGB")

        w, h = img.size
        if max(w, h) > MAX_DIMENSION:
            ratio = MAX_DIMENSION / max(w, h)
            img = img.resize((int(w * ratio), int(h * ratio)), RESAMPLE_LANCZOS)

        img = ImageEnhance.Contrast(img).enhance(CONTRAST)
        img = ImageEnhance.Brightness(img).enhance(BRIGHTNESS)
        img = ImageEnhance.Color(img).enhance(SATURATION)
        img = apply_warmth(img)
        img = ImageEnhance.Sharpness(img).enhance(SHARPNESS)
        img = apply_vignette(img)

        img.save(dst, "JPEG", quality=JPEG_QUALITY, optimize=True)


def main() -> int:
    if not PORTFOLIO_DIR.is_dir():
        print(f"ERROR: {PORTFOLIO_DIR} bestaat niet — run vanuit project root", file=sys.stderr)
        return 1

    BACKUP_DIR.mkdir(exist_ok=True)

    targets = sorted(p for p in PORTFOLIO_DIR.glob(GLOB_PATTERN) if p.is_file())
    if not targets:
        print(f"Geen foto's gevonden voor patroon {GLOB_PATTERN}")
        return 1

    print(f"Ridderspoor enhancement — {len(targets)} foto(s)\n")
    print(f"  numpy: {'ja' if HAS_NUMPY else 'nee (fallback drawloop)'}")
    print(f"  params: contrast={CONTRAST} brightness={BRIGHTNESS} "
          f"sat={SATURATION} sharp={SHARPNESS} warmth={WARMTH_RED}/{WARMTH_BLUE} "
          f"vignette={VIGNETTE_STRENGTH}\n")

    for work in targets:
        backup = BACKUP_DIR / work.name

        if backup.exists():
            shutil.copy2(backup, work)
            print(f"- {work.name}: restored from originals/ → re-enhance")
        else:
            shutil.copy2(work, backup)
            print(f"- {work.name}: first run → backed up to originals/")

        enhance(work, work)
        size_kb = work.stat().st_size // 1024
        with Image.open(work) as out:
            dims = out.size
        print(f"  done: {dims[0]}×{dims[1]}, {size_kb} KB\n")

    print(f"Klaar. Originelen in {BACKUP_DIR}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
