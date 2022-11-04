const express = require("express");
const router = express.Router();
const handleCreateUser = require("../../controllers/users/handleCreateUser");
const handleSignInUser = require("../../controllers/users/handleSignUser");
const handleMeUser = require("../../controllers/users/handleMeUser");
const passport = require("passport");

router.post("/register", (req, res) => handleCreateUser(req, res));
router.post("/sign_in", (req, res) => handleSignInUser(req, res));
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;
    res.json(user);
  }
);
router.post("/forget-password", (req, res) => handleForgetPassword(req, res));

module.exports = router;
