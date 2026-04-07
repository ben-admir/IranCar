import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const user = localStorage.getItem("userName");

    const handleLogout = () => {
        localStorage.removeItem("userName");
        window.location.href = "/"; 
    };
console.log("مقدار یوزر در نوبار:", user);
    return (
        <nav className="navbar">
            <div className="logo">IranCar 🏎️</div>
            <ul className="nav-links">
                <li><Link to="/">خانه</Link></li>
                <li><Link to="/cars">خودروها</Link></li>

                {user ? (
                    <li className="user-menu">
                        <span className="user-name">سلام، {user} ▼</span>
                        <ul className="dropdown-content">
                            <li><Link to="/my-ads">آگهی‌های من</Link></li>
                            <li><Link to="/add-car">ثبت خودرو</Link></li>
                            <li><button onClick={handleLogout} className="logout-btn">خروج</button></li>
                        </ul>
                    </li>
                ) : (
                    <li><Link to="/user-auth" className="login-btn">ورود / ثبت‌نام</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;