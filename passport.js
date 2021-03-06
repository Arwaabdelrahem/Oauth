const passport = require("passport");
const googlePlusToken = require("passport-google-plus-token");
const facebookToken = require("passport-facebook-token");
const { User } = require("./models/user");

passport.use(
  "googleToken",
  new googlePlusToken(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ "google.id": profile.id });
        if (user) return done(null, user);

        user = new User({
          method: "google",
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(
  "facebookToken",
  new facebookToken(
    {
      clientID: process.env.appID,
      clientSecret: process.env.appSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ "facebook.id": profile.id });
        if (user) return done(null, user);

        user = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
