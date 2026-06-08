# LiveCodeX — Frontend

React 19 + Vite + TailwindCSS v4 + DaisyUI frontend for LiveCodeX.

## Stack
- **React 19** with React Router v7
- **Vite 7** build tool
- **TailwindCSS v4** + **DaisyUI v5** for UI
- **Clerk** for authentication
- **Stream Chat + Video** SDK for real-time features
- **Monaco Editor** for the code editor
- **TanStack Query** for data fetching
- **Piston API** for code execution

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Environment Variables
Copy `.env.example` to `.env` and fill in:
```
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=
```
