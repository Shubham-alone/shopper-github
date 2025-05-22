import React, { useContext } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import Ourpolicy from "../components/OurPolicy";


const Home = () => {


  return(
    <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <Ourpolicy />
    </div>
  )
};

export default Home;
 
