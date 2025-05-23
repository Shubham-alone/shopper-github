
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
         <ToastContainer />
         <Navbar />
         <SearchBar />
         
         <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/collection' element={ <Collection />} />
             <Route path='/about' element={ <About />} />
             <Route path='/cart' element={ <Cart />} />
             <Route path='/contact' element={ <Contact />} />
             <Route path='/login' element={ <Login />} />
             <Route path='orders' element={ <Orders />} />
             <Route path='/placeorder' element={ <PlaceOrder />} />
             <Route path='/product/:id' element={ <Product />} />
         </Routes>
         <Footer />
    </div>
  );
}

export default App;
