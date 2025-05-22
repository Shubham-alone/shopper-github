import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <div>
       <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                 <Link to='/' onClick={() => window.scrollTo({top
                    :0, behavior: 'smooth'})}>
                   <img src={assets.logo} alt="" className="mb-5 w-32" />
                   </Link>
                 <p className="w-full md:w-2/3 text-gray-600">
                     Welcome to ShopEase, your one-stop online destination for the latest fashion, gadgets, lifestyle essentials, and more. We bring you a seamless shopping experience with a wide range of high-quality products, handpicked from trusted brands and sellers.
                 </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                  <Link to='/' onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}> 
                     <li>Home</li> 
                   </Link>
                    <Link to='/about' onClick={() => window.scrollTo({ top:0, behavior: 'smooth'})}>
                       <li>About us</li> 
                     </Link>
                    <li>Delivary</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+91-999-999-9999</li>
                    <li>contact@foreveryou.com</li>
                </ul>
            </div>

       </div>


       <div>
           <hr />
           <p className="py-5 text-sm text-center">Copyright 2025@ forever.com -All Right Reserved.</p>
       </div>
    </div>
  )
};

export default Footer;