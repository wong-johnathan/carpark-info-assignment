# Getting Started with the Application

This guide provides step-by-step instructions to spin up the application using Docker and Docker Compose. The application consists of a backend service and a database, orchestrated using `docker-compose.yml`.

---

## Prerequisites

Before proceeding, ensure the following are installed on your system:

1. **Docker**:
   - Install Docker from [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).
   - Verify the installation by running:
     ```bash
     docker --version
     ```

2. **Docker Compose**:
   - Docker Compose is included with Docker Desktop for Windows and macOS. For Linux, you may need to install it separately.
   - Install Docker Compose by following the instructions at [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).
   - Verify the installation by running:
     ```bash
     docker-compose --version
     ```

3. **Node.js** (optional, for local development):
   - Install Node.js from [https://nodejs.org/](https://nodejs.org/).
   - Verify the installation by running:
     ```bash
     node --version
     npm --version
     ```

---

## Steps to Start the Application

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/wong-johnathan/carpark-info-assignment.git
cd carpark-info-assignment
```

---

### 2. Build and Start the Application
Run the following command to build the Docker images and start the application:
```bash
docker-compose up
```

This will:
- Build the backend service using the `Dockerfile`.
- Start the backend service and database as defined in `docker-compose.yml`.
- Expose the backend service on port `3000`.

---

### 3. Access the Application
Once the containers are up and running, you can access the backend service at:
```
http://localhost:3000
```

---

### 4. Stopping the Application
To stop the application, press `Ctrl + C` in the terminal where `docker-compose up` is running. Alternatively, you can stop the containers using:
```bash
docker-compose down
```

---

### 5. Rebuilding the Application
If you make changes to the code or the `Dockerfile`, rebuild the containers using:
```bash
docker-compose up --build
```

---

## Running Tests

The application includes a test suite that uses **Docker Compose** to spin up a **test database** and **Jest** to run the tests.

### Running Tests with Docker

To run the tests, use the following command:
```bash
npm run test
```

This script does the following:
1. Starts the **test database** using `docker-compose-test.yml`.
2. Runs the tests using Jest.

---

### Running Tests Locally

If you prefer to run the tests locally without Docker, follow these steps:

1. Start the **test database** using Docker Compose:
   ```bash
   docker-compose -f docker-compose-test.yml up db_test
   ```

2. Run the tests locally using Jest:
   ```bash
   npm run test:only
   ```

   This script runs the tests using Jest without spinning up Docker containers.

---

### Test Scripts in `package.json`

Here’s a breakdown of the test-related scripts in `package.json`:

```json
"scripts": {
  "start": "node dist/server.js",
  "build": "tsc",
  "dev": "nodemon --legacy-watch --exec ts-node src/server.ts",
  "lint": "eslint src --ext .ts",
  "format": "prettier --write src/**/*.ts",
  "test": "docker-compose -f docker-compose-test.yml up --build",
  "test:only": "jest --runInBand --forceExit --detectOpenHandles"
}
```

- **`npm run test`**:
  - Uses Docker Compose to spin up the **test database** and run the tests.
  - This is the recommended way to run tests in a clean, isolated environment.

- **`npm run test:only`**:
  - Runs the tests locally using Jest.
  - Use this if you already have the **test database** running (e.g., via Docker).

---

That's it! You should now have the application up and running. If you encounter any issues, refer to the logs or check the Docker documentation for further assistance.

---

### Testing Workflow Summary

1. **Run Tests with Docker**:
   ```bash
   npm run test
   ```

2. **Run Tests Locally**:
   - Start the test database:
     ```bash
     docker-compose -f docker-compose-test.yml up db_test
     ```
   - Run the tests:
     ```bash
     npm run test:only
     ```

This setup ensures that your tests run in an isolated environment and can also be executed locally for faster development cycles.