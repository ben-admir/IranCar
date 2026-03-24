import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import Login from '../Login'; 

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ brand: '', name: '', color: '', year: 2024, price: '' });

  const fetchCars = () => {
    fetch('https://localhost:7017/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('خطا:', error));
  };

  useEffect(() => {
    if (isLoggedIn) fetchCars();
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'حذف خودرو؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن'
    });
    if (result.isConfirmed) {
      const response = await fetch(`https://localhost:7017/api/cars/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCars(cars.filter(car => car.id !== id));
        Swal.fire('حذف شد!', '', 'success');
      }
    }
  };

  const handleSave = () => {
    if (!newCar.brand || !newCar.name) return;
    fetch('https://localhost:7017/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    }).then(response => {
      if (response.ok) {
        fetchCars();
        setNewCar({ brand: '', name: '', color: '', price: '', year: 2024 });
        Swal.fire({ icon: 'success', title: 'ثبت شد', timer: 1500, showConfirmButton: false });
      }
    });
  };

  if (!isLoggedIn) return <Login onLogin={setIsLoggedIn} />;

  return (
    <div className="container mt-5" dir="rtl">
      <div className="d-flex justify-content-between mb-4">
        <h3>پنل مدیریت خودروها</h3>
        <button className="btn btn-outline-danger" onClick={() => setIsLoggedIn(false)}>خروج ادمین</button>
      </div>

      <div className="card shadow mb-4 p-3 bg-light border-0">
        <div className="row g-2">
          <div className="col-md-3"><input type="text" className="form-control" placeholder="برند" value={newCar.brand} onChange={(e) => setNewCar({...newCar, brand: e.target.value})} /></div>
          <div className="col-md-3"><input type="text" className="form-control" placeholder="مدل" value={newCar.name} onChange={(e) => setNewCar({...newCar, name: e.target.value})} /></div>
          <div className="col-md-2"><input type="number" className="form-control" placeholder="قیمت" value={newCar.price} onChange={(e) => setNewCar({...newCar, price: e.target.value})} /></div>
          <div className="col-md-2"><button className="btn btn-primary w-100" onClick={handleSave}>ذخیره</button></div>
        </div>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-hover text-center align-middle bg-white">
          <thead className="table-dark">
            <tr><th>برند</th><th>مدل</th><th>قیمت</th><th>عملیات</th></tr>
          </thead>
          <tbody>
            {cars.map(item => (
              <tr key={item.id}>
                <td>{item.brand}</td>
                <td>{item.name}</td>
                <td>{Number(item.price).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;