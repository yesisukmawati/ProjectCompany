// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './components/DashboardPage';
import DocumentsPage from './components/DocumentsPage';
import EmployeeDashboard from './components/EmployeeDashboard';
import CutiPage from './components/CutiPage'; // <-- 1. IMPORT HALAMAN BARU

// Komponen untuk halaman yang belum dibuat
const PlaceholderPage = ({ title }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="mt-2 text-gray-600">This page is under construction.</p>
    </div>
);

// Komponen untuk melindungi rute
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rute Admin yang Dilindungi */}
        <Route 
            path="/admin" 
            element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="attendance" element={<PlaceholderPage title="Attendance" />} />
          <Route path="cuti" element={<CutiPage />} /> {/* <-- 2. GANTI DENGAN KOMPONEN BARU */}
          <Route path="profile" element={<PlaceholderPage title="Profile" />} />
        </Route>
        
        {/* Rute Employee yang Dilindungi */}
        {/* CATATAN: Untuk karyawan bisa mengakses halaman cuti, Anda perlu membuat layout dan sidebar untuk karyawan juga */}
        <Route 
            path="/employee/dashboard" 
            element={
                <ProtectedRoute>
                    <EmployeeDashboard /> 
                </ProtectedRoute>
            } 
        />
        
        {/* Jika ada rute yang tidak cocok, arahkan ke halaman utama */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;