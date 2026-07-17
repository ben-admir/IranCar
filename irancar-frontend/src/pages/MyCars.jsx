import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCars = () => {
    const [myCars, setMyCars] = useState([]);
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        const fetchMyCars = async () => {
            const res = await axios.get('https://localhost:7017/api/cars');
            const filtered = res.data.filter(car => car.ownerName === userName);
            setMyCars(filtered);
        };
        fetchMyCars();
    }, [userName]);

    return (
        <div>
            <h2>آگهی‌های من ({userName})</h2>
            <div className="car-list">
                {myCars.map(car => (
                    <div key={car.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{car.brand} {car.model}</h3>
                        <p>قیمت: {car.price} تومان</p>
                        <button style={{ color: 'red' }}>حذف آگهی</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCars;