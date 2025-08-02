import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pool from './db/db';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

console.log(eventRoutes);

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', eventRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// Test PostgreSQL connection
(async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('Database connection established');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
})();