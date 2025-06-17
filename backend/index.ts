import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Worker } from '@temporalio/worker';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
});

// Temporal worker
async function runWorker() {
  try {
    console.log('👷 Starting Temporal worker...');
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows/userWorkflow'),
      activities: require('./activities/userActivities'),
      taskQueue: 'user-queue',
    });
    console.log('✅ Worker created! Now running...');
    await worker.run(); // blocking
  } catch (err) {
    console.error('❌ Worker startup failed:', err);
  }
}
runWorker();
