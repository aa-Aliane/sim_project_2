import React from "react";
import { useLanguage } from "../store/LanguageState";

const Result = ({ result }) => {
  const current_lang = useLanguage((state) => state.current_language);
  const text = useLanguage((state) => state.text.result);
  return (
    <div className="result">
      <div data-rlang={result.lang} className="result__title">
        <a href={result.url} target="_blank">
          {result.title}
        </a>
      </div>
      <div data-dir={current_lang === "ar"} className="result__rate">
        {result.rate}%
      </div>
      <ul data-rlang={result.lang}  className="result__authors">
        {result.authors.map((author) => (
          <li className="result__authors__author">{author.full_name}</li>
        ))}
      </ul>
      <div data-dir={current_lang === "ar"} className="result__deep">
        <button className="btn btn--deep">{text.deep}</button>
      </div>
    </div>
  );
};

export default Result;
