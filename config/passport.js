const prisma = require("../db/queries");

const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIV_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await prisma.getUser(payload.sub);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
