import * as functions from "firebase-functions";
import express from "express";
import cors from 'cors';
import routes from './interfaces/routes';

const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(routes);

export const api = functions.https.onRequest(app);