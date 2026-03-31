import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      const userData = { name, email, password };
      
      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      
      alert("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید.");
      setIsLogin(true); 
    } else {
      const savedUser = localStorage.getItem(`user_${email}`);
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        
        if (userData.password === password) {
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userId", email);
          
          alert(`خوش آمدی ${userData.name}!`);
          navigate('/'); 
          window.location.reload();
        } else {
          alert("رمز عبور اشتباه است!");
        }
      } else {
        alert("کاربری با این ایمیل پیدا نشد. ابتدا ثبت‌نام کنید.");
      }
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
<button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3 rounded-3 shadow-sm">
  {isLogin ? 'ورود به حساب' : 'تایید و ساخت حساب'}
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