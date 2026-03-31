import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7017/api/cars')
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("خطا در دریافت لیست:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container py-5" dir="rtl">
            <h2 className="text-center text-white mb-5 fw-bold">نمایشگاه <span className="text-warning">ایران‌کار</span></h2>
            {loading ? (
                <div className="text-center text-white"><div className="spinner-border text-warning"></div></div>
            ) : (
                <div className="row g-4">
                    {cars.map((car, index) => {
                        const id = car.id || car.Id || car.ID;
                        const brand = car.brand || car.Brand || "نامشخص";
                        const model = car.model || car.Model || "";
                        const price = car.price || car.Price || 0;
                        const img = car.imageUrl || car.ImageUrl;

                        return (
                            <div className="col-md-4" key={id || index}>
                                <div className="card bg-dark text-white border-secondary h-100 shadow">
                                    <img 
  src={car.imageName 
    ? `https://localhost:7017/images/${car.imageName}` 
    : 'https://via.placeholder.com/300x200?text=No+Image'} 
  className="card-img-top" 
  alt={car.brand} 
/>
                                    <div className="card-body">
                                        <h5 className="fw-bold text-warning">{brand} {model}</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3 border-secondary">
                                            <span className="text-success fw-bold">{Number(price).toLocaleString()} تومان</span>
                                            <button className="btn btn-primary btn-sm px-3" 
                                                onClick={() => id ? navigate(`/car-details/${id}`) : alert("آیدی خودرو یافت نشد")}>
                                                جزئیات
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Shop;