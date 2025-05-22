const mongoose = require('mongoose');
const userModel = require('../Models/userModel');


// add products to user cart
exports.addToCart = async (req, res) => {
     try {

      const {userId, productId, size } = req.body

      const userData = await userModel.findById(userId)
      let cartData = await userData.cartData;

      if (cartData[productId]) {
          if (cartData[productId][size]) {
              cartData[productId][size] += 1
          }
          else {
             cartData[productId][size] = 1
          }
      } else {
          cartData[productId] = {}
          cartData[productId][size] = 1
      }

      await userModel.findByIdAndUpdate(userId, {cartData})

      res.json({ success: true, message: "Added To Cart" })

     } catch (error) {
         console.log(error)
         res.json({ success: false, message: error.message})
     }
     
}

//update user cart
exports.updateCart = async (req, res) => {
    try {

        const { userId, productId, size, quantity } = req.body

      const userData = await userModel.findById(userId)
      let cartData = await userData.cartData;

      cartData[productId][size] = quantity

      await userModel.findByIdAndUpdate(userId, {cartData})
      res.json({ success: true, message: "Cart Updated" })


    } catch (error) {
         console.log(error)
         res.json({ success: false, message: error.message})
    }

}

//get user cart data
exports.userCart = async (req, res) => {
    
  try {

      const { userId } = req.body

      const userData = await userModel.findById(userId)
      let cartData = await userData.cartData;

      res.json({ success: true, cartData })

  } catch (error) {
         console.log(error)
         res.json({ success: false, message: error.message})
  }
}