const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../model/user");
const db = require("../db");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback
      // TODO
      // 이 google id 로 가입된 유저가 있는지 확인
      //  없으면, 새로 만들어주기
      //  있으면, 기존에 있는 유저정보 가져오기
      // 로그인 시켜주기
      const newUser = new User(db, {
        username: `${profile.name.givenName} ${profile.name.familyName}`,
        google_id: profile.id,
      });
      newUser.create();

      console.log(profile);
    }
  )
);
