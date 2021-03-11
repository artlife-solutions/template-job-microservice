import { EventHandlerFn } from "@artlife/micro";
import { IAssetJob, IAssetJobDetails } from "@artlife/micro-job";
import { main } from ".";

async function testbed(): Promise<void> {
    console.log(`Starting testbed.`);

    let registeredJobDetails: IAssetJobDetails;
    let eventHandlers: any = {};

    const mockService: any = {
        registerAssetJob: async (jobDetails: IAssetJobDetails) => {
            console.log(`A job has been registered.`);
            console.log(jobDetails);

            registeredJobDetails = jobDetails;
        },

        on: async (eventName: string, eventHandler: EventHandlerFn<any>) => {
            eventHandlers[eventName] = eventHandler;
        },

        start: async () => {
            console.log("Service has started.");
        },

        emit: async (eventName: string, eventPayload: any) => {
            console.log(`Emitted event: ${eventName}, with payload:`);
            console.log(eventPayload);
        },
    };

    // Start the microservice.
    await main(mockService);

    // Create a test job.
    const assetJob: IAssetJob = {
        assetId: "asset-id",
        accountId: "account-id",
        jobId: "job-id",
        mimeType: "image/jpg",
        userId: "user-id",
        encoding: "not-important"
    };
    
    // Invoke your job handler.
    await registeredJobDetails!.jobFn(mockService, assetJob);
}

testbed()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Testbed failed:");
        console.error(err && err.stack || err);
    });