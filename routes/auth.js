const {
  registerController,
  loginController,
} = require("../controllers/authControllers");
const { validateCredentials } = require("../middleware/validationMiddleware");
const { UserModel } = require("../models/UserModel");

const router = require("express").Router();

router.post("/register", validateCredentials, registerController);
router.post("/login", validateCredentials, loginController);
router.get("/users", async (req, res, next) => {
  const users = await UserModel.find();
  res.json(users);
});

module.exports = router;
