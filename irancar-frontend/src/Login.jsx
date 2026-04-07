import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userField, setUserField] = useState('');
  const [passField, setPassField] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userField === 'admin' && passField === '1234') {
      
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('userName', 'مدیر سیستم');

      navigate('/admin');
      window.location.reload();
    } else {
      alert("نام کاربری یا رمز عبور ادمین اشتباه است! ❌");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg bg-dark text-white border-secondary" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 text-info">ورود مدیریت</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">نام کاربری ادمین:</label>
            <input 
              type="text" 
              className="form-control bg-secondary text-white border-0"
              value={userField}
              onChange={(e) => setUserField(e.target.value)} 
              placeholder="مثلاً admin"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">رمز عبور:</label>
            <input 
              type="password" 
              className="form-control bg-secondary text-white border-0"
              value={passField}
              onChange={(e) => setPassField(e.target.value)} 
              placeholder="مثلاً 1234"
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100 fw-bold">ورود به پنل</button>
        </form>
      </div>
    </div>
  );
};

export default Login;