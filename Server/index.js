import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import User from './models/users.model.js'
import updateUsers from './helper/updateSchemas.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config();

// connecting to the database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to db!'))
  .catch((e) => {console.log(e)});

// initialize express
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const maxLoginTime = 2592000000; // time for expiry of Token

// create a JWT function
function createToken(id) {
    return jwt.sign({ id }, 'myGymBrosecretkey', { expiresIn: maxLoginTime });
}

// UPDATING SCHEMAS
// Update Schemas API, MUST CHANGE THE FUNCTION EVERYTIME YOU CHANGE ANYTHING ELSE TO IT
app.get('/updateUsers', async (req, res) => {
    try{
        await updateUsers();
        res.status(200).json({'message': 'updating users'})
    }catch(e){
        res.status(500).json({'message': e})
    }
});

// ACCOUNT CREATION AND LOGIN
// signup API
app.post('/signup', async (req, res) => {
    
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);

        // create jwt cookie to instantly login the user
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxLoginTime });
        res.status(200).json({ user: user._id });
    } catch (error) {

        // checking for empty required fields
        if(error.message.includes('User validation failed:')){
            let errorMessages = { username: '', email: '', password: '' };

            Object.values(error.errors).forEach(error => {
                errorMessages[error.path] = error.properties.message;
            });
        
            let returnMessage = { 'message': "" };

            Object.values(errorMessages).forEach(error => {
                if(error !== ''){
                    returnMessage['message'] += error + '. ';
                };
            });

            res.status(500).json(returnMessage)

        // error checking for duplicate username and email
        }else if(error.code === 11000){
            res.status(500).json({'message': 'Username or email already exists'})
            console.log('Username or email already exists')
        // error checking for any other error
        }else{
            res.status(500).json({'message': 'An error has occured, please try again'})
            console.log('An error has occured, please try again')
        }
    }

});

// api call for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxLoginTime });
        res.status(200).json({ user: user._id });
        console.log('User logged in successfully')
    }catch(e){
        res.status(400).json({ 'message': e.message })
        console.log(e.message)
    }
});

// Reset Cookies
app.get('/clear_cookies', (req, res) => {
    if (req.cookies) {
        Object.keys(req.cookies).forEach(cookieName => {
            res.clearCookie(cookieName);
        });
        console.log('User logged out successfully')
        res.json('All cookies cleared');
    } else {
        res.json('No cookies to clear');
    }
});

// verifying jwt
app.get('/verifyjwt', (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'myGymBrosecretkey', (err, decodedToken) => {
            if(err){
                console.log('jwt is invalid')
                res.status(400).json({ 'message': 'jwt is invalid' });
            }else{
                console.log('id: ' + decodedToken.id)
                res.status(200).json({ id: decodedToken.id });
            }
        });
    }else{
        console.log('tried to verify jwt but user is not authenticated')
        res.status(400).json({ 'message': 'not authenticated' });
    }
});

// get cookies for testing
app.get('/get_cookies', (req, res) => {
    res.json(req.cookies);
});

// getting user data
app.get('/get_user_data', async (req, res) => {

    // using query string instead of body
    const user_id = req.query.id

    // find user by id in the collection
    const user = await User.findById(user_id).select('username email properties dateCreated')

    if(user){
        console.log('User found')
        res.status(200).json(user)
    }else{
        res.status(400).json({ 'message': 'user not found' })
    }
});

app.listen(5000, () => {
    console.log('server is running on port 5000')
});