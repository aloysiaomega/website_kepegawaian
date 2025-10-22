import React, { useState, useEffect } from 'react';
import './DataGuru.css';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import { FaSearch, FaEye, FaFilter, FaBell } from 'react-icons/fa';

const DataGuru = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSekolah, setSelectedSekolah] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('');

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

  // Data dummy guru - untuk admin bisa melihat semua sekolah
  const dataGuru = [
    {
      id: 1,
      nama: "Ahmad Darmawan, S.Pd",
      nip: "196512102003021005",
      sekolah: "SMK N 1 Surakarta",
      mapel: "Matematika",
      tglPensiun: "15/12/2028",
      sisaWaktu: "2 Bulan"
    },
    {
      id: 2,
      nama: "Budi Santoso, S.Pd",
      nip: "197803152006041002",
      sekolah: "SMA N 2 Surakarta",
      mapel: "Bahasa Indonesia",
      tglPensiun: "29/11/2028",
      sisaWaktu: "2 Bulan"
    },
    {
      id: 3,
      nama: "Eko Raharjo, S.Pd",
      nip: "197512032001121002",
      sekolah: "SMK N 1 Sukoharjo",
      mapel: "Bahasa Inggris",
      tglPensiun: "01/12/2028",
      sisaWaktu: "3 Bulan"
    }
  ];

  // Filter data berdasarkan pencarian
  const filteredGuru = dataGuru.filter(guru =>
    guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guru.nip.includes(searchTerm) ||
    guru.sekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guru.mapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="acd-app">
      {/* Sidebar Admin Cabdin */}
      <SidebarAdminCabdin 
        collapsed={collapsed} 
        onToggle={handleToggleSidebar}
      />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="acd-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Main Content */}
      <main className={`acd-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header - Konsisten dengan Dashboard */}
        <header className="acd-header">
          <div className="acd-header-left">
            <div className="acd-title-section">
              <h1>Data Guru</h1>
              <div className="acd-subtitle">Cabang Dinas Pendidikan Wilayah VII</div>
            </div>
          </div>

          <div className="acd-header-actions">
            <button className="acd-notification-btn" aria-label="Notifikasi">
              <FaBell />
              <span className="acd-notification-dot" />
            </button>
          </div>
        </header>

        <div className="acd-content">
          {/* Filter Section */}
          <div className="acd-filter-section">
            <div className="acd-filter-header">
              <FaFilter className="acd-filter-icon" />
              <h3>Filter Data</h3>
            </div>
            <div className="acd-filter-grid">
              <div className="acd-filter-group">
                <label className="acd-filter-label">Sekolah</label>
                <select 
                  className="acd-filter-select"
                  value={selectedSekolah}
                  onChange={(e) => setSelectedSekolah(e.target.value)}
                >
                  <option value="">Cari Sekolah</option>
                  <option value="SMK N 1 Surakarta">SMK N 1 Surakarta</option>
                  <option value="SMA N 2 Surakarta">SMA N 2 Surakarta</option>
                  <option value="SMK N 1 Sukoharjo">SMK N 1 Sukoharjo</option>
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Mapel</label>
                <select 
                  className="acd-filter-select"
                  value={selectedMapel}
                  onChange={(e) => setSelectedMapel(e.target.value)}
                >
                  <option value="">Semua Mapel</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Cari Guru</label>
                <div className="acd-search-container">
                  <FaSearch className="acd-search-icon" />
                  <input
                    type="text"
                    className="acd-search-input"
                    placeholder="Nama atau NIP Guru"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="acd-table-section">
            <div className="acd-table-header">
              <h3>Daftar Guru</h3>
              <span className="acd-table-count">{filteredGuru.length} guru ditemukan</span>
            </div> <br />

            <div className="acd-table-container">
              <table className="acd-performance-table">
                <thead>
                  <tr>
                    <th className="acd-table-th">Nama Guru</th>
                    <th className="acd-table-th">Sekolah</th>
                    <th className="acd-table-th">Mapel</th>
                    <th className="acd-table-th">Tgl Pensiun</th>
                    <th className="acd-table-th">Sisa Waktu Pensiun</th>
                    <th className="acd-table-th acd-text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuru.map((guru) => (
                    <tr key={guru.id} className="acd-table-row">
                      <td className="acd-table-td">
                        <div className="acd-guru-info">
                          <div className="acd-guru-nama">{guru.nama}</div>
                          <div className="acd-guru-nip">{guru.nip}</div>
                        </div>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-sekolah-badge">{guru.sekolah}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-mapel-badge">{guru.mapel}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-tanggal">{guru.tglPensiun}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className={`acd-sisa-waktu ${guru.sisaWaktu.includes('2') ? 'acd-warning' : 'acd-info'}`}>
                          {guru.sisaWaktu}
                        </span>
                      </td>
                      <td className="acd-table-td acd-text-center">
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
                </tbody>
              </table>

              {filteredGuru.length === 0 && (
                <div className="acd-empty-state">
                  <div className="acd-empty-icon">🔍</div>
                  <h4>Data tidak ditemukan</h4>
                  <p>Coba ubah filter pencarian Anda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataGuru;