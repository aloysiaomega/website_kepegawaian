import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaGraduationCap } from "react-icons/fa"
import "./login.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [nidn, setNidn] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Kredensial mock hanya untuk dua role: operator sekolah dan admin cabdin
  const validUsers = [
    { nidn: "admin", password: "admin123", role: "admin_cabdin" },
    { nidn: "123456456", password: "op2025", role: "operator_sekolah" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!nidn || !password) {
      setError("Username dan Password wajib diisi.")
      return
    }

    setLoading(true)

    setTimeout(() => {
      const found = validUsers.find(
        (u) => u.nidn === nidn.trim() && u.password === password
      )

      if (!found) {
        setError("Username atau password salah.")
        setLoading(false)
        return
      }

      // Simpan session sederhana termasuk role
      try {
        localStorage.setItem(
          "sessionUser",
          JSON.stringify({ nidn: found.nidn, role: found.role })
        )
      } catch (err) {}

      setLoading(false)

      // Arahkan berdasarkan role (ubah route bila diperlukan)
      if (found.role === "admin_cabdin") {
        navigate("/dashboard", { replace: true })
      } else if (found.role === "operator_sekolah") {
        navigate("/dashboard", { replace: true })
      // } else {
      //   navigate("/dashboard", { replace: true })
      }
    }, 600)
  }

  return (
    <div className="login-page">
      <div className="login-info">
        <h1>Cabang Dinas</h1>
        <h1>Pendidikan Wilayah VII</h1>
        <p>Jl. Slamet Riyadi No. 1</p>
        <p>Kauman, Kecamatan Pasar Kliwon, Kota Surakarta</p>
        <p>57112</p>
      </div>

      <div className="login-card-container">
        <div className="login-card">
          <FaGraduationCap className="login-icon" />

          <h2>SELAMAT DATANG</h2>
          <p className="subtext">
            Sistem Informasi Data Guru Cabang Dinas Pendidikan Wilayah VII
            Surakarta
          </p>

          {error && <div className="login-error" role="alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nidn">Username</label>
              <input
                id="nidn"
                type="text"
                placeholder="Masukan Username"
                value={nidn}
                onChange={(e) => setNidn(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" /> Ingatkan saya
              </label>
              {/* <a href="#" className="forgot">Lupa password ?</a> */}
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Memproses..." : "MASUK"}
            </button>
          </form>

          {/* <p className="help-text">Butuh bantuan? Hubungi Admin</p>
          <p>(0271) 651-412</p> */}
        </div>
      </div>
    </div>
  )
}
