import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";

import CarList from "./pages/CarList";
import CarForm from "./pages/CarForm";
import Login from "./pages/Login";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}   {/* 登录页不显示 Navbar */}
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/add" element={<CarForm />} />
        <Route path="/edit/:id" element={<CarForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
