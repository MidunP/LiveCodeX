# LiveCodeX

Building a platform where developers can

- Sign up and authenticate securely
- Create or join a live coding interview session
- Collaborate in real time with a shared code editor
- Communicate via HD video call and live chat during the session
- Execute code directly in the browser across multiple languages
- Track recent and active sessions from a personal dashboard

## Tech Stack

- React for Frontend
- Node.js with Express for Backend
- MongoDB for database
- Clerk for authentication
- Stream for real-time video and chat
- Inngest for background job processing
- Piston API for code execution
- Render for backend hosting
- Vercel for frontend hosting

## Setting it up locally

Clone the repo

```
git clone https://github.com/MidunP/LiveCodeX.git
cd LiveCodeX
```

Copy over .env.example to .env everywhere

```
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update .env

```
# backend/.env
DB_URL                  MongoDB Atlas connection string
CLERK_PUBLISHABLE_KEY   Clerk dashboard > API Keys
CLERK_SECRET_KEY        Clerk dashboard > API Keys
STREAM_API_KEY          Stream dashboard > App > API Keys
STREAM_API_SECRET       Stream dashboard > App > API Keys
INNGEST_EVENT_KEY       Inngest dashboard > App > Event Keys
INNGEST_SIGNING_KEY     Inngest dashboard > App > Signing Key
CLIENT_URL              http://localhost:5173

# frontend/.env
VITE_CLERK_PUBLISHABLE_KEY   Clerk dashboard > API Keys
VITE_STREAM_API_KEY          Stream dashboard > App > API Keys
VITE_API_URL                 http://localhost:3000/api
```

Install dependencies

```
cd backend && npm install
cd ../frontend && npm install
```

Start backend

```
cd backend
npm run dev
```

Start frontend

```
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173
Backend runs on http://localhost:3000
