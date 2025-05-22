import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [productsim, setProductsim] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL

      useEffect(() => {
    axios
      .get("http://localhost:5436/products")
      .then((response) => {
        let res = response.data.list;
        setProductsim(res);
      })
      .catch((error) => {
        setError("failed to load products");
      });
  }, []);

    const addToCart = async (productId, size) => {

        if (!size) {
             toast.error('Select product Size');
             return;
        }
         
        let cartData = structuredClone(cartItems);

        if (cartData[productId]) {
             if (cartData[productId][size]) {
                 cartData[productId][size] += 1;

             }
             else {
                 cartData[productId][size] = 1;
             }
        }
        else {
            cartData[productId] = {};
            cartData[productId][size] = 1;
        }

        setCartItems(cartData)

        if (token) {
           try {

               await axios.post(backendUrl + '/add', {productId, size}, {headers:{token}})

           } catch (error) {
              console.log(error)
              toast.error(error.message)
           }
        }
    }

      
    const getCartCount = () => {
        let totalCount = 0;
        for (const products in cartItems) {
            for (const product in cartItems[products]) {
                 try {
                      if (cartItems[products][product] > 0) {
                          totalCount += cartItems[products][product]
                      }
                 } catch (error) {

                 }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (productId, size, quantity) => {
         
        let cartData = structuredClone(cartItems);

        cartData[productId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/update', {productId, size, quantity}, {headers:{token}})

            } catch (error) {
              console.log(error)
              toast.error(error.message)
            }
        }
    }

    const getCartAmount =  () => {
         let totalAmount = 0;
         for (const products in cartItems) {
              let productInfo = productsim.find( (product) => product.id ==  products);
              for (const product in cartItems[products]) {
                   try {
                        if (cartItems[products][product] > 0) {
                            totalAmount += productInfo.price * cartItems[products][product]
                        }
                   } catch (error) {

                   }
              }
         }
         return totalAmount;
    }

    const getProductsData = async () => {
        try {
             
            const response = await axios.get(backendUrl)
            
        } catch (error) {

        }
    }

    const getUserCart = async ( token ) => {
        try {

            const response = await axios.post(backendUrl + '/get', {}, {headers:{token}})

            if (response.data.success) {
                 setCartItems(response.data.cartData)
            }

        } catch (error) {
             console.log(error)
              toast.error(error.message)
        }
    }

    useEffect( () => {
        getProductsData()
    },[])

    useEffect( () => {
       if (!token && localStorage.getItem('token')) {
           setToken(localStorage.getItem('token'))
           getUserCart(localStorage.getItem('token'))
       }
    },[])

    
     const value = {
        products, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, token, setToken, backendUrl, setCartItems
     }

     return(
        <ShopContext.Provider value={value}>
              {props.children}
        </ShopContext.Provider>
     )
}

export default ShopContextProvider;