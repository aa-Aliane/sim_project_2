from pydantic import BaseModel
from fastapi import UploadFile, File


class Query(BaseModel):
    k: int | None = 5


class SimpleQuery(Query):
    content: str


class FileQuery(Query):
    content: UploadFile = File(...)