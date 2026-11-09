export const menuByCategory = {
  'Paket Nasi': [
    'Nasi Ayam Geprek Sambal Gondes',
    'Nasi Ayam Goreng Sambal Kampoeng',
    'Nasi Ayam Goreng Kalasan',
    'Nasi Ayam Geprek Mozarella Sambal Gondes',
    'Nasi Ayam Sambal Matah',
    'Nasi Goreng Kampoeng',
  ],
  'Paket Indomie': [
    'Indomie Ayam Geprek Sambal Gondes',
    'Indomie Telor Ceplok / Dadar',
    'Indomie Saja',
    'Indomie Ayam Geprek Mozzarella Sambal Gondes',
  ],
  'Ala Carte & Cemilan': [
    'Ayam Geprek Sambal Gondes',
    'Ayam Goreng Sambal Kampoeng',
    'Ayam Goreng Kalasan',
    'Terong Crispy Geprek',
    'Jamur Crispy',
    'Telor Ceplok / Dadar',
    'Nasi Putih Pulen',
    'Krupuk Gendar / Kerung',
  ],
  'Aneka Minuman': [
    'Es Teh Manis Jumbo',
    'Nutrisari Jeruk',
    'Es Milo',
    'Air Mineral Botol 600ml',
  ],
}

export const menuPrices = {
  'Nasi Ayam Geprek Sambal Gondes': 30000,
  'Nasi Ayam Goreng Sambal Kampoeng': 30000,
  'Nasi Ayam Goreng Kalasan': 36000,
  'Nasi Ayam Geprek Mozarella Sambal Gondes': 38000,
  'Nasi Ayam Sambal Matah': 34000,
  'Nasi Goreng Kampoeng': 29000,
  'Indomie Ayam Geprek Sambal Gondes': 25000,
  'Indomie Telor Ceplok / Dadar': 18000,
  'Indomie Saja': 12000,
  'Indomie Ayam Geprek Mozzarella Sambal Gondes': 39000,
  'Ayam Geprek Sambal Gondes': 25000,
  'Ayam Goreng Sambal Kampoeng': 25000,
  'Ayam Goreng Kalasan': 32000,
  'Terong Crispy Geprek': 12000,
  'Jamur Crispy': 13000,
  'Telor Ceplok / Dadar': 8000,
  'Nasi Putih Pulen': 8000,
  'Krupuk Gendar / Kerung': 3000,
  'Es Teh Manis Jumbo': 6000,
  'Nutrisari Jeruk': 8000,
  'Es Milo': 12000,
  'Air Mineral Botol 600ml': 5000,
}

export function createContactOrder({ category, menu, customer, phone, quantity, service, notes }, createdAt = new Date()) {
  if (!menuByCategory[category]?.includes(menu)) {
    throw new Error('Menu tidak sesuai dengan kategori yang dipilih.')
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Jumlah pesanan minimal satu.')
  }

  const price = menuPrices[menu]
  return {
    id: `PG-${createdAt.getTime()}`,
    customer: customer.trim(),
    phone: phone.trim(),
    service,
    notes: notes.trim(),
    category,
    items: [{
      id: menu.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name: menu,
      price,
      quantity,
    }],
    total: price * quantity,
    status: 'Baru',
    createdAt: createdAt.toISOString(),
  }
}
