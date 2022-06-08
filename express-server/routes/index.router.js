const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/get_role', ctrlUser.retrieve_role);
router.post('/get_name_from_address', ctrlUser.get_name_from_address);

module.exports = router;



