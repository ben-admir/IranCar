import React, { useState } from 'react';
import axios from 'axios'; 

const AddCar = () => {
    const [car, setCar] = useState({
        brand: '',
        name: '',
        color: '',
        price: '',
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
        formData.append("brand", car.brand);
        formData.append("name", car.name);
        formData.append("color", car.color);
        formData.append("price", car.price);
        if (car.imageFile) {
            formData.append("imageFile", car.imageFile);
        }

        try {
            const response = await axios.post("https://localhost:7017/api/Cars", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert("✅ ایول! ماشین با موفقیت ثبت شد.");
                window.location.href = "/shop";
            }
        } catch (error) {
            console.error("خطا در ثبت:", error);
            alert("❌ ثبت نشد! کنسول مرورگر (F12) رو چک کن.");
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h2>ثبت خودرو جدید</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="brand" placeholder="برند (مثلاً BMW)" className="form-control mb-2" onChange={handleChange} required />
                <input type="text" name="name" placeholder="نام (مثلاً i8)" className="form-control mb-2" onChange={handleChange} required />
                <input type="text" name="color" placeholder="رنگ" className="form-control mb-2" onChange={handleChange} required />
                <input type="number" name="price" placeholder="قیمت" className="form-control mb-2" onChange={handleChange} required />
                <input type="file" className="form-control mb-3" onChange={handleFileChange} accept="image/*" />
                
                <button type="submit" className="btn btn-success w-100">ثبت و انتشار در نمایشگاه</button>
            </form>
        </div>
    );
};

export default AddCar;