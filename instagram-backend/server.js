import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import pusher from 'pusher'
import dbModel from './dbModel'

//app config
const app = express();
const port = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(cors);

//DB config
const connection_url = 'mongodb+srv://admin:BTxvtCDRqA7VshMX@cluster0.3jsw8.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB connected')
})

//API route
app.get('/', (req,res) => res.status(200).send('hello world!'))

app.post('/upload', (req,res) => {
    const body = req.body;

    dbModel.create(body, () => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/sync', (req,res) => {
    dbModel.find((err,data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//listening
app.listen(port, () => console.log(`listening on port ${port}`))