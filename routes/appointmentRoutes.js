const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  createAppointment,
  getAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

router.post('/', protect, createAppointment);
router.get('/', protect, getAppointments);
router.get('/:id', protect, getSingleAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;