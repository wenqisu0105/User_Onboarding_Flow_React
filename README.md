# Getting Started

- System requirements
  - Node.JS v16
- In the [server](./server) directory:
  - Set server environment variables.
    Create a `.env` file and copy the contents from [.env.sample](.env.sample)
  - Install dependencies
    ```
    yarn
    ```
  - Start the dev server
    ```
    yarn start
    ```
- From another terminal, in the [client](./client) directory:
  - Install dependencies
    ```
    yarn
    ```
  - Start the client
    ```
    yarn start
    ```

# Getting Started (Docker)

Instead of following the steps above, you can also use Docker to set up your environment.

- System requirements
  - [Docker Compose](https://docs.docker.com/compose/install/)
- Run `docker-compose up` from the root directory to spin up the application.
  - **Note**: `yarn` can sometimes take a long time to run and may appear to get stuck at certain steps. This is a [known problem](https://github.com/yarnpkg/yarn/issues/7747) and is expected.
- Enter `Ctrl-C` in the same same terminal or `docker-compose down` in a separate terminal to shut down the server.

# Verify That Everything Is Set Up Correctly

If the application is running correctly, you should be able to access it from your browser by going to http://localhost:3000/.


