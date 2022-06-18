import React from "react";
import logo from '../../images/logo.png';
import './Header.css';


const Header = () => {
    return(
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
            </nav>
        </div>
        </div>
        
    )
}

export default Header;