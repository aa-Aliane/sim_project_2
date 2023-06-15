FROM python:3.10

WORKDIR /code

COPY api/req.txt .


RUN pip install --upgrade pip

RUN pip install -r /code/req.txt


COPY api/src ./src
COPY api/data ./data



ENV UVICORN_PORT 80

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--reload"]

EXPOSE $UVICORN_PORT