from PIL import Image, ImageEnhance, ImageOps
import pillow_heif, os
pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
OUT = "public/images/proces/ridderspoor"
os.makedirs(OUT, exist_ok=True)

# display-volgorde 01..08 (begin -> eind)
order = [
    "IMG_9568",                                   # 01 schijfjes gesneden
    "4EA38C3F-BF21-4B39-A6EA-096DFFB09486",       # 02 vormen met plaatschaar (JPG!)
    "IMG_8949",                                   # 03 gevouwen bloempjes
    "IMG_8955",                                   # 04 eerste bloempjes op de steel
    "IMG_9572",                                   # 05 de volle tros
    "IMG_9592",                                   # 06 bladeren aftekenen/snijden
    "IMG_9596",                                   # 07 bladeren met nerven
    "IMG_9613",                                   # 08 alles samen, koper nog blank
]

def enhance(im):
    im = ImageEnhance.Contrast(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.20)
    im = ImageEnhance.Sharpness(im).enhance(1.30)
    return im

def find_src(name):
    for ext in (".HEIC", ".heic", ".HEIF", ".heif", ".JPG", ".jpg", ".jpeg"):
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
    out = os.path.join(OUT, f"ridderspoor-{i:02d}.jpg")
    im.save(out, "JPEG", quality=85, optimize=True)
    print("saved", out)
