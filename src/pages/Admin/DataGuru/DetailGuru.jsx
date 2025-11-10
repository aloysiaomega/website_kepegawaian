import React, { useState } from 'react';
import './DetailGuru.css';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import { FaEdit, FaPrint, FaEnvelope, FaPhone, FaSchool, FaBook, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaDownload } from 'react-icons/fa';

const DetailGuru = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // Data guru - bisa diganti dengan data dari props atau API
  const guruData = {
    nama: "Ahmad Darmawan, S.Pd",
    nip: "196512102003021005",
    tglPensiun: "15 Desember 2028",
    tempatLahir: "Surakarta 10 Desember 1980",
    pendidikan: "S1 Pendidikan Matematika",
    alamat: "Mojosongo, 02/04 Surakarta",
    jenisKelamin: "Laki-laki",
    statusKepegawaian: "PNS",
    email: "ahmad.darmawan@sekolah.example",
    mapel: ["Matematika", "IPA"],
    sekolah: "SMK N 1 Surakarta",
    tglBergabung: "10 Februari 2003",
    telepon: "081234567890",
    jamMengajar: "24 jam/minggu",
    masaPensiun: "2 Bulan"
  };

  const handlePrint = () => {
    // Logika untuk cetak biodata
    console.log("Cetak biodata guru:", guruData);
    window.print();
  };

  const handleDownloadPDF = () => {
    // Logika untuk unduh PDF
    console.log("Unduh PDF biodata guru:", guruData);
    
    // Simulasi download PDF
    const link = document.createElement('a');
    link.href = '#'; // Ganti dengan URL PDF yang sebenarnya
    link.download = `biodata-${guruData.nama.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Tampilkan pesan sukses
    alert(`Biodata ${guruData.nama} berhasil diunduh dalam format PDF`);
  };

  return (
    <div className="ts-app">
      {/* Sidebar */}
      <SidebarAdminCabdin 
        collapsed={collapsed} 
        toggleSidebar={handleToggleSidebar}
      />
      
      {/* Main Content */}
      <div className={`ts-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="ts-detail-guru-container">
          {/* Header */}
          <div className="ts-detail-guru-header">
            <div className="ts-detail-guru-title-section">
              <div className="ts-detail-guru-title-icon">👨‍🏫</div>
              <div>
                <h1>Detail Guru</h1>
                <p>Informasi lengkap data guru</p>
              </div>
            </div>
            <div className="ts-detail-guru-actions">
              <button className="ts-print-btn" onClick={handlePrint}>
                <FaPrint className="ts-action-icon" />
                Cetak Biodata
              </button>
              <button className="ts-download-btn" onClick={handleDownloadPDF}>
                <FaDownload className="ts-action-icon" />
                Unduh PDF
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="ts-detail-guru-content">
            {/* Left Column - Informasi Pribadi */}
            <div className="ts-info-column">
              {/* Nama Lengkap Section */}
              <div className="ts-info-section">
                <div className="ts-section-header">
                  <FaUser className="ts-section-icon" />
                  <h3>Nama Lengkap</h3>
                </div>
                <div className="ts-info-card">
                  <div className="ts-guru-name">{guruData.nama}</div>
                  <div className="ts-info-grid">
                    <div className="ts-info-item">
                      <FaCalendarAlt className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Tanggal Pensiun</span>
                        <span className="ts-info-value">{guruData.tglPensiun}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaMapMarkerAlt className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Tempat Tanggal Lahir</span>
                        <span className="ts-info-value">{guruData.tempatLahir}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaGraduationCap className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Pendidikan Terakhir</span>
                        <span className="ts-info-value">{guruData.pendidikan}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaMapMarkerAlt className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Alamat</span>
                        <span className="ts-info-value">{guruData.alamat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jenis Kelamin Section */}
              <div className="ts-info-section">
                <div className="ts-section-header">
                  <FaUser className="ts-section-icon" />
                  <h3>Jenis Kelamin</h3>
                </div>
                <div className="ts-info-card">
                  <div className="ts-simple-info">
                    <span className="ts-simple-value">{guruData.jenisKelamin}</span>
                  </div>
                  <div className="ts-info-grid">
                    <div className="ts-info-item">
                      <div>
                        <span className="ts-info-label">Status Kepegawaian</span>
                        <span className="ts-info-value">{guruData.statusKepegawaian}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaEnvelope className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">E-mail</span>
                        <span className="ts-info-value">{guruData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profesional */}
            <div className="ts-info-column">
              {/* Mata Pelajaran Section */}
              <div className="ts-info-section">
                <div className="ts-section-header">
                  <FaBook className="ts-section-icon" />
                  <h3>Mata Pelajaran yang Diampu</h3>
                </div>
                <div className="ts-info-card">
                  <div className="ts-mapel-list">
                    {guruData.mapel.map((mapel, index) => (
                      <span key={index} className="ts-mapel-badge">{mapel}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unit Sekolah Section */}
              <div className="ts-info-section">
                <div className="ts-section-header">
                  <FaSchool className="ts-section-icon" />
                  <h3>Unit / Sekolah</h3>
                </div>
                <div className="ts-info-card">
                  <div className="ts-simple-info">
                    <span className="ts-simple-value">{guruData.sekolah}</span>
                  </div>
                </div>
              </div>

              {/* Cetak Biodata Section */}
              <div className="ts-info-section">
                <div className="ts-section-header">
                  <FaPrint className="ts-section-icon" />
                  <h3>Cetak & Unduh Biodata</h3>
                </div>
                <div className="ts-info-card">
                  <div className="ts-info-grid">
                    <div className="ts-info-item">
                      <div>
                        <span className="ts-info-label">NIP</span>
                        <span className="ts-info-value ts-nip">{guruData.nip}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaCalendarAlt className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Tanggal Bergabung</span>
                        <span className="ts-info-value">{guruData.tglBergabung}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <FaPhone className="ts-info-icon" />
                      <div>
                        <span className="ts-info-label">Telepon</span>
                        <span className="ts-info-value">{guruData.telepon}</span>
                      </div>
                    </div>
                    <div className="ts-info-item">
                      <div>
                        <span className="ts-info-label">Jam Mengajar</span>
                        <span className="ts-info-value">{guruData.jamMengajar}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Masa Pensiun */}
                  <div className="ts-pensiun-section">
                    <div className="ts-pensiun-label">Masa Pensiun</div>
                    <div className="ts-pensiun-badge">{guruData.masaPensiun}</div>
                  </div>

                  {/* Download Actions */}
                  <div className="ts-download-actions">
                    <button className="ts-download-pdf-btn" onClick={handleDownloadPDF}>
                      <FaDownload className="ts-action-icon" />
                      Unduh PDF Biodata
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGuru;