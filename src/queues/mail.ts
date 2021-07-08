import { Job, Queue, QueueOptions, Worker } from 'bullmq';
import { mailJobs } from '../jobs/mail-jobs';

const mailQueue = new Queue('mail', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
} as QueueOptions);

const mailWorker = new Worker('mail', async (currentJob: Job) => {
    mailJobs.forEach(job => {
        if (job.jobName == currentJob.name) {
            new job(currentJob.data).handle();
        }
    });
});

export { mailQueue, mailWorker };