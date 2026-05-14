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
      console.log("ایمیل پیدا نشد! لطفا لاگین کنید.");
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
        <span className="text-muted">تعداد: {myCars.length} خودرو</span>
      </div>
      
      {loading ? (
        <div className="text-center text-info fs-4">در حال فراخوانیِ لوکس‌ترین‌ها...</div>
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
                  <p style={{color: '#ffc107', fontSize: '1.1rem'}}>{car.color}</p>
                  <p style={{color: '#ffc107', fontSize: '1.1rem'}}>{car.year}</p>
                  
                  <hr style={{backgroundColor: '#444'}} />
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success fs-5">
                      {car.price?.toLocaleString()} تومان
                    </span>
                    <div className="d-flex gap-2">
                      <button 
                        onClick={() => window.location.href = `/edit-car/${car.id}`}
                        className="btn btn-outline-info btn-sm rounded-pill px-3">
                        ویرایش
                      </button>
                      <button 
                        onClick={() => handleDelete(car.id)}
                        className="btn btn-outline-danger btn-sm rounded-pill px-3">
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
        <div className="text-center py-5 rounded-3" style={{backgroundColor: '#1a1a1a', border: '2px dashed #333'}}>
          <h4 className="text-muted">هنوز هیچ آگهی ثبت نکرده‌ای دکتر!</h4>
          <a href="/add-car" className="btn btn-primary mt-3">ثبت اولین آگهی</a>
        </div>
      )}
    </div>
  );
};

export default MyAds;