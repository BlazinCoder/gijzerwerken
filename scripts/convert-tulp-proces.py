from PIL import Image, ImageEnhance, ImageOps
import pillow_heif, os
pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
OUT = "public/images/proces/tulp"
os.makedirs(OUT, exist_ok=True)

# display-volgorde 01..12 (begin -> eind)
order = [
    "IMG_8568",  # 01 startmateriaal
    "IMG_8569",  # 02 aftekenen & snijden
    "IMG_8591",  # 03 blaadjes uitgesneden
    "IMG_8623",  # 04 blaadjes gevormd
    "IMG_8707",  # 05 stelen op maat
    "IMG_8730",  # 06 stelen buigen
    "IMG_8775",  # 07 bladeren
    "IMG_8632",  # 08 lassen / samenstellen
    "IMG_8651",  # 09 eerste bloem
    "IMG_8714",  # 10 boeket vormt zich
    "IMG_8807",  # 11 afwerken met de borstel
    "IMG_7762",  # 12 eindresultaat
]

def enhance(im):
    im = ImageEnhance.Contrast(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.20)
    im = ImageEnhance.Sharpness(im).enhance(1.30)
    return im

def find_src(name):
    for ext in (".HEIC", ".heic", ".HEIF", ".heif"):
        p = os.path.join(SRC, name + ext)
        if os.path.exists(p):
            return p
    raise FileNotFoundError(f"Niet gevonden in Downloads: {name}")

for i, name in enumerate(order, start=1):
    p = find_src(name)
    im = Image.open(p)
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    longest = max(w, h)
    if longest > 1600:          # langste zijde -> 1600px
        s = 1600 / longest
        im = im.resize((round(w*s), round(h*s)), Image.LANCZOS)
    im = enhance(im)
    out = os.path.join(OUT, f"tulp-{i:02d}.jpg")
    im.save(out, "JPEG", quality=85, optimize=True)
    print("saved", out)
