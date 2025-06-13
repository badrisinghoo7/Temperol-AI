import { proxyActivities } from '@temporalio/workflow';
const { saveToDB, saveToCrudCrud } = proxyActivities({
  startToCloseTimeout: '30 seconds',
});

export async function updateUserWorkflow(userData: any) {
  await saveToDB(userData);
  await new Promise((r) => setTimeout(r, 10000));
  await saveToCrudCrud(userData);
}
