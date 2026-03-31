import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import { Instagram, Send, User, Home as HomeIcon, Disc, Info } from 'lucide-react';

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setUserName(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" 
         style={{
           background: 'rgba(0, 0, 0, 0.9)', 
           backdropFilter: 'blur(10px)',
           borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
           padding: '15px 0',
           zIndex: 1000
         }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" alt="Iran Car Logo" to="/" style={{letterSpacing: '3px'}}>
          IRAN<span className="text-primary">CAR</span>
        </Link>
        
        <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">
          <Link className="nav-link text-white d-none d-md-block" to="/">صفحه اصلی</Link>
          <Link className="nav-link text-white d-none d-md-block" to="/shop">نمایشگاه</Link>
          <Link className="nav-link text-white d-none d-md-block" to="/add-car">ثبت آگهی</Link>
          <Link className="nav-link text-white d-none d-md-block" to="/login">مدیریت</Link>

          {userName ? (
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2" 
                      type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <User size={18} />
                {userName}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow border-secondary">
                <li><Link className="dropdown-item text-end" to="/my-ads">آگهی‌های من</Link></li>
                <li><hr className="dropdown-divider border-secondary" /></li>
                <li><button className="dropdown-item text-end text-danger" onClick={handleLogout}>خروج</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/user-auth" className="btn btn-warning fw-bold">ورود / ثبت‌نام</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-black text-white py-5 mt-auto border-top border-secondary" dir="rtl">
      <div className="container">
        <div className="row text-center text-md-end">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3 text-primary" style={{ letterSpacing: '2px' }}>IRAN CAR</h4>
            <p className="text-secondary small" style={{ lineHeight: '1.8' }}>
              مرکز تخصصی خرید و فروش مدرن‌ترین خودروهای روز جهان در ایران. 
              تجربه‌ای متفاوت از سرعت و اصالت.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-4 text-white position-relative pb-2" style={{ borderBottom: '2px solid #0d6efd', display: 'inline-block' }}>
              دسترسی سریع
            </h5>
            <ul className="list-unstyled mt-2">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-secondary small"><HomeIcon size={14} className="me-2"/> صفحه اصلی</Link></li>
              <li className="mb-2"><Link to="/shop" className="text-decoration-none text-secondary small"><Disc size={14} className="me-2"/> نمایشگاه</Link></li>
              <li className="mb-2"><Link to="/about" className="text-decoration-none text-secondary small"><Info size={14} className="me-2"/> درباره ما</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-4 text-white">ارتباط با ما</h5>
            <p className="text-secondary small mb-2 text-ltr">📍 کرج، عظیمیه، برج ایران‌کار</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://www.instagram.com/mohammad_mirzaeeiii/" className="btn btn-outline-light btn-sm rounded-circle"><Instagram size={18} /></a>
              <a href="https://t.me/MohammadBRUCE" className="btn btn-outline-light btn-sm rounded-circle"><Send size={18} /></a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-secondary opacity-25" />
        <div className="text-center text-secondary small">
          © ۲۰۲۶ تمامی حقوق برای <span className="text-primary fw-bold">ایران‌کار</span> محفوظ است.
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white"> 
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/my-ads" element={<MyAds />} />
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;