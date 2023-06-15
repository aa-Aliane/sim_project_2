import re
from langdetect import detect
from elasticsearch import Elasticsearch
import json
import os
from tqdm import tqdm


def clean_text(text):
    lang = detect(text)

    # Remove non-alphabetic characters and convert to lowercase
    if lang == "ar":
        cleaned_text = re.sub("[^؀-ۿ]+", " ", text)
        cleaned_text = re.sub("\s+", " ", cleaned_text)
        cleaned_text = cleaned_text.strip()
    elif lang == "fr":
        cleaned_text = re.sub("[^a-zA-ZàâçéèêëîïôûùüÿñæœÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ]+", " ", text)
        cleaned_text = re.sub("\s+", " ", cleaned_text)
        cleaned_text = cleaned_text.strip().lower()
    else:  # default to English
        cleaned_text = re.sub("[^a-zA-Z]+", " ", text)
        cleaned_text = re.sub("\s+", " ", cleaned_text)
        cleaned_text = cleaned_text.strip().lower()
    return cleaned_text


class ElasticsearchIndexer:
    def __init__(self, index_name, elasticsearch_url="http://elasticsearch:9200/"):
        self.index_name = index_name
        self.elasticsearch_url = elasticsearch_url
        self.es = Elasticsearch([elasticsearch_url])

    def search_abstracts(self, query):
        response = self.es.search(
            index=self.index_name,
            query={"match": {"abstract": query}},
        )

        hits = response["hits"]["hits"]

        print(response)
        
        if hits:
            return hits
        else:
            print("No matching articles found.")



    def index_abstracts(self, file_path):
        abs_file_path = os.path.abspath(os.path.join(os.getcwd(), file_path))
        if not os.path.exists(abs_file_path):
            print(f"JSON file '{file_path}' not found.")
            return

        with open(abs_file_path, "r") as file:
            data = json.load(file)

        for item in tqdm(data):
            item = item["data"]

            try:
                abstract = item["Résumé"]
                title = item["Titre"]
                url = item["url"]

                headers = {"Content-Type": "application/json"}
                self.es.options(headers=headers).index(
                    index=index_name,
                    id=id,
                    document={"title": title, url: url, "abstract": abstract},
                )

            except:
                pass
