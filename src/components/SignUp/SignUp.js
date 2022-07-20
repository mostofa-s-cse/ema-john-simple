import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)

    const handleEmailBlur = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event =>{
        setPassword(event.target.value);
    }

    const handleConfirmPasswordBlur = event =>{
        setConfirmPassword(event.target.value);
    }

    if(user){
        navigate('/shop');
    }

    const handleCreateUser = event =>{
        event.preventDefault();
        if(password !== confirmPassword){
            setError('Your two passwords did not match');
            return;
        }
        if(password.length <6){
            setError('Password must be 6 characters or longer');
            return;
        }
        
        createUserWithEmailAndPassword(email, password);
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Sign Up</h2>
                <hr />
                <form onSubmit={handleCreateUser}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label"> Enter Your Email Address</label>
                    <input className="form-control" onBlur={handleEmailBlur} type="email" name="email" id="" required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> Enter Your Password</label>
                    <input className="form-control" onBlur={handlePasswordBlur} type="password" name="password" id="" required></input>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label"> Enter Your Confirm Password</label>
                    <input className="form-control" onBlur={handleConfirmPasswordBlur} type="password" name="confirm-password" id="" required></input>
                </div>

                    <p style={{color: 'red'}}>{error}</p>
                    <input className='form-submit mb-2' type="submit" value="Sign Up"  required/>
                </form>
                <p>
                    Already Have an account? <Link className='form-link mb-5' to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;