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