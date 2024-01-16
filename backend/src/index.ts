import express from 'express';
import mongoose from 'mongoose';
import { membersRouter } from './routes';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const mongoString = process.env.DB_URL!;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error: Error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database Connected');
});

const app = express();

app.use(express.json());

app.use('/members', membersRouter);

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
