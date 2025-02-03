import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI as string

app.use(express.json());
app.use('/api', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// connect to mongoose server
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));