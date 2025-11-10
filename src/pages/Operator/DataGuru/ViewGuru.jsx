// src/pages/Operator/ViewGuru/ViewGuru.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaDownload, FaEdit, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './ViewGuru.css';

export default function ViewGuru() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  // Data dummy - nanti bisa diganti dengan API call
  const guruData = {
    1: {
      id: 1,
      nama: 'Ahmad Darmawan, S.Pd',
      nip: '198512122019031005',
      mapel: ['Matematika', 'IPA'],
      status: 'PNS',
      tglPensiun: '15/12/2048',
      jenisKelamin: 'Laki-laki',
      tglLahir: '12 Desember 1985',
      tempatLahir: 'Surakarta',
      alamat: 'Jl. Merdeka No. 123, Surakarta, Jawa Tengah',
      email: 'ahmad.darmawan@smkn2sukoharjo.sch.id',
      telepon: '081234567890',
      pendidikan: 'S1 Pendidikan Matematika',
      tglBergabung: '01 Maret 2019',
      sekolah: 'SMK N 2 Sukoharjo',
      jabatan: 'Guru Matematika',
      jamMengajar: '18 jam/minggu'
    },
    2: {
      id: 2,
      nama: 'Budi Santosa, S.Pd',
      nip: '197911292005011003',
      mapel: ['Bahasa Indonesia'],
      status: 'P3K Paruh Waktu',
      tglPensiun: '29/11/2039',
      jenisKelamin: 'Laki-laki',
      tglLahir: '29 November 1979',
      tempatLahir: 'Sukoharjo',
      alamat: 'Jl. Sejahtera No. 45, Sukoharjo',
      email: 'budi.santosa@smkn2sukoharjo.sch.id',
      telepon: '081234567891',
      pendidikan: 'S1 Pendidikan Bahasa Indonesia',
      tglBergabung: '15 Januari 2005',
      sekolah: 'SMK N 2 Sukoharjo',
      jabatan: 'Guru Bahasa Indonesia',
      jamMengajar: '18 jam/minggu'
    },
    3: {
      id: 3,
      nama: 'Eko Raharjo, S.Pd',
      nip: '198004152006041002',
      mapel: ['Bahasa Inggris'],
      status: 'P3K',
      tglPensiun: '15/04/2042',
      jenisKelamin: 'Laki-laki',
      tglLahir: '15 April 1980',
      tempatLahir: 'Surakarta',
      alamat: 'Jl. Damai No. 67, Surakarta',
      email: 'eko.raharjo@smkn2sukoharjo.sch.id',
      telepon: '081234567892',
      pendidikan: 'S1 Pendidikan Bahasa Inggris',
      tglBergabung: '01 April 2006',
      sekolah: 'SMK N 2 Sukoharjo',
      jabatan: 'Guru Bahasa Inggris',
      jamMengajar: '18 jam/minggu'
    }
  };

  const guru = guruData[id] || guruData[1];

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/operator/data-guru/edit/${id}`);
  };

  const handlePrint = () => {
    setModalContent({
      title: 'Cetak Data',
      message: 'Fitur cetak data guru sedang dalam pengembangan.'
    });
    setShowModal(true);
  };

  const handleDownload = () => {
    setModalContent({
      title: 'Download PDF',
      message: 'Fitur download PDF sedang dalam pengembangan.'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="view-guru-app">
      <Sidebar collapsed={false} onToggle={() => {}} />
      
      <main className="view-guru-main">
        {/* Header */}
        <header className="view-guru-header">
          <div className="view-guru-header-left">
            <button 
              className="view-guru-back-btn"
              onClick={handleBack}
            >
              <FaArrowLeft />
              <span>Kembali</span>
            </button>
            
            <div className="view-guru-title-section">
              <h1>Detail Data Guru</h1>
              <div className="view-guru-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="view-guru-header-actions">
            <button className="btn-ghost" onClick={handlePrint}>
              <FaPrint />
              Cetak
            </button>
            <button className="btn-ghost" onClick={handleDownload}>
              <FaDownload />
              Unduh PDF
            </button>
            <button className="btn-primary" onClick={handleEdit}>
              <FaEdit />
              Edit Data
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="view-guru-content">
          {/* Informasi Pribadi */}
          <section className="view-guru-section">
            <h2>Informasi Pribadi</h2>
            <div className="view-guru-grid">
              <div className="view-guru-field">
                <label>Nama Lengkap</label>
                <div className="view-guru-value">{guru.nama}</div>
              </div>
              
              <div className="view-guru-field">
                <label>NIP</label>
                <div className="view-guru-value">{guru.nip}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Jenis Kelamin</label>
                <div className="view-guru-value">{guru.jenisKelamin}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Tempat, Tanggal Lahir</label>
                <div className="view-guru-value">{guru.tempatLahir}, {guru.tglLahir}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Alamat</label>
                <div className="view-guru-value">{guru.alamat}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Email</label>
                <div className="view-guru-value">{guru.email}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Telepon</label>
                <div className="view-guru-value">{guru.telepon}</div>
              </div>
            </div>
          </section>

          {/* Informasi Kepegawaian */}
          <section className="view-guru-section">
            <h2>Informasi Kepegawaian</h2>
            <div className="view-guru-grid">
              <div className="view-guru-field">
                <label>Status Kepegawaian</label>
                <div className="view-guru-value">
                  <span className={`status-pill status-${guru.status.toLowerCase().replace(' ', '-')}`}>
                    {guru.status}
                  </span>
                </div>
              </div>
              
              <div className="view-guru-field">
                <label>Jabatan</label>
                <div className="view-guru-value">{guru.jabatan}</div>
              </div>

              <div className="view-guru-field">
                <label>Jam Mengajar</label>
                <div className="view-guru-value">{guru.jamMengajar}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Pendidikan Terakhir</label>
                <div className="view-guru-value">{guru.pendidikan}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Tanggal Bergabung</label>
                <div className="view-guru-value">{guru.tglBergabung}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Tanggal Pensiun</label>
                <div className="view-guru-value">{guru.tglPensiun}</div>
              </div>
              
              <div className="view-guru-field">
                <label>Unit Kerja</label>
                <div className="view-guru-value">{guru.sekolah}</div>
              </div>
            </div>
          </section>

          {/* Mata Pelajaran */}
          <section className="view-guru-section">
            <h2>Mata Pelajaran yang Diampu</h2>
            <div className="view-guru-mapel">
              {guru.mapel.map((mapel, index) => (
                <span key={index} className="subject-chip">
                  {mapel}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Modal Alert - Konsisten dengan komponen lainnya */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container info-modal">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-icon">
              <FaExclamationCircle />
            </div>
            <div className="modal-content">
              <h3>{modalContent.title}</h3>
              <p>{modalContent.message}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-primary" onClick={closeModal}>
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}