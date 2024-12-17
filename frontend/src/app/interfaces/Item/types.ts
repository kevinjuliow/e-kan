export interface Item {
  id_item: string
  nama: string
  jenis_habitat: string
  jenis_bibit: string
  harga: number
  stock: number
  tipe_penjualan: string,
  ukuran_ikan?: string,
  description: string
  penjual: PenjualData
}

export interface PembeliData {
  id_pembeli: string
  nama: string
  email: string
  tanggal_lahir: string
  no_telp: string
  createdAt: string
  updatedAt: string
  profile_picture: string
}

export interface PenjualData {
  id_penjual: string
  nama: string
  email: string
  website?: string
  alamat: string
  no_telp?: string | null
  createdAt: string
  updatedAt: string
}

export interface CartData {
  id_cart: string
  jumlah_item: number
  is_checked: boolean
  item: Item
  pembeli: PembeliData
}

export interface Alamat {
  id_alamat: string
  alamat_lengkap: string
  kode_pos: string
  kota: string
  provinsi: string
  kabupaten: string
  kecamatan: string,
  rt: string,
  rw: string,
  keterangan: string
  pembeli: PembeliData
}

export interface CheckoutItem {
  item: Item;
  quantity: number;
  source: 'direct' | 'cart';
}

export interface InvoiceDetail {
  id_invoice_detail: string
  item: Item
  jumlahItem: number
  harga: number
}

export interface VaNumber {
  bank: string
  va_number: string
}

export interface Invoice {
  id_invoice: string
  pembeli: PembeliData
  alamat: Alamat
  invoiceDetails: InvoiceDetail[]
  totalHarga: number
  tanggalPembelian: string
  tanggalPembayaran: string
  paymentType: string
  vaNumbers: VaNumber
  status: string
}