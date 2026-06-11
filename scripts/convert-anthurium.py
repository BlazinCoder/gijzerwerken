from PIL import Image, ImageEnhance, ImageOps, ImageChops
import os

SRC = os.path.expanduser("~/Downloads")
PROCES = "public/images/proces/anthurium"
PORTFOLIO = "public/images/portfolio"
os.makedirs(PROCES, exist_ok=True)
os.makedirs(PORTFOLIO, exist_ok=True)


def enhance(im):
    im = ImageEnhance.Contrast(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.20)
    im = ImageEnhance.Sharpness(im).enhance(1.30)
    return im


def find_src(name):
    # WhatsApp/macOS-varianten: underscore, spatie en "(1)".
    candidates = [name, name.replace("_", " "), name.replace("_", " (") + ")"]
    for base in candidates:
        for ext in (".jpg", ".jpeg", ".JPG", ".JPEG", ".png", ".PNG", ".HEIC", ".heic"):
            p = os.path.join(SRC, base + ext)
            if os.path.exists(p):
                return p
    raise FileNotFoundError(f"Niet gevonden in Downloads: {name}")


def trim_black(im, threshold=18, extra=0.02):
    """Verwijder zwarte letterbox-balken (iPhone-screenshots). Detecteer de
    bounding box van niet-zwarte pixels via een helderheidsdrempel, snij daarna
    nog een kleine extra marge weg zodat statusbalk-restjes verdwijnen."""
    gray = im.convert("L")
    # Alles onder de drempel -> zwart (0); rest -> wit. getbbox vindt de witte box.
    mask = gray.point(lambda p: 255 if p > threshold else 0)
    bbox = mask.getbbox()
    if bbox:
        im = im.crop(bbox)
    w, h = im.size
    m = round(h * extra)
    if m > 0 and h - 2 * m > 0:
        im = im.crop((0, m, w, h - m))
    return im


def convert(src_path, out_path, trim=False):
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if trim:
        im = trim_black(im)
    w, h = im.size
    longest = max(w, h)
    if longest > 1600:
        s = 1600 / longest
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im = enhance(im)
    im.save(out_path, "JPEG", quality=85, optimize=True)
    print("saved", out_path, im.size)


jobs = [
    # (bron, output, trim-zwarte-balken)
    ("PHOTO-2026-06-10-00-10-34_3", os.path.join(PORTFOLIO, "anthurium.jpg"), False),
    ("PHOTO-2026-06-10-00-10-34_2", os.path.join(PORTFOLIO, "anthurium-2.jpg"), False),
    ("PHOTO-2026-06-10-00-10-34",   os.path.join(PORTFOLIO, "anthurium-3.jpg"), False),
    ("PHOTO-2026-06-10-00-10-34_4", os.path.join(PROCES, "anthurium-01.jpg"), True),
    ("PHOTO-2026-06-10-00-10-34_5", os.path.join(PROCES, "anthurium-02.jpg"), True),
]

for name, out, trim in jobs:
    convert(find_src(name), out, trim=trim)
