from elasticsearch import Elasticsearch


class ElasticsearchTester:
    def __init__(self, index_name, elasticsearch_url="http://elasticsearch:9200"):
        self.index_name = index_name
        self.elasticsearch_url = elasticsearch_url
        self.es = Elasticsearch(hosts=[elasticsearch_url], retry_on_timeout=True)

    def search_abstracts(self, query):
       
        response = self.es.search(
            index=self.index_name,
            query={"match": {"abstract": query}},
        )

        print(response)

        hits = response["hits"]["hits"]

        if hits:
            print(hits)
        else:
            print("No matching articles found.")

        

if __name__ == "__main__":
    index_name = "pnst"  # Update with your index name
    tester = ElasticsearchTester(index_name)
    

    # Test search query
    search_query = "تباين"
    tester.search_abstracts(search_query)
