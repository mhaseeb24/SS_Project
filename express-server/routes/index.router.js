const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlProduct = require('../controllers/product.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/get_role', ctrlUser.retrieve_role);
router.post('/get_name_from_address', ctrlUser.get_name_from_address);
router.post('/store_transaction', ctrlProduct.store_transaction);
router.post('/retrieve_transaction', ctrlProduct.retrieve_transaction);

module.exports = router;



