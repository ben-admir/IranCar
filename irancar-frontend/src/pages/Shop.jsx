import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // برای ذخیره ماشین انتخاب شده

  useEffect(() => {
    fetch('https://localhost:7017/api/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("خطا:", err));
  }, []);

  return (
    <div className="bg-dark min-vh-100 py-5 text-white" dir="rtl">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">کاتالوگ خودروها</h2>
        
        <div className="row g-4">
          {cars.map((car) => (
            <div className="col-lg-4 col-md-6" key={car.id}>
              <div className="card h-100 border-0 bg-secondary bg-opacity-25 rounded-4 shadow-sm overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1503376780353-7e6692767b70`} className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body p-4 text-end">
                  <h4>{car.name}</h4>
                  <button 
                    className="btn btn-primary rounded-pill w-100 mt-3"
                    onClick={() => setSelectedCar(car)} // تنظیم ماشین برای نمایش در مودال
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* بخش مودال با استفاده از Framer Motion */}
      <AnimatePresence>
        {selectedCar && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, background: 'rgba(0,0,0,0.8)' }}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark border border-secondary p-5 rounded-5 shadow-lg position-relative text-end"
              style={{ maxWidth: '500px', width: '90%' }}
            >
              <button 
                className="btn btn-sm btn-outline-danger position-absolute top-0 start-0 m-3 rounded-circle"
                onClick={() => setSelectedCar(null)}
              >✕</button>
              
              <h2 className="text-primary fw-bold mb-4">{selectedCar.name}</h2>
              <ul className="list-unstyled fs-5">
                <li className="mb-2">🏁 برند: {selectedCar.brand}</li>
                <li className="mb-2">💰 قیمت: {Number(selectedCar.price).toLocaleString()} تومان</li>
                <li className="mb-2 text-info">⚙️ شتاب ۰ تا ۱۰۰: ۳.۵ ثانیه</li>
                <li className="mb-2 text-info">🏎️ حداکثر سرعت: ۳۲۰ کیلومتر</li>
              </ul>
              <button className="btn btn-success w-100 mt-4 rounded-pill py-2 fw-bold">نهایی کردن خرید</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;