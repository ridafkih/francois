import axios from "axios";
import { Translator } from "deepl-node";

const { TRANSLATION_URL = "http://localhost:8000/", DEEPL_API_KEY } =
  process.env;

const translator = DEEPL_API_KEY ? new Translator(DEEPL_API_KEY!) : void 0;

/**
 * Uses DeepL API to translate the message.
 * @param text The text to translate.
 * @returns The translated text.
 */
const deepLTranslate = async (text: string) => {
  if (!translator)
    throw Error(
      "Tried to translate using DeepL without instantiated Translator constructor."
    );

  const { text: translation } = await translator.translateText(
    text,
    "fr",
    "en-US",
    {
      formality: "prefer_less",
    }
  );

  return translation;
};

/**
 * Automatically selects, and translates using the inferred service.
 * Translates from French to English.
 * @param text The text to translate.
 * @returns The translated text.
 */
export const translate = async (text: string): Promise<string> => {
  if (DEEPL_API_KEY) return deepLTranslate(text);

  const { data } = await axios
    .post(`${TRANSLATION_URL}/translate/fr/en`, {
      prospect: text,
    })
    .catch(() => ({ data: {} }));

  return data.translation;
};
