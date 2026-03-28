import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
    const [isLogin, setIsLogin] = useState(true); // سوئیچ بین ورود و ثبت‌نام
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // منطق ورود کاربر (باید در سی‌شارپ هندل شود)
                console.log("در حال ورود کاربر...", formData);
                localStorage.setItem("userRole", "user"); 
                navigate("/add-car"); // بعد از ورود برود برای ثبت آگهی
            } else {
                // منطق ثبت‌نام کاربر
                console.log("در حال ثبت‌نام کاربر جدید...");
                alert("ثبت‌نام موفق! حالا وارد شوید.");
                setIsLogin(true);
            }
        } catch (error) {
            alert("خطایی رخ داد!");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card bg-dark text-white p-4 shadow-lg" style={{ width: '450px', border: '1px solid #444' }}>
                <h3 className="text-center orange-text mb-4">
                    {isLogin ? "ورود کاربران" : "عضویت در ایران‌کار"}
                </h3>
                
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-3">
                            <label className="form-label">نام و نام خانوادگی:</label>
                            <input type="text" className="form-control bg-secondary text-white border-0" 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">ایمیل:</label>
                        <input type="email" className="form-control bg-secondary text-white border-0" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">رمز عبور:</label>
                        <input type="password" className="form-control bg-secondary text-white border-0" 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    
                    <button type="submit" className="btn btn-warning w-100 fw-bold mt-3">
                        {isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}
                    </button>
                </form>

                <p className="text-center mt-4 cursor-pointer" onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
                    {isLogin ? "هنوز عضو نشدید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
                </p>
            </div>
        </div>
    );
};

export default UserAuth;