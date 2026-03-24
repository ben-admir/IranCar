import React from 'react';
import { motion } from 'framer-motion';


const About = () => {
  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-3 fw-bold border-bottom d-inline-block pb-2">درباره ایران‌کار</h1>
          <p className="lead mt-3 text-secondary">جایی که اصالت با سرعت ملاقات می‌کند</p>
        </motion.div>

        <div className="row align-items-center mt-5">

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-md-6"
          >
            <h2 className="text-primary mb-4">داستان ما</h2>
            <p className="fs-5 lh-lg">
              نمایشگاه ایران‌کار از سال ۱۳۸۰ با هدف واردات خاص‌ترین خودروهای آلمانی و ایتالیایی فعالیت خود را آغاز کرد. 
              ما معتقدیم خرید خودرو فقط یک معامله نیست، بلکه آغاز یک سبک زندگی جدید است.
            </p>
            <div className="mt-4">
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-primary me-2 p-2">✓</span>
                <span>تضمین اصالت قطعات و بدنه</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-primary me-2 p-2">✓</span>
                <span>کارشناسی تخصصی توسط تیم آلمانی</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="col-md-6"
          >
            <img 
              src="https://images.unsplash.com/photo-1562141961-b5d1856660fb" 
              alt="Luxury Showroom" 
              className="img-fluid rounded-pill shadow-lg border border-secondary p-2"
            />
          </motion.div>
        </div>

        <div className="row text-center mt-5 pt-5">
          <div className="col-md-4">
            <h2 className="fw-bold text-primary">۱۵۰+</h2>
            <p className="text-secondary">خودروهای فروخته شده در سال</p>
          </div>
          <div className="col-md-4">
            <h2 className="fw-bold text-primary">۲۴</h2>
            <p className="text-secondary">ساعت پشتیبانی و خدمات</p>
          </div>
          <div className="col-md-4">
            <h2 className="fw-bold text-primary">۱۰۰٪</h2>
            <p className="text-secondary">رضایت مشتریان وفادار</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;