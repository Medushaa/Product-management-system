import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes'; 

const app: Application = express();

mongoose.connect('mongodb://127.0.0.1:27017/productdb', { //db name
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    
app.use(cors());
app.use(bodyParser.json());

//app.use('/api', productRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);  

export default app;
