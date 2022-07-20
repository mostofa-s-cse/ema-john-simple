import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Shipment = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    const handleNameBlur = event =>{
        setName(event.target.value);
    }

    const handleAddressBlur = event =>{
        setAddress(event.target.value);
    }

    const handlePhoneBlur = event =>{
        setPhone(event.target.value);
    }

    const handleCreateUser = event =>{
        event.preventDefault();
        const shipping = {name, email, address, phone};
        console.log(shipping);
    }

    return (
        <div className='form-container'>
        <div>
            <h2 className='form-title'>Your Shipping Info</h2>
            <hr />
            <form onSubmit={handleCreateUser}>
          
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input className="form-control" onBlur={handleNameBlur} type="text" name="name" id="" required></input>
            </div>

            <div className="mb-3">
            
                <label htmlFor="email" className="form-label">Your Email Address</label>
                <input className="form-control" value={user?.email} readOnly type="email" name="email" id="" required></input>
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Your Address</label>
                <textarea className="form-control" onBlur={handleAddressBlur} type="text" name="address" id=""  required></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Your Phone Number</label>
                <input className="form-control" onBlur={handlePhoneBlur} type="text" name="phone" id="" required></input>
            </div>
                <p style={{color: 'red'}}>{error}</p>
                <input className='form-submit mb-4' type="submit" value="Add Shipping"  required/>
            </form>
            
        </div>
    </div>
    );
};

export default Shipment;