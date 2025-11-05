import React, { useState, useEffect } from 'react';
import './ManajemenPengguna.css';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import { FaSearch, FaEdit, FaPlus, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManajemenPengguna = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSekolah, setSelectedSekolah] = useState('Semua Sekolah');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const navigate = useNavigate();
  
  const handleTambahPengguna = () => {
    navigate('/admin-cabdin/manajemen-pengguna/tambah-pengguna');
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

  // Data dummy pengguna operator sekolah
  const dataPengguna = [
    {
      id: 1,
      nama: "Budi santposo @SMKN1SKA.sch.id",
      username: "OP_SMKN1SKA",
      sekolah: "SMK N 1 Surakarta",
      lastLogin: "15/03/2023 14:30:00",
      status: "Aktif"
    },
    {
      id: 2,
      nama: "Siti Oparsi @SMKN2SKA.sch.id",
      username: "OP_SMKN2SKA", 
      sekolah: "SMK N 2 Surakarta",
      lastLogin: "14/03/2023 09:15:00",
      status: "Aktif"
    },
    {
      id: 3,
      nama: "Ahmad Iskandar @SMKN3SKA.sch.id",
      username: "OP_SMKN3SKA",
      sekolah: "SMK N 3 Surakarta",
      lastLogin: "28/02/2023 16:45:00",
      status: "NonAktif"
    },
    {
      id: 4,
      nama: "Dewi Kartika @SMKN4SKA.sch.id",
      username: "OP_SMKN4SKA",
      sekolah: "SMK N 4 Surakarta", 
      lastLogin: "20/03/2023 11:20:00",
      status: "Aktif"
    },
    {
      id: 5,
      nama: "Rudi Hermawan @SMKN5SKA.sch.id",
      username: "OP_SMKN5SKA",
      sekolah: "SMK N 5 Surakarta",
      lastLogin: "18/03/2023 08:45:00",
      status: "NonAktif"
    }
  ];

  // Options untuk filter
  const sekolahOptions = ["Semua Sekolah", "SMK N 1 Surakarta", "SMK N 2 Surakarta", "SMK N 3 Surakarta", "SMK N 4 Surakarta", "SMK N 5 Surakarta"];
  const statusOptions = ["Semua Status", "Aktif", "NonAktif"];

  // Filter data berdasarkan pencarian dan filter
  const filteredPengguna = dataPengguna.filter(pengguna => {
    const matchesSearch = 
      pengguna.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pengguna.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pengguna.sekolah.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSekolah = selectedSekolah === "Semua Sekolah" || pengguna.sekolah === selectedSekolah;
    const matchesStatus = selectedStatus === "Semua Status" || pengguna.status === selectedStatus;

    return matchesSearch && matchesSekolah && matchesStatus;
  });

  const handleEditUser = (userId) => {
    navigate(`/admin-cabdin/manajemen-pengguna/edit/${userId}`);
    // Navigate to edit page
  };

  const handleToggleStatus = (userId) => {
    console.log("Toggle status user:", userId);
    // Implement status toggle logic
  };

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
              <h1>Manajemen Pengguna</h1>
              <div className="acd-subtitle">Cabang Dinas Pendidikan Wilayah VII</div>
            </div>
          </div>
        </header>

        <div className="acd-content">
          {/* Filter Section */}
          <div className="acd-filter-section">
            <div className="acd-filter-header">
              <FaFilter className="acd-filter-icon" />
              <h3>Filter Pengguna</h3>
            </div>
            <div className="acd-filter-grid">
              <div className="acd-filter-group">
                <label className="acd-filter-label">Sekolah</label>
                <select 
                  className="acd-filter-select"
                  value={selectedSekolah}
                  onChange={(e) => setSelectedSekolah(e.target.value)}
                >
                  {sekolahOptions.map((sekolah, index) => (
                    <option key={index} value={sekolah}>{sekolah}</option>
                  ))}
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Status</label>
                <select 
                  className="acd-filter-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="acd-filter-group">
                <label className="acd-filter-label">Cari User/Sekolah</label>
                <div className="acd-search-container">
                  <FaSearch className="acd-search-icon" />
                  <input
                    type="text"
                    className="acd-search-input"
                    placeholder="Cari nama, username, atau sekolah"
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
              <h3>Daftar Pengguna Operator Sekolah</h3>
              <div className="acd-filter-group acd-filter-action-group">
                <button className="acd-primary-btn acd-add-operator-btn" onClick={handleTambahPengguna}>
                  <FaPlus className="acd-add-icon" />
                  <span className="acd-btn-text">Tambah Pengguna</span>
                  <div className="acd-btn-shine"></div>
                </button>
              </div>
            </div>

            <div className="acd-table-container">
              <table className="acd-performance-table">
                <thead>
                  <tr>
                    <th className="acd-table-th">No</th>
                    <th className="acd-table-th">Nama</th>
                    <th className="acd-table-th">Username</th>
                    <th className="acd-table-th">Sekolah</th>
                    <th className="acd-table-th">Terakhir Login</th>
                    <th className="acd-table-th">Status</th>
                    <th className="acd-table-th acd-text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPengguna.map((pengguna, index) => (
                    <tr key={pengguna.id} className="acd-table-row">
                      <td className="acd-table-td acd-table-number">
                        {index + 1}
                      </td>
                      <td className="acd-table-td">
                        <div className="acd-pengguna-info">
                          <div className="acd-pengguna-nama">{pengguna.nama}</div>
                        </div>
                      </td>
                      <td className="acd-table-td acd-table-username">
                        {pengguna.username}
                      </td>
                      <td className="acd-table-td">
                        <span className="acd-sekolah-badge">{pengguna.sekolah}</span>
                      </td>
                      <td className="acd-table-td acd-table-login">
                        {pengguna.lastLogin}
                      </td>
                      <td className="acd-table-td">
                        <span className={`acd-status-badge ${pengguna.status === 'Aktif' ? 'acd-status-aktif' : 'acd-status-nonaktif'}`}>
                          {pengguna.status}
                        </span>
                      </td>
                      <td className="acd-table-td acd-text-center">
                        <div className="acd-actions-cell">
                            <button 
                            className="acd-action-btn acd-edit-btn"
                            aria-label="Edit pengguna"
                            title="Edit"
                            onClick={() => handleEditUser(pengguna.id)}
                            >
                            <FaEdit className="acd-btn-icon" />
                            <span className="acd-btn-text">Edit</span>
                            </button>
                            <button 
                            className={`acd-action-btn ${pengguna.status === 'Aktif' ? 'acd-nonaktif-btn' : 'acd-aktif-btn'}`}
                            aria-label={pengguna.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                            title={pengguna.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                            onClick={() => handleToggleStatus(pengguna.id)}
                            >
                            <span className="acd-btn-text">
                                {pengguna.status === 'Aktif' ? 'NonAktifkan' : 'Aktifkan'}
                            </span>
                            </button>
                        </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPengguna.length === 0 && (
                <div className="acd-empty-state">
                  <div className="acd-empty-icon">🔍</div>
                  <h4>Data tidak ditemukan</h4>
                  <p>Coba ubah filter pencarian Anda</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="acd-pagination">
              <button className="acd-pagination-btn acd-pagination-prev">
                Sebelumnya
              </button>
              <div className="acd-pagination-numbers">
                <button className="acd-pagination-number acd-pagination-active">1</button>
                <button className="acd-pagination-number">2</button>
                <button className="acd-pagination-number">3</button>
              </div>
              <button className="acd-pagination-btn acd-pagination-next">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenPengguna;  