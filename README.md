# VibeNTribe - Local Development Setup

This project provides a containerized environment for local development and testing using Docker and Docker Compose.

## Prerequisites

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)
*   Node.js and npm (or yarn) installed on your host machine (for local development and testing)

## Project Structure

```
.
├── api/             # API server code
│   ├── Dockerfile   # Dockerfile for the API
│   ├── package.json # API dependencies and scripts
│   ├── src/         # API source code
│   │   ├── index.ts # Main entry point
│   │   └── ...
│   └── tsconfig.json # TypeScript configuration
├── client/          # Client (React) code
│   ├── Dockerfile   # Dockerfile for the client
│   ├── package.json # Client dependencies and scripts
│   ├── src/         # Client source code
│   │   ├── App.tsx  # Main application component
│   │   ├── main.tsx # Entry point
│   │   └── ...
│   ├── vite.config.ts # Vite configuration
│   └── index.css    # Tailwind CSS
├── database/        # Database initialization scripts
│   └── init.sql     # SQL script to initialize the database
├── docker-compose.yml # Docker Compose configuration
└── README.md        # This file
```

## Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Create `.env` files:**

    Create `.env` files in both the `api` and `client` directories.  Populate them with the necessary environment variables.  Example:

    ```
    # api/.env
    NODE_ENV=development
    PORT=3001
    DATABASE_URL=postgres://user:password@db:5432/mydb
    REDIS_URL=redis://redis:6379
    ```

    ```
    # client/.env
    NODE_ENV=development
    API_URL=http://api:3001
    ```

3.  **Build and Start the Containers:**

    ```bash
    docker-compose up --build
    ```

    This command will:
    *   Build the API and client images.
    *   Create and start the database and Redis containers.
    *   Start the API and client services, with hot-reloading enabled for code changes.

## Usage

*   **Access the application:**
    *   Frontend: Open your web browser and go to `http://localhost:3000`.
    *   Backend: The API is accessible internally within the Docker network.  You can access it from the client or other services using the service name (e.g., `http://api:3001`).

*   **Stop the application stack:**

    ```bash
    docker-compose down
    ```

## Testing

*   **Run API tests:**

    ```bash
    docker-compose run api_tests
    ```

*   **Run client tests:**

    ```bash
    docker-compose run client_tests
    ```

## Troubleshooting

*   **Database Initialization Issues:** If the database initialization script (`/database/init.sql`) fails, check the logs of the `db` container for errors. Ensure the script is valid and the database user has the necessary permissions.
*   **Port Conflicts:** If you encounter port conflicts, modify the host ports in the `docker-compose.yml` file.
*   **Build Errors:** Review the build logs for the failing service to identify the cause of the error.  Ensure all dependencies are correctly specified in the `package.json` files.
*   **Environment Variables:** Double-check the `.env` files in both the `api` and `client` directories to ensure all required environment variables are set correctly.
*   **Network Connectivity:** Verify that the service names in the `docker-compose.yml` file are used correctly in the application code (e.g., `http://api:3001` for the API URL).
