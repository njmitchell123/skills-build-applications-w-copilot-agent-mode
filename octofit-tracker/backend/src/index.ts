import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ?? '8000';
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB on', MONGO_URL);
    app.listen(Number(PORT), () => {
      console.log(`Backend server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
