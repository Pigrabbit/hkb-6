const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

const passportConfig = require("./config/passport-config");

const authRouter = require("./route/auth-router");
const apiRouter = require("./route/api-router");

app.use("/auth", authRouter);
app.use("/api", apiRouter);

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
