import React from "react";
import { useLanguage } from "../store/LanguageState";

const About = () => {
  const text = useLanguage((state) => state.text.about);
  return (
    <div className="about">
      <h2>{text.title}</h2>
      <p>{text.content}</p>
    </div>
  );
};

export default About;
