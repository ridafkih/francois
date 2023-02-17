import axios from "axios";

const { TRANSLATION_URL = "http://localhost:8000/" } = process.env;

export const translate = async (text: string): Promise<string> => {
  const { data } = await axios
    .post(`${TRANSLATION_URL}/translate/fr/en`, {
      prospect: text,
    })
    .catch(() => ({ data: undefined }));

  return data.translation;
};
