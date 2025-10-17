import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaEye, FaSchool, FaUserGraduate, FaClock, FaUsers } from 'react-icons/fa';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import './DashboardA.css';

export default function DashboardAdminCabdin() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // Data statistik
  const statsData = [
    {
      icon: <FaSchool />,
      title: 'Total Sekolah',
      value: '1145',
      subtitle: 'Sekolah',
      detail: 'SMA 86, SMK 74, SLB 17',
      color: '#3b82f6'
    },
    {
      icon: <FaClock />,
      title: 'Usulan Pending',
      value: '2',
      subtitle: 'Usulan',
      detail: 'Menunggu Verifikasi',
      color: '#f59e0b'
    },
    {
      icon: <FaUsers />,
      title: 'Total Guru',
      value: '2180',
      subtitle: 'Guru',
      detail: 'PNS 1080, P3K 1000, P3PW 100',
      color: '#10b981'
    },
    {
      icon: <FaUserGraduate />,
      title: 'Guru Akan Pensiun',
      value: '17',
      subtitle: 'Guru',
      detail: 'Dalam 3 Tahun',
      color: '#ef4444'
    }
  ];

  // Data sekolah contoh (disederhanakan dari gambar)
  const sekolahData = [
    {
      id: 1,
      nama: 'SMK N 1 Surakarta',
      alamat: 'Jl. Sungai Kapuas No. 28 Surakarta',
      jenjang: 'SMK',
      jumlahGuru: 45,
      pns: 25,
      p3k: 15,
      paruhWaktu: 5,
      masaPensiun: 3
    },
    {
      id: 2,
      nama: 'SMK N 2 Surakarta',
      alamat: 'Jl. Walter Monginsidi No.40, Gilingan',
      jenjang: 'SMK',
      jumlahGuru: 38,
      pns: 20,
      p3k: 12,
      paruhWaktu: 6,
      masaPensiun: 2
    },
    {
      id: 3,
      nama: 'SMK N 1 Sukoharjo',
      alamat: 'Jl. Jend. Sudirman No.151, Gabusan',
      jenjang: 'SMK',
      jumlahGuru: 42,
      pns: 22,
      p3k: 16,
      paruhWaktu: 4,
      masaPensiun: 5
    },
    {
      id: 4,
      nama: 'SMK N 9 Surakarta',
      alamat: 'Jl. Tarumanegara I, Banyuanyar',
      jenjang: 'SMK',
      jumlahGuru: 35,
      pns: 18,
      p3k: 14,
      paruhWaktu: 3,
      masaPensiun: 1
    },
    {
      id: 5,
      nama: 'SMK N 10',
      alamat: 'Jl. Wisanggeni No.01, RW.07, Serengan',
      jenjang: 'SMK',
      jumlahGuru: 40,
      pns: 21,
      p3k: 15,
      paruhWaktu: 4,
      masaPensiun: 4
    }
  ];

  const filteredSekolah = sekolahData.filter(sekolah =>
    sekolah.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sekolah.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="acd-app">
      <SidebarAdminCabdin collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="acd-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`acd-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="acd-header">
          <div className="acd-header-left">
            <button 
              className="acd-toggle-btn" 
              onClick={handleToggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <FaBars />
            </button>
            <div className="acd-title-section">
              <h1>Dashboard Admin</h1>
              <div className="acd-subtitle">Cabang Dinas Pendidikan Wilayah VII</div>
            </div>
          </div>

          <div className="acd-header-actions">
            <div className="acd-search-wrapper">
              <input
                type="text"
                placeholder="Cari sekolah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari sekolah"
              />
              <button className="acd-search-btn" aria-label="Search">
                <FaSearch />
              </button>
            </div>
            <button className="acd-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="acd-notification-dot" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="acd-content">
          {/* Statistics Cards */}
          <div className="acd-stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="acd-stat-card">
                <div className="acd-stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="acd-stat-content">
                  <h3 className="acd-stat-title">{stat.title}</h3>
                  <div className="acd-stat-main">
                    <span className="acd-stat-value">{stat.value}</span>
                    <span className="acd-stat-subtitle">{stat.subtitle}</span>
                  </div>
                  <p className="acd-stat-detail">{stat.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Section */}
          <div className="acd-performance-section">
            <div className="acd-section-header">
              <h2 className="acd-section-title">Performa Sekolah</h2>
            </div>

            <div className="acd-table-container">
              <table className="acd-performance-table">
                <thead>
                  <tr>
                    <th>Nama Sekolah</th>
                    <th>Jenjang</th>
                    <th>Jumlah Guru</th>
                    <th>PNS</th>
                    <th>P3K</th>
                    <th>Paruh Waktu</th>
                    <th>Masa Akan Pensiun</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSekolah.map((sekolah) => (
                    <tr key={sekolah.id}>
                      <td className="acd-school-cell">
                        <div className="acd-school-name">{sekolah.nama}</div>
                        <div className="acd-school-address">{sekolah.alamat}</div>
                      </td>
                      <td className="acd-jenjang-cell">
                        <span className="acd-jenjang-badge">{sekolah.jenjang}</span>
                      </td>
                      <td className="acd-count-cell">{sekolah.jumlahGuru}</td>
                      <td className="acd-count-cell">{sekolah.pns}</td>
                      <td className="acd-count-cell">{sekolah.p3k}</td>
                      <td className="acd-count-cell">{sekolah.paruhWaktu}</td>
                      <td className="acd-pensiun-cell">
                        <span className="acd-pensiun-badge">{sekolah.masaPensiun} Tahun</span>
                      </td>
                      <td className="acd-actions-cell">
                        <button 
                          className="acd-action-btn acd-view-btn" 
                          aria-label="Lihat detail"
                          title="Lihat Detail"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredSekolah.length === 0 && (
                    <tr>
                      <td colSpan="8" className="acd-no-data-message">
                        Tidak ada data sekolah ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="acd-pagination-section">
              <div className="acd-pagination">
                <button className="acd-pagination-btn acd-prev-btn">
                  Sebelumnya
                </button>
                
                <div className="acd-page-numbers">
                  <button className="acd-page-btn active">1</button>
                  <button className="acd-page-btn">2</button>
                  <button className="acd-page-btn">3</button>
                </div>
                
                <button className="acd-pagination-btn acd-next-btn">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}