from elasticsearch import Elasticsearch
import json
import os
from tqdm import tqdm


class ElasticsearchIndexer:
    def __init__(self, index_name, elasticsearch_url="http://elasticsearch:9200/"):
        self.index_name = index_name
        self.elasticsearch_url = elasticsearch_url

        self.es = Elasticsearch([elasticsearch_url])

        if self.es.indices.exists(index=self.index_name):
            # Delete the index
            self.es.indices.delete(index=self.index_name)
            print(f"Index '{self.index_name}' has been deleted.")
        else:
            print(f"Index '{self.index_name}' does not exist.")

    def index_abstracts(self, file_path):
        abs_file_path = os.path.abspath(os.path.join(os.getcwd(), file_path))
        if not os.path.exists(abs_file_path):
            print(f"JSON file '{file_path}' not found.")
            return

        with open(abs_file_path, "r") as file:
            data = json.load(file)

        for item in tqdm(data):
            item = item["data"]

            if "Résumé" in item.keys():
                abstract = item["Résumé"]
                title = item["Titre"]
                url = item["url"]

                headers = {"Content-Type": "application/json"}
                self.es.options(headers=headers).index(
                    index=index_name,
                    id=id,
                    document={"abstract": abstract},
                )

            


if __name__ == "__main__":
    index_name = "pnst"
    json_file_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "data/pnst_metadata.json"
    )

    indexer = ElasticsearchIndexer(index_name)
    indexer.index_abstracts(json_file_path)
