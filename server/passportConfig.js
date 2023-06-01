const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async function (username, password, done) {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id });
    done(null, user);
  });
};
