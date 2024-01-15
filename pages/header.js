import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <header className="app-header">
        <div className="logo-container">
          <img src='./RoxWealthLogo.png' alt="Logo" className="logo" />
        </div>
        <div className="header-actions">
        <Login />
          <div className="dropdown-container">
            <span className="dropdown-icon" onClick={toggleDropdown}>
              &#9660;
            </span>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <p>Investment Research</p>
                <p>Account Settings</p>
                <p>Tax Information</p>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };

export default Header;