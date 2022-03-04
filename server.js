const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const translateRouter = require("./routes/translate");

const app = express();

mongoose.connect(process.env.DB_URI, () => console.log("db connected"));

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/translate", translateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(4000, () => console.log("server up on 4000"));
