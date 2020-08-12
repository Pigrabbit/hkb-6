const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const logFormat = require("./config/logger-config");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./config/passport-config");

const app = express();

app.use(cors({ origin: "*" }));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(logger(logFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(passport.initialize());

const { isLoggined } = require("./utils/auth");
const authRouter = require("./route/auth-router");
const apiRouter = require("./route/api-router");

app.use("/auth", authRouter);
app.use("/api", isLoggined, apiRouter);

app.use("/", (req, res, next) => {
  res.sendFile("public/index.html", { root: __dirname });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.json({ message: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("running!!!");
});
