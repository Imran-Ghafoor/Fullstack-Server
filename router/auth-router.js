const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")


// router.get("/", (req, res) => {
//     res.status(200).send("Hello from auth-router")
// })
router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);

router.route("/user").get(authMiddleware, authController.user);

module.exports = router;