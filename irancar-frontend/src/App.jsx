import React from 'react';
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './Login'; 
import AdminPanel from './pages/AdminPanel';
import AddCar from './pages/AddCar';
import About from './pages/About';
import UserAuth from './pages/UserAuth'; 
import MyAds from './pages/MyAds';
import CarDetails from './pages/CarDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { User, PlusCircle, Settings } from 'lucide-react';
const isAdminUser = () => localStorage.getItem('isAdmin') === 'true';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

 const handleLogout = () => {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userName");
  
  localStorage.clear(); 
  navigate('/login');
  window.location.reload();
};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/" style={{letterSpacing: '3px'}}>
          IRAN<span className="text-primary">CAR</span>
        </Link>
        
        <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">
          <Link className="nav-link text-white" to="/shop">نمایشگاه</Link>

          <Link className="nav-link text-warning d-flex align-items-center gap-1" to="/add-car">
            <PlusCircle size={16} /> ثبت آگهی
          </Link>

          <Link className="nav-link text-info d-flex align-items-center gap-1" to="/admin">
            <Settings size={16} /> مدیریت
          </Link>

          {userName ? (
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                <User size={18} /> {userName}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                <li><Link className="dropdown-item text-end" to="/my-ads">آگهی‌های من</Link></li>
                <li><hr className="dropdown-divider border-secondary" /></li>
                <li><button className="dropdown-item text-end text-danger" onClick={handleLogout}>خروج</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/user-auth" className="btn btn-warning fw-bold text-dark text-decoration-none px-3 py-2 rounded">ورود / ثبت‌نام</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const isAdmin = () => localStorage.getItem('isAdmin') === 'true';
  const isUserLoggedIn = () => localStorage.getItem('userName') !== null;

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white"> 
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-auth" element={<UserAuth />} />

          <Route 
            path="/add-car" 
            element={isUserLoggedIn() ? <AddCar /> : <Navigate to="/user-auth" replace />} 
          />
          <Route 
            path="/my-ads" 
            element={isUserLoggedIn() ? <MyAds /> : <Navigate to="/user-auth" replace />} 
          />
          <Route 
  path="/admin" 
  element={
    isAdminUser() 
    ? <AdminPanel /> 
    : <Navigate to="/login" replace /> 
  } 
/>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;