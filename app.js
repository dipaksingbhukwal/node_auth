var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var exphbs = require("express-handlebars");
var MongoStore = require("connect-mongo")(session);
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var path = require("path");

var app = express();

var usersRouter = require("./routes/users");

/********************************************/
//connect to MongoDB
mongoose.connect("mongodb://localhost/testForAuth");
var db = mongoose.connection;

//handle mongo error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

/********************************************/
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({ defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

/********************************************/
// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/********************************************/
// Routing request to users
app.use("/users", usersRouter);

/********************************************/
// listen on port 3000
app.listen(5000, function() {
  console.log("Application listening on port 3000");
});

module.exports = app;
