import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';


const UserAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const API_URL = "https://localhost:7017/api/Auth"; 

  try {
    if (isLogin) {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      
      localStorage.setItem("userName", response.data.userName);
      localStorage.setItem("token", response.data.token); 
      
      toast.success(`خوش آمدید، ${response.data.userName}!`);
      
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);

    } else {
      const response = await axios.post(`${API_URL}/register`, { email, password, name: email.split('@')[0] });
      
      toast.success("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.");
      setIsLogin(true); 
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "خطا در اتصال به سرور!";
    alert("نام کاربری و پسورد معتبر نیست !")
    
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" dir="rtl">
      <div className="card p-4 shadow-lg bg-dark text-white border-secondary" style={{ width: '450px', borderRadius: '20px' }}>
        <h2 className="text-center mb-4 text-warning fw-bold">
          {isLogin ? 'ورود به حساب' : 'ساخت حساب کاربری'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label small">نام و نام خانوادگی:</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary border-0"><User size={18} /></span>
                <input 
                  type="text" 
                  className="form-control bg-secondary text-white border-0" 
                  placeholder="مثلاً محمد علوی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small">ایمیل:</label>
            <div className="input-group">
              <span className="input-group-text bg-secondary border-0"><Mail size={18} /></span>
              <input 
                type="email" 
                className="form-control bg-secondary text-white border-0" 
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="mb-3">
  <label className="form-label small text-secondary">رمز عبور:</label>
  <div className="input-group mb-2">
    <span className="input-group-text bg-secondary border-0 text-white">
      <Lock size={18} />
    </span>
    <input 
      type={showPassword ? "text" : "password"} 
      className="form-control bg-secondary text-white border-0" 
      placeholder="******"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required 
    />
  </div>

  <div className="form-check form-check-inline mt-1">
    <input 
      className="form-check-input bg-secondary border-secondary" 
      type="checkbox" 
      id="showPassCheck"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)} 
    />
    
    <p>نمایش رمز عبور
</p>
    <label className="form-check-label small text-secondary" htmlFor="showPassCheck" style={{ cursor: 'pointer' }}>
    </label>
  </div>
</div>
<button 
  type="submit" 
  className="btn btn-warning w-100 fw-bold py-2 mb-3"
  disabled={loading}
>
  {loading ? "در حال پردازش..." : (isLogin ? "ورود به حساب" : "ثبت‌نام")}
</button>

          <div className="text-center">
            <button 
              type="button" 
              className="btn btn-link text-info text-decoration-none small"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'هنوز ثبت‌نام نکردی؟ کلیک کن' : 'قبلاً ثبت‌نام کردی؟ وارد شو'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;