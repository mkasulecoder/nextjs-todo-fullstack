# SupaTodo: Your Personal Task Management Application

## 🚀 Project Overview

SupaTodo is a modern, user-friendly task management application built with Next.js, Clerk for authentication, and MongoDB. Designed to help you organize and track your daily tasks efficiently.

Project Banner

## 🌟 Key Features

- **User Authentication**: Secure login with Clerk
- **Create Tasks**: Easily add new todos with title, description, and status
- **Task Management**:
    - Mark tasks as completed or pending
    - View all your tasks
    - Intuitive user interface
- **Responsive Design**: Works seamlessly across devices

## 🛠 Technologies Used

- **Frontend**:
  Next.js 15
  TypeScript
  Tailwind CSS

- **Backend**:
  MongoDB
  Next.js API Routes

- **Authentication**:
  Clerk

## 📦 Prerequisites

Before you begin, ensure you have:
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account
- Clerk account for authentication

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/mkasulecoder/nextjs-todo-fullstack.git
cd supatodo
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<you-key>
CLERK_SECRET_KEY=<your-key>
NEXT_PUBLIC_MONGO_DB_URL=<collection-uri>
NEXT_PUBLIC_API=<your-url>
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## 🚦 Project Structure

```
supatodo/
│
├── app/
│   ├── (todos)/
│   │   └── todos/
│   │       └── page.tsx
│   └── components/
│       └── Todo/
│           └── page.tsx
│
├── pages/
│   └── api/
│       └── todos.ts
│
├── lib/
│   └── mongodb.ts
│
└── README.md
```

## 🔍 How It Works

1. User authenticates via Clerk
2. User can create new todos
3. Todos are stored in MongoDB
4. Users can view and manage their tasks

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Roadmap

- [ ] Add task categories
- [ ] Implement task priority
- [ ] Create task reminders
- [ ] Dark mode support

## 🔒 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [@elitebytcode](https://twitter.com/elitebytecode)

Project Link: [Source Code](https://github.com/mkasulecoder/nextjs-todo-fullstack.git)

## 🏷️ Tags

#nextjs #nextjs15 #typescript #mongodb #taskmanagement #productivity #webdevelopment #clerkauthentication #fullstack

---

**Please leave a Star**

Crafted with ❤️ by Mark - Elite Byte Code
