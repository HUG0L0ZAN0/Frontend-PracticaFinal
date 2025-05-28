// src/components/ProfilePage.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const [user, setUser]           = useState(null);
  const [editing, setEditing]     = useState(null); 
  const [tempValue, setTempValue] = useState('');
  const [error, setError]         = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login', { replace: true });
    const payload = decodeToken(token);
    if (!payload?.id) return navigate('/login', { replace: true });

    fetch(`http://localhost:3001/api/usuarios/${payload.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => setUser(data))
      .catch(() => navigate('/login', { replace: true }));
  }, [navigate]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const updateField = async field => {
    const token = localStorage.getItem('token');
    const body = {
      username: field === 'username' ? tempValue : user.username,
      email:    field === 'email'    ? tempValue : user.email
    };

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setError(null);
      } else {
        setError(`Error al actualizar ${field}`);
      }
    } catch (err) {
      setError(`Error al actualizar ${field}`);
    }
    setEditing(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar tu cuenta?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3001/api/usuarios/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  };

  if (!user) return <p className="loading">Cargando datos...</p>;

  return (
    <div className="profile-container">
      <h2>Mi Cuenta</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Campo ID */}
      <div className="field">
        <label>ID:</label>
        <span>{user.id}</span>
      </div>

      {/* Campo Usuario */}
      <div className="field">
        <label>Usuario:</label>
        {editing === 'username' ? (
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
            onBlur={() => updateField('username')}
            onKeyDown={e => e.key === 'Enter' && updateField('username')}
          />
        ) : (
          <>
            <span>{user.username}</span>
            <button
              className="edit-btn"
              onClick={() => {
                setTempValue(user.username);
                setEditing('username');
              }}
            >
              Editar
            </button>
          </>
        )}
      </div>

      {/* Campo Email */}
      <div className="field">
        <label>Email:</label>
        {editing === 'email' ? (
          <input
            ref={inputRef}
            type="email"
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
            onBlur={() => updateField('email')}
            onKeyDown={e => e.key === 'Enter' && updateField('email')}
          />
        ) : (
          <>
            <span>{user.email}</span>
            <button
              className="edit-btn"
              onClick={() => {
                setTempValue(user.email);
                setEditing('email');
              }}
            >
              Editar
            </button>
          </>
        )}
      </div>

      {/* Botón de Cerrar sesión */}
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>

      {/* Botón de Eliminar cuenta */}
      <button className="btn-danger delete-btn" onClick={handleDelete}>
        Eliminar cuenta
      </button>
    </div>
  );
}
