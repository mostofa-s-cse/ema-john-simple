import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    const{name,quantity,img,price,key} = props.product;
    return (
        <div>
        <div className='allProduct container mt-3'>
            <img src={img} alt="" />
            <div className='product-details mt-5'>
                <h4 className='product-name'>{name}</h4>
                <h5 className='mt-2'>Quantity : {quantity} </h5>
                <p><small>$ {price}</small></p>
                <br />
                <button className="main-button" onClick={()=>props.removeProduct(key)}>Remove</button>
            </div>
           </div>
            
        </div>
    );
};

export default ReviewItem;