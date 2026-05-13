import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // برای نمایش پیام‌های تایید خوشگل (اختیاری)

const MyAds = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // ۱. تابع دریافت لیست آگهی‌ها
  const fetchAds = async () => {
    const currentUserId = localStorage.getItem('userId');
    if (currentUserId && currentUserId !== "undefined" && currentUserId !== "null") {
      try {
        const res = await axios.get(`http://localhost:5058/api/cars/user/${currentUserId}`);
        setMyCars(res.data);
        setLoading(false);
      } catch (err) {
        console.error("خطا در دریافت:", err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // ۲. تابع حذف آگهی (Delete)
  const handleDelete = async (carId) => {
    if (window.confirm("دکتر، مطمئنی میخوای این آگهی رو حذف کنی؟")) {
      try {
        await axios.delete(`http://localhost:5058/api/cars/${carId}`);
        // بعد از حذف موفق، لیست رو دوباره آپدیت میکنیم
        setMyCars(myCars.filter(car => car.id !== carId));
        alert("آگهی با موفقیت حذف شد.");
      } catch (err) {
        console.error("خطا در حذف:", err);
        alert("مشکلی در حذف آگهی پیش آمد.");
      }
    }
  };

  // ۳. تابع ویرایش آگهی (Edit)
  const handleEdit = (carId) => {
    // اینجا کاربر رو میفرستیم به صفحه ویرایش (که باید بسازیمش)
    window.location.href = `/edit-car/${carId}`;
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-5 p-3 rounded" style={{backgroundColor: '#1a1a1a', borderRight: '5px solid #007bff'}}>
        <h2 className="text-white m-0">مدیریت آگهی‌های من</h2>
        <span className="badge bg-primary fs-6">{myCars.length} خودرو فعال</span>
      </div>
      
      {loading ? (
        <div className="text-center my-5 py-5 text-info">در حال فراخوانی...</div>
      ) : myCars.length > 0 ? (
        <div className="row g-4 justify-content-center">
          {myCars.map(car => (
            <div className="col-12 col-md-6 col-lg-4" key={car.id}>
              <div className="car-card shadow-lg" style={{backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '15px', overflow: 'hidden'}}>
                
                <img 
                  src={car.imageName ? `http://localhost:5058/images/${car.imageName}` : 'http://localhost:5058/images/no-image.png'} 
                  className="w-100" style={{height: '200px', objectFit: 'cover'}}
                  alt="car"
                />

                <div className="p-4 text-center">
                  <h4 className="text-warning fw-bold">{car.brand} {car.name}</h4>
                  <p className="text-warning mb-1">{car.color}</p>
                  <p className="text-warning mb-4">{car.year}</p>
                  
                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <span className="text-success fw-bold">{car.price?.toLocaleString()} تومان</span>
                    
                    <div className="d-flex gap-2">
                      {/* دکمه ویرایش */}
                      <button 
                        onClick={() => handleEdit(car.id)}
                        className="btn btn-sm btn-outline-info rounded-pill px-3"
                      >
                        ویرایش
                      </button>
                      
                      {/* دکمه حذف */}
                      <button 
                        onClick={() => handleDelete(car.id)}
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-dark text-center">هنوز آگهی ثبت نکرده‌اید.</div>
      )}
    </div>
  );
};

export default MyAds;