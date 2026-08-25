import { Routes, Route } from 'react-router-dom';
import EmConstrucao from './pages/EmConstrucao';
import Login from './pages/Login';
//import Dashboard from './pages/Dashboard';
//import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/em-construcao" element={<EmConstrucao />} />
      { /*<Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />*/}
    </Routes>
  );
}

export default App;