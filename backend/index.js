import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config'
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './passportConfig.js';
import User from './models/User.js';
import Portfolio from './models/Portfolio.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));

// Connect to the database
import connectDB from './db/dbconn.js';
connectDB();

// Apply CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { 
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
}));

// github Auth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { 
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
}));

// facebook Auth Routes
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
}));


// Test route to see the user information
app.get('/isLogin', async(req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.json({})
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect(process.env.FRONTEND_URL); // Redirect to homepage or login page
    });
});

// delete account
app.get('/delete',async(req,res)=>{
    if (req.isAuthenticated()) {
        await User.findOneAndDelete({username:req.user.username})
        res.redirect('/logout')
    }
})


// fetch portfolio
app.post('/userPortfolio',async(req,res)=>{
    try{
        let portfolioData = await Portfolio.findOne({username:req.body.username})
        if(portfolioData){
            res.send(portfolioData)
        }else{
            res.send({})
        }
    }catch(err){
        console.log('error in fetch portfoli',err)
    }
})
// update portfolio
app.post('/updatePortfolio',async(req,res)=>{
    try{
        await Portfolio.findOneAndUpdate(
            { username: req.body.username }, // Find the document by username
            { $set: req.body }, // Merge new data with existing data
            { new: true, runValidators: true, upsert: true } // Options: return updated document, run schema validators, create if not found
        );
    }catch(err){
        console.log('error in update portfoli',err)
    }
})

app.get('/',(req,res)=>{
    res.json({backend:'Done'})
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
