# Microservices Project (Node.js + Vue + Docker)

This project demonstrates a simple microservices architecture using Node.js, MongoDB, RabbitMQ, and Vue 3. The system includes:

- **User Service** – handles user data (MongoDB)
- **Task Service** – handles tasks and publishes events to RabbitMQ
- **Notification Service** – listens for task creation events from RabbitMQ
- **API Gateway** – routes requests to microservices
- **Frontend** – Vue 3 app served via Nginx in Docker

---

# Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Microservices](https://img.shields.io/badge/Microservices-F5A623?style=for-the-badge&logo=containerd&logoColor=white)

## Folder Structure

```text
microservice/
├── api-gateway/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── front-end/
│   ├── src/
│   │   └── main.vue
│   ├── package.json
│   └── Dockerfile
├── user-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── task-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── notification-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml

```


---

## Prerequisites

- Docker & Docker Compose installed
- Node.js (for local development if needed)
- npm or yarn

---

## Services Overview

### MongoDB
- Container: `mongo`
- Port: `27017`
- Stores users and tasks data

### RabbitMQ
- Container: `rabbitmq`
- Ports:
  - `5672` → messaging
  - `15672` → management UI (`guest:guest`)

### API Gateway
- Container: `api-gateway`
- Port: `3000`
- Routes:
  - `/users` → user-service
  - `/tasks` → task-service

### User Service
- Container: `user-service`
- Port: `3001`
- API Endpoints:
  - `GET /users` → list users
  - `POST /users` → create user

### Task Service
- Container: `task-service`
- Port: `3002`
- API Endpoints:
  - `GET /tasks` → list tasks
  - `POST /tasks` → create task and send RabbitMQ message

### Notification Service
- Container: `notification-service`
- Listens to RabbitMQ queue `task_created` and logs new tasks

### Frontend
- Container: `front-end`
- Port: `5173`
- Vue 3 app that fetches `/users` from API Gateway
- Served via Nginx

---

## Running the Project

1. **Build and start all containers:**

```bash
docker-compose up --build


docker ps

Access services:

Frontend: http://localhost:5173
API Gateway: http://localhost:3000
RabbitMQ UI: http://localhost:15672
MongoDB: mongodb://localhost:27017
