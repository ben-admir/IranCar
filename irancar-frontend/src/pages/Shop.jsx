import React, { useEffect, useState } from 'react';

const Shop = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = "https://localhost:7017";

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/Cars`);
                
                if (!response.ok) {
                    throw new Error("خطا در پاسخ سرور");
                }

                const data = await response.json();
                setCars(data);
                setLoading(false);
            } catch (error) {
                console.error("خطا در دریافت لیست ماشین‌ها:", error);
                alert("سرور متصل نیست ❌");

                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div className="text-center mt-5 text-white">در حال بارگذاری نمایشگاه...</div>;
    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 text-black fw-bold">🏎️ نمایشگاه خودرو ایران‌کار</h2>
            <div className="row">
                {cars.length === 0 ? (
                    <div className="text-center text-light">هیچ خودرویی برای نمایش یافت نشد.</div>
                ) : (
                    cars.map((car) => (
                        <div key={car.id} className="col-md-4 mb-4">
                            <div className="card bg-dark text-white border-secondary h-100 shadow-lg">
                           <img 
    src={car.imageName ? `${API_BASE_URL}/images/${car.imageName}` : null} 
    className="card-img-top" 
    alt={car.name || "خودرو"}
    style={{ height: '220px', objectFit: 'cover', backgroundColor: '#333' }}
    onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = "https://via.placeholder.com/400x250?text=تصویر+یافت+نشد"; 
    }}
/>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-info">{car.brand} {car.name}</h5>
                                    
                                    <p className="card-text mb-1">رنگ: {car.color}</p>
                                    <p className="card-text text-success fs-5 fw-bold">
                                        {parseInt(car.price).toLocaleString()} تومان
                                    </p>
                                    <div className="mt-auto">
                                        <button 
    className="btn btn-primary" 
    onClick={() => alert(`جزئیات خودرو: ${car.brand} ${car.name}\nرنگ: ${car.color}\nقیمت: ${car.price}`)}>
    مشاهده جزئیات
</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;