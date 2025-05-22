const express = require('express');
const mongoose = require('mongoose');
const authUser = require('../middleware/auth')

const orderRoute = express.Router();
const controller = require('../Controllers/orderController');

//payment features
orderRoute.post('/place', authUser, controller.placeOrder)
orderRoute.post('/stripe', authUser, controller.placeOrderStripe)
orderRoute.post('/razorpay', authUser, controller.placeOrderRozarpay)

//user features
orderRoute.post('/userorders', authUser, controller.userOrders)

//verify user
orderRoute.post('/verifyrazorpay', authUser, controller.verifyRazorpay)


module.exports = orderRoute;
