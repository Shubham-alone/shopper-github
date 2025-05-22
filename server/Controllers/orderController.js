const mongoose = require('mongoose');
const orderModel = require('../Models/orderModel');
const userModel = require('../Models/userModel');
const razorpay = require('razorpay');
require('dotenv').config();

const currency = 'inr'
const deliveeryCharge = 10



//gateway initialize
const razorpayInstance = new razorpay({
  key_id : process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_KEY_SECRET,
})


// placing orders using COD method
exports.placeOrder = async (req, res) => {
    
  try {
     
    const { userId, items, amount, address} = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod:"COD",
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, {cartData: {}})

    res.json({success: true, message:"Order Placed"})

  } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
      
  }
}

//placing orders using stripe method
exports.placeOrderStripe = async (req, res) => {

}

//placing orders using rozarpay
exports.placeOrderRozarpay = async (req, res) => {
     try {
          
         const { userId, items, amount, address } = req.body
         const { origin } = req.headers;

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
         }

         const newOrder = new orderModel(orderData)
         await newOrder.save()

         const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder.id.toString()
         }

         await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
               console.log(error)
               return res.json({success: false, message: error})
            }
            res.json({success: true, order})

         })

     } catch (error) {
          console.log(error);
          res.json({success: false, message: error.message})
          
     }
}

//verify rozarpay payment

exports.verifyRazorpay = async (req, res) => {
   try {

      const { userId, razorpay_order_id } = req.body

      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
      if (orderInfo.status === 'paid') {
          await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
          await userModel.findByIdAndUpdate(userId,{cartData:{}})
          res.json({ success: true, message: "payment successful"})
      } else {
        res.json({success: false, message: "payment failed"})
      }

   } catch (error) {
         console.log(error);
         res.json({success: false, message: error.message})
   }
}



//user order data for frontend
exports.userOrders = async (req, res) => {
    try {
        
      const { userId } = req.body

      const orders = await orderModel.find({ userId })
      res.json({ success:true, orders})

    } catch (error) {
        console.log(error)  
        res.json({success: false, message: error.message})
    }
}

// //update order status for admin
// exports.updateOrderStatus = async (req, res) => {

// }
