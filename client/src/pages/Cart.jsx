import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [productsim, setProductsim] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://shopper-github-backend.vercel.app/products")
      .then((response) => {
        let res = response.data.list;
        setProductsim(res);
      })
      .catch((error) => {
        setError("failed to load products");
      });
  }, []);


  useEffect(() => {
    const tempData = [];
    for (const products in cartItems) {
      for (const product in cartItems[products]) {
        if (cartItems[products][product] > 0) {
          tempData.push({
            id: products,
            size: product,
            quantity: cartItems[products][product],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {

          const productData = productsim.find(
            (product) => product.id == item.id
          );

          if (!productData) {
            return (
              <div key={index} className="text-red-500">
                Product not found
              </div>
            );
          }

          return (
            <div key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                  <div className="flex items-start gap-6">
                       <img src={productData.image} className="w-16 sm:w-20" alt="" />
                       <div>
                            <p className="text-sm sm:text-lg font-medium">{productData.name}
                            </p>
                            <div className="flex items-center gap-5 mt-2">
                                  <p>₹{productData.price}</p>
                                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                            </div>
                       </div>
                  </div>
                  <input onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size,Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item.id, item.size,0)} src={assets.bin_icon} className="w-4 sm:w-5 cursor-pointer" alt="" />
                
            </div>
          );
        })}
      </div>


      <div className="flex justify-end my-20">
           <div className="w-full sm:w-[450px]">
               <CartTotal />
               <div className="w-full text-end">
                   <button onClick={() => navigate('/placeOrder')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
               </div>
           </div>
      </div>
    </div>
  );
};

export default Cart;
