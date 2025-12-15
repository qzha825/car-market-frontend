import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CarForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // 获取编辑的车辆 id
  const isEditing = !!id;
  const { user } = useContext(AuthContext);

  const [formCar, setFormCar] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      axios.get(`${import.meta.env.VITE_API_URL}/cars?search=`)
        .then(res => {
          const car = res.data.find(c => c.id === Number(id));
          if (car) setFormCar(car);
        })
        .catch(err => console.error(err));
    }
  }, [id, isEditing]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("${import.meta.env.VITE_API_URL}/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setFormCar({ ...formCar, image: res.data.url }); // 保存图片 URL
    } catch (err) {
      console.error(err);
      alert("图片上传失败");
    }
  };

  const handleSubmit = () => {
    const body = {
      brand: formCar.brand,
      model: formCar.model,
      year: Number(formCar.year),
      mileage: Number(formCar.mileage),
      price: Number(formCar.price),
      image: formCar.image
    };

    if (isEditing) {
      axios.put(`${import.meta.env.VITE_API_URL}/cars/${id}`, body, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else {
      axios.post("${import.meta.env.VITE_API_URL}/cars", body, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>{isEditing ? '编辑车辆' : '添加车辆'}</h2>
      {["brand", "model", "year", "mileage", "price", "image"].map(field => (
        <input
          key={field}
          type="text"
          placeholder={field}
          value={formCar[field]}
          onChange={e => setFormCar({ ...formCar, [field]: e.target.value })}
          style={{ width: "100%", padding: 8, margin: "5px 0" }}
        />
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ margin: "10px 0" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{ marginTop: 10, padding: "10px 15px", background: "green", color: "white", border: "none", borderRadius: 5 }}
      >
        {isEditing ? '保存修改' : '添加车辆'}
      </button>
      <button
        onClick={() => navigate('/')}
        style={{ marginLeft: 10, padding: "10px 15px", background: "gray", color: "white", border: "none", borderRadius: 5 }}
      >
        返回
      </button>
    </div>
  );
}
