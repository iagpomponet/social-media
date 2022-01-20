import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/posts';
import userRoutes from './routes/user';

const clientBaseUrl = 'http://localhost:3000';

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://iago:${process.env.DB_PASS}@cluster0.h4sdr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

const corsOptions = {
  origin: [clientBaseUrl],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', clientBaseUrl);
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(cookieParser());

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
