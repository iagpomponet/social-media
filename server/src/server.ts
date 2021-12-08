import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts';
import userRoutes from './routes/user';

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://iago:${process.env.DB_PASS}@cluster0.h4sdr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/post', postRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
