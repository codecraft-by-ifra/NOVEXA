const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/userController");
const { validateSignup, validateLogin } = require("../validators/userValidator");

router.post("/signup", validateSignup, signupUser);
router.post("/login", validateLogin, loginUser);


module.exports = router;