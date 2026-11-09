import { useEffect } from 'react'
import Beranda from './component/beranda.jsx'
import KontakPesan from './component/kontak_pesan.jsx'
import Menu from './component/menu.jsx'
import Tentang from './component/tentang.jsx'
import { SiteLayout } from './component/index.jsx'
import Cart from './component/cart.jsx'
import Admin from './component/admin.jsx'
import { CartProvider } from './component/cart-context.jsx'

const pages = {
  beranda: { title: 'Beranda', component: Beranda },
  menu: { title: 'Daftar Menu', component: Menu },
  tentang: { title: 'Tentang Kami', component: Tentang },
  kontak: { title: 'Kontak & Pesanan', component: KontakPesan },
  cart: { title: 'Keranjang Belanja', component: Cart },
  admin: { title: 'Admin Panel', component: Admin },
}

function App() {
  const requestedPage = new URLSearchParams(window.location.search).get('page')
  const page = pages[requestedPage] ? requestedPage : 'beranda'
  const { title, component: Page } = pages[page]

  useEffect(() => {
    document.title = `${title} | Ayam Pak Gondesss`
  }, [title])

  return (
    <CartProvider>
      {page === 'admin' ? (
        <Page />
      ) : (
        <SiteLayout activePage={page}>
          <Page />
        </SiteLayout>
      )}
    </CartProvider>
  )
}

export default App
