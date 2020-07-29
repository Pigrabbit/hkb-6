const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
app.set("view engine", "html");

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const apiRouter = require("./routes/api-router");
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
  // set locals, only providing error in development
});

app.listen(process.env.PORT || 3000, () => {
  console.log("running!!!! ");
});
