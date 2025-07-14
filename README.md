# 🧠 Social Media Engagement Backend 

A robust backend application for a social media engagement platform, built with secure authentication, role-based access control, and RESTful APIs. Users can register, log in, create posts, and comment on others' posts, while admins have elevated privileges to manage all content

<img width="1502" height="583" alt="social" src="https://github.com/user-attachments/assets/49bed372-a5d9-4d61-8d7d-dba49462cf76" />

## 📌 Features

### 👤 Users
- ✅ Register and Login (with JWT auth)
- 📝 Create Posts (only when logged in)
- 🔄 Update/Delete own Posts
- 💬 Add Comments on any Post
- 🕵️ View their own Posts and Comments
- ✏️ Update/Delete their own Comments

### 🛡️ Admin
- 🔍 View all Users
- 📄 View all Posts and Comments by any user
- 🛠️ Update and Delete any Post or Comment

---
## 🗃️ Models Overview (Prisma Schema)

### 🧑‍💻 User
- `userId`
- `name`
- `email`
- `posts` → `Post[]`
- `comments` → `Comment[]`

### 📝 Post
- `postId`
- `postTitle`
- `postContent`
- `user` → ref to `User`
- `comments` → `Comment[]`

### 💬 Comment
- `commentId`
- `commentContent`
- `commentBy` → ref to `User`
- `inWhichPost` → ref to `Post`

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Testing**: Postman
- **Containerization**: Docker

---
#📂 Folder Structure
```
.
├── prisma/                         # Prisma schema and migrations
│   └── schema.prisma
│
├── src/
│   ├── controllers/               # Handles request-response logic
│   │   ├── admin/                 # Admin-related route handlers
│   │   ├── comments/              # Comment-related controllers
│   │   ├── posts/                 # Post-related controllers
│   │   ├── loginController.js     # Login handler
│   │   └── registerController.js  # Register handler
│   │
│   ├── middleware/                # JWT, role-based auth, etc.
│
│   ├── routes/                    # All route definitions
│
│   ├── services/                  # Business logic layer
│   │   ├── admin/                 # Admin service logic
│   │   ├── comments/              # Comment services
│   │   └── posts/                 # Post services
│
│   ├── login.js                   # Auth login route entry
│   ├── register.js                # Auth register route entry
│   └── server.js                  # App entry point
│
├── .env                           # Environment variables
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml           
├── package.json
├── package-lock.json
└── README.md                      

```

# 🔐 .env Sample
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/social_media_db
JWT_SECRET=your_jwt_secret_key

```

# 🔗 API Endpoints

1. Register User :

    ```
    http://localhost:8001/api/v1/register
    ```
2. Login User :
 
   ```
   http://localhost:8001/api/v1/login
   ```

# 🤝 Contributions
Feel free to fork the project and contribute. PRs are welcome
