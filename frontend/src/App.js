import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCatagory from './Pages/ShopCatagory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import ShopContextProvider from './Context/ShopContext';
import men_banner from './Components/Assets/banner_mens.png';
import woman_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import NotFound from './Pages/NotFound';
import SearchBar from './Pages/SearchBar';
import Checkout from './Pages/Checkout';
import MyOrders from './Pages/MyOrders';
import Wishlist from './Pages/Wishlist';

import AdminLogin from './Pages/AdminLogin';
import AddProduct from './Pages/AddProduct';
import AdminProductList from './Pages/AdminProductList';
import AdminOrders from './Pages/AdminOrders';
import AdminProtectedRoute from './Components/AdminProtectedRoute';

function StoreLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div>
      <ShopContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<StoreLayout />}>
              <Route path='/' element={<Shop />}></Route>
              <Route path='/Men' element={<ShopCatagory category="men" banner={men_banner} />}></Route>
              <Route path='/Woman' element={<ShopCatagory category="women" banner={woman_banner} />}></Route>
              <Route path='/Kids' element={<ShopCatagory category="kid" banner={kids_banner} />}></Route>
              <Route path='/product/:ProductId' element={<Product />}></Route>
              <Route path='/Cart' element={<Cart />}></Route>
              <Route path='/Login' element={<LoginSignup />}></Route>
              <Route path='/search' element={<SearchBar />}></Route>
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<MyOrders />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='*' element={<NotFound />}></Route>
            </Route>

            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/add-product' element={
              <AdminProtectedRoute><AddProduct /></AdminProtectedRoute>} />
            <Route path='/admin/products' element={
              <AdminProtectedRoute><AdminProductList /></AdminProtectedRoute>} />
            <Route path='/admin/orders' element={
              <AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

export default App;