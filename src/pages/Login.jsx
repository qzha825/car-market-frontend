import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5117/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
      login({ username, token: data.token });
      navigate("/");
    } else {
      alert("登录失败，请检查账号密码");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", // 改为列布局
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        background: "white",
      }}
    >
      {/* 导航栏部分 */}
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <Link to="/">
          <button
            style={{
              padding: "8px 16px",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Return
          </button>
        </Link>
      </div>

      {/* 登录表单部分 */}
      <div
        style={{
          width: 450,
          padding: "50px 45px",
          borderRadius: 20,
          background: "white",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 35,
            color: "#111",
            letterSpacing: "1px",
          }}
        >
          管理员登录
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 6,
              display: "block",
              color: "#333",
            }}
          >
            用户名
          </label>
          <input
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid #ccc",
              marginBottom: 20,
              fontSize: 17,
              outline: "none",
              transition: "0.15s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />

          {/* Password */}
          <label
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 6,
              display: "block",
              color: "#333",
            }}
          >
            密码
          </label>
          <input
            placeholder="请输入密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid #ccc",
              marginBottom: 30,
              fontSize: 17,
              outline: "none",
              transition: "0.15s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />

          {/* Submit button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              transition: "0.2s",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#1e40af")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}