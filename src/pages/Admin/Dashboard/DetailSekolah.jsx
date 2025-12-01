import React, { useState } from 'react';
import './DetailSekolah.css';
import { useNavigate } from "react-router-dom";
import SidebarAdminCabdin from '../Sidebar/SidebarA';

const DetailSekolah = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [sekolahData, setSekolahData] = useState({
    nama: "SMK N 1 Surakarta",
    jenjang: "SMK",
    alamat: "Jl. Sungai Kapuas No.28, Kedung Lumbu, Kec. Ps. Kiiwon, Kota Surakarta, Jawa Tengah",
    kepalaSekolah: "Siaga Purnomo",
    akreditasi: "A",
    npsn: "20328126",
    status: "aktif"
  });

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleStatusChange = (status) => {
    setSekolahData({
      ...sekolahData,
      status: status
    });
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
              <button className="tambah-pengguna-back-btn" onClick={() => navigate("/admin-cabdin/dashboard")}>
                <i className="fas fa-arrow-left"></i>
                Kembali
              </button>
              <div className="ts-detail-title-icon">🏫</div>
              <div>
                <h1>Detail Sekolah</h1>
                <p>Informasi lengkap mengenai data sekolah</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="ts-detail-content">
            <div className="ts-detail-scrollable">
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

              {/* Status Sekolah - Bagian Baru */}
              <div className="ts-detail-item">
                <div className="ts-detail-label">
                  <span className="icon">📊</span>
                  Status Sekolah
                </div>
                <div className="ts-detail-value">
                  <div className="ts-status-radio-group">
                    <label className="ts-radio-option">
                      <input 
                        type="radio" 
                        name="statusSekolah"
                        value="aktif"
                        checked={sekolahData.status === 'aktif'}
                        onChange={() => handleStatusChange('aktif')}
                      />
                      <span className="ts-radio-checkmark"></span>
                      <span className="ts-radio-label">
                        <i className="fas fa-check-circle ts-status-icon aktif"></i>
                        Aktif
                      </span>
                    </label>
                    
                    <label className="ts-radio-option">
                      <input 
                        type="radio" 
                        name="statusSekolah"
                        value="nonaktif"
                        checked={sekolahData.status === 'nonaktif'}
                        onChange={() => handleStatusChange('nonaktif')}
                      />
                      <span className="ts-radio-checkmark"></span>
                      <span className="ts-radio-label">
                        <i className="fas fa-times-circle ts-status-icon nonaktif"></i>
                        Tidak Aktif
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSekolah;