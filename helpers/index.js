const { default: axios } = require("axios");

exports.translateWordToLanguate = async (word, lang) => {
  const response = await axios.get(
    `https://api-free.deepl.com/v2/translate?auth_key=${process.env.AUTH_KEY}&text=${word}&target_lang=${lang}`
  );

  return {
    language: lang,
    word: response.data.translations[0].text,
  };
};
