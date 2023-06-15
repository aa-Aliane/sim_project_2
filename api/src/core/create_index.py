import faiss, json
import numpy as np
from sentence_transformers import SentenceTransformer
import unicodedata as ud

model = SentenceTransformer(
    "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
)


with open("data/enhanced.pnst_meta.json", "r", encoding="utf8") as f:
    pnst = json.load(f)

print("1 - collecting documents from json")
docs = [ud.normalize("NFKD", doc.get("Résumé")) for doc in pnst]
print("2 - creating index to ids dictionary")
index_to_ids = {i: doc.get("id") for i, doc in enumerate(pnst)}

with open("index_to_ids.json", "w", encoding="utf8") as f:
    json.dump(index_to_ids, f)


index = faiss.IndexIDMap(faiss.IndexFlatIP(768))

print("3 - vectorizing documents")
encoded_data = model.encode(docs)
print("4 - creating index")
encoded_data = np.asarray(encoded_data.astype("float32"))
index.add_with_ids(encoded_data, np.array(range(0, len(docs))))


print("5 - writing index")
faiss.write_index(index, "pnst.index")
