import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAds = () => {
    const [myCars, setMyCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        const fetchMyAds = async () => {
            try {
                const res = await axios.get('https://localhost:7017/api/cars');
                
                // فیلتر سخت‌گیرانه: فقط ماشین‌هایی که نام مالکشان دقیقاً با نام کاربر برابر است[cite: 5]
                const filtered = res.data.filter(car => {
                    const owner = car.OwnerName || car.OwnerName;
                    return owner === userName; 
                });

                setMyCars(filtered);
            } catch (err) {
                console.error("خطا:", err);
            } finally {
                setLoading(false);
            }
        };
        if (userName) fetchMyAds();
    }, [userName]);

    const handleDelete = async (id) => {
        if (window.confirm("آیا از حذف این آگهی اطمینان دارید؟")) {
            try {
                await axios.delete(`https://localhost:7017/api/cars/${id}`);
                setMyCars(myCars.filter(car => (car.id || car.Id) !== id));
                alert("آگهی حذف شد ✅");
            } catch (err) {
                alert("خطا در حذف");
            }
        }
    };

    return (
        <div className="container py-5 text-white text-end" dir="rtl">
            <div className="mb-5 border-bottom border-secondary pb-3">
                <h2 className="fw-bold text-warning">آگهی‌های من</h2>
                <p className="text-secondary">فقط خودروهای ثبت شده توسط: <span className="text-white">{userName}</span></p>
            </div>

            {loading ? (
                <div className="text-center"><div className="spinner-border text-warning"></div></div>
            ) : (
                <div className="row g-4">
                    {myCars.length > 0 ? (
                        myCars.map((car) => (
                            <div className="col-md-4" key={car.id || car.Id}>
                                <div className="card bg-dark text-white border-secondary h-100 shadow">
                                    <img 
                                        src={car.imageName ? `https://localhost:7017/images/${car.imageName}` : 'https://via.placeholder.com/300x200'} 
                                        className="card-img-top" 
                                        style={{ height: '200px', objectFit: 'cover' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="fw-bold text-warning">{car.brand || car.Brand} {car.name || car.Name}</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3 border-secondary">
                                            <span className="text-success fw-bold">{Number(car.price || car.Price).toLocaleString()} تومان</span>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-primary btn-sm px-3" onClick={() => navigate(`/car-details/${car.id || car.Id}`)}>جزئیات</button>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(car.id || car.Id)}>حذف</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 w-100">
                            <h5 className="text-secondary">آگهی یافت نشد. (مطمئن شوید آگهی جدید با این کاربر ثبت کرده‌اید)</h5>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAds;