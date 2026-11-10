import { imageUrl, pageUrl, videoUrl } from './index.jsx'
import { useCart } from './cart-hook.js'
import { formatRupiah } from './cart-utils.js'
import { menuCategoryLabels } from './menu-data.js'
import useMenuCatalog from './use-menu-catalog.js'

function Menu() {
  const { addItem, itemCount } = useCart()
  const [menuItems] = useMenuCatalog()
  const menuPhotos = menuItems
    .filter((item) => item.image)
    .map((item) => ({ ...item, alt: item.name, price: formatRupiah(item.price) }))
  const categoryAnchors = {
    'Paket Spesial': 'paket-spesial',
    'Paket Nasi': 'paket-nasi',
    'Paket Indomie': 'paket-indomie',
    'Ala Carte & Cemilan': 'ala-carte',
    'Aneka Minuman': 'minuman',
  }
  const anchoredMenuItems = []
  const seenCategories = new Set()
  for (const item of menuItems) {
    anchoredMenuItems.push({
      ...item,
      anchor: !seenCategories.has(item.category) ? categoryAnchors[item.category] : undefined,
    })
    seenCategories.add(item.category)
  }

  return (
    <>
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">
            RESEP KHAS GROGOL &amp; SEMARANG &bull; UPDATE 2025 &bull; 100% HALAL
          </span>
          <h1>Daftar Menu Lengkap Ayam Pak Gondesss</h1>
          <p>Pilihan nasi paket, Indomie, lauk ala carte &amp; minuman segar dengan rasa juara dan harga bersahabat untuk mahasiswa, pekerja, dan keluarga.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('cart')}>Pesan Cepat Sekarang</a>
          </div>
        </div>
      </section>

      <section id="foto-menu" className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">FOTO MENU ANDALAN</span>
            <h2>Tampilan Asli Sajian Kami</h2>
            <p className="text-secondary">Klik foto untuk memperbesar.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {menuPhotos.map((item, index) => {
              const modalId = `foto-menu-${index + 1}`
              return (
                <article className="card p-4 h-100" id={`kartu-menu-${index + 1}`} key={item.image}>
                  <a className="d-block" href={`#${modalId}`} data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                    <img className="photo img-fluid w-100 object-fit-cover rounded-3" src={imageUrl(item.image)} alt={item.alt} loading="lazy" />
                  </a>
                  <h3>{item.name}</h3>
                  <p className="text-danger fw-bold">{item.price}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">VIDEO MENU</span>
            <h2>Begini Cara Kami Menyajikan Ayam Geprek</h2>
          </div>
          <div className="ratio ratio-16x9 overflow-hidden rounded-4">
            <video className="w-100 h-100 object-fit-contain" controls playsInline preload="metadata" poster={imageUrl('geprek-gondes.jpg')}>
              <source src={videoUrl('profil.mp4')} type="video/mp4" />
              Browser Anda tidak mendukung video. <a href={videoUrl('profil.mp4')}>Unduh video</a>.
            </video>
          </div>
          <p className="d-block small text-secondary mt-2">Proses penyajian menu favorit Ayam Pak Gondesss</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">TRANSPARANSI HARGA BERSAHABAT</span>
            <h2>Ringkasan Menu &amp; Daftar Harga</h2>
            <p className="text-secondary">Harga resmi per porsi di gerai Grogol. Level pedas Sambal Gondes 1-5 gratis pilih.</p>
          </div>
          <div className="table-responsive border rounded">
            <table className="table table-striped table-hover mb-0">
              <caption>Daftar harga menu (Rupiah, per porsi)</caption>
              <thead className="table-dark">
                <tr><th>KATEGORI</th><th>NAMA MENU</th><th className="text-end text-nowrap text-danger fw-bold">HARGA</th><th>KETERANGAN / KOMPOSISI</th><th>AKSI</th></tr>
              </thead>
              <tbody>
                {anchoredMenuItems.map((item) => {
                  return (
                    <tr id={item.anchor} key={item.id}>
                      <td><span className="badge">{menuCategoryLabels[item.category]}</span></td>
                      <td><strong>{item.name}</strong></td>
                      <td className="text-end text-nowrap text-danger fw-bold">{formatRupiah(item.price)}</td>
                      <td>{item.description}</td>
                      <td className="text-nowrap">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                          aria-label={`Tambah ${item.name} ke keranjang`}
                        >
                          <i className="bi bi-plus-lg me-1" aria-hidden="true" />
                          Tambah
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <h2>Sudah menentukan pilihan menu lezatmu?</h2>
          <p className="text-secondary">{itemCount > 0 ? `${itemCount} item ada di keranjang.` : 'Tambahkan menu ke keranjang untuk melanjutkan pesanan.'}</p>
          <p className="text-secondary">Isi formulir pemesanan online untuk nasi box kantor, kumpul kampus, atau makan siang cepat.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('cart')}>Lihat Keranjang</a>
            <a className="btn btn-danger" href={pageUrl('kontak')}>Pesan via Formulir Online</a>
          </div>
        </div>
      </section>

      {menuPhotos.map((item, index) => {
        const modalId = `foto-menu-${index + 1}`
        return (
          <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true" key={modalId}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content bg-transparent border-0">
                <button type="button" className="btn-close btn-close-white ms-auto mb-2" data-bs-dismiss="modal" aria-label="Tutup" />
                <div className="modal-body p-0 text-center">
                  <img className="img-fluid rounded" src={imageUrl(item.image)} alt={item.alt} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Menu