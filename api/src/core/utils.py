import unicodedata as ud
import re


def tokenize(text: str):

    tokens = []
    token = ""
    for i, ch in enumerate(text):
        category = ud.category(ch)
        match category:
            case "Pf" | "Po":
                if 100 < len(token):
                    tokens.append(token)
                    token = ""
                elif i + 100 >= len(text):
                    break
                token += ch
            case _:
                token += ch
    if i + 100 >= len(text):
        tokens.append(text[i:])

    return tokens


def regex_tokenize(text: str):
    return re.split(r"[.?!:.؟!]", text)


