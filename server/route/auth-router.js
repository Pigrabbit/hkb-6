const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("dotenv").config();

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
    const payload = { id: req.user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200)
    .cookie("token", token, {
        // expires after 7 days (1 week)
        expires: new Date(Date.now() +7 * 24 * 60 * 60 * 1000)
    })
    .redirect("../../list");
});

module.exports = router;
