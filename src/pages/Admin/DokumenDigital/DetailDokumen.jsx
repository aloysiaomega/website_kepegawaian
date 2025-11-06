import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/SidebarA";
import "./DetailDokumen.css";

export default function DetailDokumen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [collapsed, setCollapsed] = React.useState(false);
  const [namaSekolah, setNamaSekolah] = React.useState("");

  // Data dummy - biasanya dari API berdasarkan ID
  const [dokumenData] = React.useState({
    id: id,
    nama_file: "Sertifikasi Guru 2025.pdf",
    guru: "Ahmad Darmawan, S.Pd",
    sekolah: "SMK N 1 Surakarta",
    jenis: "Sertifikasi",
    tanggal_upload: "20 Juni 2025",
    status: "Terverifikasi",
    diupload_oleh: "Operator Sekolah"
  });

  // Ambil nama sekolah dari localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.sekolah) {
          setNamaSekolah(user.sekolah.nama_sekolah);
        } else {
          setNamaSekolah("SMK N 1 Surakarta");
        }
      } catch (error) {
        setNamaSekolah("SMK N 1 Surakarta");
      }
    } else {
      setNamaSekolah("SMK N 1 Surakarta");
    }
  }, []);

  const handleToggleSidebar = () => setCollapsed(prev => !prev);

  const handleCancel = () => {
    navigate("/admin-cabdin/dokumen-digital");
  };

  const handlePrint = () => {
    // Logika untuk cetak biodata
    console.log("Cetak biodata dokumen:", dokumenData);
    window.print();
  };

  const handleDownload = () => {
    // Logika untuk unduh PDF
    console.log("Unduh dokumen:", dokumenData.nama_file);
    // Simulasi download
    const link = document.createElement('a');
    link.href = '#';
    link.download = dokumenData.nama_file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="detail-dokumen-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      <main className="detail-dokumen-main">
        {/* Header */}
        <header className="detail-dokumen-header">
          <div className="detail-dokumen-header-left">
            <button className="detail-dokumen-back-btn" onClick={handleCancel}>
              <i className="fas fa-arrow-left"></i>
              Kembali
            </button>
            <div className="detail-dokumen-title-section">
              <h1>Preview Dokumen</h1>
              <div className="detail-dokumen-subtitle">{namaSekolah}</div>
            </div>
          </div>
        </header>

        <div className="detail-dokumen-content">
          {/* Nama File */}
          <div className="dokumen-header">
            <h2>{dokumenData.nama_file}</h2>
          </div>

          {/* Detail Informasi */}
          <div className="dokumen-detail-card">
            <div className="detail-grid">
              <div className="detail-row">
                <span className="detail-label">Guru</span>
                <span className="detail-separator">:</span>
                <span className="detail-value">{dokumenData.guru}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sekolah</span>
                <span className="detail-separator">:</span>
                <span className="detail-value">{dokumenData.sekolah}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Jenis</span>
                <span className="detail-separator">:</span>
                <span className="detail-value">{dokumenData.jenis}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tanggal Upload</span>
                <span className="detail-separator">:</span>
                <span className="detail-value">{dokumenData.tanggal_upload}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="detail-separator">:</span>
                <span className={`detail-value status-${dokumenData.status.toLowerCase()}`}>
                  {dokumenData.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Diupload Oleh</span>
                <span className="detail-separator">:</span>
                <span className="detail-value">{dokumenData.diupload_oleh}</span>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="preview-section">
            <div className="preview-placeholder">
              <i className="fas fa-file-pdf"></i>
              <p>Preview dokumen akan ditampilkan di sini</p>
              <small>Format: PDF, Size: 2.5 MB</small>
            </div>
          </div>

          {/* Garis Pemisah */}
          <div className="form-divider"></div>

          {/* Tombol Aksi */}
          <div className="detail-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Batal
            </button>
            <button type="button" className="btn-secondary" onClick={handlePrint}>
              <i className="fas fa-print"></i>
              Cetak Dokumen
            </button>
            <button type="button" className="btn-primary" onClick={handleDownload}>
              <i className="fas fa-download"></i>
              Unduh PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}