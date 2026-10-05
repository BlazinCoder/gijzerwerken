from PIL import Image, ImageEnhance, ImageOps, ImageStat
import pillow_heif, glob, os, re, sys
pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
PROCES = "public/images/proces/blauwe-waterlelies"
PORTFOLIO = "public/images/portfolio"
os.makedirs(PROCES, exist_ok=True)
os.makedirs(PORTFOLIO, exist_ok=True)


def enhance(im):
    # galerij: volle-resolutie HEIC, zelfde instellingen als paua/tulp
    im = ImageEnhance.Contrast(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.20)
    im = ImageEnhance.Sharpness(im).enhance(1.30)
    return im


def enhance_screenshot(im):
    # maakproces: gecomprimeerde stills — mild, sterke sharpening versterkt artefacten
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Brightness(im).enhance(1.03)
    im = ImageEnhance.Color(im).enhance(1.10)
    im = ImageEnhance.Sharpness(im).enhance(1.10)
    return im


def find_src(name):
    # case-insensitive, ook macOS-duplicaten met spatie + volgnummer ("IMG_2174 2.PNG")
    num = name.split("_", 1)[1]
    pat = re.compile(rf"^img[_ ]{num}( \d+)?\.(heic|heif|jpe?g|png)$", re.IGNORECASE)
    hits = sorted(p for p in glob.glob(os.path.join(SRC, "*")) if pat.match(os.path.basename(p)))
    if not hits:
        raise FileNotFoundError(f"Niet gevonden in Downloads: {name}")
    # voorkeur voor het origineel zonder volgnummer
    hits.sort(key=lambda p: (" " in os.path.basename(p)[4:], p))
    return hits[0]


def assert_no_black_edge(im, path):
    # geen rij of kolom aan de rand met gemiddelde luminantie < 12 (= zwarte balk)
    g = im.convert("L")
    w, h = g.size
    edges = {
        "boven": (0, 0, w, 1),
        "onder": (0, h - 1, w, h),
        "links": (0, 0, 1, h),
        "rechts": (w - 1, 0, w, h),
    }
    for side, box in edges.items():
        mean = ImageStat.Stat(g.crop(box)).mean[0]
        if mean < 12:
            sys.exit(f"STOP: {path} heeft een zwarte rand {side} (luminantie {mean:.1f})")


def save(im, out_path, quality, expected):
    assert im.size == expected, f"{out_path}: {im.size} != {expected}"
    assert_no_black_edge(im, out_path)
    im.save(out_path, "JPEG", quality=quality, optimize=True)
    print("saved", out_path, im.size)


def gallery(name, box, out_path, size=None):
    im = Image.open(find_src(name))
    im = ImageOps.exif_transpose(im).convert("RGB")
    assert im.size == (3024, 4032), f"{name}: onverwachte bronmaat {im.size}"
    im = im.crop(box)
    if size:
        im = im.resize(size, Image.LANCZOS)
    im = enhance(im)
    save(im, out_path, 85, size or (box[2] - box[0], box[3] - box[1]))


def step(name, box, out_path):
    im = Image.open(find_src(name))
    im = ImageOps.exif_transpose(im).convert("RGB")
    assert im.size[0] == 1125, f"{name}: onverwachte bronbreedte {im.size}"
    im = enhance_screenshot(im.crop(box))  # geen resize/upscale
    save(im, out_path, 88, (1125, 1406))


# galerij (bron: HEIC 3024x4032)
gallery("IMG_2132", (0, 850, 3024, 3118), os.path.join(PORTFOLIO, "blauwe-waterlelies.jpg"), (1600, 1200))  # hoofdfoto 4:3
gallery("IMG_2132", (380, 1340, 1680, 2640), os.path.join(PORTFOLIO, "blauwe-waterlelies-2.jpg"))             # detail messing hart 1:1

# maakproces (bron: iPhone-screenshots 1125 breed, crops 1125x1406 = 4:5)
steps = [
    ("IMG_2174", (0, 250, 1125, 1656)),   # boiler opengeslepen
    ("IMG_2170", (0, 330, 1125, 1736)),   # koperen ketel onder het omhulsel
    ("IMG_2176", (0, 218, 1125, 1624)),   # door de wals
    ("IMG_2178", (0, 300, 1125, 1706)),   # afgetekend en uitgeknipt
    ("IMG_2179", (0, 70, 1125, 1476)),    # golving met de hamer
    ("IMG_2182", (0, 380, 1125, 1786)),   # blad met inkeping + RVS-lagen
    ("IMG_2183", (0, 510, 1125, 1916)),   # eerste lelie op haar blad
]
for i, (name, box) in enumerate(steps, 1):
    step(name, box, os.path.join(PROCES, f"stap-{i}.jpg"))
