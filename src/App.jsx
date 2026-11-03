import { useEffect } from 'react'
import Beranda from './component/beranda.jsx'
import KontakPesan from './component/kontak_pesan.jsx'
import Menu from './component/menu.jsx'
import Tentang from './component/tentang.jsx'
import { SiteLayout } from './component/index.jsx'

const pages = {
  beranda: { title: 'Beranda', component: Beranda },
  menu: { title: 'Daftar Menu', component: Menu },
  tentang: { title: 'Tentang Kami', component: Tentang },
  kontak: { title: 'Kontak & Pesanan', component: KontakPesan },
}

function App() {
  const requestedPage = new URLSearchParams(window.location.search).get('page')
  const page = pages[requestedPage] ? requestedPage : 'beranda'
  const { title, component: Page } = pages[page]

  useEffect(() => {
    document.title = `${title} | Ayam Pak Gondesss`
  }, [title])

  return (
    <SiteLayout activePage={page}>
      <Page />
    </SiteLayout>
  )
}

export default App
