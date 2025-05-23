import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Reutilizamos los mismos estilos

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:3001/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (res.ok) {
      // Después de crear, redirigimos al login
      navigate('/login', { replace: true });
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.message || 'Error al registrar usuario');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>Registrar usuario</h3>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrar</button>
        </form>

        {/* Botón Regresar */}
        <button 
          onClick={handleBack} 
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Regresar al Login
        </button>
      </div>
    </div>
  );
}
