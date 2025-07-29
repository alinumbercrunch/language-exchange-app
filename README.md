# 🌐 Language Exchange App

A multilingual platform designed to help users connect, communicate, and exchange languages in real time. Built with a scalable fullstack architecture using **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js**, and **MongoDB (Mongoose)**.

## Features (Planned & In Progress)

- Secure user authentication and profile management
- One-on-one messaging 
- Notification system for unread messages, activity, and promotions
- Language preference matching and interface localization
- Admin dashboard for moderation and analytics

## 🛠 Tech Stack

| Layer        | Tools & Frameworks                   |
|--------------|--------------------------------------|
| Frontend     | Next.js, TypeScript, Tailwind CSS    |
| Backend      | Node.js, Express, Mongoose, MongoDB  |
| Authentication | JWT + middleware (WIP)            |
| Deployment   | Docker, Vercel / AWS (TBD)           |
| Testing      | Jest + React Testing Library (TBD)   |

## 📁 Folder Structure

language-exchange-app/
├── frontend/                    # Next.js app
│   ├── components/             # Reusable UI elements
│   ├── pages/                  # Page routes (Next.js routing)
│   ├── styles/                 # Tailwind configs and global styles
│   ├── utils/                  # Frontend-specific helper functions
│   ├── hooks/                  # Custom React hooks (e.g., useAuth)
│   ├── services/               # API calls to backend
│   ├── types/                  # TypeScript interfaces used in frontend
│   └── public/                 # Static assets (images, icons, etc.)
│
├── backend/                    # Express server
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── controllers/            # Logic behind each route
│   ├── middleware/             # Auth, validation, error handling
│   ├── services/               # Reusable backend logic
│   ├── utils/                  # Utility functions (e.g., formatting)
│   ├── config/                 # DB connection, environment setup
│   ├── types/                  # Shared backend types/interfaces
│   └── index.ts                # Main entry point
│
├── shared/                     # Shared logic across frontend/backend
│   ├── interfaces/            # Universal TypeScript interfaces
│   ├── constants/             # App-wide constants (languages, roles)
│   └── validators/            # Shared input validation schemas
│
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── README.md