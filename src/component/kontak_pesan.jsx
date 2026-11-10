import { useState } from 'react'
import { pageUrl } from './index.jsx'
import { createContactOrder, getMenuByCategory } from './order-menu.js'
import { formatRupiah, readOrders, saveOrders } from './cart-utils.js'
import { printReceipt } from './receipt.js'
import useMenuCatalog from './use-menu-catalog.js'

function KontakPesan() {
  const [menuItems] = useMenuCatalog()
  const menuByCategory = getMenuByCategory(menuItems)
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [jumlah, setJumlah] = useState(1)
  const [kategori, setKategori] = useState('')
  const [menu, setMenu] = useState('')
  const [layanan, setLayanan] = useState('Makan di Tempat')
  const [catatan, setCatatan] = useState('')
  const [order, setOrder] = useState(null)
  const [printError, setPrintError] = useState('')
  const selectedMenu = menuItems.find((item) => item.category === kategori && item.name === menu)

  function submitOrder(event) {
    event.preventDefault()
    if (!menuByCategory[kategori]?.includes(menu)) {
      return
    }

    const newOrder = createContactOrder({
      category: kategori,
      menu,
      customer: nama,
      phone: telepon,
      quantity: jumlah,
      service: layanan,
      notes: catatan,
    })
    saveOrders([newOrder, ...readOrders()])
    setOrder(newOrder)
  }

  return (
    <>
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">LAYANAN RAMAH MAHASISWA &amp; KANTOR</span>
          <h1>Pesan Sekarang &amp; Hubungi Kami</h1>
          <p>Isi formulir pesanan di bawah untuk reservasi dine-in, take away, atau pengiriman ke kos/kantor di sekitar Grogol.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {order ? (
              <section className="card p-4 col-lg-8" aria-labelledby="order-success-title">
                <span className="badge bg-success align-self-start mb-2">Pesanan berhasil dicatat</span>
                <h2 id="order-success-title">Pesanan Anda sudah masuk</h2>
                <p>Nomor pesanan: <strong>{order.id}</strong></p>
                <p>{order.items[0].name} &times; {order.items[0].quantity} — {formatRupiah(order.total)}</p>
                <p className="text-secondary">Pesanan tersimpan dan dapat dilihat admin pada browser ini.</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setPrintError(
                      printReceipt(order) ? '' : 'Jendela cetak diblokir browser. Izinkan pop-up lalu coba lagi.',
                    )}
                  >
                    <i className="bi bi-printer me-1" aria-hidden="true" />Cetak Struk
                  </button>
                  <button className="btn btn-outline-danger" type="button" onClick={() => {
                    setOrder(null)
                    setPrintError('')
                    setNama('')
                    setTelepon('')
                    setJumlah(1)
                    setKategori('')
                    setMenu('')
                    setLayanan('Makan di Tempat')
                    setCatatan('')
                  }}>
                    Buat Pesanan Lain
                  </button>
                </div>
                {printError && <p className="alert alert-warning mt-3 mb-0" role="alert">{printError}</p>}
              </section>
            ) : (
            <form className="card p-4 col-lg-8" onSubmit={submitOrder}>
              <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">FORMULIR PEMESANAN</span>
              <h2>Detail Pembelian Anda</h2>
              <p className="text-secondary mb-3">Pesanan akan langsung dicatat setelah formulir dikirim.</p>

              <div className="mb-3">
                <label className="form-label" htmlFor="nama">Nama Lengkap <span>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                  placeholder="Contoh: Budi Santoso"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="wa">Nomor Telepon <span>*</span></label>
                <input
                  type="tel"
                  className="form-control"
                  id="wa"
                  name="wa"
                  placeholder="Contoh: 081234567890"
                  value={telepon}
                  onChange={(event) => setTelepon(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="kategori">Kategori Menu <span>*</span></label>
                <select
                  className="form-select"
                  id="kategori"
                  name="kategori"
                  required
                  value={kategori}
                  onChange={(event) => {
                    setKategori(event.target.value)
                    setMenu('')
                  }}
                >
                  <option value="">-- Pilih Kategori --</option>
                  {Object.keys(menuByCategory).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="menu">Menu Spesifik <span>*</span></label>
                <select
                  className="form-select"
                  id="menu"
                  name="menu"
                  required
                  disabled={!kategori}
                  value={menu}
                  onChange={(event) => setMenu(event.target.value)}
                >
                  <option value="">{kategori ? '-- Pilih Menu --' : 'Pilih kategori terlebih dahulu'}</option>
                  {(menuByCategory[kategori] || []).map((menuName) => (
                    <option key={menuName} value={menuName}>{menuName}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="jumlah">Jumlah Porsi / Box <span>*</span></label>
                <input
                  type="number"
                  className="form-control"
                  id="jumlah"
                  name="jumlah"
                  value={jumlah}
                  onChange={(event) => setJumlah(Math.max(1, Number(event.target.value)))}
                  min="1"
                  required
                />
                <p className="small text-secondary mt-2 mb-0">
                  Harga satuan: {selectedMenu ? formatRupiah(selectedMenu.price) : 'Pilih kategori dan menu terlebih dahulu'}
                  {selectedMenu && <> &bull; Subtotal: <strong>{formatRupiah(selectedMenu.price * jumlah)}</strong></>}
                </p>
                <p className="small text-secondary">Pemesanan di atas 15 porsi untuk rapat/acara kampus, konfirmasi via WA H-1.</p>
              </div>
              <fieldset className="mb-3">
                <legend>Jenis Layanan <span>*</span></legend>
                <label className="form-check d-block">
                  <input className="form-check-input" type="radio" name="layanan" value="Makan di Tempat" checked={layanan === 'Makan di Tempat'} onChange={(event) => setLayanan(event.target.value)} />
                  <span><strong>Makan di Tempat</strong><br /><small className="text-secondary">Reservasi meja warung (dine-in santai &amp; higienis)</small></span>
                </label>
                <label className="form-check d-block">
                  <input className="form-check-input" type="radio" name="layanan" value="Take Away" checked={layanan === 'Take Away'} onChange={(event) => setLayanan(event.target.value)} />
                  <span><strong>Take Away</strong><br /><small className="text-secondary">Bungkus rapi, ambil langsung di warung tanpa antre</small></span>
                </label>
                <label className="form-check d-block">
                  <input className="form-check-input" type="radio" name="layanan" value="Delivery Grogol" checked={layanan === 'Delivery Grogol'} onChange={(event) => setLayanan(event.target.value)} />
                  <span><strong>Delivery Grogol</strong><br /><small className="text-secondary">Antar ke kos/kantor area Trisakti, UNTAR &amp; sekitarnya</small></span>
                </label>
              </fieldset>
              <div className="mb-3">
                <label className="form-label" htmlFor="catatan">Level Pedas &amp; Catatan Khusus</label>
                <textarea className="form-control" id="catatan" name="catatan" rows="4" value={catatan} onChange={(event) => setCatatan(event.target.value)} placeholder="Level pedas 1-5, tanpa timun, sambal dipisah, nomor meja, atau alamat pengiriman..." />
                <p className="small text-secondary">Saran cepat: Level 3 &bull; Level 5 Nampol &bull; Sambal dipisah &bull; No timun</p>
              </div>
              <div className="mb-3">
                <label className="d-flex align-items-start gap-2">
                  <input type="checkbox" name="setuju" required />
                  Saya menyetujui detail pesanan sudah benar.
                </label>
              </div>
              <button className="btn btn-danger" type="submit">
                Buat Pesanan {selectedMenu ? `• ${formatRupiah(selectedMenu.price * jumlah)}` : ''}
              </button>
              <p className="small text-secondary mt-2 mb-0">Pesanan langsung tersimpan di browser ini tanpa pengiriman ke server.</p>
            </form>
            )}

            <aside className="col-lg-4">
              <div className="d-flex flex-column gap-4">
                <div className="card p-0 overflow-hidden">
                  <div className="ratio ratio-4x3">
                    <iframe
                      title="Lokasi Ayam Pak Gondesss, Jl. Dr. Susilo Raya No. 42, Grogol"
                      src="https://www.google.com/maps?q=Jl.+Dr.+Susilo+Raya+No.+42+Grogol+Petamburan+Jakarta+Barat&output=embed"
                      className="border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                <div className="card p-4">
                  <span className="badge bg-warning-subtle text-warning-emphasis align-self-start mb-2">FAST RESPONSE</span>
                  <h2 className="h3 mb-3">Kontak &amp; Jam Layanan</h2>
                  <div className="d-flex justify-content-between align-items-start gap-3 border-bottom py-2">
                    <strong>Jam Buka</strong>
                    <span className="text-end">10:00 - 22:00 WIB<br /><small className="text-secondary">Senin - Minggu</small></span>
                  </div>
                  <div className="d-flex justify-content-between align-items-start gap-3 py-2">
                    <strong>WhatsApp Admin</strong>
                    <span className="text-nowrap">+62 812-3456-7890</span>
                  </div>
                  <p className="small text-secondary mt-2 mb-0">Gratis antar radius 1 km untuk mahasiswa, kosan Susilo, Makaliwe, dan sekitarnya (minimal 2 porsi).</p>
                </div>
                <div className="card p-4">
                  <h2 className="h3 mb-3">Tautan Terkait</h2>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><a href={pageUrl('beranda')}>Kembali ke Beranda</a></li>
                    <li><a href={pageUrl('menu')}>Lihat Harga Menu</a></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default KontakPesan