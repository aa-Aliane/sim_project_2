import { create } from "zustand";
import { TextPerLang } from "../constants";

export const useLanguage = create((set) => ({
  languages: { en: "english", fr: "français", ar: "عربية" },
  current_language: "en",
  text: TextPerLang.en,
  change_language: (lang) =>
    set(() => ({ text: TextPerLang[lang], current_language: lang })),
}));
