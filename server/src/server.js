import express from'express';
import setupRoutes from './routes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const start = async () => {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/USERS', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to the Database');

        /////////////////////

        const app = express();

        app.use(express.json());

        app.use(express.urlencoded({extended: false}));

        app.use(cors());

        setupRoutes(app);

    } catch (error) {
        console.log(error);
    }
}

start();