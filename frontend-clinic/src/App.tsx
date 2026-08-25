import { Routes, Route } from 'react-router-dom';
import EmConstrucao from './pages/EmConstrucao';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/em-construcao" element={<EmConstrucao />} />
    {/* <Route path="/dashboard" element={<DashboardPage />} />*/}

    </Routes>
  );
}

export default App;