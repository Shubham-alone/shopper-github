const express = require('express')
const mongoose = require('mongoose')
const authUser = require('../middleware/auth')

const cartRouter = express.Router();

const controller = require('../Controllers/cartController');

cartRouter.post('/get', authUser, controller.userCart);
cartRouter.post('/add',  authUser,  controller.addToCart);
cartRouter.post('/update',  authUser,  controller.updateCart);


module.exports = cartRouter;