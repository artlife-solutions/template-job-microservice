# template-job-microservice

A tiny template for bootstrapping a new job-queue-based microservice.

## Pre reqs

- You need Node.js 14 installed to run the microservice (use NVM, the node version manager, if you need to switch between versions of Node.js).
- You need Docker and Docker-Compose installed to run the RabbitMQ instance (just install Docker for Desktop for your platform, it should come with everything you need).

## Running in development (with real RabbitMQ)

- Clone this repo.
- Open a terminal and cd into the repo.
- Now run Docker-Compose, this boots a RabbitMQ instances which you need for this type of microservice:

```bash
docker-compose up
```

TODO: This doesn't work properly yet because there is no job-queue microservice to connect to.

- Now open a second terminal to run the microservice. Cd into the repo.
- First install dependencies:

```bash
npm install
```

- Now run in development mode:

```bash
npm run start:dev
```

Running in dev mode uses nodemon, so you can edit code and the microservice will automatically restart and reload the updated code.

## Running in development (with mock RabbitMQ & job-queue)

Run the testbed that has mock dependencies like this:

```bash
npm test
```

## How to know that the microservice is started

"Online" should be printed in the console if started successfully.

You can also point your browser at http://localhost:3000/is-alive to see if the microservice is handing HTTP requests.

## Invoking a job

To run job handler the job-based microservice you need to invoke a job.

TODO

## Running in production

To run in production, first build TypeScript code to JavaScript:

```bash
npm run build
```

Now run using the normal start command:

```bash
npm start
```