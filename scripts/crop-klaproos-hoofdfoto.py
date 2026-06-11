from PIL import Image, ImageEnhance, ImageOps
import pillow_heif, os

pillow_heif.register_heif_opener()

SRC = os.path.expanduser("~/Downloads")
PORTFOLIO = "public/images/portfolio"

# Crop-fracties van het origineel (na exif_transpose): bloem groot, licht-links-van-midden.
CROP_L, CROP_T, CROP_W, CROP_H = 0.16, 0.24, 0.48, 0.48


def enhance(im):
    im = ImageEnhance.Contrast(im).enhance(1.15)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.20)
    im = ImageEnhance.Sharpness(im).enhance(1.30)
    return im


def find_src(name):
    candidates = [name, name.replace("_2", " 2").replace("_3", " 3")]
    for base in candidates:
        for ext in (".HEIC", ".heic", ".HEIF", ".heif", ".JPG", ".jpg", ".jpeg", ".PNG", ".png"):
            p = os.path.join(SRC, base + ext)
            if os.path.exists(p):
                return p
    raise FileNotFoundError(f"Niet gevonden in Downloads: {name}")


src = find_src("IMG_0114")
im = Image.open(src)
im = ImageOps.exif_transpose(im).convert("RGB")
w, h = im.size

left = round(w * CROP_L)
top = round(h * CROP_T)
right = left + round(w * CROP_W)
bottom = top + round(h * CROP_H)
im = im.crop((left, top, right, bottom))

w, h = im.size
longest = max(w, h)
if longest > 1600:
    s = 1600 / longest
    im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)

im = enhance(im)
out = os.path.join(PORTFOLIO, "klaproos.jpg")
im.save(out, "JPEG", quality=85, optimize=True)
print("saved", out, im.size)
