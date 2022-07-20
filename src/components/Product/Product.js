import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import { Link } from "react-router-dom";
const Product = (props) => {
    // console.log(props)
    const { img, name, seller, price, stock,key } = props.product
    return (
        <div className='allProduct container mt-3 '>
            <div >
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>By : {seller}</small></p>
                <p>$ {price}</p>

                <p><small> Only {stock} left in stock - Order soon{seller}</small></p>
                { props.showAddToCart === true && <button
                 className='main-button'
                 onClick={()=> props.handleAddProduct(props.product)}
                 > 
                 
                 <FontAwesomeIcon icon ={faShoppingCart}/>  add to cart</button>}
            </div>
        </div>
    );
};

export default Product;