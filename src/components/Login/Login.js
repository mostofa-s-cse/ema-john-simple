import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
// import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


firebase.initializeApp(firebaseConfig)

const Login = () => {

  const [newUser, setNewUser] = useState(false);
  const[user,setUser] = useState({
    isSignedIn:false,
    newUser:false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error :'',
    success: false,
  })

  const [loggedInUser ,setLoggedInUser] = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = ()=>{
      firebase.auth().signInWithPopup(provider)
      .then(res => {
        const {displayName,photoURL,email} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name:displayName,
          email:email,
          photo:photoURL,
        }
        console.log(res.user);
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
    }

     const handleFbLogIn =()=>{
      firebase.auth().signInWithPopup(fbProvider)
      .then((res) => {
        const {displayName,photoURL,email} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name:displayName,
          email:email,
          photo:photoURL,
        }
        console.log(res.user.photoURL);
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
     }

    const handleSignOut = ()=>{
      firebase.auth().signOut()
      .then(res =>{
          const signOutUser = {
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
          }
          setUser(signOutUser)
      })
      .catch (err => {
        console.log(err)
      })
    }

    const handleBlur = (e)=>{
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
      }
    }

    const handleSubmit = (e)=>{
      if (newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then (res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success =true;
          setUser(newUserInfo);
          updateUserName(user.name);

          })
          .catch( error => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success =false;
            setUser(newUserInfo);
          });
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success =true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            navigate(from, { replace: true });
            // console.log('signin user info', res.user);
          })
          .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success =false;
            setUser(newUserInfo);
          });
      }

      e.preventDefault();
    }

    const updateUserName = name => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName:name
      })
      .then(function() {
        console.log('user name update successfully')
      }).catch(function(error) {
        console.log(error);
      }); 
    }
    return (
        <div className='text-center'>
          <div className="signIn text-center">
           <h1>Our own Authentication</h1>
            {
              user.isSignedIn ? <button onClick={handleSignOut} className='btn btn-primary mt-4 mb-4 ml-5'>Sign Out</button>
              :
              <button onClick={handleSignIn} className='btn btn-primary mt-4 mb-4'>Google Sign In</button>
            }

              <button onClick={handleFbLogIn} className='btn btn-primary mt-4 mb-4'style={{marginLeft:'10px'}}>Facebook Sign In</button>

                {
                  user.isSignedIn && 
                  <div>
                  <p>Welcome {user.name}</p>
                  <p>User Email : {user.email}</p>
                  <img style={{width : '200px'}} src={user.photo} alt="" />
                  
                  </div>
                  
                }
          </div>
                
                
          <form onSubmit={handleSubmit} style={{width:'300px',marginLeft:'40%'}}>
            
                <input type="checkbox" name="newUser" className="mr-2" onChange={()=> setNewUser(!newUser)} />
                <label htmlFor="newUser">New User Sing Up</label>

                 { 
                 newUser &&
                 <input type="text" onBlur={handleBlur} className="form-control" name="name"  placeholder='Name' required></input>
                 }
                 <br />
                  <input type="email" onBlur={handleBlur} className="form-control" name="email"  placeholder='Email' required></input> <br></br>
                  <input type="password" onBlur={handleBlur} className="form-control" name="password"  placeholder='Password' required></input><br></br>

                    <input type="submit" className="btn btn-primary" value={newUser?'Sign Up': 'Login'}></input> 
             
          </form>
          <p style={{color:'red'}}>{user.error}</p>
          {
            user.success &&
            <p style={{color:'green'}}>User {newUser?'Created': 'Login'} Successfully</p>
            
          }       
      </div>
    );
};

export default Login;