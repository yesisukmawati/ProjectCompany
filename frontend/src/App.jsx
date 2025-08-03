import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/AdminLayout'; // Import layout baru
import DashboardPage from './components/DashboardPage'; // Import halaman dashboard baru
import EmployeeDashboard from './components/EmployeeDashboard';
import DocumentsPage from './components/DocumentsPage';

// Halaman placeholder untuk rute lain
const PlaceholderPage = ({ title }) => (
    <div className="text-3xl font-bold">{title}</div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rute Admin (dibungkus dengan Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="attendance" element={<PlaceholderPage title="Attendance Page" />} />
          <Route path="cuti" element={<PlaceholderPage title="Cuti Page" />} />
          <Route path="profile" element={<PlaceholderPage title="Profile Page" />} />
        </Route>
        
        {/* Rute Employee */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        
        {/* Tambahkan rute lain jika perlu */}
      </Routes>
    </Router>
  );
}

export default App;
