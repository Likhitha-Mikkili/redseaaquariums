import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src="C:\Users\MIKKILI ISHWARYA\redsea\frontend\src\assets\images\logo.png" alt="RedSea Aquariums" className="logo"/>
        RedSea Aquarius
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/checkout">Checkout</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
