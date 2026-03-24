import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === '1234') {
      onLogin(true);
    } 
    else {
      alert('نام کاربری یا رمز عبور اشتباه است! ❌');
      setCredentials({username: '', password: '' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>ورود به پنل ایران‌کار</h2>
          <p>خوش آمدید، لطفاً وارد شوید</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group-custom">
            <User size={20} className="icon" />
            <input 
              type="text" 
              placeholder="نام کاربری" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div className="input-group-custom">
            <Lock size={20} className="icon" />
            <input 
              type="password" 
              placeholder="رمز عبور" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button type="submit" className="login-button">
            <span>ورود</span>
            <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;