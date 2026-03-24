import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Shop = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7017/api/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.log("خطا در اتصال به API رییس:", err));
  }, []);

  return (
    <div className="bg-dark min-vh-100 py-5" dir="rtl">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-white display-6">
          ویترین خودروهای <span className="text-primary">لوکس</span>

          <span>slm reza</span>
          
        </h2>
        
        <div className="row">
          {cars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="card h-100 border-0 bg-secondary text-white shadow-lg"
                style={{ borderRadius: '20px', overflow: 'hidden' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" 
                  className="card-img-top" 
                  alt={car.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold text-primary">{car.brand}</h5>
                    <span className="badge bg-dark">2026</span>
                  </div>
                  <h4 className="card-title mt-2">{car.name}</h4>
                  <hr className="opacity-20" />
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-info fs-5 fw-bold">
                      {Number(car.price).toLocaleString()} <small className="text-white-50">تومان</small>
                    </span>
                    <button className="btn btn-primary rounded-pill px-4 shadow">خرید</button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;