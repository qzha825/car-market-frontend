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
    axios.get(`http://localhost:5117/cars?search=${search}`)
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, [search]);

  const deleteCar = (id) => {
    axios.delete(`http://localhost:5117/cars/${id}`, {
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
    return `http://localhost:5117/${image.replace(/^\/+/, "")}`;
  };

  return (
    <div style={{ padding: "30px 40px" }}>
      {/* Title */}
      <h1 style={{
        fontSize: "46px",
        fontWeight: 900,
        marginBottom: "30px",
        color: "#111",
        textAlign: "center",
        letterSpacing: "3px",
        textTransform: "uppercase",
        paddingBottom: "12px",
        borderBottom: "2px solid rgba(0,0,0,0.15)",
        width: "fit-content",
        margin: "0 auto 35px",
      }}>
        59号二手车交易市场
      </h1>


      {/* Search bar */}
      <div style={{ marginBottom: 25, display: "flex", alignItems: "center", gap: 15 }}>
        <input
          type="text"
          placeholder="🔍 搜索品牌 / 型号..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px 15px",
            width: 300,
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        />

        {user && (
          <button
            onClick={() => navigate('/add')}
            style={{
              padding: "12px 18px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => e.target.style.background = "#218838"}
            onMouseLeave={(e) => e.target.style.background = "#28a745"}
          >
            ➕ 添加车辆
          </button>
        )}
      </div>

      {/* Car cards */}
      <div
        style={{
          display: "grid",
          gap: 25,
        }}
        className="car-grid"
      >
        {cars.map(car => (
          <div
            key={car.id}
            style={{
              borderRadius: 15,
              padding: 15,
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={getImageUrl(car.image)}
              alt={car.model}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 12,
                marginBottom: 10
              }}
            />

            <h3 style={{ margin: "5px 0", fontSize: 18, fontWeight: 600 }}>
              {car.brand} {car.model}
            </h3>

            <p style={{ margin: "4px 0", color: "#555" }}>Year: {car.year}</p>
            <p style={{ margin: "4px 0", color: "#555" }}>Mileage: {car.mileage} km</p>
            <p style={{ margin: "8px 0", fontWeight: "bold", fontSize: 18 }}>
              ${car.price}
            </p>

            {user && (
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button
                  onClick={() => deleteCar(car.id)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  🗑 删除
                </button>

                <button
                  onClick={() => navigate(`/edit/${car.id}`)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    background: "#fd7e14",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
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
