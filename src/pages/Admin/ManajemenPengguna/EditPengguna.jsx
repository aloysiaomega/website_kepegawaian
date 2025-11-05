import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/SidebarA";
import "./EditPengguna.css";

export default function EditPengguna() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [collapsed, setCollapsed] = useState(false);
  const [namaSekolah, setNamaSekolah] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Data dummy sekolah
  const [sekolahOptions] = useState([
    { id: 1, nama_sekolah: "SDN 01 Jakarta" },
    { id: 2, nama_sekolah: "SDN 02 Jakarta" },
    { id: 3, nama_sekolah: "SDN 03 Jakarta" },
    { id: 4, nama_sekolah: "SDN 04 Jakarta" },
    { id: 5, nama_sekolah: "SDN 05 Jakarta" },
    { id: 6, nama_sekolah: "SDN 06 Jakarta" },
    { id: 7, nama_sekolah: "SDN 07 Jakarta" },
    { id: 8, nama_sekolah: "SDN 08 Jakarta" }
  ]);

  // Data pengguna yang akan diedit (biasanya dari props atau API)
  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    password: "",
    sekolah_id: "",
    status: "aktif"
  });

  // Simulasi data yang diterima dari halaman sebelumnya
  useEffect(() => {
    // Jika ada data yang dikirim via state navigation
    if (location.state && location.state.pengguna) {
      setForm(location.state.pengguna);
    } else {
      // Data dummy untuk contoh
      setForm({
        nama_lengkap: "John Doe",
        username: "johndoe",
        password: "", // Password biasanya tidak ditampilkan
        sekolah_id: "1",
        status: "aktif"
      });
    }
  }, [location.state]);

  // Ambil nama sekolah dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.sekolah) {
          setNamaSekolah(user.sekolah.nama_sekolah);
        } else {
          setNamaSekolah("SDN 01 Contoh Jakarta");
        }
      } catch (error) {
        setNamaSekolah("SDN 01 Contoh Jakarta");
      }
    } else {
      setNamaSekolah("SDN 01 Contoh Jakarta");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validasi form
      if (!form.nama_lengkap || !form.username || !form.sekolah_id || !form.status) {
        setMessage("Semua field wajib diisi!");
        return;
      }

      // Jika password diisi, validasi minimal 8 karakter
      if (form.password && form.password.length < 8) {
        setMessage("Password harus minimal 8 karakter!");
        return;
      }

      // Simulasi API call untuk update
      console.log("Data pengguna yang diupdate:", form);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Tampilkan modal sukses
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat mengupdate pengguna");
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/admin-cabdin/manajemen-pengguna");
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    navigate("/admin-cabdin/manajemen-pengguna");
  };

  const handleCancelDismiss = () => {
    setShowConfirmModal(false);
  };

  const handleToggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className="edit-pengguna-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      <main className="edit-pengguna-main">
        {/* Header */}
        <header className="edit-pengguna-header">
          <div className="edit-pengguna-header-left">
            <button className="edit-pengguna-back-btn" onClick={() => navigate("/admin-cabdin/manajemen-pengguna")}>
              <i className="fas fa-arrow-left"></i>
              Kembali
            </button>
            <div className="edit-pengguna-title-section">
              <h1>Edit Pengguna</h1>
              <div className="edit-pengguna-subtitle">{namaSekolah}</div>
            </div>
          </div>
        </header>

        <div className="edit-pengguna-content-full">
          {message && (
            <div className="edit-pengguna-message">
              <i className="fas fa-exclamation-circle"></i>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="edit-pengguna-form-vertical">
            {/* Section: Data Pengguna */}
            <div className="edit-pengguna-section-full">
              <h2>Data Pengguna</h2>
              
              {/* Nama Lengkap */}
              <div className="form-field-full">
                <label className="form-label-full">
                  Nama Lengkap<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                  required
                  className="form-input-full"
                  placeholder="Masukkan nama lengkap pengguna"
                />
              </div>

              {/* Username */}
              <div className="form-field-full">
                <label className="form-label-full">
                  Username<span className="required">*</span>
                </label>
                <div className="field-description-full">
                  Username akan digunakan untuk login
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="form-input-full"
                  placeholder="Masukkan username untuk login"
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="form-field-full">
                <label className="form-label-full">
                  Password
                </label>
                <div className="field-description-full">
                  Minimal 8 karakter (kosongkan jika tidak ingin mengubah password)
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength="8"
                  className="form-input-full"
                  placeholder="Masukkan password baru"
                  autoComplete="new-password"
                />
              </div>

              {/* Sekolah */}
              <div className="form-field-full">
                <label className="form-label-full">
                  Sekolah<span className="required">*</span>
                </label>
                <select
                  name="sekolah_id"
                  value={form.sekolah_id}
                  onChange={handleChange}
                  required
                  className="form-select-full"
                >
                  <option value="">-- Pilih Sekolah --</option>
                  {sekolahOptions.map((sekolah) => (
                    <option key={sekolah.id} value={sekolah.id}>
                      {sekolah.nama_sekolah}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="form-field-full">
                <label className="form-label-full">
                  Status<span className="required">*</span>
                </label>
                <div className="status-options">
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="aktif"
                      checked={form.status === "aktif"}
                      onChange={handleChange}
                      required
                    />
                    <span className="radio-custom"></span>
                    Aktif
                  </label>
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="tidak-aktif"
                      checked={form.status === "tidak-aktif"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Tidak Aktif
                  </label>
                </div>
              </div>
            </div>

            {/* Garis Pemisah */}
            <div className="form-divider-full"></div>

            {/* Tombol Aksi */}
            <div className="form-actions-full">
              <button type="button" className="btn-cancel-full" onClick={handleCancel}>
                Batal
              </button>
              <button type="submit" className="btn-save-full">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Custom Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-container success-modal">
            <div className="modal-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="modal-content">
              <h3>Berhasil!</h3>
              <p>Data pengguna berhasil diperbarui.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-modal-primary" 
                onClick={handleSuccessConfirm}
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-container confirm-modal">
            <div className="modal-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="modal-content">
              <h3>Konfirmasi Pembatalan</h3>
              <p>Batalkan edit pengguna? Perubahan yang sudah dilakukan akan hilang.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-modal-secondary" 
                onClick={handleCancelDismiss}
              >
                Lanjutkan Edit
              </button>
              <button 
                className="btn-modal-primary" 
                onClick={handleConfirmCancel}
              >
                Ya, Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}