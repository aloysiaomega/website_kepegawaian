// src/pages/Operator/Dashboard/GuruActions.jsx
import React, { useState } from 'react'
import {
  FaEye,
  FaTrashAlt,
  FaTimes,
  FaPrint,
  FaDownload
} from 'react-icons/fa'
import './GuruActions.css'

export default function GuruActions({ guru = {}, onDelete, showDelete = true }) {
  const [openDetail, setOpenDetail] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleView = () => setOpenDetail(true)
  const handleClose = () => setOpenDetail(false)

  const handleDeleteClick = () => setConfirmOpen(true)
  const handleCancelDelete = () => setConfirmOpen(false)
  const handleConfirmDelete = () => {
    setConfirmOpen(false)
    if (typeof onDelete === 'function') onDelete(guru?.id)
  }

  return (
    <>
      <div className="actions-inline">
        <button
          className="action-btn view"
          title="Lihat"
          onClick={handleView}
          type="button"
        >
          <FaEye />
        </button>

        {showDelete && (
          <button
            className="action-btn danger"
            title="Hapus"
            onClick={handleDeleteClick}
            type="button"
          >
            <FaTrashAlt />
          </button>
        )}
      </div>

      {openDetail && (
        <div className="ga-modal-backdrop" role="dialog" aria-modal="true">
          <div className="ga-modal">
            <header className="ga-modal-header">
              <h2>Detail Guru</h2>
              <button className="ga-icon-btn" onClick={handleClose} aria-label="Tutup" type="button">
                <FaTimes />
              </button>
            </header>

            <div className="ga-modal-body">
              <div className="ga-grid">
                <div className="ga-row">
                  <div className="ga-label">Nama Lengkap</div>
                  <div className="ga-value">{guru?.nama || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Jenis Kelamin</div>
                  <div className="ga-value">{guru?.jenisKelamin || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">NIP</div>
                  <div className="ga-value">{guru?.nip || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Tanggal Pensiun</div>
                  <div className="ga-value">{guru?.tglPensiun || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Status Kepegawaian</div>
                  <div className="ga-value">{guru?.status || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Tanggal Bergabung</div>
                  <div className="ga-value">{guru?.tglBergabung || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Tempat Tanggal Lahir</div>
                  <div className="ga-value">{guru?.ttl || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">E-mail</div>
                  <div className="ga-value">{guru?.email || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Telepon</div>
                  <div className="ga-value">{guru?.telepon || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Pendidikan Terakhir</div>
                  <div className="ga-value">{guru?.pendidikan || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Mata Pelajaran yang Diampu</div>
                  <div className="ga-value">{(guru?.mapel || []).join(', ') || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Jam Mengajar</div>
                  <div className="ga-value">{guru?.jam || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Alamat</div>
                  <div className="ga-value">{guru?.alamat || '—'}</div>
                </div>

                <div className="ga-row">
                  <div className="ga-label">Sekolah</div>
                  <div className="ga-value">{guru?.sekolah || '—'}</div>
                </div>
              </div>
            </div>

            <footer className="ga-modal-footer">
              <div className="ga-footer-left">
                {/* <button className="btn-ghost" onClick={handleClose} type="button">Tutup</button> */}
              </div>
              <div className="ga-footer-right">
                <button className="btn-ghost" onClick={() => window.print()} type="button"><FaPrint /> Cetak Biodata</button>
                <button className="btn-primary" onClick={() => alert('Unduh PDF (mock)')} type="button"><FaDownload /> Unduh PDF</button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="ga-modal-backdrop" role="dialog" aria-modal="true">
          <div className="ga-confirm">
            <header className="ga-confirm-header">
              <h3>Konfirmasi Hapus</h3>
            </header>
            <div className="ga-confirm-body">
              <p>Anda yakin ingin menghapus data <strong>{guru?.nama || '—'}</strong>?</p>
              <p>Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <footer className="ga-confirm-footer">
              <button className="btn-ghost" onClick={handleCancelDelete} type="button">Batal</button>
              <button className="btn-primary" onClick={handleConfirmDelete} type="button">Ya, Hapus</button>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
