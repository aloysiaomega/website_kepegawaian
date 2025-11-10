// src/pages/Operator/DataGuru/DataGuru.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaTrash, FaBars, FaEdit, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './DataGuru.css';

export default function DataGuru() {
  const navigate = useNavigate();
  
  const initialData = [
    { id: 1, nama: 'Ahmad Darmawan, S.Pd', nip: '198512122019031005', mapel: ['Matematika'], status: ['PNS'], tglPensiun: '15/12/2048' },
    { id: 2, nama: 'Budi Santosa, S.Pd', nip: '197911292005011003', mapel: ['Bahasa Indonesia'], status: ['P3K Paruh Waktu'], tglPensiun: '29/11/2039' },
    { id: 3, nama: 'Eko Raharjo, S.Pd', nip: '198004152006041002', mapel: ['Bahasa Inggris'], status: ['P3K'], tglPensiun: '15/04/2042' },
    { id: 4, nama: 'Siti Rahayu, S.Pd', nip: '198208102008022001', mapel: ['Matematika'], status: ['P3K'], tglPensiun: '10/08/2045' },
    { id: 5, nama: 'Dewi Kusuma, S.Pd', nip: '197703151997032002', mapel: ['Bahasa Indonesia'], status: ['PNS'], tglPensiun: '15/03/2035' }
  ];

  const [list, setList] = useState(initialData);
  const [query, setQuery] = useState('');
  const [mapelFilter, setMapelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guruToDelete, setGuruToDelete] = useState(null);

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
  const filteredData = list.filter(guru => {
    // Filter berdasarkan pencarian
    const searchMatch = (guru.nama + ' ' + guru.nip + ' ' + (guru.mapel || []).join(' '))
      .toLowerCase()
      .includes(query.toLowerCase());
    
    // Filter berdasarkan mapel
    const mapelMatch = mapelFilter === 'all' || (guru.mapel || []).includes(mapelFilter);
    
    // Filter berdasarkan status
    const statusMatch = statusFilter === 'all' || 
      (Array.isArray(guru.status) 
        ? guru.status.includes(statusFilter) 
        : guru.status === statusFilter);
    
    return searchMatch && mapelMatch && statusMatch;
  });

  // Get unique mapel options from data
  const mapelOptions = ['all', ...new Set(list.flatMap(guru => guru.mapel))];
  
  // Get unique status options from data
  const statusOptions = ['all', ...new Set(list.flatMap(guru => guru.status))];
  const handleDeleteClick = (guru) => {
    setGuruToDelete(guru);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (guruToDelete) {
      setList(prev => prev.filter(item => item.id !== guruToDelete.id));
      setShowDeleteModal(false);
      setGuruToDelete(null);
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setGuruToDelete(null);
  };

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const handleAdd = () => {
    navigate('/operator/data-guru/tambah-guru');
  };

  const handleView = (id) => {
    // Navigate to ViewGuru page dengan parameter id
    navigate(`/operator/data-guru/view/${id}`);
  };

  const handleEdit = (id) => {
    // Navigate to EditGuru page dengan parameter id
    navigate(`/operator/data-guru/edit/${id}`);
  };

  return (
    <div className="dg-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="dg-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`dg-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="dg-header">
          <div className="dg-header-left">
            <div className="dg-title-section">
              <h1>Data Guru Sekolah</h1>
              <div className="dg-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="dg-header-actions">
            <button className="dg-add-btn" onClick={handleAdd}>
              <FaPlus />
              <span>Tambah Guru</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="dg-content">

          {/* Filters Section */}
          <div className="dg-filters-section">
            <div className="dg-filters-grid">
              <div className="dg-filter-group">
                <label>Mapel</label>
                <select 
                  value={mapelFilter} 
                  onChange={(e) => setMapelFilter(e.target.value)}
                >
                  {mapelOptions.map(mapel => (
                    <option key={mapel} value={mapel}>
                      {mapel === 'all' ? 'Semua Mapel' : mapel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dg-filter-group">
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

              <div className="dg-filter-group dg-search-group">
                <label>Cari Guru</label>
                <div className="dg-search-wrapper">
                  <input
                    type="text"
                    placeholder="Nama atau NIP Guru"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Cari Guru"
                  />
                  <button className="dg-search-btn" aria-label="Search">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="dg-table-section">
            <div className="dg-table-container">
              <table className="dg-data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Guru</th>
                    <th>NIP</th>
                    <th>Mapel</th>
                    <th>Status</th>
                    <th>Tgl Pensiun</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((guru, index) => (
                    <tr key={guru.id}>
                      <td>
                        <div className="dg-number-badge">{index + 1}</div>
                      </td>
                      <td className="dg-name-cell">{guru.nama}</td>
                      <td className="dg-nip-cell">{guru.nip}</td>
                      <td className="dg-mapel-cell">
                        {(guru.mapel || []).map((mapel, idx) => (
                          <span className="dg-subject-chip" key={idx}>{mapel}</span>
                        ))}
                      </td>
                      <td className="dg-status-cell">
                        {/* Menampilkan status sebagai string jika array */}
                        {Array.isArray(guru.status) ? guru.status.join(', ') : guru.status}
                      </td>
                      <td className="dg-date-cell">{guru.tglPensiun}</td>
                      <td className="dg-actions-cell">
                        <button 
                          className="dg-action-btn dg-view-btn" 
                          aria-label="Lihat detail"
                          onClick={() => handleView(guru.id)}
                          title="Lihat Detail"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="dg-action-btn dg-edit-btn" 
                          aria-label="Edit data"
                          onClick={() => handleEdit(guru.id)}
                          title="Edit Data"
                        >
                          <FaEdit />
                        </button>
                         <button 
                          className="dg-action-btn dg-delete-btn" 
                          aria-label="Hapus data"
                          onClick={() => handleDeleteClick(guru)}
                          title="Hapus Data"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="7" className="dg-no-data-message">
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Info Jumlah Data */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '16px', 
              color: 'var(--dg-text-muted)',
              fontSize: '14px'
            }}>
              Menampilkan {filteredData.length} dari {list.length} guru
            </div>

            {/* Pagination - Sederhana untuk sekarang */}
            {filteredData.length > 0 && (
              <div className="dg-pagination-section">
                <div className="dg-pagination">
                  <button className="dg-pagination-btn dg-prev-btn">
                    Sebelumnya
                  </button>
                  
                  <div className="dg-page-numbers">
                    <button className="dg-page-btn active">1</button>
                  </div>
                  
                  <button className="dg-pagination-btn dg-next-btn">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Konfirmasi Hapus - Konsisten dengan Dashboard */}
      {showDeleteModal && (
        <div className="dg-modal-overlay">
          <div className="dg-modal-container dg-delete-modal">
            <button className="dg-modal-close" onClick={handleDeleteCancel}>
              <FaTimes />
            </button>
            <div className="dg-modal-icon">
              <FaExclamationTriangle />
            </div>
            <div className="dg-modal-content">
              <h3>Konfirmasi Hapus Data Guru</h3>
              <p>Apakah Anda yakin ingin menghapus data guru <strong>{guruToDelete?.nama}</strong>?</p>
              <p className="dg-modal-warning">Data yang dihapus tidak dapat dikembalikan.</p>
            </div>
            <div className="dg-modal-actions">
              <button className="dg-btn-modal-secondary" onClick={handleDeleteCancel}>
                Batal
              </button>
              <button className="dg-btn-modal-danger" onClick={handleDeleteConfirm}>
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}