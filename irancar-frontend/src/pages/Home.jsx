import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')", 
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
        <h1 className="display-1 fw-bold mb-3">SHAPE OF FUTURE</h1>
        <p className="lead fs-3 mb-4">با ایران‌کار، رویاهایتان را برانید</p>
        <Link to="/shop" className="btn btn-primary btn-lg px-5 py-3 fs-4 rounded-pill">
          ورود به نمایشگاه
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;