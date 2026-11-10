import { imageUrl, pageUrl, videoUrl } from './index.jsx'
import { formatRupiah } from './cart-utils.js'
import useMenuCatalog from './use-menu-catalog.js'

const featuredMenu = [
  ['nasi-ayam-geprek-sambal-gondes', 'PEDAS NAMPOL'],
  ['nasi-ayam-goreng-sambal-kampoeng', 'KREMES GURIH'],
  ['nasi-ayam-goreng-kalasan', 'MANIS GURIH'],
  ['nasi-ayam-geprek-mozarella-sambal-gondes', 'KEJU LUMER'],
]

function KartuFavorit({ image, alt, label, name, price, description }) {
  return (
    <article className="card p-4 h-100">
      <img className="photo img-fluid w-100 object-fit-cover rounded-3" src={imageUrl(image)} alt={alt} loading="lazy" />
      <span className="badge bg-warning-subtle text-warning-emphasis">{label}</span>
      <h3>{name}</h3>
      <p className="text-danger fw-bold">{price}</p>
      <p className="text-secondary">{description}</p>
      <div className="d-flex gap-3 flex-wrap mt-3">
        <a className="btn btn-outline-danger" href={pageUrl('kontak')}>Pesan Menu Ini</a>
      </div>
    </article>
  )
}

function Beranda() {
  const [menuItems] = useMenuCatalog()
  const favorites = featuredMenu
    .map(([id, label]) => {
      const item = menuItems.find((menuItem) => menuItem.id === id)
      return item ? { ...item, label, alt: item.name, price: formatRupiah(item.price) } : null
    })
    .filter(Boolean)

  return (
    <>
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">
                SAMBAL ULEG BAWANG &amp; RAWIT MERAH ASLI
              </span>
              <h1>Ayam Lezat, <span className="text-danger">Sambal Gondes</span>, Harga Bersahabat</h1>
              <p>Kuliner ayam goreng &amp; geprek khas racikan Pak Gondes di Grogol, Jakarta Barat. Sambal uleg pedas mantap, porsi mengenyangkan, dan harga ramah kantong mahasiswa &amp; keluarga!</p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a className="btn btn-danger" href={pageUrl('menu')}>Lihat Menu Lengkap</a>
                <a className="btn btn-outline-danger" href={pageUrl('kontak')}>Pesan Sekarang</a>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <img
                className="photo img-fluid w-100 object-fit-cover rounded-3"
                src={imageUrl('hero.jpg')}
                alt="Ayam geprek sambal Gondes khas Pak Gondes"
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">100%</b>Bahan Halal</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">Rp 12rb</b>Mulai Dari</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">4.9 ★</b>1.500+ Ulasan</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">Promo</b>Pelajar Trisakti / Untar / Ukrida</div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">PILIHAN PALING NAGIH</span>
            <h2>Menu Favorit Pilihan Pelanggan</h2>
            <p className="text-secondary">Paling sering dipesan oleh mahasiswa dan warga Grogol. Daging ayam empuk bumbu meresap berpadu lauk hangat khas Nusantara.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {favorites.map((item) => (
              <KartuFavorit
                key={item.name}
                image={item.image}
                alt={item.alt}
                label={item.label}
                name={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('menu')}>Lihat Semua Menu (20+ Varian)</a>
          </div>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div>
              <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">KISAH KAMI</span>
              <h2>Dari Gerobak Sederhana Hingga Menjadi Rumah Kedua di Grogol</h2>
              <p>Berawal dari kecintaan Pak Gondes meracik bumbu rempah ayam tradisional dan sambal korek pedas segar di kawasan Grogol Petamburan. Setiap potong ayam dimarinasi bumbu rempah alami, digoreng pada suhu yang pas sehingga kulit renyah dan dagingnya tetap empuk berjus.</p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a className="btn btn-outline-danger" href={pageUrl('tentang')}>Pelajari Cerita Kami Selengkapnya</a>
              </div>
            </div>
            <ul className="list-unstyled">
              <li><strong>Bumbu Alami</strong> - rempah asli tanpa perisa instan</li>
              <li><strong>Harga Pelajar</strong> - kenyang puas tanpa boros</li>
              <li><strong>Pelayanan Ramah</strong> - hangat layaknya makan di rumah</li>
              <li><strong>Sejak 2018</strong> - menemani anak kos &amp; pekerja Grogol</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">INTIP DAPUR KAMI</span>
            <h2>Lihat Sambal Gondes Diuleg &amp; Ayam Digoreng Dadakan</h2>
            <p className="text-secondary">Tonton langsung proses di balik setiap porsi ayam Pak Gondes.</p>
          </div>
          <div className="ratio ratio-16x9 overflow-hidden rounded-4">
            <video className="w-100 h-100 object-fit-contain" controls playsInline preload="metadata" poster={imageUrl('geprek-gondes.jpg')}>
              <source src={videoUrl('profil.mp4')} type="video/mp4" />
              Browser Anda tidak mendukung video. <a href={videoUrl('profil.mp4')}>Unduh video</a>.
            </video>
          </div>
          <p className="d-block small text-secondary mt-2">Video profil Ayam Pak Gondesss</p>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">KUNJUNGI WARUNG KAMI</span>
            <h2>Lokasi &amp; Jam Operasional</h2>
            <p className="text-secondary">Hanya 5 menit dari kampus Trisakti dan Mall Ciputra Jakarta.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="card p-4 h-100"><h3>Ayam Pak Gondesss Grogol</h3><p>Jl. Dr. Susilo Raya No. 42<br />Grogol Petamburan, Jakarta Barat 11450</p></div>
            <div className="card p-4 h-100"><h3>Jam Operasional</h3><p>Senin - Minggu (tanpa libur)<br /><strong>10.00 - 22.00 WIB</strong></p><p className="small text-secondary">Jam ramai: 12.00 - 14.00 &amp; 18.30 - 20.30</p></div>
            <div className="card p-4 h-100"><h3>Fasilitas</h3><ul className="list-unstyled"><li>Wi-Fi cepat gratis</li><li>Banyak colokan listrik</li><li>Kipas &amp; sirkulasi luas</li><li>Parkir motor aman</li></ul></div>
          </div>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('kontak')}>Form Kontak Pesanan &rarr;</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Beranda