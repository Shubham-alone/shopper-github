import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "./Title";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";


const RelatedProducts = ({ currentCategory }) => {

  const [selectedCategory, setSelectedCategory] = useState(currentCategory || 'Men')
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = (category) => {
    
        axios.get(`https://shopper-github-backend.vercel.app/products/category/${category}`)
          .then((response) => {
            const fetchedProduct = response.data.product || [];
            setRelated(fetchedProduct)
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
            setError("failed to load products");
            setLoading(false);
          });
  }

      useEffect( () => {

          fetchProducts(selectedCategory)
      },[selectedCategory])



  return(
    <div className="my-24">
       <div className="text-center text-3xl py-2">
           <Title text1={'RELATED'} text2={'PRODUCTS'} />
       </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
           {related.slice(0, 5).map( (product) => (
                <ProductCard key={product.id} product={product}/>
           ))}
       </div>
    </div>
  )
};

export default RelatedProducts;