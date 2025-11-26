import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaFileAlt,
  FaExchangeAlt,
  FaChartLine,
  FaDatabase,
  FaBell,
  FaUsers,
  FaKey,
  FaSignOutAlt,
  FaEllipsisV
} from 'react-icons/fa'
import './SidebarA.css'

export default function SidebarAdminCabdin({ user, collapsed, onToggle }) {
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  const profile = user || {
    name: 'Admin Cabdin',
    role: 'Administrator Cabang Dinas',
    initials: 'AC'
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
      <aside className={`sidebar-admin ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-admin-inner">
          <div className="sidebar-admin-top">
            <button 
              className="collapse-admin-btn" 
              onClick={onToggle} 
              aria-label="Toggle sidebar"
            />

            <div className="profile-admin">
              <div className="avatar-admin">{profile.initials}</div>
              <div className="profile-admin-meta">
                <div className="profile-admin-name">{profile.name}</div>
                <div className="profile-admin-role">{profile.role}</div>
              </div>
            </div>

            <nav className="menu-admin">
              <NavLink to="/admin-cabdin/dashboard" className="menu-admin-item">
                <FaTachometerAlt className="menu-admin-icon" />
                <span className="menu-admin-label">Dashboard</span>
              </NavLink>

              <NavLink to="/admin-cabdin/data-guru" className="menu-admin-item">
                <FaChalkboardTeacher className="menu-admin-icon" />
                <span className="menu-admin-label">Data Guru</span>
              </NavLink>

              <NavLink to="/admin-cabdin/manajemen-pengguna" className="menu-admin-item">
                <FaUsers className="menu-admin-icon" />
                <span className="menu-admin-label">Manajemen Pengguna</span>
              </NavLink>
            </nav>
          </div>

          <div className="sidebar-admin-bottom">
            <button 
              className="logout-admin-btn" 
              onClick={() => setShowLogoutConfirm(true)}
            >
              <FaSignOutAlt className="logout-admin-icon" />
              <span className="logout-admin-label">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="sa-modal-overlay">
          <div className="sa-modal-container">
            <div className="sa-modal-content">
              <h3>Konfirmasi Logout</h3>
              <p>Apakah Anda yakin ingin keluar dari sistem?</p>
              <p className="sa-modal-warning">Anda perlu login kembali untuk mengakses sistem</p>
            </div>

            <div className="sa-modal-actions">
              <button className="sa-btn-modal-secondary" onClick={cancelLogout}>
                Batal
              </button>
              <button className="sa-btn-modal-danger" onClick={confirmLogout}>
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}