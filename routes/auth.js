const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController
} = require("../controllers/authControllers");
const { validateCredentials } = require("../middleware/validationMiddleware");
const { validateCookie } = require("../middleware/cookieMiddleware");
const { UserModel } = require("../models/UserModel");

router.post("/register", validateCredentials, registerController);
router.post("/login", validateCredentials, loginController);
router.get("/logout", logoutController);

router.get("/users", validateCookie, async (req, res, next) => {
  console.log("->", req.cookies);
  const users = await UserModel.find();
  res.json(users);
});

module.exports = router;
