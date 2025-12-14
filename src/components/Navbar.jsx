import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
      <h2></h2>
      <div>
        {user ? (
          <>
            <span>Hi, {user.username} </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
