import express from 'express'
import cors from 'cors'

// initialize express
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({'message': 'hello world'})
})

app.listen(5000, () => {
    console.log('server is running on port 5000')
});