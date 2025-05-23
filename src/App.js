// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage       from './components/LoginPage';
import RegisterPage    from './components/RegisterPage';
import HomePage        from './components/HomePage';
import ProfilePage     from './components/ProfilePage';
import PrivateRoute    from './components/PrivateRoute';
import ProtectedLayout from './components/ProtectedLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
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

        {/* Si quieres, añade un catch-all que redirija al login o 404 */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}
