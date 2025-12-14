//backup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import CarForm from './pages/CarForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/add" element={<CarForm />} />
        <Route path="/edit/:id" element={<CarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
