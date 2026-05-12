import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const jobQueue = new Queue('jobs', { connection: redis });