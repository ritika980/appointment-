# appointment-backend

Backend scaffold for an appointment booking API built with Node.js, Express, and MongoDB.

## Structure

```text
appointment-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
├   ├── appointmentController.js
├   └── doctorController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── loggerMiddleware.js
├── models/
├   ├── Appointment.js
├   ├── Doctor.js
├   └── User.js
├── routes/
├   ├── appointmentRoutes.js
├   ├── authRoutes.js
├   └── doctorRoutes.js
├── .env
├── package.json
├── server.js
└── README.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Update `.env` if needed:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/appointment_backend
JWT_SECRET=change_this_secret
```

3. Start the server:

```bash
npm run dev
```

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/appointments`
- `POST /api/appointments`
- `GET /api/appointments/:id`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`
- `POST /api/doctors`
