const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./Routes/index');
const connectCloudinary = require('./config/cloudinary')
const userRoutes = require('./Routes/userRoute');
const cartRoutes = require('./Routes/cartRoute');
const orderRoute = require('./Routes/orderRoute')


dotenv.config();
connectDB();
connectCloudinary()

const app = express();

const port = 5436;

// api endpoints

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-allow-Header', 'Content-Type, Authorization');
  next();
});

app.use(cors());

app.use('/', routes);
app.use('/', userRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoute);

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})