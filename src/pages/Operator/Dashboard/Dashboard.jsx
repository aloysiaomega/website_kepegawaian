import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../Sidebar/Sidebar';
import GuruActions from './GuruActions'; // Import komponen GuruActions
import {
  FaUserFriends,
  FaExclamationCircle,
  FaCertificate,
  FaClock,
  FaPlus,
  FaPrint,
  FaDownload,
  FaFileUpload,
  FaFileAlt,
  FaUserPlus,
  FaCheckCircle
} from 'react-icons/fa'
import './Dashboard.css'

const SUMMARY = {
  totalGuru: { label: 'Total Guru', value: '42 Guru', meta: '25 PNS, 10 P3K, 7 Honorer' },
  mapel: { label: 'Total Mapel', value: '12 Mapel', meta: '' },
  akanPensiun: { label: 'Guru Akan Pensiun', value: '3 Guru', meta: '2 PNS, 1 P3K' }
}

// Data guru yang diperbarui dengan field tambahan untuk GuruActions
const TEACHERS = [
  { 
    id: 1, 
    nama: 'Ahmad Darmawan, S.Pd', 
    nip: '196512301990031002', 
    mapel: ['Matematika','IPA'], 
    jam: '25 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Pelan, Surakarta',
    jenisKelamin: 'Laki-laki',
    tglPensiun: '2028-10-10',
    tglBergabung: '1990-03-01',
    ttl: 'Surakarta, 30 Desember 1965',
    email: 'ahmad.darmawan@sekolah.example',
    telepon: '081234567890',
    pendidikan: 'S1 Pendidikan Matematika',
    sekolah: 'SMK N 2 Sukoharjo'
  },
  { 
    id: 2, 
    nama: 'Budi Santoso, S.Pd', 
    nip: '197004101998031002', 
    mapel: ['Bahasa Indonesia','PKK Prakarya Wirausaha'], 
    jam: '30 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Santai, Sukoharjo',
    jenisKelamin: 'Laki-laki',
    tglPensiun: '2030-04-10',
    tglBergabung: '1998-03-01',
    ttl: 'Sukoharjo, 10 April 1970',
    email: 'budi.santoso@sekolah.example',
    telepon: '081234567891',
    pendidikan: 'S1 Pendidikan Bahasa Indonesia',
    sekolah: 'SMK N 2 Sukoharjo'
  },
  { 
    id: 3, 
    nama: 'Eko Baharjo, S.Pd', 
    nip: '197512301999031002', 
    mapel: ['Seni Budaya'], 
    jam: '20 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Sehat, Surakarta',
    jenisKelamin: 'Laki-laki',
    tglPensiun: '2035-12-30',
    tglBergabung: '1999-03-01',
    ttl: 'Surakarta, 30 Desember 1975',
    email: 'eko.baharjo@sekolah.example',
    telepon: '081234567892',
    pendidikan: 'S1 Pendidikan Seni',
    sekolah: 'SMK N 2 Sukoharjo'
  }
]

export default function DashboardOperator() {
  const navigate = useNavigate(); // Deklarasi useNavigate
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMapel, setSelectedMapel] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const mapelOptions = useMemo(() => {
    const all = new Set()
    TEACHERS.forEach(t => t.mapel.forEach(m => all.add(m)))
    return ['all', ...Array.from(all)]
  }, [])

  const statusOptions = useMemo(() => ['all','PNS','P3K','P3K Paruh Waktu'], [])

  const filtered = useMemo(() => {
    return TEACHERS.filter(t => {
      if (selectedMapel !== 'all' && !t.mapel.includes(selectedMapel)) return false
      if (selectedStatus !== 'all' && t.status !== selectedStatus) return false
      if (query && !(`${t.nama} ${t.nip} ${t.mapel.join(' ')}`).toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [selectedMapel, selectedStatus, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const handleToggle = () => setCollapsed(s => !s)
  
  // Fungsi untuk navigasi ke halaman tambah guru
  const handleAdd = () => {
    navigate('/operator/data-guru/tambah-guru');
  };
  
  const handlePrint = () => alert('Cetak (mock)')
  const handleDownload = () => alert('Download (mock)')
  
  // Fungsi untuk menangani pensiun guru (bukan delete)
  const handlePensiun = (id) => {
    // Di sini Anda bisa implementasi logika untuk menandai guru sebagai pensiun
    // Misalnya: update status guru di database
    alert(`Guru dengan id=${id} akan diproses untuk pensiun (mock)`);
    console.log(`Proses pensiun untuk guru id: ${id}`);
  }

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />

      <main className={`dashboard-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="dashboard-header">
          <div>
            <h1>Dashboard Operator Sekolah</h1>
            <div className="school-name">SMK N 2 Sukoharjo</div>
          </div>

          <div className="header-actions">
            <button className="btn-primary" onClick={handleAdd}>
              <FaPlus className="btn-icon-left" />
              Tambah Guru
            </button>
          </div>
        </header>

        <section className="summary-cards">
          <article className="card">
            <div className="card-icon card-icon-purple"><FaUserFriends /></div>
            <div className="card-body">
              <div className="card-label">{SUMMARY.totalGuru.label}</div>
              <div className="card-value">{SUMMARY.totalGuru.value}</div>
            </div>
          </article>

          <article className="card">
            <div className="card-icon card-icon-purple"><FaCertificate /></div>
            <div className="card-body">
              <div className="card-label">{SUMMARY.mapel.label}</div>
              <div className="card-value">{SUMMARY.mapel.value}</div>
            </div>
          </article>

          <article className="card">
            <div className="card-icon card-icon-purple"><FaClock /></div>
            <div className="card-body">
              <div className="card-label">{SUMMARY.akanPensiun.label}</div>
              <div className="card-value">{SUMMARY.akanPensiun.value}</div>
            </div>
          </article>
        </section>

        <section className="filters">
          <div className="filter-row">
            <select value={selectedMapel} onChange={e => { setSelectedMapel(e.target.value); setPage(1) }}>
              {mapelOptions.map(m => <option key={m} value={m}>{m === 'all' ? 'Semua Mata Pelajaran' : m}</option>)}
            </select>

            <select value={selectedStatus} onChange={e => { setSelectedStatus(e.target.value); setPage(1) }}>
              {statusOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'Semua Status' : s}</option>)}
            </select>

            <div className="search-wrapper">
              <input placeholder="Cari Nama / NIP Guru" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} />
            </div>
          </div>
        </section>

        <section className="table-section">
          <div className="table-header">
            <h2>Data Guru Berdasarkan Mapel</h2>
            <div className="table-actions">
              <button className="btn-ghost" onClick={handlePrint}><FaPrint /> Cetak</button>
              <button className="btn-ghost" onClick={handleDownload}><FaDownload /> Download</button>
            </div>
          </div>

         <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Guru</th>
                <th>Mata Pelajaran</th>
                <th>Jam Mengajar</th>
                <th>Status</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 && (
                <tr><td colSpan="7" className="no-data">Tidak ada data</td></tr>
              )}

              {pageItems.map((t, idx) => (
                <tr key={t.id}>
                  <td>{(page - 1) * perPage + idx + 1}</td>

                  <td>
                    <div className="teacher-name">{t.nama}</div>
                    <div className="teacher-nip">NIP: {t.nip}</div>
                  </td>

                  <td>
                    <div className="badges">
                      {t.mapel.map(m => <span key={m} className="badge">{m}</span>)}
                    </div>
                  </td>

                  <td>{t.jam}</td>

                  <td>
                    <span className={`status-pill status-${t.status.toLowerCase()}`}>
                      {t.status}
                    </span>
                  </td>

                  <td>{t.alamat}</td>
                  
                  <td className="actions-cell">
                    {/* Gunakan GuruActions untuk view dan pensiun */}
                    <GuruActions 
                      guru={t} 
                      onDelete={handlePensiun} 
                      showDelete={true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Sebelumnya</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} className={`page-num ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Selanjutnya</button>
          </div>
        </section>

        <section className="below-panel">
          <div className="quick-actions">
            <button className="quick-btn" onClick={handleAdd}>
              <FaPlus className="qa-icon" />
              <div className="qa-label">Tambah Guru</div>
            </button>

            <button className="quick-btn" onClick={() => navigate('/operator/dokumen/upload')}>
              <FaFileUpload className="qa-icon"/>
              <div className="qa-label">Upload Dokumen</div>
              </button>

            <button className="quick-btn" onClick={() => alert('Lihat laporan (mock)')}>
              <FaFileAlt className="qa-icon" />
              <div className="qa-label">Usul Perubahan Data</div>
            </button>
          </div>

          {/* Retirement Section */}
          <div className="retirement-section">
            <div className="retirement-panel">
              <div className="retirement-header">
                <h3>Guru Akan Pensiun (3 Tahun)</h3>
                <button className="link-btn" onClick={() => alert('Lihat semua (mock)')}>Lihat Semua</button>
              </div>

              <div className="retirement-table-wrap">
                <table className="retirement-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>NIP</th>
                      <th>Jabatan</th>
                      <th>Tanggal Pensiun</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        id:1, 
                        nama:'Drs. Sutrisno, M.Pd', 
                        nip:'196701201988073002', 
                        jab:'Guru Senior', 
                        tgl:'12/10/2026',
                        tglPensiun: '2026-10-12',
                        status: 'PNS',
                        jenisKelamin: 'Laki-laki',
                        tglBergabung: '1988-07-01',
                        ttl: 'Sukoharjo, 20 Januari 1967',
                        email: 'sutrisno@sekolah.example',
                        telepon: '081234567893',
                        pendidikan: 'S2 Pendidikan',
                        sekolah: 'SMK N 2 Sukoharjo'
                      },
                      { 
                        id:2, 
                        nama:'Dra. Endang Sulastri, M.Pd', 
                        nip:'196703241988032003', 
                        jab:'Guru Ahli Muda', 
                        tgl:'12/10/2026',
                        tglPensiun: '2026-10-12',
                        status: 'PNS',
                        jenisKelamin: 'Perempuan',
                        tglBergabug: '1988-03-01',
                        ttl: 'Sukoharjo, 24 Maret 1967',
                        email: 'endang@sekolah.example',
                        telepon: '081234567894',
                        pendidikan: 'S2 Pendidikan',
                        sekolah: 'SMK N 2 Sukoharjo'
                      },
                      { 
                        id:3, 
                        nama:'Drs. Bambang Hermawan', 
                        nip:'196704101988031002', 
                        jab:'Wakil Kepala Sekolah', 
                        tgl:'12/10/2026',
                        tglPensiun: '2026-10-12',
                        status: 'PNS',
                        jenisKelamin: 'Laki-laki',
                        tglBergabung: '1988-03-01',
                        ttl: 'Sukoharjo, 10 April 1967',
                        email: 'bambang@sekolah.example',
                        telepon: '081234567895',
                        pendidikan: 'S1 Pendidikan',
                        sekolah: 'SMK N 2 Sukoharjo'
                      }
                    ].map((r, i) => (
                      <tr key={r.id}>
                        <td>{i + 1}</td>
                        <td className="ret-name">{r.nama}</td>
                        <td className="ret-nip">{r.nip}</td>
                        <td>{r.jab}</td>
                        <td>{r.tgl}</td>
                        <td className="actions-cell">
                          {/* Untuk guru pensiun, kita sembunyikan tombol delete */}
                          <GuruActions 
                            guru={r} 
                            onDelete={handlePensiun}
                            showDelete={false} // Tidak tampilkan delete untuk guru pensiun
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activities Panel */}
          <section className="activities-panel">
            <div className="activities-header">
              <h3>Aktivitas terbaru</h3>
              <button className="link-btn" onClick={() => alert('Lihat semua (mock)')}>Lihat Semua</button>
            </div>

            <div className="activities-list">
              {[
                { id: 1, icon: <FaExclamationCircle />, color: 'red', text: 'Pengajuan perubahan data golongan', time: '2 hari yang lalu' },
                { id: 2, icon: <FaUserPlus />, color: 'blue', text: 'Data guru baru ditambahkan: Siti Rahayu, S.Pd', time: '4 hari yang lalu' },
                { id: 3, icon: <FaCheckCircle />, color: 'green', text: 'Dokumen sertifikasi telah diverifikasi', time: '6 hari yang lalu' },
                { id: 4, icon: <FaFileUpload />, color: 'green', text: 'Dokumen diunggah', time: '7 hari yang lalu' }
              ].map(a => (
                <div className="activity-item" key={a.id}>
                  <div className={`activity-icon activity-icon-${a.color}`}>
                    {a.icon}
                  </div>
                  <div className="activity-body">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}