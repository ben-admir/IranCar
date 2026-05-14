import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard'; 

const MyAds = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const currentUserId = localStorage.getItem('userId');
  
  if (currentUserId && currentUserId !== "undefined") {
    
    axios.get(`http://localhost:5058/api/cars/user/${currentUserId}`)
      .then(res => {
        setMyCars(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("ارور شبکه (احتمالاً سرور خاموشه):", err);
        setLoading(false);
      });
  } else {
    console.log("آیدی پیدا نشد! لطفا دوباره لاگین کنید.");
    setLoading(false);
  }
}, []);

  return (
    <div className="container mt-5">
      <h3 className="text-white mb-4">آگهی‌های من</h3>
      
      {loading ? (
        <p className="text-info">در حال بارگذاری...</p>
      ) : myCars.length > 0 ? (
        <div className="row">
          {myCars.map(car => (
            <div className="col-md-4" key={car._id}>
              <CarCard car={car} /> 
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">شما هنوز هیچ آگهی ثبت نکرده‌اید.</div>
      )}
    </div>
  );
};

export default MyAds;