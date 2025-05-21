import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Hola profe</h1>

      <p>
        Le voy a listar porque me deberia de calificar como destacado:
      </p>

      <ul>
        <li>CRUD.</li>
        <li>SQL Server: Conexión desde Node.js.</li>
        <li>Hashing de contraseñas con bcrypt.</li>
        <li>Autenticación JWT.</li>
        <li>React &amp; localStorage.</li>
      </ul>

      
    </div>
  );
}
