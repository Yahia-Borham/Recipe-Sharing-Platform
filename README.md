# 🍽️ Recipe Sharing Platform

A **compact Node.js + Express + Mongoose** application for creating, sharing, and reviewing recipes.

---
## 📑 Table of Contents
1. [Project Overview]
2. [Quick Start]
3. [Environment ]
5. [Postman API Documentation]
---
## 🧭 Project Overview

A REST API for sharing and managing recipes with **role-based access control** (`user` / `chef`) and **JWT authentication**.


## ⚡ Quick Start

1️⃣npm install  
2️⃣nodemon app.js


## 🔧 Environment Variables

Create a file named .env or config.env in your project root and include the following variables:
```bash
USERNAME=Yahia
PORT=3000
DATABASEPASS=your_db_password_here
DATABASECONNECTION=mongodb+srv://<user>:<DATABASEPASS>@cluster0.mongodb.net/Recipe-Sharing-Platform
JWT_SCRET=always_stay_horny
EXPIRATION_DATE=90d
```
Note: Change the DATABASE and DATABASECONNECTION depending on your database
## 📘 Postman API Documentation

You can explore and test all API endpoints using the following Postman collections:

| Collection | Description | Link |
|-------------|--------------|------|
| **API Collection #1** | Core recipe and user endpoints | [View on Postman →](https://documenter.getpostman.com/view/43137819/2sB3Wk14ir) |
| **API Collection #2** | Authentication & chef-specific routes | [View on Postman →](https://documenter.getpostman.com/view/43137819/2sB3WmS28t) |
| **API Collection #3** | Full project documentation | [View on Postman →](https://documenter.getpostman.com/view/43137819/2sB3WmS28u) |

---
# 

