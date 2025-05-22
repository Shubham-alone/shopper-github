import React from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return(
      <Link className="text-gray-700 cursor-pointer" to={`/product/${product.id}`}>

            <div className="overflow-hidden">
                 <img src={product.image} alt="" className="hover:scale-110 transition ease-in-out" />
            </div>

            <p className="pt-3 pb-1 text-sm">{product.name}</p>
            <p className="text-sm font-medium">₹{product.price}</p>
         
      </Link>
  )
};

export default ProductCard;