import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_form = axios.create({
  baseURL: "http://127.0.0.1:8001/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
