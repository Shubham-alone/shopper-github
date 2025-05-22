const express = require('express');
const mongoose = require('mongoose');

const useRrouter = express.Router();

const controller = require('../Controllers/userController');

useRrouter.post('/register', controller.registerUser);
useRrouter.post('/login', controller.loginUser);

module.exports = useRrouter;