const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');
const sendOutputPayload = require('../apis/socketServiceApi');



function evaluationWorker(queue) {
    console.log(`🔄 Worker started on queue: EvaluationQueue`);

    const worker = new Worker('EvaluationQueue', async job => {
        console.log(`🚀 Received job: ${job.id}, Data:`, job.data);

        if (job.name === 'EvaluationJob') {
            try {
                const response = await sendOutputPayload({
                    userId: job.data.userId,
                    payload: job.data
                });

                console.log("✅ API Response:", response);
                return response.data; // Ensure the job resolves successfully
            } catch (error) {
                console.error("❌ Error processing job:", error);
                throw error; // Mark job as failed
            }
        }
    }, {
        connection: redisConnection
    });

    // ✅ Add proper event handlers
    worker.on('error', (err) => console.error("❌ Worker Error:", err));
    worker.on('failed', (job, err) => console.error(`❌ Job ${job.id} failed with error:`, err));
    worker.on('stalled', (job) => console.warn(`⚠️ Job ${job.id} got stalled!`));
}
evaluationWorker()
module.exports = evaluationWorker;