import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./TambahGuru.css";

export default function TambahGuru() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [namaSekolah, setNamaSekolah] = useState("");
  const [message, setMessage] = useState("");

  // Data dummy mata pelajaran
  const [mapelOptions] = useState([
    { id: 1, nama_mapel: "Matematika" },
    { id: 2, nama_mapel: "Bahasa Indonesia" },
    { id: 3, nama_mapel: "Bahasa Inggris" },
    { id: 4, nama_mapel: "IPA" },
    { id: 5, nama_mapel: "IPS" },
    { id: 6, nama_mapel: "Seni Budaya" },
    { id: 7, nama_mapel: "PJOK" },
    { id: 8, nama_mapel: "Pendidikan Agama" },
    { id: 9, nama_mapel: "PKN" },
    { id: 10, nama_mapel: "Teknologi Informasi" },
    { id: 11, nama_mapel: "Bahasa Jawa" },
    { id: 12, nama_mapel: "Sejarah" }
  ]);

  const [form, setForm] = useState({
    nip: "",
    nama_lengkap: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    status_kepegawaian: "",
    pendidikan_terakhir: "",
    telepon: "",
    email: "",
    alamat: "",
    tanggal_bergabung: "",
    tanggal_pensiun: "",
    mapel_id: [],
  });

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

  // Hitung tanggal pensiun otomatis (umur 60)
  useEffect(() => {
    if (form.tanggal_lahir) {
      const lahir = new Date(form.tanggal_lahir);
      lahir.setFullYear(lahir.getFullYear() + 60);
      setForm(prev => ({ 
        ...prev, 
        tanggal_pensiun: lahir.toISOString().split("T")[0] 
      }));
    }
  }, [form.tanggal_lahir]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (mapelId) => {
    setForm(prevForm => {
      const currentMapelIds = prevForm.mapel_id;
      if (currentMapelIds.includes(mapelId)) {
        return {
          ...prevForm,
          mapel_id: currentMapelIds.filter(id => id !== mapelId)
        };
      } else {
        return {
          ...prevForm,
          mapel_id: [...currentMapelIds, mapelId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulasi API call
      console.log("Data yang dikirim:", form);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Guru berhasil ditambahkan!");
      navigate("/dataguru");
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat menambah guru");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Batalkan tambah guru? Data yang sudah diisi akan hilang.")) {
      navigate("/dataguru");
    }
  };

  const handleToggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className="tambah-guru-app">
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      <main className="tambah-guru-main">
        {/* Header */}
        <header className="tambah-guru-header">
          <div className="tambah-guru-header-left">
            <button className="tambah-guru-back-btn" onClick={() => navigate("/dataguru")}>
              <i className="fas fa-arrow-left"></i>
              Kembali
            </button>
            <div className="tambah-guru-title-section">
              <h1>Tambah Guru Baru</h1>
              <div className="tambah-guru-subtitle">{namaSekolah}</div>
            </div>
          </div>
        </header>

        <div className="tambah-guru-content">
          {message && (
            <div className="tambah-guru-message">
              <i className="fas fa-exclamation-circle"></i>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Section 1: Data Pribadi */}
            <div className="tambah-guru-section">
              <h2>Data Pribadi</h2>
              <div className="tambah-guru-grid">
                {/* NIP */}
                <div className="tambah-guru-field">
                  <label>NIP</label>
                  <input
                    type="text"
                    name="nip"
                    value={form.nip}
                    onChange={handleChange}
                    required
                    pattern="\d{18}"
                    title="NIP harus 18 digit angka"
                    placeholder="Masukkan 18 digit NIP"
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="tambah-guru-field">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap guru"
                  />
                </div>

                {/* Tempat Lahir */}
                <div className="tambah-guru-field">
                  <label>Tempat Lahir</label>
                  <input
                    name="tempat_lahir"
                    value={form.tempat_lahir}
                    onChange={handleChange}
                    placeholder="Kota tempat lahir"
                  />
                </div>

                {/* Tanggal Lahir */}
                <div className="tambah-guru-field">
                  <label>Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={form.tanggal_lahir}
                    onChange={handleChange}
                  />
                </div>

                {/* Jenis Kelamin */}
                <div className="tambah-guru-field">
                  <label>Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                {/* Telepon */}
                <div className="tambah-guru-field">
                  <label>Telepon</label>
                  <input
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    placeholder="Nomor telepon aktif"
                  />
                </div>

                {/* Email */}
                <div className="tambah-guru-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    required
                    placeholder="alamat.email@sekolah.sch.id"
                  />
                </div>

                {/* Alamat */}
                <div className="tambah-guru-field" style={{gridColumn: "1 / -1"}}>
                  <label>Alamat Lengkap</label>
                  <textarea
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    placeholder="Alamat tempat tinggal lengkap"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Data Profesional */}
            <div className="tambah-guru-section">
              <h2>Data Profesional</h2>
              <div className="tambah-guru-grid">
                {/* Status Kepegawaian */}
                <div className="tambah-guru-field">
                  <label>Status Kepegawaian</label>
                  <select
                    name="status_kepegawaian"
                    value={form.status_kepegawaian}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="pns">PNS</option>
                    <option value="p3k">PPPK</option>
                    <option value="p3k_paruh_waktu">PPPK Paruh Waktu</option>
                    <option value="gty">Guru Tetap Yayasan</option>
                    <option value="gh">Guru Honorer</option>
                  </select>
                </div>

                {/* Pendidikan Terakhir */}
                <div className="tambah-guru-field">
                  <label>Pendidikan Terakhir</label>
                  <select
                    name="pendidikan_terakhir"
                    value={form.pendidikan_terakhir}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Pendidikan --</option>
                    <option value="S3">S3 (Doktor)</option>
                    <option value="S2">S2 (Magister)</option>
                    <option value="S1">S1 (Sarjana)</option>
                    <option value="D4">D4</option>
                    <option value="D3">D3 (Diploma)</option>
                    <option value="SMA">SMA/Sederajat</option>
                  </select>
                </div>

                {/* Tanggal Bergabung */}
                <div className="tambah-guru-field">
                  <label>Tanggal Bergabung</label>
                  <input
                    type="date"
                    name="tanggal_bergabung"
                    value={form.tanggal_bergabung}
                    onChange={handleChange}
                  />
                </div>

                {/* Tanggal Pensiun */}
                <div className="tambah-guru-field">
                  <label>Tanggal Pensiun</label>
                  <input
                    type="date"
                    name="tanggal_pensiun"
                    value={form.tanggal_pensiun}
                    readOnly
                    className="readonly"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Mata Pelajaran */}
            <div className="tambah-guru-section">
              <h2>Mata Pelajaran yang Diampu</h2>
              <div className="tambah-guru-mapel-grid">
                {mapelOptions.map((mapel) => (
                  <label key={mapel.id} className="tambah-guru-checkbox">
                    <input
                      type="checkbox"
                      checked={form.mapel_id.includes(mapel.id)}
                      onChange={() => handleCheckboxChange(mapel.id)}
                    />
                    <span className="checkmark"></span>
                    {mapel.nama_mapel}
                  </label>
                ))}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="tambah-guru-actions">
              <button type="button" className="btn-ghost" onClick={handleCancel}>
                <i className="fas fa-times"></i>
                Batal
              </button>
              <button type="submit" className="btn-primary">
                <i className="fas fa-save"></i>
                Simpan Data Guru
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}