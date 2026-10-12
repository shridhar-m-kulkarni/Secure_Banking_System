
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const {
  connectDatabase
} = require("./database/UserAccountDetails");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// Connect to MongoDB
connectDatabase();

// CORS configuration
// Keep this BEFORE the routes.
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
}));

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;

  res.locals.error =
    req.app.get("env") === "development"
      ? err
      : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;