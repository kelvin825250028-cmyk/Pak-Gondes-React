import { imageUrl, pageUrl, videoUrl } from './index.jsx'
import { useCart } from './cart-hook.js'

const menuPhotos = [
  { image: 'geprek-gondes.jpg', alt: 'Nasi Ayam Geprek Sambal Gondes', name: 'Nasi Ayam Geprek Sambal Gondes', price: 'Rp 30.000' },
  { image: 'sambal-kampoeng.jpg', alt: 'Nasi Ayam Goreng Sambal Kampoeng', name: 'Nasi Ayam Goreng Sambal Kampoeng', price: 'Rp 30.000' },
  { image: 'kalasan.jpg', alt: 'Nasi Ayam Goreng Kalasan', name: 'Nasi Ayam Goreng Kalasan', price: 'Rp 36.000' },
  { image: 'geprek-mozarella.jpg', alt: 'Nasi Ayam Geprek Mozarella', name: 'Nasi Ayam Geprek Mozarella', price: 'Rp 38.000' },
  { image: 'sambal-matah.jpg', alt: 'Nasi Ayam Sambal Matah', name: 'Nasi Ayam Sambal Matah', price: 'Rp 34.000' },
  { image: 'nasi-goreng.jpg', alt: 'Nasi Goreng Kampoeng', name: 'Nasi Goreng Kampoeng', price: 'Rp 29.000' },
  { image: 'indomie.jpg', alt: 'Indomie Ayam Geprek Sambal Gondes', name: 'Indomie Ayam Geprek Sambal Gondes', price: 'Rp 25.000' },
  { image: 'es-teh.jpg', alt: 'Es Teh Manis Jumbo', name: 'Es Teh Manis Jumbo', price: 'Rp 6.000' },
]

const prices = [
  ['Paket Nasi', 'Nasi Ayam Geprek Sambal Gondes', 'Rp 30.000', 'Nasi putih pulen, ayam crispy geprek berlumur sambal gondes ulek dadakan, lalapan segar.', 'paket-nasi'],
  ['Paket Nasi', 'Nasi Ayam Goreng Sambal Kampoeng', 'Rp 30.000', 'Nasi + ayam goreng rempah gurih, taburan kremesan garing, sambal terasi matang khas Semarang.'],
  ['Paket Nasi', 'Nasi Ayam Goreng Kalasan', 'Rp 36.000', 'Nasi + ayam goreng 1/4 ekor ungkep bumbu kalasan manis gurih, kremes, sambal & lalap.'],
  ['Paket Nasi', 'Nasi Ayam Geprek Mozarella Sambal Gondes', 'Rp 38.000', 'Nasi hangat, ayam geprek sambal gondes dengan lelehan keju mozarella berlimpah.'],
  ['Paket Nasi', 'Nasi Ayam Sambal Matah', 'Rp 34.000', 'Nasi putih dan ayam crispy dengan irisan bawang merah, serai, cabai rawit, minyak kelapa.'],
  ['Paket Nasi', 'Nasi Goreng Kampoeng', 'Rp 29.000', 'Nasi goreng aroma wajan rempah tradisional, suwiran ayam, pilihan telur ceplok/dadar.'],
  ['Paket Indomie', 'Indomie Ayam Geprek Sambal Gondes', 'Rp 25.000', 'Indomie goreng atau kuah bersama 1 potong ayam geprek berlumur sambal.', 'paket-indomie'],
  ['Paket Indomie', 'Indomie Telor Ceplok / Dadar', 'Rp 18.000', 'Indomie goreng / kuah dengan sawi hijau segar dan telur ceplok atau dadar.'],
  ['Paket Indomie', 'Indomie Saja', 'Rp 12.000', 'Indomie goreng atau kuah dengan sentuhan sambal cabai geprek khas Pak Gondesss.'],
  ['Paket Indomie', 'Indomie Ayam Geprek Mozzarella Sambal Gondes', 'Rp 39.000', 'Indomie goreng, ayam geprek pedas, dan lelehan keju mozzarella legit.'],
  ['Ala Carte', 'Ayam Geprek Sambal Gondes', 'Rp 25.000', '1 porsi ayam geprek gurih garing tanpa nasi, level pedas 1 sampai 5.', 'ala-carte'],
  ['Ala Carte', 'Ayam Goreng Sambal Kampoeng', 'Rp 25.000', '1 potong ayam goreng bumbu kuning dengan kremes dan sambal kampoeng.'],
  ['Ala Carte', 'Ayam Goreng Kalasan', 'Rp 32.000', 'Ayam 1/4 ekor ungkep santan gula jawa, gurih manis empuk sampai ke tulang.'],
  ['Ala Carte', 'Terong Crispy Geprek', 'Rp 12.000', 'Irisan terong berlapis tepung renyah digeprek dengan cabai rawit merah.'],
  ['Ala Carte', 'Jamur Crispy', 'Rp 13.000', 'Jamur tiram segar dibalut tepung berbumbu, digoreng kering renyah.'],
  ['Ala Carte', 'Telor Ceplok / Dadar', 'Rp 8.000', 'Telur ayam negeri, ceplok (mata sapi) atau dadar daun bawang.'],
  ['Ala Carte', 'Nasi Putih Pulen', 'Rp 8.000', 'Nasi putih hangat dari beras premium, porsi melimpah.'],
  ['Ala Carte', 'Krupuk Gendar / Kerung', 'Rp 3.000', 'Kerupuk tradisional khas Jawa Tengah dari beras, renyah dan gurih.'],
  ['Minuman', 'Es Teh Manis Jumbo', 'Rp 6.000', 'Teh melati wangi dengan gula pasir murni, disajikan dingin.', 'minuman'],
  ['Minuman', 'Nutrisari Jeruk', 'Rp 8.000', 'Nutrisari rasa jeruk peras dingin.'],
  ['Minuman', 'Es Milo', 'Rp 12.000', 'Susu malt cokelat Milo kental, disajikan dingin.'],
  ['Minuman', 'Air Mineral Botol 600ml', 'Rp 5.000', 'Air mineral kemasan praktis (tersedia dingin dan suhu ruang).'],
]

function Menu() {
  const { addItem, itemCount } = useCart()

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
                {prices.map(([category, name, price, description, id]) => {
                  const unitPrice = Number(price.match(/\d[\d.]*/)?.[0].replaceAll('.', '') || 0)
                  const productId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <tr id={id} key={name}>
                      <td><span className="badge">{category}</span></td>
                      <td><strong>{name}</strong></td>
                      <td className="text-end text-nowrap text-danger fw-bold">{price}</td>
                      <td>{description}</td>
                      <td className="text-nowrap">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => addItem({ id: productId, name, price: unitPrice })}
                          aria-label={`Tambah ${name} ke keranjang`}
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