import { imageUrl, pageUrl, videoUrl } from './index.jsx'

const pillars = [
  {
    label: 'PILAR I',
    title: 'Bahan Baku Segar Setiap Pagi',
    description: 'Ayam dari pemotong higienis bersertifikasi halal. Cabai rawit merah, bawang merah Brebes, dan tomat segar dikirim dari pasar induk setiap subuh.',
  },
  {
    label: 'PILAR II',
    title: 'Cita Rasa Nusantara Otentik',
    description: 'Resep sambal kampoeng Semarang dan Sambal Gondes dimasak dengan minyak kelapa panas. Ketumbar sangrai, lengkuas, dan serai meresap sampai ke tulang.',
  },
  {
    label: 'PILAR III',
    title: 'Harga Ramah Mahasiswa',
    description: 'Paket hemat komplit: nasi pulen, lalapan melimpah, kremes kriuk, dan es teh jumbo dengan harga bersahabat bagi anak kos.',
  },
]

const gallery = [
  { image: 'galeri-1.jpg', alt: 'Ayam geprek sambal rawit', label: 'MENU IKONIK', title: 'Ayam Geprek Sambal Rawit', description: 'Ulegan cabai segar dengan kepedasan level 1 sampai 10.' },
  { image: 'galeri-2.jpg', alt: 'Penyajian di tampah bambu', label: 'TRADISI TRADISIONAL', title: 'Penyajian Tampah Bambu Alami', description: 'Alas daun pisang segar menambah aroma harum rempah nusantara.' },
  { image: 'galeri-3.jpg', alt: 'Cobek batu untuk ulegan sambal', label: 'KEAHLIAN TANGAN', title: 'Cobek Batu Gunung Merapi Asli', description: 'Diuleg dadakan setiap pesanan demi kesegaran cita rasa.' },
  { image: 'galeri-4.jpg', alt: 'Ayam digoreng dadakan', label: 'DAPUR PANAS', title: 'Goreng Dadakan Minyak Bersih', description: 'Kulit renyah keemasan dengan daging empuk juicy di dalam.' },
  { image: 'galeri-5.jpg', alt: 'Suasana warung bersama pelanggan', label: 'KELUARGA BESAR', title: 'Kumpul Hangat Sahabat & Kampus', description: 'Tempat istirahat nyaman sehabis jam kuliah dan kerja.' },
  { image: 'galeri-6.jpg', alt: 'Es teh jumbo dan jeruk peras', label: 'PENAWAR PEDAS', title: 'Es Teh Jumbo & Jeruk Peras Asli', description: 'Teh melati Jawa Tengah yang wangi dan pekat.' },
]

function Tentang() {
  return (
    <>
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">WARUNG UMKM SEJAK 2018</span>
          <h1>Tentang Ayam Pak Gondesss</h1>
          <p>Kisah perjalanan kuliner ayam geprek &amp; goreng khas Grogol yang digemari mahasiswa sejak 2018. Dari gerobak sederhana di Jalan Dr. Susilo Raya hingga titik kumpul santap favorit warga kampus dan perkantoran.</p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">7+</b>Tahun Melayani Grogol</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">350+</b>Porsi Ayam / Hari</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">100%</b>Bahan Halal &amp; Segar</div>
            <div className="card text-center p-4 h-100"><b className="d-block text-danger fs-2">4.9★</b>Rating Mahasiswa</div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div>
              <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">KISAH WARUNG KAMI</span>
              <h2>Menghadirkan Cita Rasa Kampung Halaman di Tengah Dinamika Grogol</h2>
              <p>Berawal pada pertengahan 2018 di sudut ramai Jalan Dr. Susilo Raya, Pak Gondes merintis usaha kuliner dengan niat tulus: menyuguhkan olahan ayam yang mengenyangkan sekaligus meninggalkan rindu lewat bumbu ungkep rempah Nusantara dan sambal uleg segar.</p>
              <p className="mt-3">Di tengah kawasan kampus Trisakti, Untar, dan UKRIDA, warung ini tumbuh bersama mahasiswa, dokter koas, dan para komuter Jakarta Barat.</p>
            </div>
            <div>
              <ul className="list-unstyled">
                <li>Sambal Uleg Dadakan</li>
                <li>Nasi Pulen Hangat</li>
                <li>Pas di Kantong Pelajar</li>
                <li>Resep Bumbu Ungkep 12 Rempah</li>
              </ul>
              <blockquote className="bg-white border-start border-4 border-warning p-4 rounded-end fst-italic mt-4">
                "Makan enak itu hak semua orang. Di Ayam Pak Gondesss, mahasiswa dan warga sekitar bisa makan kenyang, pedas nikmat, dan tetap hemat!"
                <cite className="d-block mt-2 text-danger fw-semibold">Suryanto "Pak Gondes" - Pendiri &amp; Peracik Resep Sambal</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">INTEGRITAS KAMI</span>
            <h2>3 Pilar Nilai Utama</h2>
            <p className="text-secondary">Komitmen harian demi menjaga kualitas rasa dan kepercayaan ribuan penikmat kuliner di Grogol.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {pillars.map((pillar) => (
              <article className="card p-4 h-100" key={pillar.label}>
                <span className="badge bg-warning-subtle text-warning-emphasis">{pillar.label}</span>
                <h3>{pillar.title}</h3>
                <p className="text-secondary">{pillar.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-4">Didukung 12 staf dapur dan pramusaji terlatih, kami menjaga kecepatan hidangan di bawah 10 menit tanpa mengorbankan kualitas.</p>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">VIDEO PROFIL</span>
            <h2>Kenali Pak Gondes &amp; Warungnya</h2>
          </div>
          <div className="ratio ratio-16x9 overflow-hidden rounded-4">
            <video className="w-100 h-100 object-fit-contain" controls playsInline preload="metadata" poster={imageUrl('geprek-gondes.jpg')}>
              <source src={videoUrl('profil.mp4')} type="video/mp4" />
              Browser Anda tidak mendukung video. <a href={videoUrl('profil.mp4')}>Unduh video</a>.
            </video>
          </div>
          <p className="d-block small text-secondary mt-2">Cerita singkat perjalanan Ayam Pak Gondesss sejak 2018</p>
        </div>
      </section>

      <section id="galeri" className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">DAPUR &amp; SUASANA</span>
            <h2>Galeri Cerita Ayam Pak Gondesss</h2>
            <p className="text-secondary">Klik foto untuk memperbesar.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {gallery.map((item, index) => {
              const modalId = `foto-galeri-${index + 1}`
              return (
                <article className="card p-4 h-100" id={`kartu-galeri-${index + 1}`} key={item.image}>
                  <a className="d-block" href={`#${modalId}`} data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                    <img className="photo img-fluid w-100 object-fit-cover rounded-3" src={imageUrl(item.image)} alt={item.alt} loading="lazy" />
                  </a>
                  <span className="badge bg-warning-subtle text-warning-emphasis">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p className="text-secondary">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">KUNJUNGI WARUNG KAMI</span>
            <h2>Lokasi Strategis &amp; Fasilitas Lengkap</h2>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="card p-4 h-100">
              <h3>Alamat Resmi</h3>
              <p>Jl. Dr. Susilo Raya No. 42, RT.02/RW.05, Kel. Grogol, Kec. Grogol Petamburan, Jakarta Barat 11450</p>
              <p className="small text-secondary">3 menit jalan kaki dari Halte TransJakarta Grogol / Kampus Trisakti.</p>
            </div>
            <div className="card p-4 h-100">
              <h3>Jam Operasional</h3>
              <p>Senin - Minggu<br /><strong>10.00 - 22.00 WIB</strong></p>
              <p className="small text-secondary">Dine-in, Takeaway, GoFood, GrabFood &amp; katering box.</p>
            </div>
            <div className="card p-4 h-100">
              <h3>Fasilitas</h3>
              <ul className="list-unstyled">
                <li>Free WiFi super cepat</li><li>Colokan listrik di tiap meja</li>
                <li>Area parkir motor luas</li><li>Ruang makan sejuk ber-AC</li>
                <li>Wastafel &amp; sabun cuci tangan</li><li>Musholla bersih &amp; tenang</li>
              </ul>
            </div>
          </div>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('menu')}>Lihat Menu</a>
            <a className="btn btn-outline-danger" href={pageUrl('kontak')}>Pesan Meja</a>
            <a className="btn btn-outline-danger" href={pageUrl('beranda')}>Ke Beranda</a>
          </div>
        </div>
      </section>

      {gallery.map((item, index) => {
        const modalId = `foto-galeri-${index + 1}`
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

export default Tentang