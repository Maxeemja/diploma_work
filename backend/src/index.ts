import express from 'express';
import mongoose from 'mongoose';
import {
	membersRouter,
	assignmentsRouter,
	projectsRouter,
	authRouter
} from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware';
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
app.use(cors());
app.use('/members', authMiddleware, membersRouter);
app.use('/assignments', authMiddleware, assignmentsRouter);
app.use('/projects', authMiddleware, projectsRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
