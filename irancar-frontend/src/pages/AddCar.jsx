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

        const formData = new FormData();
        
        formData.append('Brand', car.brand);
        formData.append('Name', car.name);
        formData.append('Color', car.color);
        formData.append('Price', car.price);
        formData.append('Year', car.year);
        
        if (car.imageFile) {
            formData.append('ImageFile', car.imageFile);
        }

        try {
            const response = await axios.post('https://localhost:7017/api/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("پاسخ سرور:", response.data);
            alert("آگهی با موفقیت ثبت شد! ✅");
            
            setCar({ brand: '', name: '', color: '', price: '', year: '', imageFile: null });
        } catch (error) {
            console.error("خطا در ثبت آگهی:", error.response?.data || error.message);
            alert("خطا در ثبت آگهی. کنسول را چک کنید.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', direction: 'rtl' }}>
            <h2>ثبت خودروی جدید</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>برند:</label>
                    <input type="text" name="brand" value={car.brand} onChange={handleChange} style={{ width: '100%' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>مدل (Name):</label>
                    <input type="text" name="name" value={car.name} onChange={handleChange} style={{ width: '100%' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>رنگ:</label>
                    <input type="text" name="color" value={car.color} onChange={handleChange} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>قیمت:</label>
                    <input type="number" name="price" value={car.price} onChange={handleChange} style={{ width: '100%' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>سال تولید:</label>
                    <input type="number" name="year" value={car.year} onChange={handleChange} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>تصویر خودرو:</label>
                    <input type="file" onChange={handleFileChange} style={{ width: '100%' }} accept="image/*" />
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    انتشار آگهی
                </button>
            </form>
        </div>
    );
};

export default AddCar;