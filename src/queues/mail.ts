import { Job, Queue, Worker } from 'bullmq';
import { mailJobs } from '@/jobs/mail-jobs';

const mailQueue = new Queue('mail', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(<string>process.env.REDIS_PORT)
  }
});

const mailWorker = new Worker(
  'mail',
  async (currentJob: Job) => {
    mailJobs.forEach((job) => {
      if (job.jobName == currentJob.name) {
        new job(currentJob.data).handle();
      }
    });
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(<string>process.env.REDIS_PORT)
    }
  }
);

export { mailQueue, mailWorker };
