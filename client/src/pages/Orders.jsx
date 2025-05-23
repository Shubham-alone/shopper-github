import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {

      const [productsim, setProductsim] = useState([]);
      const [error, setError] = useState(null);
      const { backendUrl, token } = useContext(ShopContext)
      const [orderData, setOrderData] = useState([]);

      const loadOrderData = async () => {
           try {
               if (!token) {
                 return null
               }

               const response = await axios.post(backendUrl +'/userorders', {}, {headers:{token}})
               let allOrdersItem = []
               response.data.orders.map((order) => {
                   order.items.map((item) => {
                      item['status'] = order.status
                      item['payment'] = order.payment
                      item['paymentMethod'] = order.paymentMethod
                      item['date'] = order.date
                      allOrdersItem.push(item)
                   })
               })
               setOrderData(allOrdersItem.reverse())
           } catch (error) {
              console.log(error)
           }
      }

      useEffect( () => {
         loadOrderData()
      },[token])


  useEffect(() => {
    axios.get("https://shopper-github-backend.vercel.app/products")
      .then((response) => {
        let res = response.data.list;
        setProductsim(res);
      })
      .catch((error) => {
        setError("failed to load products");
      });
  }, []);

  return(
    <div className="border-t pt-16">

        <div className="text-2xl">
             <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div>
            {
              orderData.map((product,index) => (
                 <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-6 text-sm">
                           <img src={product.image} alt="" className="w-16 sm:w-20" />

                           <div>
                               <p className="sm:text-base font-medium">
                                   {product.name}
                               </p>
                               <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                   <p className="text-lg">₹{product.price}</p>
                                   <p>Quantity: {product.quantity}</p>
                                   <p>Size: {product.size}</p>
                               </div>
                               <p className="mt-1">Date: <span className="text-gray-400">{new Date(product.date).toDateString()}</span></p>
                              <p className="mt-1">Payment: <span className="text-gray-400">{product.paymentMethod}</span></p>
                           </div>
                      </div>


                      <div className="md:w-1/2 flex justify-between">
                           <div className="flex items-center gap-2">
                               <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                               <p className="text-sm md:text-base">{product.status}</p>
                           </div>

                           <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                      </div>
                 </div>
              ))
            }
        </div>
     </div>
  )
};

export default Orders;