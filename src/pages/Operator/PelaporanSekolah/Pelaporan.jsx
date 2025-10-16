// src/pages/Operator/DashboardOperatorSekolah/DashboardOperatorSekolah.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FaPlus } from 'react-icons/fa';
import './Pelaporan.css';

export default function DashboardOperatorSekolah() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleAdd = () => {
    alert('Fungsi tambah guru akan diimplementasikan');
  };

  return (
    <div className="dos-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && !collapsed && (
        <div 
          className="dos-sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <main className={`dos-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <header className="dos-header">
          <div className="dos-header-left">
            <div className="dos-title-section">
              <h1>Dashboard Operator Sekolah</h1>
              <div className="dos-subtitle">SMK N 2 Sukoharjo</div>
            </div>
          </div>

          <div className="dos-header-actions">
            <button className="dos-notification-btn" aria-label="Notifikasi">
              🔔
              <span className="dos-notification-dot" />
            </button>

            <button className="dos-add-btn" onClick={handleAdd}>
                <FaPlus />
                <span>Tambah Guru</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="dos-content">
          {/* School Reports Section */}
          <div className="dos-section">
            <h2 className="dos-section-title">Pelaporan Sekolah</h2>
            
            <div className="dos-reports-grid">
              {/* Laporan Data Guru per Status */}
              <div className="dos-report-card">
                <div className="dos-report-header">
                  <h3>Laporan Data Guru per Status</h3>
                  <span className="dos-update-date">Update: 30/06/2023</span>
                </div>
                <div className="dos-report-content">
                  <div className="dos-status-grid">
                    <div className="dos-status-item">
                      <div className="dos-status-number">25</div>
                      <div className="dos-status-label">Guru Tetap</div>
                    </div>
                    <div className="dos-status-item">
                      <div className="dos-status-number">17</div>
                      <div className="dos-status-label">Guru Kontrak</div>
                    </div>
                    <div className="dos-status-item">
                      <div className="dos-status-number">0</div>
                      <div className="dos-status-label">Guru Honorer</div>
                    </div>
                    <div className="dos-status-item">
                      <div className="dos-status-number">5</div>
                      <div className="dos-status-label">Guru PNS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laporan Distribusi Golongan */}
              <div className="dos-report-card">
                <div className="dos-report-header">
                  <h3>Laporan Distribusi Golongan</h3>
                  <span className="dos-update-date">Update: 30/06/2023</span>
                </div>
                <div className="dos-report-content">
                  <div className="dos-distribution-grid">
                    <div className="dos-distribution-row">
                      <div className="dos-distribution-number">19</div>
                      <div className="dos-distribution-label">(N.S.EK)</div>
                    </div>
                    <div className="dos-distribution-row">
                      <div className="dos-distribution-number">0</div>
                      <div className="dos-distribution-label">(N.S.EK)</div>
                    </div>
                    <div className="dos-distribution-row">
                      <div className="dos-distribution-number">0</div>
                      <div className="dos-distribution-label">(N.S.EK)</div>
                    </div>
                    <div className="dos-distribution-row">
                      <div className="dos-distribution-number">0</div>
                      <div className="dos-distribution-label">(N.S.EK)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Status Items */}
            <div className="dos-additional-status">
              <div className="dos-status-tag">Sedergen [1] (2)</div>
              <div className="dos-status-tag">Gedergen [1] (3)</div>
              <div className="dos-status-tag">Gedergen [1] (4)</div>
              <div className="dos-status-tag">Gedergen [1] (5)</div>
            </div>
          </div>

          {/* Bottom Reports Section */}
          <div className="dos-section">
            <div className="dos-reports-grid">
              {/* Laporan Guru Tersertifikasi */}
              <div className="dos-report-card">
                <div className="dos-report-header">
                  <h3>Laporan Guru Tersertifikasi</h3>
                  <span className="dos-update-date">Update: 30/06/2023</span>
                </div>
                <div className="dos-report-content">
                  <div className="dos-certified-grid">
                    <div className="dos-certified-item">
                      <div className="dos-certified-number">0</div>
                    </div>
                    <div className="dos-certified-item">
                      <div className="dos-certified-number">0</div>
                    </div>
                    <div className="dos-certified-item">
                      <div className="dos-certified-number">0</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laporan Mesa Pensiun */}
              <div className="dos-report-card">
                <div className="dos-report-header">
                  <h3>Laporan Mesa Pensiun</h3>
                  <span className="dos-update-date">Update: 30/06/2023</span>
                </div>
                <div className="dos-report-content">
                  <div className="dos-pension-list">
                    <div className="dos-pension-item">Drs. Surzene, M.Vel</div>
                    <div className="dos-pension-item">Drs. Endereg Sultryaniogah</div>
                    <div className="dos-pension-item">Drs. Eumberg Hemnesen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Joint Laporan Error */}
          <div className="dos-section">
            <div className="dos-error-report">
              <h3 className="dos-error-title">Joint Laporan Error</h3>
              <div className="dos-error-content">
                <div className="dos-error-item">
                  <strong>Laporan Masa Pensiun</strong>
                  <div className="dos-error-dates">
                    <span>Update: 30/06/2023</span>
                    <span>Up/06/2023</span>
                    <span>Not/06/2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}