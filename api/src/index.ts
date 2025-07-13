import express from 'express';
import { Client } from 'pg';
import { createClient } from 'redis';

const app = express();
const port = process.env.PORT || 3001;

// Database setup
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Redis setup
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

async function connectToRedis() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

async function connectToDatabase() {
  try {
    await dbClient.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

app.get('/', (req, res) => {
  res.send('Hello from the API!');
});

app.get('/health', async (req, res) => {
  try {
    await dbClient.query('SELECT NOW()');
    await redisClient.ping();
    res.status(200).send('OK');
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).send('Error');
  }
});

async function startServer() {
  await connectToDatabase();
  await connectToRedis();

  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });
}

startServer();
