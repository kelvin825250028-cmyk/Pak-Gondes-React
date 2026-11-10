import { useEffect, useState } from 'react'
import 'admin-lte/dist/js/adminlte.esm.js'
import adminLteStylesheet from 'admin-lte/dist/css/adminlte.css?url'
import { formatRupiah, readOrders, saveOrders } from './cart-utils.js'
import { pageUrl } from './navigation.js'

const ADMIN_EMAIL = 'admin@pakgondes.local'
const ADMIN_PASSWORD = 'GondesDemo2025!'
const AUTH_STORAGE_KEY = 'pakgondes_admin_authenticated'
const orderStatuses = ['Baru', 'Menunggu konfirmasi', 'Diproses', 'Selesai', 'Dibatalkan']
const demoVisitors = [
  { name: 'Nadia Putri', email: 'nadia@example.com', visits: 8, status: 'Aktif' },
  { name: 'Rizky Pratama', email: 'rizky@example.com', visits: 5, status: 'Aktif' },
  { name: 'Aulia Safitri', email: 'aulia@example.com', visits: 3, status: 'Aktif' },
]

function Admin() {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true')
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState(readOrders)

  useEffect(() => {
    function syncOrders(event) {
      if (event.key === 'pakgondes_orders') {
        setOrders(readOrders())
      }
    }

    window.addEventListener('storage', syncOrders)
    return () => window.removeEventListener('storage', syncOrders)
  }, [])

  function login(event) {
    event.preventDefault()
    if (credentials.email !== ADMIN_EMAIL || credentials.password !== ADMIN_PASSWORD) {
      setError('Email atau kata sandi tidak sesuai.')
      return
    }
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setAuthenticated(true)
    setError('')
  }

  function logout() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthenticated(false)
  }

  function updateStatus(orderId, status) {
    const updatedOrders = orders.map((order) => (
      order.id === orderId ? { ...order, status } : order
    ))
    saveOrders(updatedOrders)
    setOrders(updatedOrders)
  }

  const normalizedSearch = search.trim().toLocaleLowerCase('id-ID')
  const filteredOrders = orders.filter((order) => (
    [order.id, order.customer, order.phone, order.status, ...order.items.map((item) => item.name)]
      .some((value) => value.toLocaleLowerCase('id-ID').includes(normalizedSearch))
  ))
  const filteredVisitors = demoVisitors.filter((visitor) => (
    [visitor.name, visitor.email, visitor.status]
      .some((value) => value.toLocaleLowerCase('id-ID').includes(normalizedSearch))
  ))
  const newOrders = orders.filter((order) => (
    order.status === 'Baru' || order.status === 'Menunggu konfirmasi'
  )).length
  const completedOrders = orders.filter((order) => order.status === 'Selesai')
  const revenue = completedOrders.reduce((total, order) => total + order.total, 0)

  if (!authenticated) {
    return (
      <div className="admin-login-page">
        <link rel="stylesheet" href={adminLteStylesheet} />
        <div className="admin-login-card card card-outline card-danger">
          <div className="card-header text-center">
            <a href={pageUrl('beranda')} className="h2 text-decoration-none"><b>Pak</b> Gondesss</a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Masuk untuk membuka dashboard AdminLTE</p>
            <form onSubmit={login}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  aria-label="Email admin"
                  autoComplete="username"
                  placeholder="Email admin"
                  value={credentials.email}
                  onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                  required
                />
                <span className="input-group-text"><i className="bi bi-envelope" aria-hidden="true" /></span>
              </div>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  aria-label="Kata sandi"
                  autoComplete="current-password"
                  placeholder="Kata sandi"
                  value={credentials.password}
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                  required
                />
                <span className="input-group-text"><i className="bi bi-lock" aria-hidden="true" /></span>
              </div>
              {error && <p className="alert alert-danger py-2" role="alert">{error}</p>}
              <button className="btn btn-danger w-100" type="submit">Masuk ke Dashboard</button>
            </form>
            <p className="small text-secondary mt-3 mb-0">
              Login menggunakan Email yang disediakan
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper layout-fixed sidebar-expand-lg bg-body-tertiary adminlte-dashboard">
      <link rel="stylesheet" href={adminLteStylesheet} />
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <button
            className="btn btn-link nav-link"
            type="button"
            data-lte-toggle="sidebar"
            aria-label="Buka atau tutup navigasi admin"
          >
            <i className="bi bi-list fs-4" aria-hidden="true" />
          </button>
          <span className="navbar-text fw-semibold">Admin Panel Ayam Pak Gondesss</span>
          <span className="badge text-bg-secondary ms-auto me-3">Admin</span>
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1" aria-hidden="true" />Keluar
          </button>
        </div>
      </nav>
      <aside className="app-sidebar bg-dark shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="#dashboard" className="brand-link text-decoration-none">
            <span className="brand-text fw-light"><b>Pak</b> Gondesss</span>
          </a>
        </div>
        <div className="sidebar-wrapper">
          <nav className="mt-2" aria-label="Navigasi dashboard">
            <ul className="nav sidebar-menu flex-column" role="menu">
              <li className="nav-item">
                <a className="nav-link active" href="#dashboard">
                  <i className="nav-icon bi bi-speedometer2" aria-hidden="true" /><p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#orders">
                  <i className="nav-icon bi bi-receipt" aria-hidden="true" /><p>Data Pesanan</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#visitors">
                  <i className="nav-icon bi bi-people" aria-hidden="true" /><p>User Pengunjung</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={pageUrl('beranda')}>
                  <i className="nav-icon bi bi-arrow-left" aria-hidden="true" /><p>Kembali ke Website</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main" id="dashboard">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6"><h1 className="mb-0">Dashboard</h1></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><a href={pageUrl('beranda')}>Beranda</a></li>
                  <li className="breadcrumb-item active">Dashboard Admin</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="app-content">
          <div className="container-fluid">
            <div className="alert alert-info" role="note">
              <i className="bi bi-info-circle me-2" aria-hidden="true" />
              Pesanan dibaca dari browser yang sama dengan keranjang. Dashboard ini belum menggunakan backend/database.
            </div>
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-primary"><div className="inner"><h3>{orders.length}</h3><p>Total Pesanan</p></div><i className="small-box-icon bi bi-receipt" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-warning"><div className="inner"><h3>{newOrders}</h3><p>Pesanan Baru</p></div><i className="small-box-icon bi bi-hourglass-split" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-success"><div className="inner"><h3>{demoVisitors.length}</h3><p>User Pengunjung (Contoh)</p></div><i className="small-box-icon bi bi-people" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-danger"><div className="inner"><h3 className="fs-4">{formatRupiah(revenue)}</h3><p>Omzet Selesai</p></div><i className="small-box-icon bi bi-cash-stack" aria-hidden="true" /></div>
              </div>
            </div>
            <div className="card mb-4" id="orders">
              <div className="card-header">
                <h2 className="card-title">Tabel Pesanan</h2>
                <div className="card-tools">
                  <label className="visually-hidden" htmlFor="admin-search">Cari pesanan atau pengunjung</label>
                  <div className="input-group input-group-sm admin-search">
                    <input
                      className="form-control"
                      id="admin-search"
                      type="search"
                      placeholder="Cari pesanan / pengunjung..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    <span className="input-group-text"><i className="bi bi-search" aria-hidden="true" /></span>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0">
                    <thead><tr><th>No. Pesanan</th><th>Pelanggan</th><th>Menu</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong><br /><small className="text-secondary">{new Date(order.createdAt).toLocaleString('id-ID')}</small></td>
                          <td>{order.customer}<br /><span className="text-secondary">{order.phone}</span></td>
                          <td>{order.items.map((item) => <div key={item.id}>{item.name} &times; {item.quantity}</div>)}</td>
                          <td className="text-nowrap">{formatRupiah(order.total)}</td>
                          <td>
                            <label className="visually-hidden" htmlFor={`status-${order.id}`}>Status {order.id}</label>
                            <select
                              className="form-select form-select-sm"
                              id={`status-${order.id}`}
                              value={order.status}
                              onChange={(event) => updateStatus(order.id, event.target.value)}
                            >
                              {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr><td className="text-center text-secondary py-4" colSpan="5">Tidak ada pesanan yang cocok.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer text-secondary small">Perubahan status disimpan di browser ini dan terlihat pada tab dashboard lain.</div>
            </div>
            <div className="card" id="visitors">
              <div className="card-header"><h2 className="card-title">User Pengunjung (Data Contoh)</h2></div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead><tr><th>Nama Pengunjung</th><th>Email Contoh</th><th>Jumlah Kunjungan</th><th>Status</th></tr></thead>
                    <tbody>
                      {filteredVisitors.map((visitor) => (
                        <tr key={visitor.email}>
                          <td>{visitor.name}</td><td>{visitor.email}</td><td>{visitor.visits}</td>
                          <td><span className="badge text-bg-success">{visitor.status}</span></td>
                        </tr>
                      ))}
                      {filteredVisitors.length === 0 && (
                        <tr><td className="text-center text-secondary py-4" colSpan="4">Tidak ada pengunjung yang cocok.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="app-footer"><strong>Ayam Pak Gondesss</strong> &mdash; Dashboard AdminLTE (Demo)</footer>
    </div>
  )
}

export default Admin
