// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');      // <-- nuevo estado
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');   // limpia errores previos

    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/', { replace: true });
    } else {
      // captura el mensaje de error del backend o pon uno genérico
      const body = await res.json().catch(() => ({}));
      setError(body.message || 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>Iniciar sesión</h3>
        <form onSubmit={handleLogin}>
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

          {/* Aquí mostramos el error */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
