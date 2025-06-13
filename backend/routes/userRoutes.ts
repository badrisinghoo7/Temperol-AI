import express from 'express';
import User from '../models/User';
import { Connection, WorkflowClient } from '@temporalio/client';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const user = await User.findOne({ authId: req.params.id });
  console.log('User found:', user);
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection });

  try {
    await client.start('updateUserWorkflow', {
      args: [req.body],
      taskQueue: 'user-queue',
      workflowId: `update-${req.body._id || req.body.authId}-${Date.now()}`,
    });

    res.json({ message: '✅ User sync workflow started' });
  } catch (err) {
    console.error('❌ Workflow start failed:', err);
    res.status(500).json({ error: 'Workflow failed to start' });
  }
});


export default router;