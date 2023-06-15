from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
import os
from .docs import models as docs_models
from tqdm import tqdm

from dotenv import load_dotenv

app = FastAPI()

BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
load_dotenv(BASE_DIR)

app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])


META_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
import json

with open(os.path.join(META_DIR, "enhanced.pnst_meta.json"), "r", encoding="utf8") as f:
    meta = json.load(f)

# ids = []
# enhanced = []

# for doc in tqdm(meta):
#     id_ = doc.get("id")
#     if not id_ in ids:
#         enhanced.append({**{"id": id_, "source": doc.get("source")}, **doc.get("data")})
#         ids.append(id_)

# with open(os.path.join(META_DIR, "enhanced.pnst_meta.json"), "w", encoding="utf8") as f:
#     json.dump(enhanced, f)


@app.get("/cerate_docs/")
async def home():
    docs_to_add = []
    for doc in tqdm(meta):
        if doc.get("Titre"):
            db_doc = docs_models.Document()
            db_doc.repo_id = doc.get("id")
            db_doc.source = doc.get("source")

            db_doc.title = doc.get("Titre")
            db_doc.type = doc.get("Type de document")
            db_doc.lang = doc.get("Langue")
            db_doc.abstract = doc.get("Résumé")

            if "Theme" in doc.keys():
                db_doc.domain = doc.get("Theme")
            if "url" in doc.keys():
                db_doc.url = doc.get("url")
                
            docs_to_add.append(db_doc)
    db.session.bulk_save_objects(docs_to_add)
    db.session.commit()

    return {"message": "docs created"}
