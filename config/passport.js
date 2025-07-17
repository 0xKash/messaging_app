// imports
const prisma = require("../db/queries");

const fs = require("fs");
const path = require("path");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// const setup
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

// Options of passport strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIV_KEY,
  algorithms: ["RS256"],
};

// Strategy setup
const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await prisma.getUserById(payload.sub); // payload.sub = target userID

    // This if() manages different outcomes of authentication
    if (user) {
      return done(null, user); // correct
    } else {
      return done(null, false); // something went wrong
    }
  } catch (err) {
    done(err, null);
  }
});

// exports
module.exports = (passport) => {
  passport.use(strategy);
};
