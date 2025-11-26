import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaFileAlt,
  FaExchangeAlt,
  FaChartLine,
  FaKey,
  FaSignOutAlt,
  FaBars,
  FaBook
} from 'react-icons/fa'
import './Sidebar.css'

export default function Sidebar({ user, collapsed, onToggle }) {
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  const profile = user || {
    name: 'Santoso Ratno, S.J',
    role: 'Operator Sekolah',
    initials: 'SR'
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('sessionUser')
    } catch (e) {}
    navigate('/login', { replace: true })
  }

  const confirmLogout = () => {
    handleLogout()
    setShowLogoutConfirm(false)
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-top">
            <button className="collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
              <FaBars />
            </button>

            <div className="profile">
              <div className="avatar">{profile.initials}</div>
              <div className="profile-meta">
                <div className="profile-name">{profile.name}</div>
                <div className="profile-role">{profile.role}</div>
              </div>
            </div>

            <nav className="menu">
              <NavLink to="/dashboard" className="menu-item">
                <FaTachometerAlt className="menu-icon" />
                <span className="menu-label">Dashboard</span>
              </NavLink>

              <NavLink to="/dataguru" className="menu-item">
                <FaChalkboardTeacher className="menu-icon" />
                <span className="menu-label">Data Guru Sekolah</span>
              </NavLink>

              {/* Tambahkan Menu Mata Pelajaran di sini */}
              <NavLink to="/operator/mata-pelajaran" className="menu-item">
                <FaBook className="menu-icon" />
                <span className="menu-label">Mata Pelajaran</span>
              </NavLink>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <button 
              className="logout-btn" 
              onClick={() => setShowLogoutConfirm(true)}
            >
              <FaSignOutAlt className="logout-icon" />
              <span className="logout-label">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="so-modal-overlay">
          <div className="so-modal-container">
            <div className="so-modal-content">
              <h3>Konfirmasi Logout</h3>
              <p>Apakah Anda yakin ingin keluar dari sistem?</p>
              <p className="so-modal-warning">Anda perlu login kembali untuk mengakses sistem</p>
            </div>

            <div className="so-modal-actions">
              <button className="so-btn-modal-secondary" onClick={cancelLogout}>
                Batal
              </button>
              <button className="so-btn-modal-danger" onClick={confirmLogout}>
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}