const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

require("dotenv").config();

passport.use(new GoogleStrategy({
    // options for the google strategy
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
}, () => {
    // passport callback
}));