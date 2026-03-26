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
    color: '',
    description: '',
  });
  
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Brand', car.brand);
    formData.append('Name', car.name);
    formData.append('Color', car.color || "نامشخص");
    formData.append('Price', parseInt(car.price));
    formData.append('Year', parseInt(car.year) || 2026);
    formData.append('Description', car.description || "");
    
    if (imageFile) {
      formData.append('ImageFile', imageFile); 
    }

    try {
      const response = await fetch('https://localhost:7017/api/Cars', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        alert("ایول! ماشین با موفقیت و عکس واقعی ثبت شد. ✅");
        navigate('/shop'); 
      } else {
        alert("سرور خطا داد. حتماً چک کن که فیلدها پر باشن.");
      }
    } catch (error) {
      alert("ارتباط با سرور برقرار نشد.");
    }
  };

  return (
    <div className="bg-dark min-vh-100 py-5 text-white text-end" dir="rtl">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="card bg-secondary bg-opacity-10 border border-secondary p-4 p-md-5 rounded-5 shadow-lg"
        >
          <h2 className="text-center fw-bold mb-5 text-primary">ثبت آگهی جدید</h2>
          
          <form onSubmit={handleSubmit} className="row g-4">
            {/* نام و برند */}
            <div className="col-md-6 text-start">
              <label className="form-label fw-bold">نام خودرو</label>
              <input type="text" className="form-control bg-dark text-white border-secondary p-3" 
                onChange={(e) => setCar({...car, name: e.target.value})} required />
            </div>
            
            <div className="col-md-6 text-start">
              <label className="form-label fw-bold">برند</label>
              <select className="form-select bg-dark text-white border-secondary p-3"
                onChange={(e) => setCar({...car, brand: e.target.value})} required>
                <option value="">انتخاب...</option>
                <option value="Mercedes">مرسدس بنز</option>
                <option value="BMW">بی‌ام‌و</option>
                <option value="Porsche">پورشه</option>
              </select>
            </div>

            {/* قیمت و رنگ */}
            <div className="col-md-6 text-start">
              <label className="form-label fw-bold">قیمت (تومان)</label>
              <input type="number" className="form-control bg-dark text-white border-secondary p-3" 
                onChange={(e) => setCar({...car, price: e.target.value})} required />
            </div>

            <div className="col-md-6 text-start">
              <label className="form-label fw-bold">رنگ</label>
              <input type="text" className="form-control bg-dark text-white border-secondary p-3" 
                onChange={(e) => setCar({...car, color: e.target.value})} />
            </div>

            {/* آپلود عکس */}
            <div className="col-12 text-start">
              <label className="form-label fw-bold">انتخاب عکس ماشین</label>
              <input 
                type="file" 
                className="form-control bg-dark text-white border-secondary p-3"
                onChange={(e) => setImageFile(e.target.files[0])}
                required 
              />
            </div>

            {/* دکمه ثبت (اینجاست!) */}
            <div className="col-12 mt-5">
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-5 shadow"
              >
                ثبت و انتشار آگهی 🚀
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCar;