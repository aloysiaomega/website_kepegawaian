import React, { useState } from 'react';
import { FaBars, FaSave, FaArrowLeft, FaSchool, FaUser, FaMapMarkerAlt, FaAward, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SidebarAdminCabdin from '../Sidebar/SidebarA';
import './TambahSekolah.css';

export default function TambahSekolah() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaSekolah: '',
    jenjang: 'SMK',
    alamatSekolah: '',
    namaKepalaSekolah: '',
    akreditasi: 'A',
    npsn: ''
  });

  React.useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form data:', formData);
    alert('Data sekolah berhasil disimpan!');
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="ts-app">
      <SidebarAdminCabdin collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {isMobile && !collapsed && (
        <div 
          className="ts-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`ts-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <header className="ts-header">
          <div className="ts-header-left">
            <div className="ts-title-section">
              <h1>Tambah Sekolah Baru</h1>
              <div className="ts-subtitle">Cabang Dinas Pendidikan Wilayah VII</div>
            </div>
          </div>

          <div className="ts-header-actions">
            <button 
              className="ts-cancel-btn"
              onClick={handleCancel}
            >
              <FaArrowLeft className="ts-cancel-icon" />
              Kembali ke Dashboard
            </button>
            <button 
              className="ts-save-btn"
              onClick={handleSubmit}
            >
              <FaSave className="ts-save-icon" />
              Simpan Data Sekolah
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="ts-content">
          <div className="ts-form-container">

            {/* Form Content */}
            <div className="ts-form-section">
              <form className="ts-form">
                <div className="ts-form-grid">
                  {/* Nama Sekolah */}
                  <div className="ts-form-card">
                    <div className="ts-form-card-header">
                      <h3>Nama Sekolah</h3>
                    </div>
                    <div className="ts-form-group">
                      <input
                        type="text"
                        id="namaSekolah"
                        name="namaSekolah"
                        value={formData.namaSekolah}
                        onChange={handleInputChange}
                        className="ts-form-input"
                        placeholder="Masukkan nama sekolah lengkap"
                      />
                    </div>
                  </div>

                  {/* Jenjang */}
                  <div className="ts-form-card">
                    <div className="ts-form-card-header">
                      <h3>Jenjang Pendidikan</h3>
                    </div>
                    <div className="ts-form-group">
                      <select
                        id="jenjang"
                        name="jenjang"
                        value={formData.jenjang}
                        onChange={handleInputChange}
                        className="ts-form-select"
                      >
                        <option value="SMK">Sekolah Menengah Kejuruan (SMK)</option>
                        <option value="SMA">Sekolah Menengah Atas (SMA)</option>
                        <option value="SLB">Sekolah Luar Biasa (SLB)</option>
                      </select>
                    </div>
                  </div>

                  {/* Alamat Sekolah */}
                  <div className="ts-form-card ts-full-width">
                    <div className="ts-form-card-header">
                      <h3>Alamat Sekolah</h3>
                    </div>
                    <div className="ts-form-group">
                      <textarea
                        id="alamatSekolah"
                        name="alamatSekolah"
                        value={formData.alamatSekolah}
                        onChange={handleInputChange}
                        className="ts-form-textarea"
                        placeholder="Masukkan alamat lengkap sekolah termasuk kecamatan, kota, dan provinsi"
                        rows="4"
                      />
                    </div>
                  </div>

                  {/* Nama Kepala Sekolah */}
                  <div className="ts-form-card">
                    <div className="ts-form-card-header">
                      <h3>Kepala Sekolah</h3>
                    </div>
                    <div className="ts-form-group">
                      <input
                        type="text"
                        id="namaKepalaSekolah"
                        name="namaKepalaSekolah"
                        value={formData.namaKepalaSekolah}
                        onChange={handleInputChange}
                        className="ts-form-input"
                        placeholder="Masukkan nama lengkap kepala sekolah"
                      />
                    </div>
                  </div>

                  {/* Akreditasi */}
                  <div className="ts-form-card">
                    <div className="ts-form-card-header">
                      <h3>Status Akreditasi</h3>
                    </div>
                    <div className="ts-form-group">
                      <select
                        id="akreditasi"
                        name="akreditasi"
                        value={formData.akreditasi}
                        onChange={handleInputChange}
                        className="ts-form-select"
                      >
                        <option value="A">A - Sangat Baik</option>
                        <option value="B">B - Baik</option>
                        <option value="C">C - Cukup</option>
                        <option value="Belum Terakreditasi">Belum Terakreditasi</option>
                      </select>
                    </div>
                  </div>

                  {/* NPSN */}
                  <div className="ts-form-card">
                    <div className="ts-form-card-header">
                      <h3>Nomor Pokok Sekolah Nasional</h3>
                    </div>
                    <div className="ts-form-group">
                      <input
                        type="text"
                        id="npsn"
                        name="npsn"
                        value={formData.npsn}
                        onChange={handleInputChange}
                        className="ts-form-input"
                        placeholder="Masukkan 8 digit NPSN"
                        maxLength="8"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="ts-form-actions">
                  <button 
                    type="button"
                    className="ts-cancel-btn ts-form-cancel-btn"
                    onClick={handleCancel}
                  >
                    <FaArrowLeft className="ts-cancel-icon" />
                    Batalkan
                  </button>
                  <button 
                    type="submit"
                    className="ts-save-btn ts-form-save-btn"
                    onClick={handleSubmit}
                  >
                    <FaSave className="ts-save-icon" />
                    Simpan Data Sekolah
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Tips */}
            <div className="ts-quick-tips">
              <div className="ts-tips-header">
                <h4>Tips Pengisian Data</h4>
              </div>
              <div className="ts-tips-content">
                <div className="ts-tip-item">
                  <div className="ts-tip-bullet">1</div>
                  <span>Pastikan semua data diisi dengan benar sesuai dokumen resmi</span>
                </div>
                <div className="ts-tip-item">
                  <div className="ts-tip-bullet">2</div>
                  <span>NPSN harus berupa 8 digit angka yang valid</span>
                </div>
                <div className="ts-tip-item">
                  <div className="ts-tip-bullet">3</div>
                  <span>Alamat sekolah harus lengkap hingga tingkat kecamatan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}