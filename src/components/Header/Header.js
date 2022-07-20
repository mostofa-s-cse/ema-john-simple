import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import logo from '../../images/logo.png';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () =>{
        signOut(auth);
    }

    return (
        <div className="main-nav">
            <Navbar bg="light" expand="lg" className='fixed-top'>
            <Container fluid>
                <Navbar.Brand href="shop">
                    <img className='logo' src={logo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                <Nav>
                     <Link className='nav-link' to="/shop">Shop</Link>
                     <Link className='nav-link' to="/review">Order Review</Link>
                     <Link className='nav-link' to="/inventory">Inventory</Link>
                </Nav>
                </Navbar.Collapse>
                        {
                         user ?
                         <button className="btn btn-outline-warning btn-login" onClick={handleSignOut}>Sign out</button>
                         :
                         <Link className='nav-link' to="/login">Login</Link>}
                        
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <button className="btn btn-outline-warning">Search</button>
                </Form>
            </Container>
            </Navbar>
        </div>
    );
};

export default Header;