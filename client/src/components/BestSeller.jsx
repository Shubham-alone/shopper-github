import React, {useState, useEffect} from "react";
import axios from "axios";
import Title from "./Title";
import ProductCard from "./ProductCard";

const BestSeller = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
    axios
      .get("https://shopper-github-backend.vercel.app/bestseller")
      .then((response) => {
        setProducts(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        setError("failed to load products");
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
    return(
      <div className="my-10">
          <div className="text-center text-3xl py-8">
              <Title text1={'BEST'} text2={'SELLERS'}/>
              <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Believe in your journey, embrace the struggle, and rise stronger—every setback is a setup for greatness.
              </p>
          </div>


        {loading ? (
            <div className="loading-spinner">Loading...</div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                   {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
            </div>
        )}
        
      </div>
    )
};

export default BestSeller;

