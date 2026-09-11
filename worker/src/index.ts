import { Job, Worker } from "bullmq";
import { redis } from "./lib/redis.ts";

const worker = new Worker('jobs', async (job: Job) => {

    console.log(`[active] job#${job.id} ${job.name}`);

    return "alguma coisa";
}, {
    connection: redis
});

worker.on('completed', (job, ret) => {
    console.log(`[completed] job#${job.id}`, ret);
});

worker.on('failed', (job, err) => {
    const restam = (job?.opts.attempts ?? 1) - (job?.attemptsMade ?? 0);
    console.log(`  [failed]  job#${job?.id}: ${err.message}` + (restam > 0 ? ` — vai tentar de novo` : ` — desistiu`));
});