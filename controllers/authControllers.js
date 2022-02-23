const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

exports.registerController = async (req, res) => {
  try {
    // validate new user data
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ errMsg: "email already exists!" });
    }

    // encrypt password : salt means the complexity of the encryption
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user  for that we need a Model -> CRUD SAAS
    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
      languages: req.body.languages,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.cookie("auth-jwt", token, { httpOnly: true }).status(201).json(newUser);
  } catch (error) {
    // handle error msgs
    res.status(400).json({ errMsg: error.message });
  }
};

exports.loginController = async (req, res) => {
  console.log("loginController");

  try {
    // check if the user exists
    const registeredUser = await UserModel.findOne({ email: req.body.email });
    if (!registeredUser) {
      return res
        .status(404)
        .json({ errMsg: "user does not exist, please register!" });
    }

    // compare the passwords
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      registeredUser.password
    );
    if (!passwordIsValid) {
      return res.status(400).json({ errMsg: "invalid password!" });
    }

    const token = jwt.sign(
      { userId: registeredUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log(token);
    res
      .cookie("token_cookie", token, { httpOnly: true, sameSite: "lax"})
      .status(200)
      .json(registeredUser);
  } catch (error) {
    res.status(400).json({ errMsg: error });
  }
};
