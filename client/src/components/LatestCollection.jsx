import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import axios from "axios";
import ProductCard from "./ProductCard";

const LatestCollection = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://shopper-github-backend.vercel.app/products")
      .then((response) => {
        setProducts(response.data.list);
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

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Chasing dreams through silent nights, Hope still burns in fading lights.
        </p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollection;

// add this component in home page
