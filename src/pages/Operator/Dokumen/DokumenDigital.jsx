// src/pages/Operator/DokumenDigital/DokumenDigital.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaDownload, FaBars, FaTrash } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './DokumenDigital.css';

export default function DokumenDigital() {
  const navigate = useNavigate();
  
  const initialData = [
    { 
      id: 1, 
      nama: 'Laporan PKG 2025', 
      deskripsi: 'Laporan penilaian kinerja guru',
      guru: 'Devit Wulandari, S.Pd', 
      kategori: 'Ijazah & Transkrip', 
      tanggalUpload: '21 Juni 2025', 
      ukuran: '16 MB' 
    },
    { 
      id: 2, 
      nama: 'Sertifikasi Guru 2025', 
      deskripsi: 'Sertifikasi guru tahun 2025',
      guru: 'Citra Indah, S.Pd', 
      kategori: 'Sertifikasi', 
      tanggalUpload: '26 Juli 2025', 
      ukuran: '2.7 MB' 
    },
    { 
      id: 3, 
      nama: 'Sertifikat Diktat PPG', 
      deskripsi: 'Sertifikat pendidikan profesi guru',
      guru: 'Budi Santoso, S.Pd', 
      kategori: 'SK & Penugasan', 
      tanggalUpload: '1 Agustus 2025', 
      ukuran: '2.1 MB' 
    },
    { 
      id: 4, 
      nama: 'Ijazah S1 Pendidikan', 
      deskripsi: 'Ijazah Sarjana Pendidikan',
      guru: 'Siti Rahayu, S.Pd', 
      kategori: 'Ijazah & Transkrip', 
      tanggalUpload: '15 Mei 2025', 
      ukuran: '3.2 MB' 
    },
    { 
      id: 5, 
      nama: 'SK Pangkat Terakhir', 
      deskripsi: 'Surat Keputusan Pangkat',
      guru: 'Ahmad Darmawan, S.Pd', 
      kategori: 'SK & Penugasan', 
      tanggalUpload: '10 April 2025', 
      ukuran: '1.8 MB' 
    }
  ];

  const [list, setList] = useState(initialData);
  const [query, setQuery] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dokumenToDelete, setDokumenToDelete] = useState(null);

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
  const filteredData = list.filter(dokumen => {
    // Filter berdasarkan pencarian
    const searchMatch = (dokumen.nama + ' ' + dokumen.deskripsi + ' ' + dokumen.guru + ' ' + dokumen.kategori)
      .toLowerCase()
      .includes(query.toLowerCase());
    
    // Filter berdasarkan kategori
    const kategoriMatch = kategoriFilter === 'all' || dokumen.kategori === kategoriFilter;
    
    // Filter berdasarkan status (dalam contoh ini kita tidak punya status, jadi selalu true)
    const statusMatch = statusFilter === 'all';
    
    return searchMatch && kategoriMatch && statusMatch;
  });

  // Get unique kategori options from data
  const kategoriOptions = ['all', ...new Set(list.map(dokumen => dokumen.kategori))];
  
  // Get unique status options (dummy untuk contoh)
  const statusOptions = ['all', 'Terverifikasi', 'Belum Verifikasi'];

  const handleDeleteClick = (dokumen) => {
    setDokumenToDelete(dokumen);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (dokumenToDelete) {
      setList(prev => prev.filter(item => item.id !== dokumenToDelete.id));
      setShowDeleteModal(false);
      setDokumenToDelete(null);
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDokumenToDelete(null);
  };

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleAdd = () => {
    alert('Fungsi tambah dokumen akan diimplementasikan');
  };

  const handleView = (id) => {
    // Navigate to ViewDokumen page dengan parameter id
    navigate(`/operator/dokumen-digital/view/${id}`);
  };

  const handleDownload = (id) => {
    // Logic untuk download dokumen
    const dokumen = list.find(d => d.id === id);
    alert(`Mengunduh dokumen: ${dokumen.nama}`);
  };

  return (
    <div className="dd-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="dd-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`dd-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="dd-header">
          <div className="dd-header-left">
            <div className="dd-title-section">
              <h1>Dokumen Digital</h1>
              <div className="dd-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="dd-header-actions">
            <button className="dd-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="dd-notification-dot" />
            </button>

            <button className="dd-add-btn" onClick={handleAdd}>
              <FaPlus />
              <span>Tambah Guru</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="dd-content">

          {/* Filters Section */}
          <div className="dd-filters-section">
            <h3>Kategori Dokumen</h3>
            <div className="dd-filters-grid">
              <div className="dd-filter-group">
                <label>Kategori</label>
                <select 
                  value={kategoriFilter} 
                  onChange={(e) => setKategoriFilter(e.target.value)}
                >
                  {kategoriOptions.map(kategori => (
                    <option key={kategori} value={kategori}>
                      {kategori === 'all' ? 'Semua Kategori' : kategori}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dd-filter-group">
                <label>Status</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'Semua Status' : status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dd-filter-group dd-search-group">
                <label>Cari Dokumen</label>
                <div className="dd-search-wrapper">
                  <input
                    type="text"
                    placeholder="Nama dokumen, guru, atau kategori"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Cari Dokumen"
                  />
                  <button className="dd-search-btn" aria-label="Search">
                    <FaSearch />
                  </button>
                </div>
              </div>

              <button 
                className="dd-add-btn" 
                onClick={() => navigate('/operator/dokumen/upload')}
                >
                <FaPlus />
                <span>Upload Dokumen</span>
                </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="dd-table-section">
            <h3>Daftar Dokumen</h3>
            <div className="dd-table-container">
              <table className="dd-data-table">
                <thead>
                  <tr>
                    <th>Nama Dokumen</th>
                    <th>Guru</th>
                    <th>Kategori</th>
                    <th>Tanggal Upload</th>
                    <th>Ukuran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((dokumen) => (
                    <tr key={dokumen.id}>
                      <td className="dd-name-cell">
                        <div className="dd-doc-name">{dokumen.nama}</div>
                        <div className="dd-doc-desc">{dokumen.deskripsi}</div>
                      </td>
                      <td className="dd-guru-cell">{dokumen.guru}</td>
                      <td className="dd-kategori-cell">
                        <span className="dd-kategori-chip">{dokumen.kategori}</span>
                      </td>
                      <td className="dd-date-cell">{dokumen.tanggalUpload}</td>
                      <td className="dd-size-cell">{dokumen.ukuran}</td>
                      <td className="dd-actions-cell">
                        <button 
                          className="dd-action-btn dd-view-btn" 
                          aria-label="Lihat dokumen"
                          onClick={() => handleView(dokumen.id)}
                          title="Lihat Dokumen"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="dd-action-btn dd-download-btn" 
                          aria-label="Download dokumen"
                          onClick={() => handleDownload(dokumen.id)}
                          title="Download Dokumen"
                        >
                          <FaDownload />
                        </button>
                         <button 
                          className="dd-action-btn dd-delete-btn" 
                          aria-label="Hapus dokumen"
                          onClick={() => handleDeleteClick(dokumen)}
                          title="Hapus Dokumen"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="6" className="dd-no-data-message">
                        Tidak ada data dokumen ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Info Jumlah Data */}
            <div className="dd-data-info">
              Menampilkan {filteredData.length} dari {list.length} dokumen
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="dd-pagination-section">
                <div className="dd-pagination">
                  <button className="dd-pagination-btn dd-prev-btn">
                    Sebelumnya
                  </button>
                  
                  <div className="dd-page-numbers">
                    <button className="dd-page-btn active">1</button>
                    <button className="dd-page-btn">2</button>
                    <button className="dd-page-btn">3</button>
                  </div>
                  
                  <button className="dd-pagination-btn dd-next-btn">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="dd-modal-overlay">
          <div className="dd-modal">
            <div className="dd-modal-header">
              <h3>Konfirmasi Hapus</h3>
            </div>
            <div className="dd-modal-body">
              <p>Apakah Anda yakin ingin menghapus dokumen <strong>"{dokumenToDelete?.nama}"</strong>?</p>
              <p>Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="dd-modal-footer">
              <button 
                className="dd-modal-cancel-btn"
                onClick={handleDeleteCancel}
              >
                Batal
              </button>
              <button 
                className="dd-modal-confirm-btn"
                onClick={handleDeleteConfirm}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}