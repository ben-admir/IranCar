import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
    const [car, setCar] = useState({
        brand: '', name: '', color: '', price: '', year: '', imageFile: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleFileChange = (e) => {
        setCar({ ...car, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userEmail = localStorage.getItem('userEmail'); 
        if (!userEmail) {
            alert("دکتر، ایمیل شما یافت نشد! لطفا دوباره وارد حساب خود شوید.");
            return;
        }

        const formData = new FormData();
        formData.append('OwnerEmail', userEmail); 
        formData.append('Brand', car.brand);
        formData.append('Name', car.name);
        formData.append('Color', car.color);
        formData.append('Price', car.price);
        formData.append('Year', car.year);
        if (car.imageFile) {
            formData.append('ImageFile', car.imageFile);
        }

        try {
            await axios.post('http://localhost:5058/api/cars', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("تبریک دکتر! آگهی با موفقیت ثبت شد. ✅");
            setCar({ brand: '', name: '', color: '', price: '', year: '', imageFile: null });
        } catch (error) {
            console.error("خطا:", error.response?.data || error.message);
            alert("خطا در ثبت آگهی.");
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px',
        border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white', outline: 'none'
    };

    return (
        <div style={{ padding: '30px', maxWidth: '550px', margin: '50px auto', direction: 'rtl', backgroundColor: '#1a1a1a', borderRadius: '15px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h2 style={{ borderBottom: '3px solid #007bff', paddingBottom: '15px', marginBottom: '25px', textAlign: 'center' }}>ثبت خودروی جدید</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>برند خودرو:</label>
                    <input type="text" name="brand" value={car.brand} onChange={handleChange} style={inputStyle} placeholder="مثلاً BMW" required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>مدل (Name):</label>
                    <input type="text" name="name" value={car.name} onChange={handleChange} style={inputStyle} placeholder="مثلاً X5" required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>رنگ بدنه:</label>
                    <input type="text" name="color" value={car.color} onChange={handleChange} style={inputStyle} placeholder="مثلاً سفید صدفی" />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>قیمت (تومان):</label>
                    <input type="number" name="price" value={car.price} onChange={handleChange} style={inputStyle} placeholder="مثلاً 450000000" required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>سال تولید:</label>
                    <input type="number" name="year" value={car.year} onChange={handleChange} style={inputStyle} placeholder="مثلاً 2023" />
                </div>
                <div style={{ marginBottom: '25px' }}>
                    <label>تصویر خودرو:</label>
                    <input type="file" onChange={handleFileChange} style={{ ...inputStyle, padding: '8px', border: '1px dashed #555' }} accept="image/*" />
                </div>
                <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    🚀 تایید و انتشار آگهی
                </button>
            </form>
        </div>
    );
};

export default AddCar;