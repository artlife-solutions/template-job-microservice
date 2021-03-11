import { IMicroJob, micro, IAssetJob } from '@artlife/micro-job';

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
    await service.registerAssetJob({
        jobName: "my-job", 
        mimeType: "image",        
        jobFn: async (service: IMicroJob, job: IAssetJob) => {

            // Unpack the details of the asset to be processed.
            const { assetId, userId, accountId, mimeType } = job;

            //
            // TODO: Add your code for the job here.
            //
            // If this code completes sucessfully the job will be registered as completed.
            // If this code throws an exception the job will be marked as errored.

            //
            // Notify the application that something has happened.
            //
            await service.emit("my-message-to-the-world", {
                // Message payload goes here.
            });

            //
            // Emit metadata to be recorded by the application for this asset.
            //
            const metadata = {
                // New metadata to for the asset goes here.
            };
            
            await service.emit("update-metadata", {
                asset: {
                    assetId: assetId,
                    accountId: accountId,
                    metadata: metadata,
                },
            });
        },
    });

    //
    // Watch the message bus for interesting messages.
    //
    await service.on("some-interesting-message", async (args, res) => {

        // Respond to a message within the application.

        res.ack(); // Ack the message.
    });
    
    await service.start();
}

if (require.main === module) {
    const service = micro({ serviceName: "my-job" });
    main(service)
        .then(() => console.log("Online"))
        .catch(err => {
            console.log("Failed to start!");
            console.log(err && err.stack || err);
        });
}

