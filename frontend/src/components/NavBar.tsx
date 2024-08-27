import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../assets/logo_words.png';
import '../index.css';
import '../styles/NavBar.css'; // We'll create this file for the styles


interface NavBarProps {
  onOpenLoginModal: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onOpenLoginModal }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home/rent" className="nav-link">Rent</Link>
        <Link to="/home/buy" className="nav-link">Buy</Link>
      </div>
      <div className="navbar-section navbar-center">
        <img src={logo} alt="Renters United Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <Link to="/manage-rentals" className="nav-link">Manage Rentals</Link>
        <Button className="sign-in-button" onClick={onOpenLoginModal}>Sign in</Button>
      </div>
    </nav>
  );
};


export default NavBar;
