# 🚀 FlowCommerce.AI

<p align="center">

Architecture • Observability • Infrastructure in Motion

</p>

<p align="center">

A production-grade cloud-native e-commerce platform built to visualize how modern applications work behind every click.

</p>

---

## 🌐 Live Demo

🔗 https://flowcommerce.ai

---

## ⚡ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,typescript,nodejs,express,postgres,docker,aws,nginx,git,github,vscode" />

<br/>

<img src="https://img.shields.io/badge/TanStack-Start-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge" />
<img src="https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" />

</div>

---

## 💡 Why FlowCommerce?

FlowCommerce is more than an e-commerce application.

It is a cloud-native infrastructure simulator built to demonstrate how production systems behave under real-world traffic.

The platform allows developers, DevOps engineers, and recruiters to visualize every request as it flows through a distributed architecture.

### Features

- 🚀 Interactive Infrastructure Visualizer
- 📊 Production Traffic Simulation
- 🔄 Distributed Request Flow
- ⚡ API Gateway Simulation
- 🐳 Dockerized Deployment
- ☁️ AWS Ready
- 📈 Modern SaaS Landing Page
- 🎯 Recruiter Friendly Architecture Demo

---

## 🏗 Project Architecture

```text
               Internet
                   │
                   ▼
          React + TanStack Start
                   │
                   ▼
             API Gateway
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
 Authentication  Catalog        Cart
       │            │             │
       └──────┬─────┴─────────────┘
              ▼
            Orders
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
 Payment  Inventory  Shipping
              │
              ▼
        Notification
              │
              ▼
         PostgreSQL
```

---

## 📂 Project Structure

```text
FlowCommerce
│
├── Frontend
│   ├── src
│   ├── routes
│   ├── components
│   └── assets
│
├── Backend
│   ├── server.js
│   ├── routes
│   └── controllers
│
├── nginx
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Rakeshcrv/FlowCommerce.git
```

Go to the project

```bash
cd FlowCommerce
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

---

## 🐳 Docker Installation

Build the containers

```bash
docker compose build
```

Run the application

```bash
docker compose up
```

Run in detached mode

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

## 👨‍💻 Author

### Rakesh Sirvi

DevOps Engineer • Cloud & Infrastructure Enthusiast

🌐 Portfolio

https://rakeshsirvi.site

💼 LinkedIn

https://www.linkedin.com/in/rakeshsirvi/

🐙 GitHub

https://github.com/Rakeshcrv