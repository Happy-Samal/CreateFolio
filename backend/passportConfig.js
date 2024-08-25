import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from './models/User.js'; // Adjust the path according to your project structure

// google
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.URL}/auth/google/callback`,
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ username: profile.emails[0].value.split("@")[0] });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = new User({
            googleId: profile.id,
            username: profile.emails[0].value.split("@")[0],
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            displayname:profile.displayName,
        });
        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}));

// github
passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${process.env.URL}/auth/github/callback`,
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ username: profile.emails[0].value.split("@")[0] });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = new User({
            githubId: profile.id,
            username: profile.emails[0].value.split("@")[0],
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            displayname:profile.displayName,
        });
        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}));

// facebook
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.URL}/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ username: profile.emails[0].value.split("@")[0] });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = new User({
            facebookId: profile.id,
            username: profile.emails[0].value.split("@")[0],
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            displayname:profile.displayName,
        });
        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
     done(null, user);
});

export default passport;
