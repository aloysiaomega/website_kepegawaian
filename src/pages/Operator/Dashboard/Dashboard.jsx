import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
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
  FaCheckCircle,
  FaTimes,
  FaExclamationTriangle,
  FaEye,
  FaTrash,
  FaUser,
  FaCalendar,
  FaMapMarkerAlt,
  FaVenusMars,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaSchool,
  FaChalkboardTeacher,
  FaIdCard,
  FaBriefcase,
  FaHistory
} from 'react-icons/fa'
import './Dashboard.css'

const SUMMARY = {
  totalGuru: { label: 'Total Guru', value: '42 Guru', meta: '25 PNS, 10 P3K, 7 Honorer' },
  mapel: { label: 'Total Mapel', value: '12 Mapel', meta: '' },
  akanPensiun: { label: 'Guru Akan Pensiun', value: '3 Guru', meta: '2 PNS, 1 P3K' }
}

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
    sekolah: 'SMK N 2 Sukoharjo',
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

// Data guru pensiun
const PENSION_TEACHERS = [
  { 
    id: 1, 
    nama: 'Drs. Sutrisno, M.Pd', 
    nip: '196701201988073002', 
    mapel: ['Matematika', 'Fisika'], 
    jam: '18 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Veteran No. 45, Sukoharjo',
    jenisKelamin: 'Laki-laki',
    tglPensiun: '2026-10-12',
    tglBergabung: '1988-07-01',
    ttl: 'Sukoharjo, 20 Januari 1967',
    email: 'sutrisno@sekolah.example',
    telepon: '081234567893',
    pendidikan: 'S2 Pendidikan Matematika',
    sekolah: 'SMK N 2 Sukoharjo'
  },
  { 
    id: 2, 
    nama: 'Dra. Endang Sulastri, M.Pd', 
    nip: '196703241988032003', 
    mapel: ['Bahasa Indonesia', 'Sastra'], 
    jam: '20 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Merdeka No. 12, Sukoharjo',
    jenisKelamin: 'Perempuan',
    tglPensiun: '2026-10-12',
    tglBergabung: '1988-03-01',
    ttl: 'Sukoharjo, 24 Maret 1967',
    email: 'endang@sekolah.example',
    telepon: '081234567894',
    pendidikan: 'S2 Pendidikan Bahasa Indonesia',
    sekolah: 'SMK N 2 Sukoharjo'
  },
  { 
    id: 3, 
    nama: 'Drs. Bambang Hermawan', 
    nip: '196704101988031002', 
    mapel: ['Sejarah', 'PPKn'], 
    jam: '22 Jam', 
    status: 'PNS', 
    alamat: 'Jl. Diponegoro No. 78, Sukoharjo',
    jenisKelamin: 'Laki-laki',
    tglPensiun: '2026-10-12',
    tglBergabung: '1988-03-01',
    ttl: 'Sukoharjo, 10 April 1967',
    email: 'bambang@sekolah.example',
    telepon: '081234567895',
    pendidikan: 'S1 Pendidikan Sejarah',
    sekolah: 'SMK N 2 Sukoharjo'
  }
]

// Komponen GuruActions yang disederhanakan tanpa modal konfirmasi
const GuruActions = ({ guru, onDelete, onView, showDelete = true }) => {
  return (
    <div className="actions-inline">
      <button 
        className="action-btn view" 
        title="Lihat Detail"
        onClick={() => onView(guru)}
      >
        <FaEye />
      </button>
      {showDelete && (
        <button 
          className="action-btn danger" 
          title="Hapus Data"
          onClick={() => onDelete(guru)}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default function DashboardOperator() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMapel, setSelectedMapel] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showPensiunDetailModal, setShowPensiunDetailModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', message: '' })
  const [guruToDelete, setGuruToDelete] = useState(null)
  const [guruToView, setGuruToView] = useState(null)
  const [guruPensiunToView, setGuruPensiunToView] = useState(null)
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
  
  // Fungsi untuk menampilkan modal info
  const showAlert = (title, message) => {
    setModalContent({ title, message })
    setShowModal(true)
  }

  // Fungsi untuk menampilkan modal konfirmasi hapus
  const showDeleteConfirmation = (guru) => {
    setGuruToDelete(guru)
    setShowDeleteModal(true)
  }

  // Fungsi untuk menampilkan modal detail guru
  const showDetailGuru = (guru) => {
    setGuruToView(guru)
    setShowDetailModal(true)
  }

  // Fungsi untuk menampilkan modal detail guru pensiun
  const showDetailPensiun = (guru) => {
    setGuruPensiunToView(guru)
    setShowPensiunDetailModal(true)
  }

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setGuruToDelete(null)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setGuruToView(null)
  }

  const closePensiunDetailModal = () => {
    setShowPensiunDetailModal(false)
    setGuruPensiunToView(null)
  }

  // Fungsi untuk navigasi ke halaman tambah guru
  const handleAdd = () => {
    navigate('/operator/data-guru/tambah-guru');
  };
  
  const handlePrint = () => showAlert('Cetak Data', 'Fitur cetak data guru sedang dalam pengembangan.')
  const handleDownload = () => showAlert('Download Data', 'Fitur download data guru sedang dalam pengembangan.')
  
  // Fungsi untuk menangani pensiun guru (bukan delete)
  const handlePensiun = (id) => {
    showAlert('Proses Pensiun', `Guru dengan ID ${id} berhasil diproses untuk pensiun.`)
    console.log(`Proses pensiun untuk guru id: ${id}`);
    closeDeleteModal()
  }

  // Fungsi untuk konfirmasi hapus
  const confirmDelete = () => {
    if (guruToDelete) {
      handlePensiun(guruToDelete.id)
    }
  }

  // Fungsi untuk quick actions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'lihat-semua-pensiun':
        showAlert('Guru Akan Pensiun', 'Fitur lihat semua guru akan pensiun sedang dalam pengembangan.')
        break
      case 'lihat-semua-aktivitas':
        showAlert('Aktivitas', 'Fitur lihat semua aktivitas sedang dalam pengembangan.')
        break
      default:
        showAlert('Info', 'Fitur sedang dalam pengembangan.')
    }
  }

  // Komponen Modal Detail Guru
  const DetailGuruModal = (id) => {
    navigate('/operator/data-guru/view/${id}');
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
                    <GuruActions 
                      guru={t} 
                      onDelete={showDeleteConfirmation}
                      onView={showDetailGuru}
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
          {/* Retirement Section */}
          <div className="retirement-section">
            <div className="retirement-panel">
              <div className="retirement-header">
                <h3>Guru Akan Pensiun (3 Tahun)</h3>
                <button className="link-btn" onClick={() => handleQuickAction('lihat-semua-pensiun')}>Lihat Semua</button>
              </div>

              <div className="table-wrap">
                <table className="data-table">
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
                    {PENSION_TEACHERS.map((r, i) => (
                      <tr key={r.id}>
                        <td>{i + 1}</td>
                        <td className="ret-name">{r.nama}</td>
                        <td className="ret-nip">{r.nip}</td>
                        <td>{r.jabatan}</td>
                        <td>
                          {new Date(r.tglPensiun).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="actions-cell">
                          <GuruActions 
                            guru={r} 
                            onDelete={showDeleteConfirmation}
                            onView={showDetailPensiun}
                            showDelete={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Custom Modal untuk Info */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container info-modal">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-icon">
              <FaExclamationCircle />
            </div>
            <div className="modal-content">
              <h3>{modalContent.title}</h3>
              <p>{modalContent.message}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-primary" onClick={closeModal}>
                Oke
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-container delete-modal">
            <button className="modal-close" onClick={closeDeleteModal}>
              <FaTimes />
            </button>
            <div className="modal-icon">
              <FaExclamationTriangle />
            </div>
            <div className="modal-content">
              <h3>Konfirmasi Proses Pensiun</h3>
              <p>Apakah Anda yakin ingin memproses pensiun untuk guru <strong>{guruToDelete?.nama}</strong>?</p>
              <p className="modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-secondary" onClick={closeDeleteModal}>
                Batal
              </button>
              <button className="btn-modal-danger" onClick={confirmDelete}>
                Ya, Proses Pensiun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Guru Biasa */}
      {showDetailModal && (
        <DetailGuruModal 
          guru={guruToView} 
          onClose={closeDetailModal}
          isPensiun={false}
        />
      )}

      {/* Modal Detail Guru Pensiun */}
      {showPensiunDetailModal && (
        <DetailGuruModal 
          guru={guruPensiunToView} 
          onClose={closePensiunDetailModal}
          isPensiun={true}
        />
      )}
    </div>
  )
}