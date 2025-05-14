import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import { useAppContext } from './context/AppContext';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import Login from './components/Login';


const App = () => {
  const path = useLocation().pathname;
  const isSellerPath = path.includes("seller");
  const isDeliveryPath = path.includes("delivery");
  
  const { showUserLogin, isSeller, deliveryUser } = useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {(!isSellerPath && !isDeliveryPath) && <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      
      <div className={`${isSellerPath || isDeliveryPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>

          {/* Delivery Routes */}
          <Route path='/delivery-login' element={<DeliveryLogin />} />
          <Route path='/delivery-dashboard' element={deliveryUser ? <DeliveryDashboard /> : <DeliveryLogin />} />
        </Routes>
      </div>

      {(!isSellerPath && !isDeliveryPath) && <Footer />}
    </div>
  );
}

export default App;
