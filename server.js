const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

const logger = require('./middleware/loggerMiddleware');
const errorHandlerModule = require('./middleware/errorMiddleware');
const errorHandler =
  typeof errorHandlerModule === 'function'
    ? errorHandlerModule
    : errorHandlerModule.errorHandler || errorHandlerModule.default || null;

dotenv.config();
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

console.log('type of authRoutes:', typeof authRoutes);
console.log('type of appointmentRoutes:', typeof appointmentRoutes);
console.log('type of logger:', typeof logger);

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
  res.send('Appointment Booking API Running');
});

console.log('resolved errorHandler type:', typeof errorHandler);
if (!errorHandler) {
  console.warn('warning: errorHandler is not a function; using fallback handler');
  app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message || 'Server Error' });
  });
} else {
  app.use(errorHandler);
}

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });
}

module.exports = app;