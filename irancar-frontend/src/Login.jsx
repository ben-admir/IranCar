import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === '1234') {
            localStorage.setItem('isAdmin', 'true'); 
            navigate('/admin');
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است! ❌");
        }
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>ورود مدیریت</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        style={inputStyle} 
                        placeholder="نام کاربری" 
                        onChange={e => setCredentials({...credentials, username: e.target.value})} 
                    />
                    <input 
                        style={inputStyle} 
                        type="password" 
                        placeholder="رمز عبور" 
                        onChange={e => setCredentials({...credentials, password: e.target.value})} 
                    />
                    <button type="submit" style={loginBtnStyle}>ورود به پنل</button>
                </form>
            </div>
        </div>
    );
};

const containerStyle = { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' };
const cardStyle = { backgroundColor: '#2d2d2d', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center', width: '350px' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: 'none', backgroundColor: '#3d3d3d', color: '#fff' };
const loginBtnStyle = { width: '100%', padding: '12px', marginTop: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer' };

export default Login;