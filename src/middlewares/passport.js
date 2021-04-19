const localStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

class Passport {
  constructor(passport, userModel) {
    this.passport = passport;
    this.userModel = userModel;
    this.initInstance();
  }

  initInstance() {
    this.passport.serializeUser((user, done) => {
      done(null, user.email);
    });

    this.passport.deserializeUser(async (email, done) => {
      try {
        let user = await this.userModel.findOne(email);
        if (!user) {
          return done(new Error({ message: 'User not found!' }));
        }
        done(null, user);
      } catch (e) {
        done(e);
      }
    });

    this.passport.use(
      new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        async (req, username, password, done) => {
          let user;
          try {
            user = await this.userModel.findOne({ email: username });
            if (!user) {
              return done(null, false, { message: 'Incorrect email or password' });
            }
          } catch (e) {
            return done({ message: e }, null);
          }

          let match = await user.comparePassword(password);
          if (!match) return done(null, false, { message: 'Incorrect email or password' });
          if (!user.isVerified)
            return done(null, false, { message: 'Your account has not been verified.' });
          return done(null, user);
        }
      )
    );

    this.passport.use(
      new JWTStrategy(
        { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: envs.jwtSecret },
        async (jwtPayload, done) => {
          if (jwtPayload.access === 'auth') {
            try {
              let user = await this.userModel.findById(jwtPayload._id);
              return done(null, user);
            } catch (error) {
              done({ message: error });
            }
          } else {
            return done({ message: 'Token access invalid' });
          }
        }
      )
    );
  }
}

module.exports = Passport;
