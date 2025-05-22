const product = require('../Models/product');
const mongoose = require('mongoose');

//get all products from mongodb
exports.getAllproducts = async(req, res) => {
  try{
    const allProducts = await product.find();
    res.status(200).json({ list: allProducts});
  } catch (error) {
    res.status(404).json({ message: 'unable to get all products',
      error:error.message
    })
  }
};




//get products by id
exports.getProductsById = async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const allProducts = await product.find({ id: productId});

        if (allProducts) {
            res.status(200).json({ product: allProducts})
        } else {
          res.status(404).json({ message: "please provide valid product id"})
        }
    }catch (error) {
        res. status(500).json({ message: "error getting in products by id"})
    }
};


//get all products which are bestsellers
exports.getBestSellers = async(req, res) => {
    try {
       const bestsellerProducts = await product.find({ bestseller: true});

       if (bestsellerProducts.length > 0) {
          res.status(200).json({ product: bestsellerProducts });
       } else {
           res.status(404).json({ message: "No bestseller products found"})
       }
    }
    catch (error) {
        res.status(404).json({ message: 'unable to get bestseller products', error: error.message})
    }
}

//get products by category
exports.getProductsBycategory = async (req, res) => {
  const category_type = req.params.category;

  try {
    const allProducts  = await product.find({ category: { $regex: new RegExp(category_type, 'i' ) }  });

    if (allProducts.length >  0) {
       res.status(200).json({ product: allProducts })
    } else {
       res.status(404).json({  message: "please provide valid category"})
    }
  } catch (error) {
    res.status(500).json({ message: 'error  in getting product category'})
  }

}
