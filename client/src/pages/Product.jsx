import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [size, setSize] = useState("");

  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    axios
      .get(`https://shopper-github-backend.vercel.app/products/id/${id}`)
      .then((response) => {
        const fetchedProduct = response.data.product[0];
        setProduct(fetchedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("failed to load products");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) return <div className="text-red-500">No product found.</div>;

  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              src={product.image}
              alt=""
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={product.image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">₹{product.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Array.isArray(product.sizes) &&
                product.sizes.map((sizer, index) => (
                  <button
                    onClick={() => setSize(sizer)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      sizer === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {sizer}
                  </button>
                ))}
            </div>
          </div>
          <button onClick={() => addToCart(product.id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* descriptiona and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (123)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts currentCategory={product.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
