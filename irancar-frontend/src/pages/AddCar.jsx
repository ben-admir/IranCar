import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';

const AddCar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    name: '',
    brand: '',
    price: '',
    year: '2026',
    color: '', // فیلد رنگ اضافه شد
    kilometers: '',
    description: '',
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      Brand: car.brand,
      Name: car.name,
      Color: car.color || "نامشخص",
      Price: parseInt(car.price),
      Year: parseInt(car.year) || 2026
    };

    try {
      const response = await fetch('https://localhost:7017/api/Cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert("ایول! ماشین با موفقیت ثبت شد. حالا بریم نمایشگاه رو ببینیم! ✅");
        navigate('/shop'); 
      } else {
        const errorDetail = await response.text();
        alert("سرور قبول نکرد: " + errorDetail);
      }
    } catch (error) {
      alert("ارتباط با سرور قطع شده!");
    }
  };

  return (
    <div className="bg-dark min-vh-100 py-5 text-white text-end" dir="rtl">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="card bg-secondary bg-opacity-10 border border-secondary p-4 p-md-5 rounded-5 shadow-lg"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <h2 className="text-center fw-bold mb-5 text-primary fs-1">ثبت آگهی فروش</h2>
          
          <form onSubmit={handleSubmit} className="row g-4">
            {/* نام خودرو */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">نام خودرو</label>
              <input type="text" className="form-control bg-dark text-white border-secondary rounded-pill p-3" 
                placeholder="مثلاً: بنز S500" onChange={(e) => setCar({...car, name: e.target.value})} required />
            </div>
            
            {/* برند */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">برند</label>
              <select className="form-select bg-dark text-white border-secondary rounded-pill p-3"
                onChange={(e) => setCar({...car, brand: e.target.value})} required>
                <option value="">انتخاب برند...</option>
                <option value="Mercedes">مرسدس بنز</option>
                <option value="BMW">بی‌ام‌و</option>
                <option value="Porsche">پورشه</option>
                <option value="Tesla">تسلا</option>
              </select>
            </div>

            {/* رنگ خودرو */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">رنگ خودرو</label>
              <input type="text" placeholder="مثلاً: مشکی متالیک" 
                className="form-control bg-dark text-white border-secondary rounded-pill p-3"
                onChange={(e) => setCar({...car, color: e.target.value})} />
            </div>
            
            {/* قیمت */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">قیمت (تومان)</label>
              <input type="number" className="form-control bg-dark text-white border-secondary rounded-pill p-3" 
                onChange={(e) => setCar({...car, price: e.target.value})} required />
            </div>

            {/* کارکرد */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">کارکرد (کیلومتر)</label>
              <input type="number" className="form-control bg-dark text-white border-secondary rounded-pill p-3" 
                onChange={(e) => setCar({...car, kilometers: e.target.value})} />
            </div>

            {/* سال ساخت (تست) */}
            <div className="col-md-6">
              <label className="form-label text-light fw-bold mb-2">سال ساخت</label>
              <input type="number" className="form-control bg-dark text-white border-secondary rounded-pill p-3" 
                value={car.year} onChange={(e) => setCar({...car, year: e.target.value})} />
            </div>

            {/* توضیحات */}
            <div className="col-12">
              <label className="form-label text-light fw-bold mb-2">توضیحات تکمیلی</label>
              <textarea className="form-control bg-dark text-white border-secondary rounded-4 p-3" rows="3"
                placeholder="توضیحات بیشتر در مورد سلامت فنی و..."
                onChange={(e) => setCar({...car, description: e.target.value})}></textarea>
            </div>

            {/* دکمه ارسال */}
            <div className="col-12 mt-5">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-5 shadow-lg border-0"
              >
                انتشار آگهی در ایران‌کار
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCar;