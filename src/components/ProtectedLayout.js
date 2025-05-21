import React from 'react';
import Navbar from './Navbar';

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
