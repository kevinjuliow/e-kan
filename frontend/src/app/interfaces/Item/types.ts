export interface Item {
  id_item: string
  nama: string
  jenis_habitat: string
  jenis_bibit: string
  harga: number
  stock: number
  description: string
  penjual: {
    id_penjual: string
    nama: string
    email: string
    website?: string
    alamat: string
    no_telp?: string | null
    createdAt: string
    updatedAt: string
  }
}