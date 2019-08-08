if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

import { IMicroJob, micro, IJob } from '@artlife/micro-job';

//
// Defines a job to be processed.
//
export interface IJobPayload {

    // Data for your job goes here.
}

//
// Application entry point.
//
export async function main(service: IMicroJob): Promise<void> {

    //
    // Register a function for processing jobs of this type.
    //
    service.registerJob("my-job", async (service: IMicroJob, job: IJob<IJobPayload>) => {

        const payload: IJobPayload = job.payload; // The payload of your job.

        // Do the job!
        // If this code completes sucessfully the job will be registered as completed.
        // If this code throws an exception the job will be marked as errored.
    });

    //
    // Watch the message bus for interesting messages.
    //
    service.on("some-interesting-message", async (args, res) => {

        const job = {
            payload: {
                // Payload for your job.
            },
        };

        // Submit jobs to the job queue to be processed in turn.
        await service.submitJobs("my-job", [ job ]);

        res.ack(); // Ack the message.
    });
    
    await service.start();
}

if (require.main === module) {
    const service = micro();
    main(service)
        .then(() => console.log("Online"))
        .catch(err => {
            console.log("Failed to start!");
            console.log(err && err.stack || err);
        })
}

