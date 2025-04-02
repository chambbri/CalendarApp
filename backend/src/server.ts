import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';

console.log(eventRoutes);

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI as string

app.use(express.json());
app.use('/api', eventRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// connect to mongoose server
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));