const express = require('express');

const router = express.Router();

const { createDoctor, listDoctors } = require('../controllers/doctorController');

router.get('/', listDoctors);
router.post('/', createDoctor);

module.exports = router;