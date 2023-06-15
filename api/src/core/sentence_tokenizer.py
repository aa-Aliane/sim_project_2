import os, re, unicodedata as ud, json
from tqdm import tqdm
from collections import defaultdict

sep = ".!؟؛;!?:"

BASE_DIR = os.path.dirname(__file__)

names = os.listdir(os.path.join(BASE_DIR, "extracted"))

extanded = defaultdict(list)

for name in tqdm(names):
    with open(f"{BASE_DIR}/extracted/{name}", "r", encoding="utf8") as f:
        text = ud.normalize("NFKD", f.read())
        pieces = re.split(rf"[sep]", text)
        extanded[name[3:-4]] = [piece for piece in pieces if 70 < len(piece) <= 128]

with open("extanded.json", "w", encoding="utf8") as f:
    json.dump(extanded, f)
