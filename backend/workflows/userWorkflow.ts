import { proxyActivities } from '@temporalio/workflow';
const { saveToDB } = proxyActivities({
  startToCloseTimeout: '30 seconds',
});

export async function updateUserWorkflow(userData: any) {
  await saveToDB(userData);
}
