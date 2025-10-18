import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaGraduationCap } from "react-icons/fa"
import "./login.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Kredensial mock untuk dua role
  const validUsers = [
    { 
      username: "admin", 
      password: "admin123", 
      role: "admin_cabdin",
      name: "Admin Cabdin",
      school: "Cabang Dinas Pendidikan Wilayah VII"
    },
    { 
      username: "operator", 
      password: "op2025", 
      role: "operator_sekolah",
      name: "Operator Sekolah", 
      school: "SMK N 2 Sukoharjo"
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Username dan Password wajib diisi.")
      return
    }

    setLoading(true)

    // Simulasi proses login
    setTimeout(() => {
      const foundUser = validUsers.find(
        (user) => user.username === username.trim() && user.password === password
      )

      if (!foundUser) {
        setError("Username atau password salah.")
        setLoading(false)
        return
      }

      // Simpan session user
      try {
        const userSession = {
          username: foundUser.username,
          role: foundUser.role,
          name: foundUser.name,
          school: foundUser.school,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem("sessionUser", JSON.stringify(userSession))
        console.log("User logged in:", userSession)
      } catch (err) {
        console.error("Error saving session:", err)
        setError("Gagal menyimpan session.")
        setLoading(false)
        return
      }

      setLoading(false)

      // Redirect berdasarkan role
      if (foundUser.role === "admin_cabdin") {
        navigate("/admin-cabdin/dashboard", { replace: true })
      } else if (foundUser.role === "operator_sekolah") {
        navigate("/dashboard", { replace: true })
      } else {
        // Fallback
        navigate("/dashboard", { replace: true })
      }
    }, 800)
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
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Masukan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" disabled={loading} /> Ingatkan saya
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Memproses...
                </>
              ) : (
                "MASUK"
              )}
            </button>
          </form>

          {/* Info login untuk testing */}
          {/* <div className="login-hint">
            <p><strong>Testing Credentials:</strong></p>
            <p>Admin: username: <code>admin</code>, password: <code>admin123</code></p>
            <p>Operator: username: <code>operator</code>, password: <code>op2025</code></p>
          </div> */}
        </div>
      </div>
    </div>
  )
}