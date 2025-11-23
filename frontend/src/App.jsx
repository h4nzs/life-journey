import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import TujuanList from './pages/Tujuan/TujuanList';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="tujuan" element={<TujuanList />} />
        {/* Rute detail tidak lagi diperlukan dalam desain baru */}
      </Route>
    </Routes>
  );
}

export default App;