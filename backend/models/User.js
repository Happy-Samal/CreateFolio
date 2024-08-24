import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    googleId: String,
    githubId: String,
    facebookId: String,
    username: String,
    email: String,
    avatar: String,
    displayname: String,
});

const User = mongoose.model('User', userSchema);

export default User