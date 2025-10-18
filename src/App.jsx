import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/Operator/Landing/LandingPage.jsx'
import Login       from './pages/Operator/Login/Login.jsx'
// import Ketenagaan  from './pages/Ketenagaan/Ketenagaan.jsx'
// import Kepegawaian from './pages/Kepegawaian/Kepegawaian.jsx'

import Dashboard from './pages/Operator/Dashboard/Dashboard.jsx'
import DashboardA from './pages/Admin/Dashboard/DashboardA.jsx'
import DataGuru from './pages/Operator/DataGuru/DataGuru.jsx'
import EditGuru from './pages/Operator/DataGuru/EditGuru.jsx'
import ViewGuru from './pages/Operator/DataGuru/ViewGuru.jsx'
import Dokumen from './pages/Operator/Dokumen/DokumenDigital.jsx'
import UploadDokumen from './pages/Operator/Dokumen/Tambah.jsx'
import Usulan          from './pages/Operator/PerubahanData/UsulPerubahanData.jsx'
import Pelaporan    from './pages/Operator/PelaporanSekolah/Pelaporan.jsx'
import GantiPassword   from './pages/Operator/GantiPassword/GantiPassword.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page sebagai titik masuk utama */}
        <Route path="/" element={<LandingPage />} />

        {/* halaman login */}
        <Route path="/login" element={<Login />} />

        {/* halaman pilihan dari landing */}
        {/* <Route path="/ketenagaan"  element={<Ketenagaan />} />
        <Route path="/kepegawaian" element={<Kepegawaian />} /> */}

        {/* dashboard pasca-login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-cabdin/dashboard" element={<DashboardA />} />
        <Route path="/dataguru" element={<DataGuru />} />
        <Route path="/operator/data-guru/view/:id" element={<ViewGuru />} />
        <Route path="/operator/data-guru/edit/:id" element={<EditGuru />} />
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/operator/dokumen/upload" element={<UploadDokumen />} />
        <Route path="/usulan" element={<Usulan />} />
        <Route path="/pelaporan-sekolah" element={<Pelaporan />} />
        <Route path="/ganti-password"   element={<GantiPassword />} />

        {/* catch-all: kalau tidak ketemu, kembali ke landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
