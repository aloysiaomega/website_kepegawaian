import React, { useState } from 'react';
import './DetailSekolah.css';
import SidebarAdminCabdin from '../Sidebar/SidebarA';

const DetailSekolah = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // Data sekolah - bisa diganti dengan data dari props atau API
  const sekolahData = {
    nama: "SMK N 1 Surakarta",
    jenjang: "SMK",
    alamat: "Jl. Sungai Kapuas No.28, Kedung Lumbu, Kec. Ps. Kiiwon, Kota Surakarta, Jawa Tengah",
    kepalaSekolah: "Siaga Purnomo",
    akreditasi: "A",
    npsn: "20328126"
  };

  return (
    <div className="ts-app">
      {/* Sidebar */}
      <SidebarAdminCabdin 
        collapsed={collapsed} 
        toggleSidebar={handleToggleSidebar}
      />
      
      {/* Main Content */}
      <div className={`ts-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="ts-detail-container">
          {/* Header */}
          <div className="ts-detail-header">
            <div className="ts-detail-title-section">
              <div className="ts-detail-title-icon">🏫</div>
              <div>
                <h1>Detail Sekolah</h1>
                <p>Informasi lengkap mengenai data sekolah</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="ts-detail-content">
            {/* Nama Sekolah */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">🏫</span>
                Nama Sekolah
              </div>
              <div className="ts-detail-value">{sekolahData.nama}</div>
            </div>

            {/* Jenjang Pendidikan */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">📚</span>
                Jenjang Pendidikan
              </div>
              <div className="ts-detail-value">
                <span className="ts-jenjang-badge">{sekolahData.jenjang}</span>
              </div>
            </div>

            {/* Alamat Sekolah */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">📍</span>
                Alamat Sekolah
              </div>
              <div className="ts-detail-value ts-detail-alamat">
                {sekolahData.alamat}
              </div>
            </div>

            {/* Nama Kepala Sekolah */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">👨‍🏫</span>
                Nama Kepala Sekolah
              </div>
              <div className="ts-detail-value">{sekolahData.kepalaSekolah}</div>
            </div>

            {/* Akreditasi */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">⭐</span>
                Akreditasi
              </div>
              <div className="ts-detail-value">
                <span className="ts-akreditasi-badge">{sekolahData.akreditasi}</span>
              </div>
            </div>

            {/* NPSN */}
            <div className="ts-detail-item">
              <div className="ts-detail-label">
                <span className="icon">🔢</span>
                Nomor Pokok Sekolah Nasional
              </div>
              <div className="ts-detail-value">{sekolahData.npsn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSekolah;