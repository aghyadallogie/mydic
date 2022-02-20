var express = require("express");
var router = express.Router();
const UserModel = require("../models/UserModel");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await UserModel.find();
  console.log(users);
  res.json(users);
});

router.post("/register", async (req, res) => {
  const { username, email, languages, password } = req.body;
  const user = await UserModel.create({
    username,
    email,
    password,
    languages,
  });

  res.json(user);
});

module.exports = router;
