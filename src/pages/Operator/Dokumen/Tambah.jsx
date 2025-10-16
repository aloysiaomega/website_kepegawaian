// src/pages/Operator/DokumenDigital/UploadDokumen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes, FaFile, FaBars } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './Tambah.css';

export default function UploadDokumen() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    guru: '',
    kategori: '',
    namaDokumen: '',
    deskripsi: ''
  });
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Data dummy untuk dropdown
  const guruOptions = [
    { id: '', nama: 'Pilih Guru' },
    { id: '1', nama: 'Devit Wulandari, S.Pd' },
    { id: '2', nama: 'Citra Indah, S.Pd' },
    { id: '3', nama: 'Budi Santoso, S.Pd' },
    { id: '4', nama: 'Siti Rahayu, S.Pd' },
    { id: '5', nama: 'Ahmad Darmawan, S.Pd' }
  ];

  const kategoriOptions = [
    { id: '', nama: 'Pilih Kategori' },
    { id: '1', nama: 'Ijazah & Transkrip' },
    { id: '2', nama: 'Sertifikasi' },
    { id: '3', nama: 'SK & Penugasan' },
    { id: '4', nama: 'Laporan' },
    { id: '5', nama: 'Sertifikat' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size > 10 * 1024 * 1024) {
        alert('Ukuran file melebihi 10MB');
        return;
      }
      // Validasi tipe file
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(droppedFile.type)) {
        alert('Format file tidak didukung');
        return;
      }
      
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validasi yang sama seperti handleDrop
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('Ukuran file melebihi 10MB');
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Format file tidak didukung');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.guru || !formData.kategori || !formData.namaDokumen || !file) {
      alert('Harap lengkapi semua field yang wajib diisi');
      return;
    }
    
    // Simulasi upload berhasil
    console.log('Data yang diupload:', { ...formData, file });
    alert('Dokumen berhasil diupload!');
    
    // Redirect kembali ke halaman dokumen digital
    navigate('/operator/dokumen-digital');
  };

  const handleCancel = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.')) {
      navigate('/operator/dokumen-digital');
    }
  };

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="ud-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="ud-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`ud-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="ud-header">
          <div className="ud-header-left">
            <div className="ud-title-section">
              <h1>Upload Dokumen Digital</h1>
              <div className="ud-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="ud-header-actions">
            <button className="ud-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="ud-notification-dot" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="ud-content">
          <div className="ud-form-container">
            <div className="ud-form-header">
              <h2>Form Upload Dokumen</h2>
              <p>Lengkapi form berikut untuk mengupload dokumen digital</p>
            </div>

            <form onSubmit={handleSubmit} className="ud-form">
              {/* Field Pilih Guru */}
              <div className="ud-form-group">
                <label htmlFor="guru" className="ud-form-label">
                  Pilih Guru <span className="ud-required">*</span>
                </label>
                <select
                  id="guru"
                  name="guru"
                  value={formData.guru}
                  onChange={handleInputChange}
                  className="ud-form-select"
                  required
                >
                  {guruOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Kategori Dokumen */}
              <div className="ud-form-group">
                <label htmlFor="kategori" className="ud-form-label">
                  Kategori Dokumen <span className="ud-required">*</span>
                </label>
                <select
                  id="kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="ud-form-select"
                  required
                >
                  {kategoriOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Nama Dokumen */}
              <div className="ud-form-group">
                <label htmlFor="namaDokumen" className="ud-form-label">
                  Nama Dokumen <span className="ud-required">*</span>
                </label>
                <input
                  type="text"
                  id="namaDokumen"
                  name="namaDokumen"
                  value={formData.namaDokumen}
                  onChange={handleInputChange}
                  placeholder="Contoh: Sertifikasi Guru 2023"
                  className="ud-form-input"
                  required
                />
              </div>

              {/* Field Deskripsi */}
              <div className="ud-form-group">
                <label htmlFor="deskripsi" className="ud-form-label">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat dokumen..."
                  className="ud-form-textarea"
                  rows="4"
                />
              </div>

              {/* Field Unggah File */}
              <div className="ud-form-group">
                <label className="ud-form-label">
                  Unggah File <span className="ud-required">*</span>
                </label>
                
                <div 
                  className={`ud-file-upload ${dragActive ? 'ud-drag-active' : ''} ${file ? 'ud-has-file' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    className="ud-file-input"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                  
                  {!file ? (
                    <div className="ud-upload-placeholder">
                      <FaUpload className="ud-upload-icon" />
                      <div className="ud-upload-text">
                        <p className="ud-upload-main-text">Seret file ke sini atau klik untuk memilih</p>
                        <p className="ud-upload-sub-text">
                          Maksimal ukuran file: 10MB. Format yang didukung: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                        </p>
                      </div>
                      <button 
                        type="button" 
                        className="ud-browse-btn"
                        onClick={() => document.getElementById('fileUpload').click()}
                      >
                        Pilih File
                      </button>
                    </div>
                  ) : (
                    <div className="ud-file-preview">
                      <div className="ud-file-info">
                        <FaFile className="ud-file-icon" />
                        <div className="ud-file-details">
                          <p className="ud-file-name">{file.name}</p>
                          <p className="ud-file-size">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="ud-remove-file"
                        onClick={removeFile}
                        aria-label="Hapus file"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ud-form-actions">
                <button 
                  type="button" 
                  className="ud-cancel-btn"
                  onClick={handleCancel}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="ud-submit-btn"
                >
                  Unggah Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}