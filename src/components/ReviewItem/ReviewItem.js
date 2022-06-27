import React from 'react';

const ReviewItem = (props) => {
    const{name,quantity,img} = props.product;
    return (
        <div className='allProduct container mt-3'>
            <img src={img} alt="" />
            <div className='product-details mt-5'>
                <h4 className='product-name'>{name}</h4>
                <h5 className='mt-2'>Quantity : {quantity} </h5>
                <br />
                <button className="main-button">Remove</button>
            </div>
           
        </div>
    );
};

export default ReviewItem;