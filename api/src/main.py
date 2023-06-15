from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware


from .schemas import SimpleQuery
from .utils import clean_text, ElasticsearchIndexer

import os, re
from dotenv import load_dotenv
import textract
import unicodedata as ud


app = FastAPI()

ENV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
load_dotenv(ENV_PATH)

origins = [
    "http://localhosts",
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
    "http://192.168.16.5",
    "http://192.168.16.5:5173",
]


# add allowed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/api/")
async def hello_world():
    return {"message": "welcome to plagiarism detection in scientific writings"}


@app.post("/api/most_similar/")
async def most_similar(query: SimpleQuery):
    content = query.content

    index_name = "pnst"  # Update with your index name
    index = ElasticsearchIndexer(index_name)

    res = index.search_abstracts(content)
    print("sfsqfsfqsfqsfqsfqsfqsfqsfqsdf", res)
    response = [
        {
            "rate": doc["_score"],
            "title": doc["_source"]["title"],
            "url": doc["_source"]["url"],
        }
        for doc in res
    ]

    # res = query_index.search(cleaned_text, k)

    # results = (
    #     db.session.query(docs_models.Document)
    #     .filter(docs_models.Document.repo_id.in_([r["id"] for r in res]))
    #     .all()
    # )

    # response = [
    #     {"title": doc.title, "rate": rate, "url": doc.url, "authors": doc.authors}
    #     for doc, rate in zip(results, [r["rate"] for r in res])
    # ]

    return {"response": response}


@app.post("/api/most_similar_file/")
async def most_similar_file(file: UploadFile = File(...), k: int = 5):
    content = file

    if content.filename.endswith(".txt"):
        contents = await content.read()
        text = contents.decode("utf-8")
        cleaned_text = clean_text(text)

    else:
        contents = await content.read()
        if content.filename.endswith(".pdf"):
            text = textract.process(contents).decode("utf-8")
        elif content.filename.endswith(".docx"):
            text = textract.process(contents, method="python-docx").decode("utf-8")

        text = ud.normelize("NFKD", text)
        cleaned_text = clean_text(text)

    res = query_index.search(cleaned_text, k)

    results = (
        db.session.query(docs_models.Document)
        .filter(docs_models.Document.repo_id.in_([r["id"] for r in res]))
        .all()
    )

    response = [
        {
            "title": re.sub(r"\[.*", "", doc.title),
            "rate": rate,
            "url": doc.url,
            "authors": doc.authors,
            "lang": ld.detect(doc.title),
        }
        for doc, rate in zip(results, [r["rate"] for r in res])
    ]

    return {"response": response}
