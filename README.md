# BearBulls Backend (NestJS + MongoDB)

APIs for user signup and login using NestJS, Mongoose, and JWT.

## Setup

1. Install Node.js 18+.
2. Copy `.env.example` to `.env` and fill values.
3. Install deps and run:

```bash
npm install
npm run start:dev
```

Default server: http://localhost:3000

## Environment

```
MONGODB_URI=mongodb://127.0.0.1:27017/bearbulls
JWT_SECRET=change_me
PORT=3000
```

## Endpoints

- POST `/users/signup` { name, email, password }
- POST `/auth/login` { email, password }
- GET `/users/me` with `Authorization: Bearer <token>`

## Project Structure

- `src/app.module.ts`: root module, connects MongoDB
- `src/users/*`: user schema, controller, service
- `src/auth/*`: login endpoint, JWT strategy/guard

## Notes

- Passwords are hashed with bcrypt.
- Validation via class-validator; unknown fields are stripped.

