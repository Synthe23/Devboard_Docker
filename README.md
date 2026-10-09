🚀 DevBoard — Dockerized Full-Stack Microservices Project

A full-stack task management platform built with React, Node.js, Express.js, MongoDB, and Docker. The application uses a microservices architecture and Docker Compose to run the entire system.

This project is designed to refresh my Docker knowledge through practical implementation, debugging, and container orchestration.

🎯 Project Objectives

* Build a full-stack application using JavaScript.
* Develop a React frontend with Vite.
* Create 3 backend services using Node.js and Express.js.
* Use MongoDB for persistent data storage.
* Use ES Modules (import / export) across the backend.
* Containerize every application service using Docker.
* Run the entire application using a single Docker Compose configuration.
* Practice Docker networking, volumes, environment variables, health checks, and multi-stage builds.
* Understand container communication and troubleshoot common Docker problems.
* Learn development and production Docker configurations.

⸻

🛠️ Tech Stack

Frontend

* React
* Vite
* JavaScript
* Axios
* React Router

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs

DevOps and Infrastructure

* Docker
* Docker Compose
* Docker Networks
* Docker Volumes
* Environment Variables
* Health Checks
* Multi-Stage Builds
* Nginx

⸻

🏗️ Application Architecture

The application consists of a frontend, an API gateway, two backend microservices, and MongoDB.

                    ┌─────────────────────┐
                    │    React Frontend   │
                    │       :5173         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     API Gateway     │
                    │       :4000         │
                    └──────────┬──────────┘
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
             ┌──────────────┐    ┌──────────────┐
             │ Auth Service │    │ Task Service │
             │    :4001     │    │    :4002     │
             └──────┬───────┘    └──────┬───────┘
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      :27017         │
                    └─────────────────────┘

Services

Service	Responsibility	Port
Frontend	User interface and API requests	5173
API Gateway	Routes requests to backend services	4000
Auth Service	Registration, login, and authentication	4001
Task Service	Task creation and management	4002
MongoDB	Persistent database storage	27017

All application services and MongoDB will be managed through Docker Compose.

Important: Containers will communicate through Docker Compose service names rather than using localhost to reach other containers.

For example:

http://auth-service:4001
http://task-service:4002
mongodb://mongodb:27017/devboard

⸻

📅 7-Day Development Roadmap

📌 DAY 1 — Project Setup and React Frontend

Goal: Set up the repository and build the initial frontend.

Section 1: Project Initialization

* Task 1.1: Create the root project directory named devboard.
* Task 1.2: Initialize Git using git init.
* Task 1.3: Create the root .gitignore file.
* Task 1.4: Create the frontend/ directory.
* Task 1.5: Create the gateway/ directory.
* Task 1.6: Create the auth-service/ directory.
* Task 1.7: Create the task-service/ directory.
* Task 1.8: Create the initial README.md.

Section 2: React Frontend

* Task 2.1: Initialize React with Vite inside frontend/.
* Task 2.2: Install frontend dependencies.
* Task 2.3: Install Axios and React Router.
* Task 2.4: Create the Login page.
* Task 2.5: Create the Register page.
* Task 2.6: Create the Dashboard page.
* Task 2.7: Create the Tasks page.
* Task 2.8: Add basic navigation between pages.
* Task 2.9: Run the frontend locally and verify that it works.

Day 1 Completion Criteria

* The Git repository is initialized.
* The React application runs successfully.
* The initial pages and navigation are working.
* The project directories are organized correctly.

⸻

📌 DAY 2 — Authentication Microservice

Goal: Build a functional authentication service using Node.js, Express.js, and MongoDB.

Section 3: Auth Service Setup

* Task 3.1: Initialize the Node.js project inside auth-service/.
* Task 3.2: Configure ES Modules using "type": "module".
* Task 3.3: Install Express, Mongoose, dotenv, bcryptjs, and jsonwebtoken.
* Task 3.4: Create the src/ directory.
* Task 3.5: Create src/server.js.
* Task 3.6: Create src/app.js.
* Task 3.7: Configure the server to run on port 4001.
* Task 3.8: Implement GET /health.
* Task 3.9: Verify that ES Module imports work correctly.

Section 4: Authentication APIs

* Task 4.1: Create the User Mongoose model.
* Task 4.2: Implement POST /auth/register.
* Task 4.3: Validate registration input.
* Task 4.4: Hash passwords before storing them.
* Task 4.5: Prevent duplicate email registrations.
* Task 4.6: Implement POST /auth/login.
* Task 4.7: Generate a JWT after successful authentication.
* Task 4.8: Implement GET /auth/me with authentication middleware.
* Task 4.9: Test all authentication endpoints using Postman or another API client.

Day 2 Completion Criteria

* The authentication service runs locally.
* User data can be stored in MongoDB.
* Registration and login work correctly.
* Passwords are hashed.
* Protected routes validate authentication tokens.

⸻

📌 DAY 3 — Task Microservice and API Gateway

Goal: Build the second microservice and connect the backend services.

Section 5: Task Service

* Task 5.1: Initialize the Node.js project inside task-service/.
* Task 5.2: Configure ES Modules.
* Task 5.3: Install Express, Mongoose, dotenv, and jsonwebtoken.
* Task 5.4: Configure the service to run on port 4002.
* Task 5.5: Create the Task Mongoose model.
* Task 5.6: Add title, description, status, priority, and user ID fields.
* Task 5.7: Implement POST /tasks.
* Task 5.8: Implement GET /tasks.
* Task 5.9: Implement GET /tasks/:id.
* Task 5.10: Implement PUT /tasks/:id.
* Task 5.11: Implement DELETE /tasks/:id.
* Task 5.12: Protect task endpoints using JWT authentication.
* Task 5.13: Ensure users can access and modify only their own tasks.

Section 6: API Gateway

* Task 6.1: Initialize the gateway Node.js project.
* Task 6.2: Configure ES Modules.
* Task 6.3: Install Express, Axios, and dotenv.
* Task 6.4: Configure the gateway to run on port 4000.
* Task 6.5: Create routes for authentication requests.
* Task 6.6: Forward authentication requests to the Auth Service.
* Task 6.7: Create routes for task requests.
* Task 6.8: Forward task requests to the Task Service.
* Task 6.9: Add error handling for unavailable downstream services.
* Task 6.10: Test gateway routing locally.

Day 3 Completion Criteria

* Both backend microservices work locally.
* The API Gateway forwards requests correctly.
* Authentication and task APIs are functional.
* User-specific task authorization is implemented.

⸻

📌 DAY 4 — Dockerfiles and MongoDB Container

Goal: Containerize the applications and understand Docker image creation.

Section 7: Dockerize Auth Service

* Task 7.1: Create auth-service/Dockerfile.
* Task 7.2: Choose an appropriate Node.js base image.
* Task 7.3: Configure the working directory.
* Task 7.4: Copy dependency manifests and install dependencies.
* Task 7.5: Copy the application source code.
* Task 7.6: Configure the container startup command.
* Task 7.7: Build the Docker image.
* Task 7.8: Run and test the Auth Service container.

Section 8: Dockerize Task Service and Gateway

* Task 8.1: Create task-service/Dockerfile.
* Task 8.2: Build the Task Service image.
* Task 8.3: Create gateway/Dockerfile.
* Task 8.4: Build the Gateway image.
* Task 8.5: Run each container individually.
* Task 8.6: Inspect images using docker images.
* Task 8.7: Inspect running containers using docker ps.
* Task 8.8: Read container logs using docker logs.

Section 9: MongoDB

* Task 9.1: Understand the official MongoDB Docker image.
* Task 9.2: Run MongoDB in a container.
* Task 9.3: Configure MongoDB environment variables.
* Task 9.4: Create a named Docker volume for database persistence.
* Task 9.5: Connect a backend service to MongoDB.
* Task 9.6: Verify that database operations work inside the containerized setup.

Day 4 Completion Criteria

* Docker images exist for the three backend services.
* The Auth Service can run inside a container.
* The Task Service can run inside a container.
* The Gateway can run inside a container.
* MongoDB runs in its own container.

⸻

📌 DAY 5 — Docker Compose and Networking

Goal: Run the entire backend infrastructure with one command.

Section 10: Docker Compose

* Task 10.1: Create the root docker-compose.yml.
* Task 10.2: Configure the MongoDB service.
* Task 10.3: Configure the Auth Service.
* Task 10.4: Configure the Task Service.
* Task 10.5: Configure the API Gateway.
* Task 10.6: Configure the React frontend.
* Task 10.7: Define the MongoDB named volume.
* Task 10.8: Define a custom Docker network.
* Task 10.9: Configure service ports and environment variables.
* Task 10.10: Start the application using docker compose up --build.
* Task 10.11: Verify all containers using docker compose ps.

Section 11: Docker Networking

* Task 11.1: Understand Docker Compose service-name DNS.
* Task 11.2: Connect the Gateway to the Auth Service.
* Task 11.3: Connect the Gateway to the Task Service.
* Task 11.4: Connect both backend services to MongoDB.
* Task 11.5: Replace inter-container localhost URLs with service names.
* Task 11.6: Verify connectivity between containers.
* Task 11.7: Understand the difference between host ports and container ports.

Section 12: Environment Variables

* Task 12.1: Create a root .env file for local Compose configuration.
* Task 12.2: Configure the MongoDB connection string.
* Task 12.3: Configure the JWT secret.
* Task 12.4: Configure internal service URLs.
* Task 12.5: Pass the appropriate environment variables to each service.
* Task 12.6: Ensure secrets are excluded from Git.
* Task 12.7: Verify that missing environment variables are handled correctly.

Day 5 Completion Criteria

* All services start using Docker Compose.
* The frontend can reach the Gateway.
* The Gateway can reach both microservices.
* Both microservices can connect to MongoDB.
* Containers communicate using service names.
* No application code relies on localhost for inter-container communication.

⸻

📌 DAY 6 — Health Checks, Debugging, and Persistence

Goal: Learn how to diagnose and resolve common Docker problems.

Section 13: Health Checks and Startup Dependencies

* Task 13.1: Add a health endpoint to every backend service.
* Task 13.2: Configure a MongoDB health check.
* Task 13.3: Configure health checks for the backend services.
* Task 13.4: Configure appropriate startup dependencies.
* Task 13.5: Use health-based dependency conditions where appropriate.
* Task 13.6: Understand why depends_on alone does not guarantee application readiness.
* Task 13.7: Ensure services can recover from temporary database connection failures.

Section 14: Docker Debugging

* Task 14.1: Inspect containers using docker ps -a.
* Task 14.2: Inspect application logs using docker compose logs.
* Task 14.3: Follow logs using docker compose logs -f.
* Task 14.4: Open a shell inside a running container using docker exec.
* Task 14.5: Inspect container environment variables.
* Task 14.6: Inspect the Docker network.
* Task 14.7: Inspect the MongoDB volume.
* Task 14.8: Diagnose a deliberately incorrect service URL.
* Task 14.9: Diagnose a service running on the wrong port.
* Task 14.10: Diagnose a MongoDB connection failure.
* Task 14.11: Rebuild a service after modifying its source code.

Section 15: Volumes and Persistence

* Task 15.1: Create a user and several tasks.
* Task 15.2: Run docker compose down.
* Task 15.3: Restart the application and verify that the data remains.
* Task 15.4: Understand the difference between containers and volumes.
* Task 15.5: Understand the difference between docker compose down and docker compose down -v.
* Task 15.6: Learn when deleting volumes is dangerous.
* Task 15.7: Verify that the named MongoDB volume is being used.

Day 6 Completion Criteria

* Health checks work correctly.
* Container logs can be inspected.
* Common network and connection errors can be diagnosed.
* MongoDB data persists across container recreation.
* The difference between removing containers and removing volumes is understood.

⸻

📌 DAY 7 — Production Builds and Final Challenges

Goal: Optimize the application and consolidate Docker knowledge.

Section 16: Production Dockerfiles

* Task 16.1: Review the existing development Dockerfiles.
* Task 16.2: Create a multi-stage Dockerfile for the React frontend.
* Task 16.3: Build the React application into static files.
* Task 16.4: Serve the frontend using Nginx.
* Task 16.5: Configure Nginx to serve the React application correctly.
* Task 16.6: Configure frontend API requests for the production setup.
* Task 16.7: Verify that React Router routes work when refreshed.
* Task 16.8: Run the production frontend container.

Section 17: Docker Optimization

* Task 17.1: Create .dockerignore files for the frontend and backend services.
* Task 17.2: Exclude node_modules, .git, local environment files, and unnecessary build artifacts.
* Task 17.3: Optimize Dockerfile layer ordering.
* Task 17.4: Understand Docker build caching.
* Task 17.5: Rebuild an image without changing dependencies.
* Task 17.6: Observe which build layers are reused.
* Task 17.7: Avoid copying development-only files into production images.

Section 18: Final Docker Challenges

* Task 18.1: Change a host port without changing the application’s container port.
* Task 18.2: Break an internal service URL and diagnose the issue.
* Task 18.3: Stop MongoDB and observe the backend behavior.
* Task 18.4: Inspect the custom Docker network.
* Task 18.5: Inspect the named MongoDB volume.
* Task 18.6: Rebuild one service without unnecessarily rebuilding every image.
* Task 18.7: Experiment with scaling the Task Service.
* Task 18.8: Investigate why scaling a service with a fixed host-port mapping causes problems.
* Task 18.9: Explain how a reverse proxy or load balancer could distribute requests across replicas.
* Task 18.10: Start the complete application from a clean checkout using Docker Compose.

Section 19: Final End-to-End Testing

* Task 19.1: Register a new user.
* Task 19.2: Log in and obtain a JWT.
* Task 19.3: Create a task.
* Task 19.4: Retrieve all tasks belonging to the logged-in user.
* Task 19.5: Update a task.
* Task 19.6: Delete a task.
* Task 19.7: Verify that users cannot modify another user’s tasks.
* Task 19.8: Restart the containers and verify database persistence.
* Task 19.9: Verify that the production frontend communicates with the Gateway.
* Task 19.10: Document how to start, stop, debug, and rebuild the application.

Day 7 Completion Criteria

* The production frontend runs using Nginx.
* Multi-stage builds are working.
* Docker build caching has been tested.
* The complete application works end to end.
* All Docker challenges have been attempted.
* The README contains working setup and troubleshooting instructions.

⸻

🐳 Essential Docker Commands

Commands to practice throughout the project.

Images

docker images
docker build -t devboard-auth ./auth-service
docker image inspect devboard-auth
docker image history devboard-auth

Containers

docker ps
docker ps -a
docker inspect <container-name>
docker logs <container-name>
docker logs -f <container-name>
docker exec -it <container-name> sh

Docker Compose

docker compose config
docker compose up
docker compose up --build
docker compose up -d
docker compose ps
docker compose logs
docker compose logs -f auth-service
docker compose down

Networks

docker network ls
docker network inspect <network-name>

Volumes

docker volume ls
docker volume inspect <volume-name>

Cleanup

docker compose down

To remove Compose-managed volumes as well:

docker compose down -v

Warning: The second command can delete persistent database data stored in Compose-managed volumes. Use it only when you intentionally want to remove that data.

⸻

📁 Expected Project Structure

devboard/
│
├── README.md
├── .gitignore
├── .env
├── docker-compose.yml
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│
├── gateway/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── routes/
│       └── middleware/
│
├── auth-service/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── models/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       └── services/
│
└── task-service/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    └── src/
        ├── app.js
        ├── server.js
        ├── config/
        ├── models/
        ├── controllers/
        ├── routes/
        ├── middleware/
        └── services/

⸻

📚 Docker Concepts Checklist

Track your understanding of each concept.

* Docker images vs. containers
* Dockerfiles and build contexts
* Docker image layers
* Docker build cache
* Port mapping
* Environment variables
* Docker Compose
* Custom bridge networks
* Container DNS and service names
* Named volumes
* Container persistence
* Health checks
* Startup dependencies
* Container logs
* Container inspection
* Interactive container shells
* .dockerignore
* Multi-stage builds
* Production containers
* Container scaling
* Docker resource cleanup

⸻

🏁 Final Success Criteria

The project is complete when:

1. The React frontend works.
2. The API Gateway routes requests correctly.
3. The Auth Service handles registration and authentication.
4. The Task Service manages user-specific tasks.
5. MongoDB stores users and tasks persistently.
6. All services use ES Modules.
7. Docker Compose starts the complete application.
8. Services communicate through Docker networking.
9. MongoDB data survives container recreation.
10. Health checks, logs, and debugging workflows work.
11. The production frontend runs using Nginx.
12. The application can be rebuilt and started from a clean checkout.

⸻

💡 Rules for This Project

* Write the application code yourself before looking at complete solutions.
* Use JavaScript rather than TypeScript for this project.
* Use ES Modules (import / export) for backend code.
* Keep Docker Compose at the project root.
* Do not install MongoDB directly on the host for this project; run it in Docker.
* Do not use localhost for communication between containers.
* Keep .env files and secrets out of Git.
* Test each service locally before containerizing it.
* Practice debugging instead of immediately deleting and recreating everything.
* Avoid deleting volumes unless you intentionally want to remove persistent data.
* Commit completed milestones to Git.

Target completion time: 7 days, spending approximately 1.5–2 hours daily.

Primary goal: Become comfortable building, containerizing, running, debugging, and maintaining a multi-service JavaScript application with Docker and Docker Compose.