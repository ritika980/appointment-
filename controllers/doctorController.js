const Doctor = require('../models/Doctor');

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    return res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const listDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  listDoctors,
};