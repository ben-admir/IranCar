// src/components/CarCard.jsx
function CarCard({ name, model, price, image }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px' }}>
      <img src={image || 'https://via.placeholder.com/200'} alt={name} style={{ width: '100%' }} />
      <h3>{name}</h3>
      <p>مدل: {model}</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>قیمت: {price} تومان</p>
      <button>مشاهده جزئیات</button>
      
      <button onClick={() => alert('حذف شد')}>حذف کردن</button>
    </div>
  );
}

export default CarCard;