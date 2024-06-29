import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import User from './models/users.model.js'
import updateUsers from './helper/updateSchemas.js'
import cookieParser from 'cookie-parser'

// connecting to the database
mongoose.connect('mongodb+srv://admin:k5H4dusEVAZXTy9O@mygymbro.dzpouaw.mongodb.net/myGymBro?retryWrites=true&w=majority&appName=myGymBro')
  .then(() => console.log('Connected to db!'))
  .catch((e) => {console.log(e)});

// initialize express
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

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
        res.status(200).json(user);
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

// Cookies
app.get('/set_cookies', (req, res) => {
    res.cookie('user', true, { maxAge: 2592000000, httpOnly: true }); // 30 days in milliseconds
    res.send('you got the cookies');
});

// API to get cookies
app.get('/get_cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies.user)
    res.json(cookies);
});

app.listen(5000, () => {
    console.log('server is running on port 5000')
});