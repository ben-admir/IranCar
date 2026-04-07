import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`https://localhost:7017/api/cars/${id}`)
            .then(res => setCar(res.data))
            .catch(err => {
                console.error("خطا در دریافت جزئیات:", err);
                setError(true);
            });
    }, [id]);

    if (error) return (
        <div className="text-center mt-5 text-white">
            <h3 className="text-danger">خطا: این خودرو در سرور پیدا نشد (404)</h3>
            <button className="btn btn-warning mt-3" onClick={() => navigate('/shop')}>بازگشت به نمایشگاه</button>
        </div>
    );

    if (!car) return <div className="text-center mt-5 text-white">در حال دریافت اطلاعات...</div>;

    const brand = car.brand || car.Brand || "نامشخص";
    const model = car.model || car.Model || "";
    const price = car.price || car.Price || 0;
    const img = car.imageUrl || car.ImageUrl;

    return (
        <div className="container py-5 text-white text-end" dir="rtl">
            <button className="btn btn-outline-light mb-4" onClick={() => navigate(-1)}>بازگشت</button>
            <div className="row g-4 bg-dark p-4 rounded-4 shadow border border-secondary">
                <div className="col-md-6">
                    <img 
  src={car.imageName ? `https://localhost:7017/images/${car.imageName}` : 'https://via.placeholder.com/300x200?text=No+Image'} 
  alt={car.name} 
  style={{ width: '100%', borderRadius: '8px' }}
  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image'; }}
/>
                </div>
                <div className="col-md-6">
                    <h1 className="text-warning fw-bold">{brand}</h1>
                    <h2 className="text-secondary">{model}</h2>
                    <hr className="my-4 border-secondary" />
                    <p className="fs-3 text-success fw-bold">قیمت: {Number(price).toLocaleString()} تومان</p>
                    <div className="mt-4 p-3 bg-secondary bg-opacity-10 rounded text-end">
                        <h5 className="text-info">توضیحات:</h5>
                        <p className="lh-lg">{car.description || car.Description || "توضیحی ثبت نشده."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;