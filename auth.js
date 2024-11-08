const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./Models/Person");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
