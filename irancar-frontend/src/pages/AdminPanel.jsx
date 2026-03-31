import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCars = async () => {
        try {
            const res = await axios.get('https://localhost:7017/api/cars');
            setCars(res.data);
        } catch (err) { console.error("خطا:", err); }
    };
    const handleLogout = () => {
    localStorage.removeItem('isAdmin'); 
    window.location.href = '/login'; 
};
  
    useEffect(() => { fetchCars(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("حذف شود؟")) {
            await axios.delete(`https://localhost:7017/api/cars/${id}`);
            fetchCars();
        }
    };

    const openEditModal = (car) => {
        setEditingCar({ ...car });
        setShowModal(true);
        console.log();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Brand', editingCar.brand);
        formData.append('Name', editingCar.name);
        formData.append('Price', editingCar.price);
        formData.append('Image', editingCar.imageName);

        try {
            await axios.put(`https://localhost:7017/api/cars/${editingCar.id}`, formData);
            setShowModal(false);
            fetchCars();
            alert("بروزرسانی شد ✅");
        } catch (err) { alert("خطا در سی‌شارپ"); }
    };

    return (
        
        <div style={{ padding: '20px', direction: 'rtl', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            <button onClick={handleLogout} style={{ float: 'left', backgroundColor: '#555', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>
    خروج از پنل 🚪
</button>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>پنل مدیریت خودروها</h2>
            
            <table style={tableStyle}>
               <thead>
    <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
        <th style={thTdStyle}>برند</th>
        <th style={thTdStyle}>مدل</th>
        <th style={thTdStyle}>قیمت (تومان)</th>
        <th style={thTdStyle}>عکس</th>
        <th style={thTdStyle}>عملیات</th>
    </tr>
</thead>
<tbody>
    {cars.map((car) => (
        <tr key={car.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ ...thTdStyle, color: '#222', fontWeight: 'bold' }}>{car.brand}</td>
            <td style={{ ...thTdStyle, color: '#444' }}>{car.name}</td>
            <td style={{ ...thTdStyle, color: '#27ae60', fontWeight: 'bold' }}>
                {Number(car.price).toLocaleString()}
            </td>
            <td style={{  color: '#444' }}>{car.imageName}</td>
            <td style={thTdStyle}>
                <button onClick={() => openEditModal(car)} style={editBtnStyle}>ویرایش ✏️</button>
                <button onClick={() => handleDelete(car.id)} style={deleteBtnStyle}>حذف 🗑️</button>
            </td>
        </tr>
    ))}
</tbody>
            </table>

            {showModal && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #ddd' }}>ویرایش آگهی</h3>
                        <form onSubmit={handleUpdate}>
                            <label>برند:</label>
                            <input style={inputStyle} value={editingCar.brand} onChange={e => setEditingCar({...editingCar, brand: e.target.value})} />
                            
                            <label>مدل:</label>
                            <input style={inputStyle} value={editingCar.name} onChange={e => setEditingCar({...editingCar, name: e.target.value})} />
                            
                            <label>قیمت جدید:</label>
                            <input style={inputStyle} type="number" value={editingCar.price} onChange={e => setEditingCar({...editingCar, price: e.target.value})} />

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" style={saveBtnStyle}>ذخیره</button>
                                <button type="button" onClick={() => setShowModal(false)} style={cancelBtnStyle}>لغو</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// استایل‌ها (بدون تغییر نسبت به قبل، فقط thTdStyle اضافه شد)
const tableStyle = { width: '95%', margin: '0 auto', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' };
const thTdStyle = { padding: '15px', textAlign: 'center' };
const editBtnStyle = { backgroundColor: '#f1c40f', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginLeft: '5px' };
const deleteBtnStyle = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' };
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '400px' };
const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const saveBtnStyle = { flex: 1, backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' };
const cancelBtnStyle = { flex: 1, backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' };

export default AdminPanel;