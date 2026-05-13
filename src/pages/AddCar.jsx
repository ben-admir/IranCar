import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
    const [car, setCar] = useState({
        brand: '',
        name: '',
        color: '',
        price: '',
        year: '',
        imageFile: null
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

        const currentUserId = localStorage.getItem('userId');

        if (!currentUserId || currentUserId === "undefined") {
            alert("خطا: آیدی کاربر یافت نشد. لطفا دوباره لاگین کنید.");
            return;
        }

        const formData = new FormData();
        
        formData.append('Brand', car.brand);
        formData.append('Name', car.name);
        formData.append('Color', car.color);
        formData.append('Price', car.price);
        formData.append('Year', car.year);
        formData.append('UserId', currentUserId); 
        
        if (car.imageFile) {
            formData.append('ImageFile', car.imageFile);
        }

        try {
            const response = await axios.post('http://localhost:5058/api/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("پاسخ سرور:", response.data);
            alert("آگهی با موفقیت به نام شما ثبت شد! ✅");
            
            setCar({ brand: '', name: '', color: '', price: '', year: '', imageFile: null });
        } catch (error) {
            console.error("خطا در ثبت آگهی:", error.response?.data || error.message);
            alert("خطا در ثبت آگهی. کنسول را چک کنید.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '50px auto', direction: 'rtl', backgroundColor: '#1a1a1a', borderRadius: '15px', color: 'white' }}>
            <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>ثبت خودروی جدید</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>برند خودرو:</label>
                    <input type="text" name="brand" value={car.brand} onChange={handleChange} style={inputStyle} placeholder="مثلاً Benz" required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>مدل (Name):</label>
                    <input type="text" name="name" value={car.name} onChange={handleChange} style={inputStyle} placeholder="مثلاً CLS" required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>رنگ:</label>
                    <input type="text" name="color" value={car.color} onChange={handleChange} style={inputStyle} placeholder="مثلاً سفید" />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>قیمت (تومان):</label>
                    <input type="number" name="price" value={car.price} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>سال تولید:</label>
                    <input type="number" name="year" value={car.year} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>تصویر خودرو:</label>
                    <input type="file" onChange={handleFileChange} style={{ ...inputStyle, padding: '5px' }} accept="image/*" />
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    🚀 انتشار آگهی در نمایشگاه
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: 'white'
};

export default AddCar;