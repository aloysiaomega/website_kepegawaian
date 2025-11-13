import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBars, FaBook, FaTimes, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './Mapel.css';

export default function Mapel() {
  const navigate = useNavigate();
  
  const initialData = [
    { 
      id: 1, 
      nama: 'Matematika', 
      jumlahGuru: 5
    },
    { 
      id: 2, 
      nama: 'Bahasa Inggris', 
      jumlahGuru: 3
    },
    { 
      id: 3, 
      nama: 'Seni Budaya', 
      jumlahGuru: 2
    },
    { 
      id: 4, 
      nama: 'Bahasa Indonesia', 
      jumlahGuru: 4
    },
    { 
      id: 5, 
      nama: 'IPA', 
      jumlahGuru: 6
    },
    { 
      id: 6, 
      nama: 'IPS', 
      jumlahGuru: 3
    },
    { 
      id: 7, 
      nama: 'PJOK', 
      jumlahGuru: 2
    },
    { 
      id: 8, 
      nama: 'PKN', 
      jumlahGuru: 2
    }
  ];

  const [list, setList] = useState(initialData);
  const [query, setQuery] = useState('');
  const [mapelFilter, setMapelFilter] = useState('all');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mapelToDelete, setMapelToDelete] = useState(null);
  const [mapelToEdit, setMapelToEdit] = useState(null);
  const [newMapel, setNewMapel] = useState('');
  const [editMapelName, setEditMapelName] = useState('');
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  
  const handleAdd = () => {navigate('/operator/data-guru/tambah-guru');};

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

  // Filter data based on search
  const filteredData = list.filter(mapel => {
    const searchMatch = mapel.nama.toLowerCase().includes(query.toLowerCase());
    const mapelMatch = mapelFilter === 'all' || mapel.nama === mapelFilter;
    
    return searchMatch && mapelMatch;
  });

  // Get unique mapel options from data
  const mapelOptions = ['all', ...new Set(list.map(mapel => mapel.nama))];

  const handleDeleteClick = (mapel) => {
    setMapelToDelete(mapel);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (mapelToDelete) {
      setList(prev => prev.filter(item => item.id !== mapelToDelete.id));
      setShowDeleteModal(false);
      setMapelToDelete(null);
      
      // Show success modal
      setModalContent({
        title: 'Berhasil',
        message: `Mata pelajaran "${mapelToDelete.nama}" berhasil dihapus.`
      });
      setShowAlertModal(true);
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setMapelToDelete(null);
  };

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const showAlert = (title, message) => {
    setModalContent({ title, message });
    setShowAlertModal(true);
  };

  const closeAlertModal = () => {
    setShowAlertModal(false);
  };

  const handleAddMapel = () => {
    if (newMapel.trim() === '') {
      showAlert('Data Belum Lengkap', 'Nama mata pelajaran tidak boleh kosong');
      return;
    }

    // Check if mapel already exists
    if (list.some(mapel => mapel.nama.toLowerCase() === newMapel.trim().toLowerCase())) {
      showAlert('Data Sudah Ada', `Mata pelajaran "${newMapel}" sudah terdaftar.`);
      return;
    }

    const newMapelObj = {
      id: list.length + 1,
      nama: newMapel.trim(),
      jumlahGuru: 0
    };

    setList(prev => [...prev, newMapelObj]);
    setNewMapel('');
    
    // Show success modal
    setModalContent({
      title: 'Berhasil',
      message: `Mata pelajaran "${newMapelObj.nama}" berhasil ditambahkan.`
    });
    setShowAlertModal(true);
  };

  const handleEditClick = (mapel) => {
    setMapelToEdit(mapel);
    setEditMapelName(mapel.nama);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (editMapelName.trim() === '') {
      showAlert('Data Belum Lengkap', 'Nama mata pelajaran tidak boleh kosong');
      return;
    }

    // Check if mapel already exists (excluding the current one being edited)
    if (list.some(mapel => 
      mapel.id !== mapelToEdit.id && 
      mapel.nama.toLowerCase() === editMapelName.trim().toLowerCase()
    )) {
      showAlert('Data Sudah Ada', `Mata pelajaran "${editMapelName}" sudah terdaftar.`);
      return;
    }

    setList(prev => prev.map(item => 
      item.id === mapelToEdit.id ? { ...item, nama: editMapelName.trim() } : item
    ));
    
    setShowEditModal(false);
    setMapelToEdit(null);
    
    // Show success modal
    setModalContent({
      title: 'Berhasil',
      message: `Mata pelajaran berhasil diubah menjadi "${editMapelName.trim()}".`
    });
    setShowAlertModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setMapelToEdit(null);
    setEditMapelName('');
  };

  return (
    <div className="mp-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="mp-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`mp-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="mp-header">
          <div className="mp-header-left">
            <div className="mp-title-section">
              <h1>Mata Pelajaran</h1>
              <div className="mp-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="mp-header-actions">
            <button className="mp-add-btn" onClick={handleAdd}>
              <FaPlus />
              <span>Tambah Guru</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="mp-content">

          {/* Filters Section */}
          <div className="mp-filters-section">
            <div className="mp-filters-grid">
              <div className="mp-filter-group mp-search-group">
                <label>Cari Mapel</label>
                <div className="mp-search-wrapper">
                  <input
                    type="text"
                    placeholder="Nama mata pelajaran"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Cari Mapel"
                  />
                  <button className="mp-search-btn" aria-label="Search">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add Mapel Section */}
          <div className="mp-add-section">
            <h3>Tambah Mapel :</h3>
            <div className="mp-add-form">
              <input
                type="text"
                placeholder="Masukkan nama mata pelajaran"
                value={newMapel}
                onChange={(e) => setNewMapel(e.target.value)}
                className="mp-mapel-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddMapel();
                  }
                }}
              />
              <button className="mp-add-mapel-btn" onClick={handleAddMapel}>
                <FaPlus />
                <span>Tambah Mapel</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mp-divider"></div>

          {/* Table Section */}
          <div className="mp-table-section">
            <h3>Daftar Mata Pelajaran</h3>
            <div className="mp-table-container">
              <table className="mp-data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Mata Pelajaran</th>
                    <th>Jumlah Guru</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((mapel, index) => (
                    <tr key={mapel.id}>
                      <td className="mp-number-cell">
                        <span className="mp-number-badge">{index + 1}</span>
                      </td>
                      <td className="mp-name-cell">
                        <div className="mp-mapel-name">
                          <FaBook className="mp-mapel-icon" />
                          {mapel.nama}
                        </div>
                      </td>
                      <td className="mp-guru-cell">
                        <span className="mp-guru-count">{mapel.jumlahGuru}</span>
                      </td>
                      <td className="mp-actions-cell">
                        <button 
                          className="mp-action-btn mp-edit-btn" 
                          aria-label="Edit mata pelajaran"
                          onClick={() => handleEditClick(mapel)}
                          title="Edit Mapel"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="mp-action-btn mp-delete-btn" 
                          aria-label="Hapus mata pelajaran"
                          onClick={() => handleDeleteClick(mapel)}
                          title="Hapus Mapel"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="mp-no-data-message">
                        Tidak ada data mata pelajaran ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Info Jumlah Data */}
            <div className="mp-data-info">
              Menampilkan {filteredData.length} dari {list.length} mata pelajaran
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="mp-pagination-section">
                <div className="mp-pagination">
                  <button className="mp-pagination-btn mp-prev-btn">
                    Sebelumnya
                  </button>
                  
                  <div className="mp-page-numbers">
                    <button className="mp-page-btn active">1</button>
                    <button className="mp-page-btn">2</button>
                    <button className="mp-page-btn">3</button>
                  </div>
                  
                  <button className="mp-pagination-btn mp-next-btn">
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
        <div className="mp-modal-overlay">
          <div className="mp-modal-container mp-delete-modal">
            <button className="mp-modal-close" onClick={handleDeleteCancel}>
              <FaTimes />
            </button>
            <div className="mp-modal-icon">
              <FaExclamationCircle />
            </div>
            <div className="mp-modal-content">
              <h3>Konfirmasi Hapus</h3>
              <p>Apakah Anda yakin ingin menghapus mata pelajaran <strong>"{mapelToDelete?.nama}"</strong>?</p>
              <p className="mp-modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="mp-modal-actions">
              <button className="mp-btn-modal-secondary" onClick={handleDeleteCancel}>
                Batal
              </button>
              <button className="mp-btn-modal-danger" onClick={handleDeleteConfirm}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="mp-modal-overlay">
          <div className={`mp-modal-container ${modalContent.title === 'Berhasil' ? 'mp-success-modal' : 'mp-info-modal'}`}>
            <button className="mp-modal-close" onClick={closeAlertModal}>
              <FaTimes />
            </button>
            <div className="mp-modal-icon">
              {modalContent.title === 'Berhasil' ? <FaCheckCircle /> : <FaExclamationCircle />}
            </div>
            <div className="mp-modal-content">
              <h3>{modalContent.title}</h3>
              <p>{modalContent.message}</p>
            </div>
            <div className="mp-modal-actions">
              <button className="mp-btn-modal-primary" onClick={closeAlertModal}>
                Oke
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="mp-modal-overlay">
          <div className="mp-modal-container mp-edit-modal">
            <button className="mp-modal-close" onClick={handleEditCancel}>
              <FaTimes />
            </button>
            <div className="mp-modal-icon">
              <FaEdit />
            </div>
            <div className="mp-modal-content">
              <h3>Edit Mata Pelajaran</h3>
              <div className="mp-edit-form">
                <label>Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={editMapelName}
                  onChange={(e) => setEditMapelName(e.target.value)}
                  placeholder="Masukkan nama mata pelajaran"
                  className="mp-edit-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleEditSave();
                    }
                  }}
                />
              </div>
            </div>
            <div className="mp-modal-actions">
              <button className="mp-btn-modal-secondary" onClick={handleEditCancel}>
                Batal
              </button>
              <button className="mp-btn-modal-primary" onClick={handleEditSave}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}