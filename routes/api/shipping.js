const express = require("express");
const Router = express.Router();
const passport = require("passport");
const SaveAddress = require("../../controllers/shipping/SaveAddress");

Router.get(
  "/save",
  passport.authenticate("jwt", { session: false }),
  (req, res) => SaveAddress(req, res)
);

module.exports = Router;
