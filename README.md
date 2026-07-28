# 🚀 FlowCommerce.AI

### Architecture • Observability • Infrastructure in Motion

A production-grade cloud-native e-commerce platform built to demonstrate modern DevOps practices, distributed systems, CI/CD pipelines, observability, and real-time infrastructure visualization.

![React](https://img.shields.io/badge/React-19-blue)
![TanStack](https://img.shields.io/badge/TanStack-Start-orange)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![Postgres](https://img.shields.io/badge/PostgreSQL-16-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

FlowCommerce.AI is a cloud-native e-commerce simulation platform designed to visualize how requests travel through a modern production infrastructure.

Instead of demonstrating a simple shopping application, FlowCommerce focuses on infrastructure, observability, and deployment pipelines.

The project simulates an enterprise production environment where every request can be traced across multiple services including:

- API Gateway
- Authentication
- Product Catalog
- Cart Service
- Order Service
- Payment
- Inventory
- Shipping
- Notification
- PostgreSQL
- Redis
- Kafka

## Why FlowCommerce?

Modern applications are no longer monoliths.

Understanding distributed systems, observability, deployment pipelines, and request tracing has become essential for every DevOps Engineer, Platform Engineer, and SRE.

FlowCommerce demonstrates these concepts visually instead of only explaining them.

## Features

- Interactive Infrastructure Visualizer
- Production Traffic Simulation
- Distributed Request Flow
- Kubernetes Architecture Simulation
- Live Infrastructure Metrics
- Deployment Timeline
- API Gateway Simulation
- Service Dependency Graph
- Dockerized Architecture
- CI/CD Ready
- Responsive UI
- Modern SaaS Landing Page

## Screenshots

### Landing Page

<img src="./docs/images/landing.png"/>

---

### Infrastructure Visualizer

<img src="./docs/images/visualizer.png"/>

---

### Request Flow

<img src="./docs/images/request-flow.png"/>

## Architecture

```mermaid
graph LR

User

↓

React Frontend

↓

API Gateway

↓

Authentication

↓

Catalog

↓

Cart

↓

Order

↓

Payment

↓

Inventory

↓

Shipping

↓

Notification

↓

PostgreSQL
```

## Tech Stack

### Frontend

- React 19
- TanStack Start
- TanStack Router
- TanStack Query
- Framer Motion
- TailwindCSS

### Backend

- Node.js
- Express

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose
- Nginx
- AWS EC2

### DevOps

- GitHub Actions
- CI/CD
- Docker

FlowCommerce

Frontend/

src/

components/

routes/

visualizer/

Backend/

server.js

Dockerfile

docker-compose.yml

nginx/

README.md

## Installation

```bash
git clone https://github.com/yourname/FlowCommerce.git

cd FlowCommerce

npm install

npm run dev
```

## Run using Docker

```bash
docker compose up --build
```

## Infrastructure Visualizer

The Infrastructure Visualizer is the core feature of FlowCommerce.

It provides a real-time representation of production traffic flowing through a distributed architecture.

Features include:

- Live request animation
- Request tracing
- Service communication
- Deployment timeline
- Infrastructure metrics
- Service health
- Production topology

## DevOps Concepts Demonstrated

- Docker
- Reverse Proxy
- Production Deployment
- Infrastructure Visualization
- Cloud Native Design
- Observability
- Distributed Systems
- Microservices Architecture

## Roadmap

- Kubernetes Deployment
- Helm Charts
- Prometheus Integration
- Grafana Dashboards
- Jaeger Tracing
- Kafka Event Streaming
- Redis Caching
- Terraform Infrastructure
- AWS ECS Deployment

## Author

**Rakesh Sirvi**

DevOps Engineer

LinkedIn

Portfolio

GitHub