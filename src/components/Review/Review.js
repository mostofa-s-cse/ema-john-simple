import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css';
import { useNavigate } from 'react-router-dom';
  

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const navigate = useNavigate();

    const handleProceedCheckout = ()=>{
        navigate('/shipment');
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;
        });
        setCart(cartProduct);
    },[])

    let thankyou;
    if (orderPlaced){
        // thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className='twin-container'>
        <div className='product-container'>
            {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                     product={pd}>
                     </ReviewItem>)
            }

           {thankyou}

            </div>
            <div className="cart-container">
            <Cart cart={cart}>
                <button className ="main-button" onClick={handleProceedCheckout}>Proceed Checkout</button>
            </Cart>

           </div>
        </div>
    );
};

export default Review;