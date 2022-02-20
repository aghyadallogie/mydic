const {
  registerController,
  loginController,
} = require("../controllers/authControllers");
const { validateCredentials } = require("../middleware/validationMiddleware");

const router = require("express").Router();

router.post("/register", validateCredentials, registerController);
router.post("/login", validateCredentials, loginController);

module.exports = router;
