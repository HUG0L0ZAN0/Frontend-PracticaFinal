// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage        from './components/LoginPage';
import HomePage         from './components/HomePage';
import ProfilePage      from './components/ProfilePage';
import PrivateRoute     from './components/PrivateRoute';
import ProtectedLayout  from './components/ProtectedLayout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta protegida: Home */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <HomePage />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />

        {/* Ruta protegida: Mi Cuenta */}
        <Route
          path="/usuario"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <ProfilePage />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
