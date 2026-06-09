from PIL import Image, ImageEnhance, ImageOps
import pillow_heif, os, sys
pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
PROCES = "public/images/proces/klaproos"
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
    # macOS bewaart duplicaten soms met spatie ("IMG_0034 2") i.p.v. underscore
    candidates = [name, name.replace("_2", " 2").replace("_3", " 3")]
    for base in candidates:
        for ext in (".HEIC", ".heic", ".HEIF", ".heif", ".JPG", ".jpg", ".jpeg", ".PNG", ".png"):
            p = os.path.join(SRC, base + ext)
            if os.path.exists(p):
                return p
    raise FileNotFoundError(f"Niet gevonden in Downloads: {name}")


def convert(src_path, out_path):
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    longest = max(w, h)
    if longest > 1600:  # langste zijde -> 1600px
        s = 1600 / longest
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im = enhance(im)
    im.save(out_path, "JPEG", quality=85, optimize=True)
    print("saved", out_path, im.size)


jobs = [
    ("IMG_0034_2", os.path.join(PROCES, "klaproos-01.jpg")),
    ("IMG_0114_2", os.path.join(PROCES, "klaproos-02.jpg")),
    ("IMG_0114_2", os.path.join(PORTFOLIO, "klaproos.jpg")),
    ("IMG_0034_2", os.path.join(PORTFOLIO, "klaproos-3.jpg")),
]

if len(sys.argv) > 2 and sys.argv[1] == "still":
    # video-still: raw frame is al door ffmpeg geëxtraheerd (pad als argv[2])
    convert(sys.argv[2], os.path.join(PORTFOLIO, "klaproos-2.jpg"))
else:
    for name, out in jobs:
        convert(find_src(name), out)
