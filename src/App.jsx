import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import LandingPage from './pages/Operator/Landing/LandingPage.jsx';
import Login from './pages/Operator/Login/Login.jsx';

// Operator Components
import Dashboard from './pages/Operator/Dashboard/Dashboard.jsx';
import DataGuruOperator from './pages/Operator/DataGuru/DataGuru.jsx';
import EditGuru from './pages/Operator/DataGuru/EditGuru.jsx';
import ViewGuru from './pages/Operator/DataGuru/ViewGuru.jsx';
import Dokumen from './pages/Operator/Dokumen/DokumenDigital.jsx';
import UploadDokumen from './pages/Operator/Dokumen/Tambah.jsx';
import Usulan from './pages/Operator/PerubahanData/UsulPerubahanData.jsx';
import Pelaporan from './pages/Operator/PelaporanSekolah/Pelaporan.jsx';
import GantiPassword from './pages/Operator/GantiPassword/GantiPassword.jsx';

// Admin Cabdin Components
import DashboardA from './pages/Admin/Dashboard/DashboardA.jsx';
import TambahSekolah from './pages/Admin/Dashboard/TambahSekolah.jsx';
import DetailSekolah from './pages/Admin/Dashboard/DetailSekolah.jsx';
import DataGuruAdmin from './pages/Admin/DataGuru/DataGuru.jsx';
import DetailGuru from './pages/Admin/DataGuru/DetailGuru.jsx';
import DokumenDigital from './pages/Admin/DokumenDigital/DokumenDigital.jsx'

// Route Protection Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userSession = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  
  if (!userSession.role) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userSession.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Role Constants for better maintainability
const ROLES = {
  OPERATOR: 'operator_sekolah',
  ADMIN_CABDIN: 'admin_cabdin'
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Operator Routes */}
        <Route path="/operator/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><Dashboard /></ProtectedRoute>}/>
        <Route path="/operator/data-guru" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><DataGuruOperator /></ProtectedRoute>}/>
        <Route path="/operator/data-guru/view/:id" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><ViewGuru /></ProtectedRoute>}/>
        <Route path="/operator/data-guru/edit/:id" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><EditGuru /></ProtectedRoute>} />
        <Route  path="/operator/dokumen" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><Dokumen /></ProtectedRoute>}/>
        <Route path="/operator/dokumen/upload" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><UploadDokumen /></ProtectedRoute>}/>
        <Route path="/operator/usulan" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><Usulan /></ProtectedRoute>}/>
        <Route path="/operator/pelaporan" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]}><Pelaporan /></ProtectedRoute>}/>

        {/* Admin Cabdin Routes */}
        <Route path="/admin-cabdin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><DashboardA /></ProtectedRoute>}/>
        <Route path="/admin-cabdin/tambah-sekolah" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><TambahSekolah /></ProtectedRoute>}/>
        <Route path="/admin-cabdin/detail-sekolah/:id" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><DetailSekolah /></ProtectedRoute>}/>
        <Route path="/admin-cabdin/data-guru" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><DataGuruAdmin /></ProtectedRoute>}/>
        <Route path="/admin-cabdin/data-guru/detail/:id" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><DetailGuru /></ProtectedRoute>}/>
        <Route path="/admin-cabdin/dokumen-digital" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN_CABDIN]}><DokumenDigital /></ProtectedRoute>}/>

        {/* Shared Routes (Available for both roles) */}
        <Route  path="/ganti-password" element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR, ROLES.ADMIN_CABDIN]}><GantiPassword /></ProtectedRoute>}/>

        {/* Redirect routes for better UX */}
        <Route path="/dashboard" element={<Navigate to="/operator/dashboard" replace />} />
        <Route path="/dataguru" element={<Navigate to="/operator/data-guru" replace />} />
        <Route path="/data-guru" element={<Navigate to="/operator/data-guru" replace />} />
        <Route path="/pelaporan-sekolah" element={<Navigate to="/operator/pelaporan" replace />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}