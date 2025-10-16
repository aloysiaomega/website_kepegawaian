// src/pages/Operator/DokumenDigital/DokumenDigital.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaDownload, FaTrash, FaBars } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './DokumenDigital.css';

export default function DokumenDigital() {
  const navigate = useNavigate();
  
  const initialData = [
    { 
      id: 1, 
      namaDokumen: 'Sertifikasi Guru 2025', 
      deskripsi: 'Transkrip nilai sarjana',
      guru: 'Ahmad Darmawan, S.Pd', 
      kategori: 'Sertifikasi',
      tanggalUpload: '20 Juni 2025', 
      ukuran: '2.4 MB',
      status: 'active'
    },
    { 
      id: 2, 
      namaDokumen: 'Laporan PKG 2025', 
      deskripsi: 'Laporan penisian kineija guru',
      guru: 'Dewi Wulandari, S.Pd', 
      kategori: 'Ijazah & Transkrip',
      tanggalUpload: '21 Juni 2025', 
      ukuran: '1.6 MB',
      status: 'active'
    },
    { 
      id: 3, 
      namaDokumen: 'Sertifikasi Guru 2025', 
      deskripsi: 'Sertifikasi guru tahun 2025',
      guru: 'Citra Indah, S.Pd', 
      kategori: 'Sertifikasi',
      tanggalUpload: '26 Juli 2025', 
      ukuran: '2.7 MB',
      status: 'active'
    },
    { 
      id: 4, 
      namaDokumen: 'Sertifikat Diktat PPG', 
      deskripsi: 'Sertifikat pendidikan profesi guru',
      guru: 'Budi Santoso, S.Pd', 
      kategori: 'SK & Penugasan',
      tanggalUpload: '1 Agustus 2025', 
      ukuran: '2.1 MB',
      status: 'active'
    }
  ];

  const [list, setList] = useState(initialData);
  const [query, setQuery] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('all');
  const [jenisFileFilter, setJenisFileFilter] = useState('all');
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
  const filteredData = list.filter(dokumen => {
    // Filter berdasarkan pencarian
    const searchMatch = (dokumen.namaDokumen + ' ' + dokumen.deskripsi + ' ' + dokumen.guru)
      .toLowerCase()
      .includes(query.toLowerCase());
    
    // Filter berdasarkan kategori
    const kategoriMatch = kategoriFilter === 'all' || dokumen.kategori === kategoriFilter;
    
    // Filter berdasarkan status
    const statusMatch = statusFilter === 'all' || dokumen.status === statusFilter;
    
    return searchMatch && kategoriMatch && statusMatch;
  });

  // Get unique kategori options from data
  const kategoriOptions = ['all', ...new Set(list.map(dokumen => dokumen.kategori))];
  
  // Get unique status options
  const statusOptions = ['all', 'active', 'inactive'];
  
  // Get unique jenis file options
  const jenisFileOptions = ['all', 'PDF', 'DOC', 'DOCX', 'JPEG', 'PNG'];

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleTambahDokumen = () => {
    alert('Fungsi tambah dokumen akan diimplementasikan');
  };

  const handleView = (id) => {
    navigate(`/operator/dokumen-digital/view/${id}`);
  };

  const handleDownload = (id) => {
    alert(`Download dokumen dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setList(prev => prev.filter(item => item.id !== id));
      alert('Dokumen berhasil dihapus');
    }
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
            <button 
              className="dd-toggle-btn" 
              onClick={handleToggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <FaBars />
            </button>
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

            <button className="dd-tambah-btn" onClick={handleTambahDokumen}>
              <FaPlus />
              <span>Tambah Dokumen</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="dd-content">
          {/* Filters Section */}
          <div className="dd-filters-section">
            <div className="dd-filters-grid">
              <div className="dd-filter-group">
                <label>Kategori Dokumen</label>
                <select 
                  value={kategoriFilter} 
                  onChange={(e) => setKategoriFilter(e.target.value)}
                >
                  <option value="all">Semua Kategori</option>
                  {kategoriOptions.filter(opt => opt !== 'all').map(kategori => (
                    <option key={kategori} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dd-filter-group">
                <label>Jenis File</label>
                <select 
                  value={jenisFileFilter} 
                  onChange={(e) => setJenisFileFilter(e.target.value)}
                >
                  {jenisFileOptions.map(jenis => (
                    <option key={jenis} value={jenis}>
                      {jenis === 'all' ? 'Semua Jenis' : jenis}
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
                      {status === 'all' ? 'Semua Status' : status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dd-filter-group dd-search-group">
                <label>Cari Dokumen</label>
                <div className="dd-search-wrapper">
                  <input
                    type="text"
                    placeholder="Nama dokumen atau guru"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Cari Dokumen"
                  />
                  <button className="dd-search-btn" aria-label="Search">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="dd-table-section">
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
                      <td className="dd-doc-cell">
                        <div className="dd-doc-name">{dokumen.namaDokumen}</div>
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
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                        <button 
                          className="dd-action-btn dd-delete-btn" 
                          aria-label="Hapus dokumen"
                          onClick={() => handleDelete(dokumen.id)}
                          title="Hapus"
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
    </div>
  );
}