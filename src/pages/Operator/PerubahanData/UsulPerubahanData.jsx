// src/pages/Operator/UsulPerubahanData/UsulPerubahanData.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaBars, FaEdit, FaTimes } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './UsulPerubahanData.css';

export default function UsulPerubahanData() {
  const navigate = useNavigate();
  
  const initialData = [
    { 
      id: 1, 
      namaDokumen: 'Sertifikasi Guru 2025', 
      guru: 'Ahmad Darmawan, S.Pd', 
      jenisUsulan: 'Sertifikasi',
      kategori: 'Sertifikasi', 
      tanggalUpload: '20 Juni 2025', 
      ukuran: '2.4 MB',
      status: 'menunggu'
    },
    { 
      id: 2, 
      namaDokumen: 'Laporan PKG 2025', 
      guru: 'Dewi Wulandari, S.Pd', 
      jenisUsulan: 'Ijazah & Transkrip',
      kategori: 'Ijazah & Transkrip', 
      tanggalUpload: '21 Juni 2025', 
      ukuran: '16 MB',
      status: 'menunggu'
    },
    { 
      id: 3, 
      namaDokumen: 'Sertifikasi Guru 2025', 
      guru: 'Citra Indah, S.Pd', 
      jenisUsulan: 'Sertifikasi',
      kategori: 'Sertifikasi', 
      tanggalUpload: '26 Juli 2025', 
      ukuran: '2.7 MB',
      status: 'disetujui'
    },
    { 
      id: 4, 
      namaDokumen: 'Sertifikat Diktat PPG', 
      guru: 'Budi Santoso, S.Pd', 
      jenisUsulan: 'SK & Penugasan',
      kategori: 'SK & Penugasan', 
      tanggalUpload: '1 Agustus 2025', 
      ukuran: '2.1 MB',
      status: 'ditolak'
    }
  ];

  const [list, setList] = useState(initialData);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Filter data based on search and filters
  const filteredData = list.filter(usulan => {
    // Filter berdasarkan pencarian
    const searchMatch = (usulan.namaDokumen + ' ' + usulan.guru + ' ' + usulan.jenisUsulan)
      .toLowerCase()
      .includes(query.toLowerCase());
    
    // Filter berdasarkan status
    const statusMatch = statusFilter === 'all' || usulan.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleBuatUsulan = () => {
    alert('Fungsi buat usulan akan diimplementasikan');
  };

  const handleView = (id) => {
    // Navigate to ViewUsulan page dengan parameter id
    navigate(`/operator/usul-perubahan-data/view/${id}`);
  };

  const handleEdit = (id) => {
    // Navigate to EditUsulan page dengan parameter id
    navigate(`/operator/usul-perubahan-data/edit/${id}`);
  };

  const handleReject = (id) => {
    setList(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'ditolak' } : item
    ));
    alert('Usulan berhasil ditolak');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'menunggu':
        return <span className="upd-status-badge upd-status-waiting">Menunggu Verifikasi</span>;
      case 'disetujui':
        return <span className="upd-status-badge upd-status-approved">Disetujui</span>;
      case 'ditolak':
        return <span className="upd-status-badge upd-status-rejected">Ditolak</span>;
      default:
        return <span className="upd-status-badge">-</span>;
    }
  };

  return (
    <div className="upd-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="upd-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`upd-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="upd-header">
          <div className="upd-header-left">
            <div className="upd-title-section">
              <h1>Usul Perubahan Data</h1>
              <div className="upd-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="upd-header-actions">
            <button className="upd-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="upd-notification-dot" />
            </button>

            <button className="upd-buat-usulan-btn" onClick={handleBuatUsulan}>
              <FaPlus />
              <span>Buat Usulan</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="upd-content">
          {/* Filters Section */}
          <div className="upd-filters-section">
            <div className="upd-filters-tabs">
              <button 
                className={`upd-tab ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                Semua Usulan
              </button>
              <button 
                className={`upd-tab ${statusFilter === 'menunggu' ? 'active' : ''}`}
                onClick={() => setStatusFilter('menunggu')}
              >
                Menunggu Verifikasi
              </button>
              <button 
                className={`upd-tab ${statusFilter === 'disetujui' ? 'active' : ''}`}
                onClick={() => setStatusFilter('disetujui')}
              >
                Disetujui
              </button>
              <button 
                className={`upd-tab ${statusFilter === 'ditolak' ? 'active' : ''}`}
                onClick={() => setStatusFilter('ditolak')}
              >
                Ditolak
              </button>
            </div>

            <div className="upd-search-group">
              <div className="upd-search-wrapper">
                <input
                  type="text"
                  placeholder="Cari Guru / Usulan"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Cari Usulan"
                />
                <button className="upd-search-btn" aria-label="Search">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="upd-table-section">
            <div className="upd-table-container">
              <table className="upd-data-table">
                <thead>
                  <tr>
                    <th>Nama Dokumen</th>
                    <th>Nama Guru</th>
                    <th>Jenis Usulan</th>
                    <th>Kategori</th>
                    <th>Tanggal Upload</th>
                    <th>Ukuran</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((usulan) => (
                    <tr key={usulan.id}>
                      <td className="upd-doc-cell">
                        <div className="upd-doc-name">{usulan.namaDokumen}</div>
                      </td>
                      <td className="upd-guru-cell">{usulan.guru}</td>
                      <td className="upd-jenis-cell">{usulan.jenisUsulan}</td>
                      <td className="upd-kategori-cell">
                        <span className="upd-kategori-chip">{usulan.kategori}</span>
                      </td>
                      <td className="upd-date-cell">{usulan.tanggalUpload}</td>
                      <td className="upd-size-cell">{usulan.ukuran}</td>
                      <td className="upd-status-cell">
                        {getStatusBadge(usulan.status)}
                      </td>
                      <td className="upd-actions-cell">
                        <button 
                          className="upd-action-btn upd-view-btn" 
                          aria-label="Lihat detail"
                          onClick={() => handleView(usulan.id)}
                          title="Lihat Detail"
                        >
                          <FaEye />
                        </button>
                        {usulan.status === 'menunggu' && (
                          <>
                            <button 
                              className="upd-action-btn upd-edit-btn" 
                              aria-label="Edit usulan"
                              onClick={() => handleEdit(usulan.id)}
                              title="Edit Usulan"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="upd-action-btn upd-reject-btn" 
                              aria-label="Tolak usulan"
                              onClick={() => handleReject(usulan.id)}
                              title="Tolak"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="8" className="upd-no-data-message">
                        Tidak ada data usulan ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Info Jumlah Data */}
            <div className="upd-data-info">
              Menampilkan {filteredData.length} dari {list.length} usulan
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="upd-pagination-section">
                <div className="upd-pagination">
                  <button className="upd-pagination-btn upd-prev-btn">
                    Sebelumnya
                  </button>
                  
                  <div className="upd-page-numbers">
                    <button className="upd-page-btn active">1</button>
                    <button className="upd-page-btn">2</button>
                    <button className="upd-page-btn">3</button>
                  </div>
                  
                  <button className="upd-pagination-btn upd-next-btn">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}