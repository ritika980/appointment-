const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);