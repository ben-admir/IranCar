import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AdminPanel from './pages/AdminPanel';
import AddCar from './pages/AddCar';
import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Instagram, Send } from 'lucide-react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark sticky-top" 
       style={{
         background: 'rgba(0, 0, 0, 0.8)', 
         backdropFilter: 'blur(10px)',
         borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
         padding: '15px 0',
         zIndex: 1000
       }}>
    <div className="container">
      <Link className="navbar-brand fw-bold fs-3" to="/" style={{letterSpacing: '3px'}}>
        IRAN<span className="text-primary">CAR</span>
      </Link>
      <div className="navbar-nav ms-auto d-flex flex-row gap-4">
                <Link className="nav-link text-white small-caps" to="/about">درباره ما</Link>

        <Link className="nav-link text-white small-caps" to="/admin">مدیریت</Link>
        <Link className="nav-link text-white small-caps" to="/add-car">ثبت آگهی</Link>
                <Link className="nav-link text-white small-caps" to="/shop">نمایشگاه</Link>
                <Link className="nav-link text-white small-caps" to="/">صفحه اصلی</Link>

      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-black text-white py-5 mt-auto" dir="rtl">
    <div className="container">
      <div className="row text-center text-md-end">
        <div className="col-md-4 mb-4">
          <h4 className="fw-bold mb-4 text-primary">IRAN CAR</h4>
          <p className="text-secondary">مرکز تخصصی خرید و فروش مدرن‌ترین خودروهای روز جهان در ایران.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="mb-4 text-white">دسترسی سریع</h5>
          <ul className="list-unstyled lh-lg">
            <li><Link to="/" className="btn btn-outline-dark btn-sm rounded-pill px-3"><b>صفحه اصلی</b> </Link></li>
            <li><Link to="/shop" className="btn btn-outline-dark btn-sm rounded-pill px-3"><b>لیست خودرو </b></Link></li>
            <li><Link to="/about" className="btn btn-outline-dark btn-sm rounded-pill px-3"><b>داستان برند</b></Link></li>
          </ul>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="mb-4 text-white">ارتباط با ما</h5>
          <p className="text-secondary small">📍 کرج،عظیمیه، برج ایران‌کار</p>
          <p className="text-secondary small">📞 پشتیبانی : 02632566983  </p>
          <div className="mt-4 d-flex gap-3 justify-content-center">
  <a 
    href="https://www.instagram.com/mohammad_mirzaeeiii/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-4"
    style={{ transition: '0.3s',align:'right' }}
  >
    <Instagram size={20} color="#E1306C" /> 
    
  </a>

  
  <a 
    href="https://t.me/MohammadBRUCE" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-4"
  >
    <Send size={20} color="#0088cc" />
    
  </a>
</div>
          
        </div>
      </div>
      <hr className="bg-secondary" />
      <div className="text-center text-secondary mt-4">
        <small>© ۲۰۲۶ تمامی حقوق برای ایران‌کار محفوظ است.</small>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> 
        
        <Navbar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;