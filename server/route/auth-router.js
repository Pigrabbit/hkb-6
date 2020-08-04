const express = require("express");
const router = express.Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res, next) => {
  res.json({ message: "logging in" });
});

// auth logout
router.get("/logout", (req, res, next) => {
  // handle with passport
  res.json({ messsage: "logging out" });
});

// google auth
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/redirect", passport.authenticate("google"), (req, res, next) => {
    res.json({ message: "we are redirecting to..."});
});

module.exports = router;
