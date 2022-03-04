const express = require("express");
const { translateWordToLanguate } = require("../helpers");
const { validateCookie } = require("../middleware/cookieMiddleware");
const { TranslationModel } = require("../models/TranslationModel");
const { UserModel } = require("../models/UserModel");

const router = express.Router();

router.get("/:userid/:word", validateCookie, async (req, res, next) => {
  const { word, userid } = req.params;
  const user = await UserModel.findById(userid).lean();
  console.log('->', req.verifiedUser);

  const wordsPromises = user.languages.map(
    async (lang) => await translateWordToLanguate(word, lang)
  );

  const translations = await Promise.all(wordsPromises);

  await TranslationModel.create({
    user: userid,
    translations,
  });

  res.json(translations);
});

module.exports = router;
