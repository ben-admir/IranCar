import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/1.jpg')",
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white p-5"
      >
        <h1 
  className="display-1 fw-bold mb-3" 
  style={{
    color: '#ffffff',             
    letterSpacing: '10px',       
    textShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(0,0,0,0.9)',
    fontWeight: '900',           
    opacity: '0.9',               
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))'
  }}
>
  SHAPE OF FUTURE
</h1>
        <p className="lead fs-3 mb-4">با ایران‌کار، رویاهایتان را برانید</p>
        <Link to="/shop" className="btn btn-primary btn-lg px-5 py-3 fs-4 rounded-pill">
          ورود به نمایشگاه
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;