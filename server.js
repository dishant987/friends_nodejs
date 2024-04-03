import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import connect from './database/conn.js';
import router from './router/route.js';
const app = express()

const corsOptions = {
    origin: 'https://react-friends-fn72.onrender.com',
  };

app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(express.json());
config();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

app.use('/api',router);

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})