import { formatRupiah } from './cart-utils.js'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

export function buildReceiptHtml(order) {
  const rows = order.items.map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td class="number">${item.quantity}</td>
      <td class="number">${formatRupiah(item.price * item.quantity)}</td>
    </tr>
  `).join('')

  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Struk ${escapeHtml(order.id)} - Ayam Pak Gondesss</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 32px; color: #242424; font: 14px/1.5 Arial, sans-serif; }
      main { max-width: 680px; margin: 0 auto; }
      header, .thanks { text-align: center; }
      header { border-bottom: 1px dashed #777; padding-bottom: 16px; }
      h1 { margin: 0 0 4px; font-size: 24px; }
      p { margin: 4px 0; }
      dl { display: grid; grid-template-columns: 130px 1fr; gap: 5px 12px; margin: 20px 0; }
      dt { font-weight: bold; }
      dd { margin: 0; overflow-wrap: anywhere; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 9px 5px; border-bottom: 1px solid #ddd; text-align: left; vertical-align: top; }
      th { border-bottom: 1px solid #444; }
      .number { text-align: right; white-space: nowrap; }
      tfoot td { border-top: 1px solid #444; border-bottom: 0; font-weight: bold; }
      .notes { margin-top: 16px; }
      .thanks { border-top: 1px dashed #777; margin-top: 22px; padding-top: 14px; }
      @page { margin: 16mm; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Ayam Pak Gondesss</h1>
        <p>Jl. Dr. Susilo Raya No. 42, Grogol</p>
        <strong>STRUK PESANAN</strong>
      </header>
      <dl>
        <dt>No. Pesanan</dt><dd>${escapeHtml(order.id)}</dd>
        <dt>Tanggal</dt><dd>${escapeHtml(new Date(order.createdAt).toLocaleString('id-ID'))}</dd>
        <dt>Pelanggan</dt><dd>${escapeHtml(order.customer)}</dd>
        <dt>Telepon</dt><dd>${escapeHtml(order.phone)}</dd>
        <dt>Jenis layanan</dt><dd>${escapeHtml(order.service)}</dd>
      </dl>
      <table>
        <thead><tr><th>Menu</th><th class="number">Qty</th><th class="number">Jumlah</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td colspan="2">Total</td><td class="number">${formatRupiah(order.total)}</td></tr></tfoot>
      </table>
      ${order.notes ? `<p class="notes"><strong>Catatan:</strong> ${escapeHtml(order.notes)}</p>` : ''}
      <p class="thanks">Terima kasih telah memesan.</p>
    </main>
  </body>
</html>`
}

export function printReceipt(order) {
  const printWindow = window.open('', '_blank', 'width=800,height=700')
  if (!printWindow) {
    return false
  }

  printWindow.document.open()
  printWindow.document.write(buildReceiptHtml(order))
  printWindow.document.close()
  printWindow.onafterprint = () => printWindow.close()
  window.setTimeout(() => {
    printWindow.focus()
    printWindow.print()
  }, 300)
  return true
}
