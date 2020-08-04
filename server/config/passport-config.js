const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../model/user");
const db = require("../db");

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  new User(db, { id }).findByGoogleId();
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback
      // 이 google id 로 가입된 유저가 있는지 확인
      const registeredUser = await new User(db, {
        google_id: profile.id,
      }).findByGoogleId();

      if (registeredUser) {
        //  있으면, 기존에 있는 유저정보 가져오기
        done(null, registeredUser);
      } else {
        //  없으면, 새로 만들어주기
        new User(db, {
          username: `${profile.name.givenName} ${profile.name.familyName}`,
          google_id: profile.id,
        }).create();

        const newUser = await new User(db, {
          google_id: profile.id,
        }).findByGoogleId();
        done(null, newUser);
      }

      // 로그인 시켜주기
    }
  )
);
