// src/pages/Operator/EditGuru/EditGuru.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './EditGuru.css';

export default function EditGuru() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy - nanti bisa diganti dengan API call
  const initialData = {
    1: {
      id: 1,
      nama: 'Ahmad Darmawan, S.Pd',
      nip: '198512122019031005',
      mapel: ['Matematika', 'IPA'],
      status: 'PNS',
      tglPensiun: '15/12/2048',
      jenisKelamin: 'Laki-laki',
      tglLahir: '1985-12-12',
      tempatLahir: 'Surakarta',
      alamat: 'Jl. Merdeka No. 123, Surakarta, Jawa Tengah',
      email: 'ahmad.darmawan@smkn2sukoharjo.sch.id',
      telepon: '081234567890',
      pendidikan: 'S1 Pendidikan Matematika',
      tglBergabung: '2019-03-01',
      sekolah: 'SMK N 2 Sukoharjo',
      jabatan: 'Guru Matematika'
    }
  };

  const [formData, setFormData] = useState(initialData[id] || initialData[1]);
  const [selectedMapel, setSelectedMapel] = useState([]);

  const handleBack = () => {
    navigate('/dataguru');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMapelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMapel(prev => [...prev, value]);
    } else {
      setSelectedMapel(prev => prev.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan data yang diubah
    console.log('Data yang disimpan:', { ...formData, mapel: selectedMapel });
    alert('Data berhasil disimpan!');
    navigate('/dataguru');
  };

  const mapelOptions = ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'Seni Budaya', 'PJOK'];

  return (
    <div className="edit-guru-app">
      <Sidebar collapsed={false} onToggle={() => {}} />
      
      <main className="edit-guru-main">
        {/* Header */}
        <header className="edit-guru-header">
          <div className="edit-guru-header-left">
            <button 
              className="edit-guru-back-btn"
              onClick={handleBack}
            >
              <FaArrowLeft />
              <span>Kembali ke Data Guru</span>
            </button>
            
            <div className="edit-guru-title-section">
              <h1>Edit Data Guru</h1>
              <div className="edit-guru-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="edit-guru-header-actions">
            <button className="btn-primary" onClick={handleSubmit}>
              <FaSave />
              Simpan Perubahan
            </button>
          </div>
        </header>

        {/* Form */}
        <form className="edit-guru-content" onSubmit={handleSubmit}>
          {/* Informasi Pribadi */}
          <section className="edit-guru-section">
            <h2>Informasi Pribadi</h2>
            <div className="edit-guru-grid">
              <div className="edit-guru-field">
                <label htmlFor="nama">Nama Lengkap *</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="nip">NIP *</label>
                <input
                  type="text"
                  id="nip"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="jenisKelamin">Jenis Kelamin *</label>
                <select
                  id="jenisKelamin"
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="tempatLahir">Tempat Lahir *</label>
                <input
                  type="text"
                  id="tempatLahir"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="tglLahir">Tanggal Lahir *</label>
                <input
                  type="date"
                  id="tglLahir"
                  name="tglLahir"
                  value={formData.tglLahir}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="alamat">Alamat *</label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="telepon">Telepon *</label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Informasi Kepegawaian */}
          <section className="edit-guru-section">
            <h2>Informasi Kepegawaian</h2>
            <div className="edit-guru-grid">
              <div className="edit-guru-field">
                <label htmlFor="status">Status Kepegawaian *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="PNS">PNS</option>
                  <option value="PPPK">PPPK</option>
                  <option value="P3K">P3K</option>
                  <option value="P3K Paruh Waktu">P3K Paruh Waktu</option>
                  <option value="Honorer">Honorer</option>
                </select>
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="jabatan">Jabatan *</label>
                <input
                  type="text"
                  id="jabatan"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="pendidikan">Pendidikan Terakhir *</label>
                <select
                  id="pendidikan"
                  name="pendidikan"
                  value={formData.pendidikan}
                  onChange={handleChange}
                  required
                >
                  <option value="SMA/Sederajat">SMA/Sederajat</option>
                  <option value="D3">Diploma 3 (D3)</option>
                  <option value="S1">Sarjana (S1)</option>
                  <option value="S2">Magister (S2)</option>
                  <option value="S3">Doktor (S3)</option>
                </select>
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="tglBergabung">Tanggal Bergabung *</label>
                <input
                  type="date"
                  id="tglBergabung"
                  name="tglBergabung"
                  value={formData.tglBergabung}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="tglPensiun">Tanggal Pensiun</label>
                <input
                  type="date"
                  id="tglPensiun"
                  name="tglPensiun"
                  value={formData.tglPensiun}
                  onChange={handleChange}
                />
              </div>
              
              <div className="edit-guru-field">
                <label htmlFor="sekolah">Unit Kerja *</label>
                <input
                  type="text"
                  id="sekolah"
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Mata Pelajaran */}
          <section className="edit-guru-section">
            <h2>Mata Pelajaran yang Diampu *</h2>
            <div className="edit-guru-mapel-grid">
              {mapelOptions.map((mapel) => (
                <label key={mapel} className="edit-guru-checkbox">
                  <input
                    type="checkbox"
                    value={mapel}
                    checked={selectedMapel.includes(mapel)}
                    onChange={handleMapelChange}
                  />
                  <span className="checkmark"></span>
                  {mapel}
                </label>
              ))}
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}