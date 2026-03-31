import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const baseUrl = "https://localhost:7017/api/auth";
    const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/register`;

    try {
      Swal.fire({
        title: 'در حال بررسی...',
        background: '#1a1a1a',
        color: '#fff',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      const response = await axios.post(url, formData);

      if (response.data) {
        localStorage.setItem("userName", formData.username);

        await Swal.fire({
          title: isLogin ? `خوش آمدید، ${formData.username}! 🏎️` : 'ثبت‌نام با موفقیت انجام شد! 🎉',
          text: 'وارد دنیای سرعت ایران‌کار شدید.',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#ffc107',
          confirmButtonText: 'بزن بریم!',
        });

        navigate("/");
        window.location.reload(); 
      }
    } catch (error) {
      console.error("خطا:", error);
      
      let errorMsg = "نام کاربری یا رمز عبور اشتباه است ❌";
      if (error.response?.status === 404) {
        errorMsg = "مسیر ورود پیدا نشد (ارور ۴۰۴). لطفاً بک‌اِند را چک کنید!";
      }

      Swal.fire({
        title: 'خطا در عملیات!',
        text: errorMsg,
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#d33',
        confirmButtonText: 'تلاش دوباره'
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
      <div className="card p-4 shadow-lg bg-dark text-white shadow-yellow" style={{ width: "100%", maxWidth: "400px", border: "1px solid #444" }}>
        <h2 className="text-center mb-4 text-warning fw-bold" style={{ letterSpacing: '1px' }}>
          {isLogin ? "ورود به ایران‌کار" : "عضویت در ایران‌کار"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary small">نام کاربری:</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0 py-2 shadow-none"
              placeholder="Username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-secondary small">ایمیل:</label>
              <input
                type="email"
                className="form-control bg-secondary text-white border-0 py-2 shadow-none"
                placeholder="Email Address"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="form-label text-secondary small">رمز عبور:</label>
            <input
              type="password"
              className="form-control bg-secondary text-white border-0 py-2 shadow-none"
              placeholder="Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3">
            {isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}
          </button>

          <p className="text-center small mb-0 text-secondary">
            {isLogin ? "هنوز ثبت‌نام نکردید؟ " : "قبلاً عضو شده‌اید؟ "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "ایجاد حساب" : "وارد شوید"}
            </span>
          </p>
        </form>
      </div>

      <style>{`
        .shadow-yellow { box-shadow: 0 0 20px rgba(255, 193, 7, 0.1) !important; }
        input:focus { background-color: #444 !important; color: #fff !important; }
      `}</style>
    </div>
  );
};

export default UserAuth;