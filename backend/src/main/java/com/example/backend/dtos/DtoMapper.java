package com.example.backend.dtos;

import com.example.backend.dtos.alamatDtos.AlamatPembeliDto;
import com.example.backend.dtos.cartItemDtos.CartItemDto;
import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.itemPicturesDtos.ItemPIcturesDto;
import com.example.backend.dtos.mediaSosialDtos.MediaSosialDto;
import com.example.backend.dtos.InvoiceDtos.InvoiceDetailDto;
import com.example.backend.dtos.InvoiceDtos.InvoiceDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.dtos.profilePictureDtos.ProfilePictureDto;
import com.example.backend.models.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DtoMapper {
    public ItemDto toItemDto(ItemModel model) {
        if (model == null) {
            return null;
        }
        ItemDto dto = ItemDto.builder()
                .id_item(model.getId_item())
                .nama(model.getNama())
                .jenis_habitat(model.getJenis_habitat())
                .jenis_bibit(model.getJenis_bibit())
                .harga(model.getHarga())
                .stock(model.getStock())
                .description(model.getDescription())
                .tipe_penjualan(model.getTipe_penjualan())
                .ukuran_ikan(model.getUkuran_ikan())
                .penjual(toPenjualDto(model.getPenjual())).build();



        return dto;
    }

    public PembeliDto toPembeliDto (PembeliModel model) {
            if (model == null) {
                return null;
            }
            PembeliDto dto = PembeliDto.builder()
                    .id_pembeli(model.getId_pembeli())
                    .nama(model.getNama())
                    .email(model.getEmail())
                    .tanggal_lahir(model.getTanggal_lahir())
                    .no_telp(model.getNo_telp())
                    .createdAt(model.getCreatedAt())
                    .updatedAt(model.getUpdatedAt()).build();
            return dto;
    }
    public AlamatPembeliDto toAlamatDto (AlamatPembeliModel model) {
            if (model == null) {
                return null;
            }
            AlamatPembeliDto dto = AlamatPembeliDto.builder()
                    .id_alamat(model.getId_alamat())
                    .alamat_lengkap(model.getAlamat_lengkap())
                    .kode_pos(model.getKode_pos())
                    .kota(model.getKota())
                    .provinsi(model.getProvinsi())
                    .kabupaten(model.getKabupaten())
                    .keterangan(model.getKeterangan())
                    .pembeli(toPembeliDto(model.getPembeli()))
                    .build();
            return dto;
    }

    public PenjualDto toPenjualDto(PenjualModel model) {
        if (model == null) {
            return null;
        }
        PenjualDto dto = PenjualDto.builder()
                .id_penjual(model.getId_penjual())
                .nama(model.getNama())
                .email(model.getEmail())
                .website(model.getWebsite())
                .alamat(model.getAlamat())
                .no_telp(model.getNo_telp())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
        return dto;
    }

    public MediaSosialDto toMediaSosialDto (MediaSosialModel model) {
        if (model == null) {
            return null;
        }
        MediaSosialDto dto = MediaSosialDto.builder()
                .id_media_sosial(model.getId_media_sosial())
                .platform(model.getPlatform())
                .url(model.getUrl())
                .nama_akun(model.getNama_akun())
                .penjual(toPenjualDto(model.getPenjual())).build();

        return dto ;
    }

    public CartItemDto toCartItemDto(CartItemModel model) {
        if (model == null) {
            return null;
        }
        CartItemDto dto = CartItemDto.builder()
                .id_cart(model.getId_cart())
                .isChecked(model.getIsChecked())
                .jumlah_item(model.getJumlah_item())
                .pembeli(toPembeliDto(model.getPembeli()))
                .item(toItemDto(model.getItem())).build();

        return dto ;
    }


    public ProfilePictureDto toProfilePictureDto (ProfilePictureModel model) {
        if (model == null) {
            return null;
        }

        if (model.getPembeli() != null ) {
            ProfilePictureDto dto = ProfilePictureDto.builder()
                    .id(model.getId())
                    .data(model.getData())
                    .fileName(model.getFileName())
                    .fileType(model.getFileType())
                    .user_type(model.getUser_type())
                    .pembeli(toPembeliDto(model.getPembeli()))
                    .createdAt(model.getCreatedAt())
                    .updatedAt(model.getUpdatedAt())
                    .build();

            return dto ;
        }
            ProfilePictureDto dto = ProfilePictureDto.builder()
                    .id(model.getId())
                    .data(model.getData())
                    .fileName(model.getFileName())
                    .fileType(model.getFileType())
                    .user_type(model.getUser_type())
                    .penjual(toPenjualDto(model.getPenjual()))
                    .createdAt(model.getCreatedAt())
                    .updatedAt(model.getUpdatedAt())
                    .build();

            return dto ;

    }


    public ItemPIcturesDto toItemPicturesDto (ItemPicturesModel model) {
        if (model == null) {
            return null;
        }
        ItemPIcturesDto dto = ItemPIcturesDto.builder()
                .id(model.getId())
                .data(model.getData())
                .item(toItemDto(model.getItem()))
                .fileName(model.getFileName())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build() ;

        return dto ;
    }

    public InvoiceDto toInvoiceDto(InvoiceModel model) {
        if (model == null) {
            return null;
        }

        // Map notaDetails to their respective DTOs
        List<InvoiceDetailDto> notaDetailsDto = model.getInvoiceDetails().stream()
                .map(this::toInvoiceDetailsDto)
                .toList();

        InvoiceDto dto = InvoiceDto.builder()
                .id_invoice(model.getIdInvoice())
                .pembeli(toPembeliDto(model.getPembeli()))
                .alamat(toAlamatDto(model.getAlamat()))
                .invoiceDetails(notaDetailsDto)
                .totalHarga(model.getTotalHarga())
                .tanggalPembelian(model.getTanggalPembelian())
                .status(model.getStatus())
                .paymentType(model.getPaymentType())
                .vaNumbers(model.getVaNumbers())
                .build();

        return dto;
    }

    public InvoiceDetailDto toInvoiceDetailsDto(InvoiceDetailModel model) {
        if (model == null) {
            return null;
        }

        InvoiceDetailDto dto = InvoiceDetailDto.builder()
                .id_invoice_detail(model.getId_invoice_detail())
                .item(toItemDto(model.getItem()))
                .jumlahItem(model.getJumlahItem())
                .harga(model.getHarga())
                .build();

        return dto;
    }



}