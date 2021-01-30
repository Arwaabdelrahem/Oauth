const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport");
const userController = require("../controllers/users");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.post(
  "/Oauth/google",
  passport.authenticate("googleToken", { session: false }),
  userController.googleOauth
);
router.post(
  "/Oauth/facebook",
  passport.authenticate("facebookToken", { session: false }),
  userController.facebookOauth
);
router.get("/secret", auth, userController.secret);

module.exports = router;
