import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import '../App.css';

export default function CarList() {
  const [search, setSearch] = useState('');
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars?search=${search}`)
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, [search]);

  const deleteCar = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(() => setCars(prev => prev.filter(c => c.id !== id)))
      .catch(err => console.error(err));
  };

  const getImageUrl = (image) => {
    if (!image) return "/default-car.jpg";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `${import.meta.env.VITE_API_URL}/${image.replace(/^\/+/, "")}`;
  };

  return (
    <div className="car-list-container">
      {/* Title */}
      <h1 className="page-title">59号二手车交易市场</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 搜索品牌 / 型号..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {user && (
          <button
            onClick={() => navigate('/add')}
            className="add-car-btn"
          >
            ➕ 添加车辆
          </button>
        )}
      </div>

      {/* Car cards */}
      <div className="car-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img
              src={getImageUrl(car.image)}
              alt={car.model}
              className="car-image"
            />

            <h3 className="car-title">{car.brand} {car.model}</h3>
            <p className="car-info">Year: {car.year}</p>
            <p className="car-info">Mileage: {car.mileage} km</p>
            <p className="car-price">${car.price}</p>

            {user && (
              <div className="car-actions">
                <button onClick={() => deleteCar(car.id)} className="delete-btn">
                  🗑 删除
                </button>
                <button onClick={() => navigate(`/edit/${car.id}`)} className="edit-btn">
                  ✏ 编辑
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
