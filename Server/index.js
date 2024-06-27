import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import User from './models/users.model.js'

// connecting to the database
mongoose.connect('mongodb+srv://admin:k5H4dusEVAZXTy9O@mygymbro.dzpouaw.mongodb.net/myGymBro?retryWrites=true&w=majority&appName=myGymBro')
  .then(() => console.log('Connected to db!'))
  .catch((e) => {console.log(e)});

// initialize express
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({'message': 'hello world'})
})

// signup API
app.post('/signup', async (req, res) => {
    
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
    
});

app.listen(5000, () => {
    console.log('server is running on port 5000')
});