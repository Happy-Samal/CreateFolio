import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './passportConfig.js';
import User from './models/User.js';
import Portfolio from './models/Portfolio.js'
import MongoStore from 'connect-mongo'; // Import connect-mongo
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.set('trust proxy', 1); // Trust first proxy

// Connect to the database
import connectDB from './db/dbconn.js';
connectDB();

// Apply CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Setup session with MongoStore
const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions', // Collection name for storing sessions
    ttl: 24 * 60 * 60 * 1000, // Time to live for sessions (in seconds)
});

// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET || 'createfolio',
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Use MongoStore to save sessions
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        httpOnly: true
    }
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
app.post('/updatePortfolio', async (req, res) => {
    try {
        const { username, updates } = req.body; // Extracting updates from the request body
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { username: username }, // Find the document by username
            { $set: updates }, // Merge new data with existing data
            { new: true, runValidators: true, upsert: true } // Options: return updated document, run schema validators, create if not found
        );
        // Send the updated portfolio as a response
        res.json({
            success: true,
            message: 'Portfolio updated successfully !',
            data: updatedPortfolio
        });
    } catch (err) {
        console.log('Error in update portfolio', err);
        res.json({
            success: false,
            message: 'Failed to update portfolio !',
            error: err.message
        });
    }
});


app.get('/',(req,res)=>{
    res.json({backend:'Done'})
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
