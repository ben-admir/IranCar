import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-black text-white py-5 border-top border-secondary">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-primary">IRAN CAR</h5>
            <p className="text-secondary small">تجربه‌ای متفاوت در خرید و فروش خودروهای لوکس. با ایران‌کار، رویاهایتان را برانید.</p>
            
   
          <div className="d-flex gap-4 mt-3">
  <a href="https://instagram.com/Mohammad_mirzaeeiii" target="_blank" rel="noreferrer" className="text-white-50 hover-primary">
    <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
  </a>
  
  <a href="https://t.me/mohammad_mirzaeeiii" target="_blank" rel="noreferrer" className="text-white-50 hover-primary">
    <i className="bi bi-telegram" style={{ fontSize: '1.5rem' }}></i>
  </a>
</div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">دسترسی سریع</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-secondary text-decoration-none small">صفحه اصلی</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none small">نمایشگاه</Link></li>
              <li><Link to="/support" className="text-secondary text-decoration-none small">پشتیبانی</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4 text-md-end">
            <h5 className="fw-bold mb-3">ارتباط با ما</h5>
            <p className="text-secondary mb-1 small">کرج, برج ایران‌کار</p>
            <p className="text-secondary small">Odinbrus1380@gmail.com</p>
          </div>
        </div>

        <hr className="my-4 border-secondary" />
        <div className="text-center text-secondary style={{ fontSize: '12px' }}">
          © ۲۰۲۶ ایران‌کار. طراحی شده برای آینده.
        </div>
      </div>
    </footer>
  );
};

export default Footer;