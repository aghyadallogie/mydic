const express = require("express");
const { translateWordToLanguate } = require("../helpers");
const {UserModel} = require("../models/UserModel");
const router = express.Router();

router.get("/:userid/:word", async (req, res, next) => {
  const user = await UserModel.findById(req.params.userid).lean();
  const { word } = req.params;

  const wordsPromises = user.languages.map(
    async (lang) => await translateWordToLanguate(word, lang)
  );

  const words = await Promise.all(wordsPromises);
  console.log(words);
  res.json(words);
});

module.exports = router;
