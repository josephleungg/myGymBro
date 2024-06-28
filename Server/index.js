import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import User from './models/users.model.js'
import updateUsers from './helper/updateSchemas.js'

// connecting to the database
mongoose.connect('mongodb+srv://admin:k5H4dusEVAZXTy9O@mygymbro.dzpouaw.mongodb.net/myGymBro?retryWrites=true&w=majority&appName=myGymBro')
  .then(() => console.log('Connected to db!'))
  .catch((e) => {console.log(e)});

// initialize express
const app = express()
app.use(cors())
app.use(express.json())

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
        
            res.status(500).json(errorMessages)

        // error checking for duplicate username and email
        }else if(error.code === 11000){
            res.status(500).json({'message': 'Username or email already exists'})

        // error checking for any other error
        }else{
            res.status(500).json({'message': 'An error has occured, please try again'})
        }
    }

});

app.listen(5000, () => {
    console.log('server is running on port 5000')
});