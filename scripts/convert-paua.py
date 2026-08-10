from PIL import Image, ImageEnhance, ImageOps
import pillow_heif, os
pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
PROCES = "public/images/proces/paua"
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
    # macOS bewaart duplicaten soms met spatie ("IMG_1503 2") i.p.v. underscore
    candidates = [name, name + " 2", name.replace("_2", " 2").replace("_3", " 3")]
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
    # galerij
    ("IMG_1503", os.path.join(PORTFOLIO, "paua.jpg")),      # hoofdfoto: hangend, zonlicht
    ("IMG_8592", os.path.join(PORTFOLIO, "paua-2.jpg")),    # hangend, wijder, blauwe lucht
    ("IMG_1396", os.path.join(PORTFOLIO, "paua-3.jpg")),    # geheel, bovenaanzicht kleurenspel
    ("IMG_1395", os.path.join(PORTFOLIO, "paua-4.jpg")),    # geribde zijde met kleurenspel
    ("IMG_1502", os.path.join(PORTFOLIO, "paua-5.jpg")),    # de echte paua in de hand
    # maakproces
    ("IMG_1502", os.path.join(PROCES, "stap-1.jpg")),       # de inspiratie
    ("IMG_1190", os.path.join(PROCES, "stap-2.jpg")),       # losse RVS-banden, contour
    ("IMG_1309", os.path.join(PROCES, "stap-3.jpg")),       # panelen aan elkaar gehecht
    ("IMG_1361", os.path.join(PROCES, "stap-4.jpg")),       # geribde zijde + ademgaten
    ("IMG_1394", os.path.join(PROCES, "stap-5.jpg")),       # aanloopkleuren gebrand
]

for name, out in jobs:
    convert(find_src(name), out)
