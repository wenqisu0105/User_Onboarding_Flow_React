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

If your application is running correctly, you should be able to access it from your browser by going to http://localhost:3000/.

# Helpful Commands

## Server

From inside the [server](./server/) directory:

- `yarn prettier --write .`: Runs autoformatter.
- `yarn test`: This repository contains a non-comprehensive set of unit tests used to determine if your code meets the basic requirements of the assignment. **Please do not modify these tests.**
- `yarn seed`: Resets database and populates it with sample data.

## Client

From inside the [client](./client/) directory:

- `yarn prettier --write .`: Runs autoformatter
- `yarn cypress run`: This repository contains a non-comprehensive set of tests used to determine if your code meets the basic requirements of the assignment. To run these tests, you must have the client running in a separate terminal. **Please do not modify these tests.**

# Common Setup Errors

- If you encounter an error related to `secretOrPrivateKey` when attempting to make a request, please ensure you have created a .env file in the root directory as per the _Getting Started_ instructions.
- You might encounter `ERR_DLOPEN_FAILED` when you try to install dependencies locally then run the server in docker (or vice versa). In case of error, try removing the `node_modules` directory and restart `docker-compose up`.
