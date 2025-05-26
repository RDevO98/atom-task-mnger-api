# Task Manager API
Atom Challenge

>Serverless backend project using Firebase Functions with Express.js and TypeScript. Implements Clean Architecture to maintain a decoupled, maintainable, and scalable structure.

This project was generated using [Firebase Tools](https://www.npmjs.com/package/firebase-tools) version 14.4.0.

## 🚀 Technologies and Tools

- 🔥 Firebase (Functions, Firestore, Emulators)
- ⚙️ Express.js (as middleware for HTTP functions)
- 🟦 TypeScript
- 🧱 Clean Architecture (layered separation of responsibilities)
- 📦 Firebase Tools CLI (`firebase init`)

## 🧱 Project Structure (Clean Architecture)

```
.
├── functions
│   ├── src
│   │   ├── application     # Use cases and business logic
│   │   ├── domain          # Entities and implementations
│   │   ├── infrastructure  # Integrations (Firebase, Firestore, Config)
│   │   ├── interfaces      # Routes, controllers, middlewares
│   │   └── index.ts        # Firebase Functions entry point
│   ├── tsconfig.json
│   └── package.json
├── .firebaserc
├── firebase.json
└── README.md
```

## 🔧 Installation and Usage

### 1. Clone the repository

```bash
git clone https://github.com/RDevO98/atom-task-mnger-api.git
cd atom-task-mnger-api
```

### 2. Install dependencies

```bash
cd functions
npm install
```

### 3. Run locally with emulators

```bash
npm run build
firebase emulators:start
```

### 4. Deploy to Firebase

```bash
firebase deploy --only functions
```

> Make sure you've run `firebase login` and selected a project with `firebase use`.

---