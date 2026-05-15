import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAds = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAds = async () => {
    const userEmail = localStorage.getItem('userEmail'); 
    
    if (userEmail) {
      try {
        const res = await axios.get(`http://localhost:5058/api/cars/by-email/${userEmail}`);
        setMyCars(res.data);
        setLoading(false);
      } catch (err) {
        console.error("خطا در دریافت آگهی‌ها:", err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("دکتر، از حذف این آگهی مطمئنی؟")) {
      try {
        await axios.delete(`http://localhost:5058/api/cars/${id}`);
        setMyCars(myCars.filter(car => car.id !== id));
        alert("آگهی با موفقیت حذف شد.");
      } catch (err) {
        alert("خطا در حذف آگهی.");
      }
    }
  };

  return (
    <div className="container mt-5 pt-5" style={{ direction: 'rtl' }}>
      <div className="d-flex justify-content-between align-items-center mb-5 p-3 rounded" style={{backgroundColor: '#1a1a1a', borderRight: '5px solid #007bff'}}>
        <h2 className="text-white m-0">مدیریت آگهی‌های من</h2>
        <span className="text-muted">تعداد: {myCars.length}</span>
      </div>

      {loading ? (
        <div className="text-center text-info">در حال بارگذاری...</div>
      ) : myCars.length > 0 ? (
        <div className="row g-4">
          {myCars.map(car => (
            <div className="col-12 col-md-6 col-lg-4" key={car.id}>
              <div className="card h-100 shadow-lg" style={{backgroundColor: '#212529', border: '1px solid #333', borderRadius: '15px', overflow: 'hidden'}}>
                <img 
                  src={car.imageName ? `http://localhost:5058/images/${car.imageName}` : '/no-image.png'} 
                  className="card-img-top" 
                  style={{height: '220px', objectFit: 'cover'}}
                  alt="car"
                />
                <div className="card-body text-center p-4">
                  <h4 className="fw-bold" style={{color: '#ffc107'}}>{car.brand} {car.name}</h4>
                  <p className="text-white-50">{car.year} | {car.color}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold text-success">
                      {car.price?.toLocaleString()} تومان
                    </span>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="btn btn-outline-danger btn-sm rounded-pill px-3">
                      حذف آگهی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 rounded-3" style={{backgroundColor: '#1a1a1a', border: '2px dashed #333'}}>
          <h4 className="text-muted">هنوز آگهی ثبت نکرده‌ای دکتر!</h4>
          <a href="/add-car" className="btn btn-primary mt-3">ثبت خودرو</a>
        </div>
      )}
    </div>
  );
};

export default MyAds;