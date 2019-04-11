var express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var router = express.Router();

// Load Idea Model
require("../models/Users");
const User = mongoose.model("users");

/********************************************/
/* GET users login form. */
router.get("/login", function(req, res, next) {
  res.render("users/login", { message: "Please log in" });
});

/* POST users login form. */
router.post("/login", function(req, res, next) {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.render("users/login", { message: "Username does not exist" });
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (isMatch) {
        req.session.userId = user._id;
        console.log("inside profile");
        return res.redirect("/users/profile");
      } else {
        console.log("user/login");
        return res.render("users/login");
      }
    });
  });
});
/********************************************/

/********************************************/
/* GET users register form. */
router.get("/register", function(req, res, next) {
  res.render("users/register");
});

/* POST users register form. */
router.post("/register", function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    var userData = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      telephone: req.body.telephone,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(userData.password, salt, (err, hash) => {
        if (error) throw error;
        userData.password = hash;
        userData
          .save()
          .then(user => {
            res.redirect("/users/login");
          })
          .catch(error => {
            console.log(error);
            return;
          });
      });
    });
  }
});
/********************************************/

/********************************************/
/* GET profile page */
router.get("/profile", function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.render("users/login");
      } else {
        return res.render("users/profile", { user: user });
      }
    }
  });
});

/* GET logout page */
router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/users/login");
      }
    });
  }
});
/********************************************/

module.exports = router;
