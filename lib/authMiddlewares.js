// imports
const passport = require("passport");

// function setup
const isAuth = passport.authenticate("jwt", { session: false });

// exports
module.exports = isAuth;
