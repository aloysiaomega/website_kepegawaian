import React, { useState, useEffect } from 'react';
import './DokumenDigital.css';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import { FaSearch, FaEye, FaDownload, FaFilter, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DokumenDigital = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  const handleViewDetail = (dokumenId) => {
    navigate(`/admin-cabdin/dokumen-digital/detail/${dokumenId}`);
  };

  const handleDownload = (dokumenId) => {
    const dokumen = dataDokumen.find(d => d.id === dokumenId);
    alert(`Mengunduh dokumen: ${dokumen.nama}`);
  };

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

  // Data dummy dokumen
  const dataDokumen = [
    {
      id: 1,
      nama: 'Laporan PKG 2025',
      deskripsi: 'Laporan penilaian kinerja guru',
      guru: 'Devit Wulandari, S.Pd',
      kategori: 'Ijazah & Transkrip',
      tanggalUpload: '21 Juni 2025',
      ukuran: '16 MB',
      status: 'Terverifikasi'
    },
    {
      id: 2,
      nama: 'Sertifikasi Guru 2025',
      deskripsi: 'Sertifikasi guru tahun 2025',
      guru: 'Citra Indah, S.Pd',
      kategori: 'Sertifikasi',
      tanggalUpload: '26 Juli 2025',
      ukuran: '2.7 MB',
      status: 'Terverifikasi'
    },
    {
      id: 3,
      nama: 'Sertifikat Diktat PPG',
      deskripsi: 'Sertifikat pendidikan profesi guru',
      guru: 'Budi Santoso, S.Pd',
      kategori: 'SK & Penugasan',
      tanggalUpload: '1 Agustus 2025',
      ukuran: '2.1 MB',
      status: 'Belum Verifikasi'
    },
    {
      id: 4,
      nama: 'Ijazah S1 Pendidikan',
      deskripsi: 'Ijazah Sarjana Pendidikan',
      guru: 'Siti Rahayu, S.Pd',
      kategori: 'Ijazah & Transkrip',
      tanggalUpload: '15 Mei 2025',
      ukuran: '3.2 MB',
      status: 'Terverifikasi'
    },
    {
      id: 5,
      nama: 'SK Pangkat Terakhir',
      deskripsi: 'Surat Keputusan Pangkat',
      guru: 'Ahmad Darmawan, S.Pd',
      kategori: 'SK & Penugasan',
      tanggalUpload: '10 April 2025',
      ukuran: '1.8 MB',
      status: 'Terverifikasi'
    }
  ];

  // Filter data berdasarkan pencarian
  const filteredDokumen = dataDokumen.filter(dokumen =>
    dokumen.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dokumen.guru.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dokumen.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dokumen.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1>Dokumen Digital</h1>
              <div className="acd-subtitle">Cabang Dinas Pendidikan Wilayah VII</div>
            </div>
          </div>

          <div className="acd-header-actions">
            <button className="acd-notification-btn" aria-label="Notifikasi">
              🔔
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
                <label className="acd-filter-label">Kategori</label>
                <select 
                  className="acd-filter-select"
                  value={selectedKategori}
                  onChange={(e) => setSelectedKategori(e.target.value)}
                >
                  <option value="">Semua Kategori</option>
                  <option value="Ijazah & Transkrip">Ijazah & Transkrip</option>
                  <option value="Sertifikasi">Sertifikasi</option>
                  <option value="SK & Penugasan">SK & Penugasan</option>
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Status</label>
                <select 
                  className="acd-filter-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Semua Status</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Belum Verifikasi">Belum Verifikasi</option>
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Cari Dokumen</label>
                <div className="acd-search-container">
                  <FaSearch className="acd-search-icon" />
                  <input
                    type="text"
                    className="acd-search-input"
                    placeholder="Nama dokumen, guru, atau kategori"
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
              <h3>Daftar Dokumen</h3>
              <span className="acd-table-count">{filteredDokumen.length} dokumen ditemukan</span>
            </div>

            <div className="acd-table-container">
              <table className="acd-performance-table">
                <thead>
                  <tr>
                    <th className="acd-table-th">Nama Dokumen</th>
                    <th className="acd-table-th">Guru</th>
                    <th className="acd-table-th">Kategori</th>
                    <th className="acd-table-th">Tanggal Upload</th>
                    <th className="acd-table-th">Ukuran</th>
                    <th className="acd-table-th">Status</th>
                    <th className="acd-table-th acd-text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDokumen.map((dokumen) => (
                    <tr key={dokumen.id} className="acd-table-row">
                      <td className="acd-table-td">
                        <div className="acd-dokumen-info">
                          <div className="acd-dokumen-nama">{dokumen.nama}</div>
                          <div className="acd-dokumen-deskripsi">{dokumen.deskripsi}</div>
                        </div>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-guru-badge">{dokumen.guru}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-kategori-badge">{dokumen.kategori}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-tanggal">{dokumen.tanggalUpload}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-ukuran">{dokumen.ukuran}</span>
                      </td>
                      <td className="acd-table-td">
                        <span className={`acd-status-badge ${
                          dokumen.status === 'Terverifikasi' ? 'acd-status-verified' : 'acd-status-pending'
                        }`}>
                          {dokumen.status}
                        </span>
                      </td>
                      <td className="acd-table-td acd-text-center">
                        <div className="acd-actions-cell">
                          <button 
                            className="acd-action-btn acd-view-btn"
                            aria-label="Lihat detail"
                            title="Lihat Detail"
                            onClick={() => handleViewDetail(dokumen.id)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="acd-action-btn acd-download-btn"
                            aria-label="Download dokumen"
                            title="Download Dokumen"
                            onClick={() => handleDownload(dokumen.id)}
                          >
                            <FaDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDokumen.length === 0 && (
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

export default DokumenDigital;