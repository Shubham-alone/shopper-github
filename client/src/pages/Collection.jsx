import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [filterproducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const { search, showSearch} = useContext(ShopContext);

    const toggleCategory = (e) => {

      if (category.includes(e.target.value)) {
          setCategory(prev=> prev.filter(product => product !== e.target.value))
      }
      else {
          setCategory(prev => [...prev, e.target.value])
      }

    };


    const toggleSubCategory = (e) => {
        
      if (subCategory.includes(e.target.value)) {
          setSubCategory(prev=> prev.filter(product => product !== e.target.value))
      }
      else {
          setSubCategory(prev => [...prev, e.target.value])
      }
    };


      useEffect(() => {
        axios
          .get("http://localhost:5436/products")
          .then((response) => {
            let res = response.data.list
            setProducts(res);
            setLoading(false);
          })
          .catch((error) => {
            setError("failed to load products");
            setLoading(false);
          });

      }, []);





      const applyFilter = () => {
         let productsCopy = products.slice();

         if (showSearch && search) {
             productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
         }

         if (category.length > 0) {
             productsCopy = productsCopy.filter(product => category.includes(product.category))
         }


         if (subCategory.length > 0) {
              productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
         }


         setFilterProducts(productsCopy)
      };


      const sortProduct = () => {
          
        let fpCopy = filterproducts.slice();

        switch (sortType) {
           case 'low-high':
            setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
            break;

          case 'high-low':
              setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
              break;

          default:
            applyFilter();
            break;


        }
      }

        useEffect( () => {
          applyFilter()
      },[category, subCategory, products, search, showSearch])

      
     useEffect( () => {
        sortProduct()
     }, [sortType])
    
      if (error) {
        return <div className="error-message">{error}</div>;
      }

   return(
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* filter options */}
          <div className="min-w-60">
             <p onClick={() =>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                 <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
             </p>
             {/* category filter */}
             <div className={`border border-gray-300 pl-5 py-3
               mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                 <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                 <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                      <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory} />Men
                      </p>

                        <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory} />Women
                      </p>

                        <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory} />Kids
                      </p>
                 </div>
             </div>


             {/* subcategory filter */}
              <div className={`border border-gray-300 pl-5 py-3 my-5
                ${showFilter ? '' : 'hidden'} sm:block`}>
                 <p className="mb-3 text-sm font-medium">TYPE</p>
                 <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                      <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategory} />Topwear
                      </p>

                        <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
                      </p>

                        <p className="flex gap-2">
                           <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
                      </p>
                 </div>
             </div>
          </div>


          {/* Right side */}
          <div className="flex-1">
              <div className="flex justify-between text-base sm:text-2xl mb-4">
                   <Title text1={'All'} text2={'COLLECTIONS'} />

                   {/* product sort */}
                   <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                       <option value="relevant">Sort by: Relavent</option>
                       <option value="low-high">Sort by: Low to High</option>
                       <option value="high-low">Sort by: High to Low</option>
                   </select>
               </div>


               {/* map products */}
               {loading ? (
                <div className="loading-spinner">Loading...</div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterproducts.map( (product) => (
                          <ProductCard key={product.id} product={product} />
                    ))}
               </div>
               )}
              
          </div>
      </div>
   )
};

export default Collection;
