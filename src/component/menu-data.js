export const MENU_STORAGE_KEY = 'pakgondes_menu'

export const menuCategories = [
  'Paket Spesial',
  'Paket Nasi',
  'Paket Indomie',
  'Ala Carte & Cemilan',
  'Aneka Minuman',
]

export const menuCategoryLabels = {
  'Paket Spesial': 'Paket Spesial',
  'Paket Nasi': 'Paket Nasi',
  'Paket Indomie': 'Paket Indomie',
  'Ala Carte & Cemilan': 'Ala Carte',
  'Aneka Minuman': 'Minuman',
}

export const defaultMenuItems = [
  { id: 'nasi-ayam-geprek-sambal-gondes', category: 'Paket Nasi', name: 'Nasi Ayam Geprek Sambal Gondes', price: 30000, description: 'Nasi putih pulen, ayam crispy geprek berlumur sambal gondes ulek dadakan, lalapan segar.', image: 'geprek-gondes.jpg' },
  { id: 'nasi-ayam-goreng-sambal-kampoeng', category: 'Paket Nasi', name: 'Nasi Ayam Goreng Sambal Kampoeng', price: 30000, description: 'Nasi + ayam goreng rempah gurih, taburan kremesan garing, sambal terasi matang khas Semarang.', image: 'sambal-kampoeng.jpg' },
  { id: 'nasi-ayam-goreng-kalasan', category: 'Paket Nasi', name: 'Nasi Ayam Goreng Kalasan', price: 36000, description: 'Nasi + ayam goreng 1/4 ekor ungkep bumbu kalasan manis gurih, kremes, sambal & lalap.', image: 'kalasan.jpg' },
  { id: 'nasi-ayam-geprek-mozarella-sambal-gondes', category: 'Paket Nasi', name: 'Nasi Ayam Geprek Mozarella Sambal Gondes', price: 38000, description: 'Nasi hangat, ayam geprek sambal gondes dengan lelehan keju mozarella berlimpah.', image: 'geprek-mozarella.jpg' },
  { id: 'nasi-ayam-sambal-matah', category: 'Paket Nasi', name: 'Nasi Ayam Sambal Matah', price: 34000, description: 'Nasi putih dan ayam crispy dengan irisan bawang merah, serai, cabai rawit, minyak kelapa.', image: 'sambal-matah.jpg' },
  { id: 'nasi-goreng-kampoeng', category: 'Paket Nasi', name: 'Nasi Goreng Kampoeng', price: 29000, description: 'Nasi goreng aroma wajan rempah tradisional, suwiran ayam, pilihan telur ceplok/dadar.', image: 'nasi-goreng.jpg' },
  { id: 'indomie-ayam-geprek-sambal-gondes', category: 'Paket Indomie', name: 'Indomie Ayam Geprek Sambal Gondes', price: 25000, description: 'Indomie goreng atau kuah bersama 1 potong ayam geprek berlumur sambal.', image: 'indomie.jpg' },
  { id: 'indomie-telor-ceplok-dadar', category: 'Paket Indomie', name: 'Indomie Telor Ceplok / Dadar', price: 18000, description: 'Indomie goreng / kuah dengan sawi hijau segar dan telur ceplok atau dadar.' },
  { id: 'indomie-saja', category: 'Paket Indomie', name: 'Indomie Saja', price: 12000, description: 'Indomie goreng atau kuah dengan sentuhan sambal cabai geprek khas Pak Gondesss.' },
  { id: 'indomie-ayam-geprek-mozzarella-sambal-gondes', category: 'Paket Indomie', name: 'Indomie Ayam Geprek Mozzarella Sambal Gondes', price: 39000, description: 'Indomie goreng, ayam geprek pedas, dan lelehan keju mozzarella legit.' },
  { id: 'ayam-geprek-sambal-gondes', category: 'Ala Carte & Cemilan', name: 'Ayam Geprek Sambal Gondes', price: 25000, description: '1 porsi ayam geprek gurih garing tanpa nasi, level pedas 1 sampai 5.' },
  { id: 'ayam-goreng-sambal-kampoeng', category: 'Ala Carte & Cemilan', name: 'Ayam Goreng Sambal Kampoeng', price: 25000, description: '1 potong ayam goreng bumbu kuning dengan kremes dan sambal kampoeng.' },
  { id: 'ayam-goreng-kalasan', category: 'Ala Carte & Cemilan', name: 'Ayam Goreng Kalasan', price: 32000, description: 'Ayam 1/4 ekor ungkep santan gula jawa, gurih manis empuk sampai ke tulang.' },
  { id: 'terong-crispy-geprek', category: 'Ala Carte & Cemilan', name: 'Terong Crispy Geprek', price: 12000, description: 'Irisan terong berlapis tepung renyah digeprek dengan cabai rawit merah.' },
  { id: 'jamur-crispy', category: 'Ala Carte & Cemilan', name: 'Jamur Crispy', price: 13000, description: 'Jamur tiram segar dibalut tepung berbumbu, digoreng kering renyah.' },
  { id: 'telor-ceplok-dadar', category: 'Ala Carte & Cemilan', name: 'Telor Ceplok / Dadar', price: 8000, description: 'Telur ayam negeri, ceplok (mata sapi) atau dadar daun bawang.' },
  { id: 'nasi-putih-pulen', category: 'Ala Carte & Cemilan', name: 'Nasi Putih Pulen', price: 8000, description: 'Nasi putih hangat dari beras premium, porsi melimpah.' },
  { id: 'krupuk-gendar-kerung', category: 'Ala Carte & Cemilan', name: 'Krupuk Gendar / Kerung', price: 3000, description: 'Kerupuk tradisional khas Jawa Tengah dari beras, renyah dan gurih.' },
  { id: 'es-teh-manis-jumbo', category: 'Aneka Minuman', name: 'Es Teh Manis Jumbo', price: 6000, description: 'Teh melati wangi dengan gula pasir murni, disajikan dingin.', image: 'es-teh.jpg' },
  { id: 'nutrisari-jeruk', category: 'Aneka Minuman', name: 'Nutrisari Jeruk', price: 8000, description: 'Nutrisari rasa jeruk peras dingin.' },
  { id: 'es-milo', category: 'Aneka Minuman', name: 'Es Milo', price: 12000, description: 'Susu malt cokelat Milo kental, disajikan dingin.' },
  { id: 'air-mineral-botol-600ml', category: 'Aneka Minuman', name: 'Air Mineral Botol 600ml', price: 5000, description: 'Air mineral kemasan praktis (tersedia dingin dan suhu ruang).' },
]

export function readMenu() {
  const savedMenu = localStorage.getItem(MENU_STORAGE_KEY)
  if (savedMenu === null) return defaultMenuItems

  const items = JSON.parse(savedMenu)
  if (!Array.isArray(items) || items.some((item) => (
    !item
    || typeof item.id !== 'string'
    || typeof item.name !== 'string'
    || !menuCategories.includes(item.category)
    || !Number.isInteger(item.price)
    || item.price < 0
    || typeof item.description !== 'string'
  ))) {
    throw new Error('Data menu tersimpan tidak valid.')
  }
  return items
}

export function saveMenu(items) {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items))
}

export function groupMenuByCategory(items) {
  return Object.fromEntries(menuCategories.map((category) => [
    category,
    items.filter((item) => item.category === category).map((item) => item.name),
  ]))
}

export function createMenuId(name) {
  const slug = name.toLocaleLowerCase('id-ID')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `menu-${slug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
