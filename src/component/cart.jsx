import { useState } from 'react'
import { useCart } from './cart-hook.js'
import { formatRupiah, readOrders, saveOrders } from './cart-utils.js'
import { pageUrl } from './navigation.js'
import { printReceipt } from './receipt.js'

function Cart() {
  const { items, total, updateQuantity, clearCart } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', service: 'Take Away', notes: '' })
  const [order, setOrder] = useState(null)
  const [printError, setPrintError] = useState('')

  function updateCustomer(event) {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  function placeOrder(event) {
    event.preventDefault()
    const newOrder = {
      id: `PG-${Date.now().toString().slice(-8)}`,
      customer: customer.name.trim(),
      phone: customer.phone.trim(),
      service: customer.service,
      notes: customer.notes.trim(),
      items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      total,
      status: 'Baru',
      createdAt: new Date().toISOString(),
    }

    saveOrders([newOrder, ...readOrders()])
    clearCart()
    setOrder(newOrder)
  }

  return (
    <>
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">PESANAN ANDA</span>
          <h1>Keranjang Belanja</h1>
          <p className="mb-0">Periksa menu, lalu buat pesanan dan cetak struk.</p>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          {order ? (
            <div className="cart-receipt-wrap">
              <article className="card p-4 cart-receipt" aria-labelledby="receipt-title">
                <div className="text-center border-bottom pb-3 mb-3">
                  <h2 id="receipt-title" className="h3 mb-1">Ayam Pak Gondesss</h2>
                  <p className="mb-1">Jl. Dr. Susilo Raya No. 42, Grogol</p>
                  <span className="badge bg-success">Pesanan berhasil dibuat</span>
                </div>
                <dl className="row small mb-3">
                  <dt className="col-4">No. pesanan</dt><dd className="col-8 fw-bold">{order.id}</dd>
                  <dt className="col-4">Tanggal</dt><dd className="col-8">{new Date(order.createdAt).toLocaleString('id-ID')}</dd>
                  <dt className="col-4">Pelanggan</dt><dd className="col-8">{order.customer}</dd>
                  <dt className="col-4">Telepon</dt><dd className="col-8">{order.phone}</dd>
                  <dt className="col-4">Layanan</dt><dd className="col-8">{order.service}</dd>
                </dl>
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead><tr><th>Menu</th><th className="text-center">Qty</th><th className="text-end">Jumlah</th></tr></thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}<small className="d-block text-secondary">{formatRupiah(item.price)} / item</small></td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end text-nowrap">{formatRupiah(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot><tr className="fw-bold"><td colSpan="2">Total</td><td className="text-end text-nowrap">{formatRupiah(order.total)}</td></tr></tfoot>
                  </table>
                </div>
                {order.notes && <p className="small mb-0"><strong>Catatan:</strong> {order.notes}</p>}
                <p className="text-center small border-top pt-3 mt-3 mb-0">Terima kasih telah memesan. Simpan struk ini sebagai bukti pesanan.</p>
              </article>
              <div className="d-flex justify-content-center gap-2 flex-wrap mt-3 receipt-actions">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setPrintError(
                    printReceipt(order) ? '' : 'Jendela cetak diblokir browser. Izinkan pop-up lalu coba lagi.',
                  )}
                >
                  <i className="bi bi-printer me-1" aria-hidden="true" />Cetak Struk
                </button>
                {printError && <p className="alert alert-warning mb-0" role="alert">{printError}</p>}
                <a className="btn btn-outline-danger" href={pageUrl('menu')}>Kembali ke Menu</a>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="card p-5 text-center">
              <i className="bi bi-basket3 fs-1 text-danger" aria-hidden="true" />
              <h2 className="h4 mt-2">Keranjang masih kosong</h2>
              <p className="text-secondary">Pilih menu favorit Anda untuk mulai memesan.</p>
              <a className="btn btn-danger align-self-center" href={pageUrl('menu')}>Lihat Menu</a>
            </div>
          ) : (
            <div className="row g-4 align-items-start">
              <div className="col-lg-7">
                <div className="card p-3 p-md-4">
                  <h2 className="h4 mb-3">Daftar Menu</h2>
                  <div className="d-grid gap-3">
                    {items.map((item) => (
                      <article className="cart-item border rounded-3 p-3" key={item.id}>
                        <div className="d-flex justify-content-between gap-3">
                          <div>
                            <h3 className="h6 mb-1">{item.name}</h3>
                            <p className="text-secondary mb-0">{formatRupiah(item.price)} / porsi</p>
                          </div>
                          <strong className="text-danger text-nowrap">{formatRupiah(item.price * item.quantity)}</strong>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-3">
                          <label className="form-label mb-0" htmlFor={`quantity-${item.id}`}>Jumlah</label>
                          <input
                            id={`quantity-${item.id}`}
                            className="form-control cart-quantity"
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                          />
                          <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => updateQuantity(item.id, 0)}>
                            Hapus
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between border-top mt-4 pt-3 fs-5 fw-bold">
                    <span>Total</span><span className="text-danger">{formatRupiah(total)}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <form className="card p-4" onSubmit={placeOrder}>
                  <h2 className="h4">Detail Pemesan</h2>
                  <label className="form-label mt-2" htmlFor="customer-name">Nama lengkap</label>
                  <input className="form-control" id="customer-name" name="name" value={customer.name} onChange={updateCustomer} autoComplete="name" required />
                  <label className="form-label mt-3" htmlFor="customer-phone">Nomor telepon</label>
                  <input className="form-control" id="customer-phone" name="phone" type="tel" value={customer.phone} onChange={updateCustomer} autoComplete="tel" required />
                  <label className="form-label mt-3" htmlFor="customer-service">Jenis layanan</label>
                  <select className="form-select" id="customer-service" name="service" value={customer.service} onChange={updateCustomer}>
                    <option>Take Away</option>
                    <option>Delivery Grogol</option>
                    <option>Makan di Tempat</option>
                  </select>
                  <label className="form-label mt-3" htmlFor="customer-notes">Catatan pesanan</label>
                  <textarea className="form-control" id="customer-notes" name="notes" rows="3" value={customer.notes} onChange={updateCustomer} placeholder="Level pedas, alamat, atau catatan lainnya" />
                  <button className="btn btn-danger mt-4" type="submit">Buat Pesanan &bull; {formatRupiah(total)}</button>
                  <p className="small text-secondary mt-2 mb-0">Pesanan langsung dicatat setelah tombol ini ditekan. Struk akan ditampilkan untuk dicetak.</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Cart
