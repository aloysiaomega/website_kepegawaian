// src/pages/Operator/GantiPassword/GantiPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaEye, FaEyeSlash } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './GantiPassword.css';

export default function GantiPassword() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // State untuk form
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State untuk show/hide password
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      alert('Harap lengkapi semua field!');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      alert('Password baru harus minimal 6 karakter!');
      return;
    }
    
    // Simulasi proses ganti password
    console.log('Data yang dikirim:', formData);
    alert('Password berhasil diubah!');
    
    // Reset form
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleCancel = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan perubahan?')) {
      navigate(-1); // Kembali ke halaman sebelumnya
    }
  };

  return (
    <div className="gp-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="gp-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`gp-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="gp-header">
          <div className="gp-header-left">
            <div className="gp-title-section">
              <h1>Ganti Password</h1>
              <div className="gp-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="gp-header-actions">
            <button className="gp-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="gp-notification-dot" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="gp-content">
          <div className="gp-form-section">
            <form onSubmit={handleSubmit} className="gp-form">
              {/* Current Password Field */}
              <div className="gp-form-group">
                <label htmlFor="currentPassword" className="gp-form-label">
                  Password Saat Ini
                </label>
                <div className="gp-input-wrapper">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Masukan Password"
                    className="gp-form-input"
                    required
                  />
                  <button
                    type="button"
                    className="gp-password-toggle"
                    onClick={() => togglePasswordVisibility('current')}
                    aria-label={showPasswords.current ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div className="gp-form-group">
                <label htmlFor="newPassword" className="gp-form-label">
                  Password Baru
                </label>
                <div className="gp-input-wrapper">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Masukan Password"
                    className="gp-form-input"
                    required
                  />
                  <button
                    type="button"
                    className="gp-password-toggle"
                    onClick={() => togglePasswordVisibility('new')}
                    aria-label={showPasswords.new ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="gp-form-group">
                <label htmlFor="confirmPassword" className="gp-form-label">
                  Konfirmasi Password Baru
                </label>
                <div className="gp-input-wrapper">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Masukan Password"
                    className="gp-form-input"
                    required
                  />
                  <button
                    type="button"
                    className="gp-password-toggle"
                    onClick={() => togglePasswordVisibility('confirm')}
                    aria-label={showPasswords.confirm ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="gp-form-actions">
                <button
                  type="button"
                  className="gp-cancel-btn"
                  onClick={handleCancel}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="gp-submit-btn"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}