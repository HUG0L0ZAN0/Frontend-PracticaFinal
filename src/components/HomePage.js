// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');   // limpia el token
    navigate('/login', { replace: true }); // redirige al login
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Hello World</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
