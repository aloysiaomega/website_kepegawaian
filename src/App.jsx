import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/Operator/Landing/LandingPage.jsx'
import Login from './pages/Operator/Login/Login.jsx'

// Operator Routes
import Dashboard from './pages/Operator/Dashboard/Dashboard.jsx'
import DataGuru from './pages/Operator/DataGuru/DataGuru.jsx'
import EditGuru from './pages/Operator/DataGuru/EditGuru.jsx'
import ViewGuru from './pages/Operator/DataGuru/ViewGuru.jsx'
import Dokumen from './pages/Operator/Dokumen/DokumenDigital.jsx'
import UploadDokumen from './pages/Operator/Dokumen/Tambah.jsx'
import Usulan from './pages/Operator/PerubahanData/UsulPerubahanData.jsx'
import Pelaporan from './pages/Operator/PelaporanSekolah/Pelaporan.jsx'
import GantiPassword from './pages/Operator/GantiPassword/GantiPassword.jsx'

// Admin Cabdin Routes
import DashboardA from './pages/Admin/Dashboard/DashboardA.jsx'
import TambahSekolah from './pages/Admin/Dashboard/TambahSekolah.jsx'
import DetailSekolah from './pages/Admin/Dashboard/DetailSekolah.jsx'

// Route Protection Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userSession = JSON.parse(localStorage.getItem('sessionUser') || '{}')
  
  if (!userSession.role) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userSession.role)) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Operator Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dataguru" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <DataGuru />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/data-guru/view/:id" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <ViewGuru />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/data-guru/edit/:id" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <EditGuru />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dokumen" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <Dokumen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/dokumen/upload" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <UploadDokumen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usulan" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <Usulan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pelaporan-sekolah" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah']}>
              <Pelaporan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ganti-password" 
          element={
            <ProtectedRoute allowedRoles={['operator_sekolah', 'admin_cabdin']}>
              <GantiPassword />
            </ProtectedRoute>
          } 
        />

        {/* Admin Cabdin Routes */}
        <Route path="/admin-cabdin/dashboard" element={<ProtectedRoute allowedRoles={['admin_cabdin']}><DashboardA /></ProtectedRoute>} />
        <Route path="/tambah-sekolah" element={<TambahSekolah />} />
        <Route path="/detail-sekolah/:id" element={<ProtectedRoute allowedRoles={['admin_cabdin']}><DetailSekolah /></ProtectedRoute>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}