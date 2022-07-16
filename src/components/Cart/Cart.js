import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // const total =  cart.reduce( (total,prd) => total+prd.price,0)

    let total = 0;
    for(let i = 0 ; i < cart.length; i++){
        const product = cart[i];
        total = total+product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total >15){
        shipping = 4.99;
    }
    else if(total >0){
        shipping = 12.99;
    }

    const tax = Math.round(total / 10);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div className='cart-container'>
            <div className='cart mt-3'>
            <h4>Order Summary</h4>
            <p>Items ordered : {cart.length} </p>
            </div>
                <div>
                    <p><small >Product Price: <span className='price-del'>$ {formatNumber(total)}</span></small></p>
                    <p><small>Shipping Cost : <span className='price-del'>$ {shipping}</span> </small></p>
                    <p><small>Tax + VAT     : <span className='price-del'>$ {tax}</span></small></p>
                    <p className='total-price'>Total Order Price : <span className='price-del'>$ {grandTotal} </span></p>
                </div>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;