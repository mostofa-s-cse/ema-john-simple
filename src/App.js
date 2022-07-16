import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFound from './components/NotFound/NotFound';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser,setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Header></Header>
      <Router>
      <Routes>
        <Route path="/" element ={<Shop/>} />
        <Route path="/shop" element ={<Shop/>} />
        <Route path="/review" element ={<Review/>} />
        <Route path="/product/:productKey" element ={<ProductDetail/>} />
        <Route path="/inventory" element ={<PrivateRoute><Inventory/></PrivateRoute>} />
        <Route path="/shipment" element ={<PrivateRoute><Shipment/></PrivateRoute>} />
        <Route path="/login" element ={<Login/>} />
        <Route exact path="*" element ={<NotFound/>} />
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
