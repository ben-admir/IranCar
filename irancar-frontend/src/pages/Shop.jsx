import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("همه"); // استیت برای فیلتر

  useEffect(() => {
    fetch('https://localhost:7017/api/cars')
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  // استخراج لیست برندها به صورت یکتا (Unique)
  const brands = ["همه", ...new Set(cars.map(car => car.brand))];

  // فیلتر کردن لیست ماشین‌ها بر اساس برند انتخاب شده
  const filteredCars = selectedBrand === "همه" 
    ? cars 
    : cars.filter(car => car.brand === selectedBrand);

  return (
    <div className="bg-light min-vh-100 py-5" dir="rtl">
      <div className="container">
        <h2 className="text-center fw-bold mb-4 display-5 text-dark">نمایشگاه خودرو</h2>
        
        {/* --- بخش دکمه‌های فیلتر --- */}
        <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
          {brands.map(brand => (
            <button 
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`btn rounded-pill px-4 py-2 shadow-sm transition-all ${
                selectedBrand === brand ? 'btn-primary text-white' : 'btn-white bg-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="row">
          <AnimatePresence mode='wait'>
            {filteredCars.map((car, index) => (
              <motion.div 
                className="col-md-4 mb-4" 
                key={car.id}
                layout // انیمیشن نرم موقع جابجا شدن کارت‌ها
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                  <div className="overflow-hidden" style={{height: '200px'}}>
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      src="https://images.unsplash.com/photo-1583121274602-3e2820c69888" 
                      className="card-img-top w-100 h-100"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="fw-bold">{car.brand} {car.name}</h5>
                    <p className="text-muted small mb-3">کلاس بدنه: سدان لوکس</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success fs-5">{Number(car.price).toLocaleString()} <small>تومان</small></span>
                      <button className="btn btn-outline-dark btn-sm rounded-pill px-3">جزئیات</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Shop;