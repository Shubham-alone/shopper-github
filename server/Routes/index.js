const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const controller = require('../Controllers/index');

router.get('/products', controller.getAllproducts);
router.get('/bestseller', controller.getBestSellers);
router.get('/products/id/:id', controller.getProductsById);
router.get('/products/category/:category', controller.getProductsBycategory);


module.exports = router;