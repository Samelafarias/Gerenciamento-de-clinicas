import { Routes, Route } from 'react-router-dom';
import EmConstrucao from './pages/EmConstrucao';
import Login from './pages/Login';
import MainLayout from "./components/Layout/mainlayout";
import DashboardPage from './pages/Dashboard';
import AgendamentosPage from './pages/Agendamentos';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/em-construcao" element={<EmConstrucao />} />

      {/* Rotas Privadas dentro do MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/agendamentos" element={<PrivateRoute element={<AgendamentosPage />} />} />
      </Route>
    </Routes>
  );
}

export default App;