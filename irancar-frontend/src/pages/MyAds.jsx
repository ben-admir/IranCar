import React from 'react';
import MyCars from './MyCars';

const MyAds = () => {
    const userName = localStorage.getItem("userName");
    return (
        <div className="container mt-5 text-white text-end">
            <h2>آگهی‌های من</h2>
            <p>کاربر عزیز {userName}، لیست خودروهای ثبت شده توسط شما اینجا نمایش داده می‌شود.</p>
            <div className="alert alert-info">بزودی لیست خودروهای شما به این صفحه اضافه می‌شود.</div>
        </div>
    );
};

export default MyAds;