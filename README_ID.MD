<p align="center">
    <img src="./lib/imgs/icon/icon.png" width="128" height="128" alt="SetMatic">
</p>

# SetMatic
![GitHub](https://img.shields.io/github/license/IRedDragonICY/MATDIS-Project?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/IRedDragonICY/MATDIS-Project?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/IRedDragonICY/MATDIS-Project/total?style=flat-square)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FIRedDragonICY%2FMATDIS-Project&label=Visitors&countColor=%23263759)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FIRedDragonICY%2FMATDIS-Project)

[EN](https://github.com/IRedDragonICY/MATDIS-Project/blob/1.0/README.md)
[ID](https://github.com/IRedDragonICY/MATDIS-Project/blob/1.0/README_ID.md)

SetMatic adalah program kalkulator himpunan yang digunakan untuk melakukan operasi himpunan seperti irisan, gabungan, penambahan, pengurangan, produk kartesian, dan selisih simetris. Program ini dikembangkan oleh Mohammad Farid Hendianto sebagai tugas untuk Universitas Ahmad Dahlan. Proyek ini hanya untuk tujuan pendidikan.

Dosen: Nur Rochman Dyah P.A, S.T., M.Kom
## Fitur

- Mendukung operasi himpunan: irisan, gabungan, penambahan, pengurangan, produk kartesian, dan selisih simetris.
- Menangani himpunan dengan anggota ganda.
- Mendukung penggunaan tanda kurung untuk mengelompokkan himpunan.

## Persyaratan

- Web browser dengan dukungan JavaScript.

## Instruksi Pembuatan

Untuk membuat SetMatic, Anda perlu memiliki npm dan electronjs terinstal di sistem Anda. Ikuti langkah-langkah di bawah ini untuk menginstalnya:
1. klon repositori ini ke mesin lokal Anda.  

    ```
    git clone https://github.com/IRedDragonICY/MATDIS-Project.git
    ```

2. Instal Node.js dari situs web resmi: https://nodejs.org/en/download/
3. Buka terminal Anda dan jalankan perintah berikut untuk menginstal electronjs:

    ```
    npm install --save-dev electron
    ```
4. Tambahkan Electron Forge sebagai dev-dependency dengan menjalankan perintah berikut:

    ```
    npm install --save-dev @electron-forge/cli 
    ```
5. Inisialisasi proyek baru dengan menjalankan perintah berikut:

    ```
    npx electron-forge import
    ```
6. Jalankan perintah berikut untuk membangun proyek:

    ```
    npm run make
    ```
7. Program yang dibangun akan berada di folder `out`.

## Penggunaan
<!-- Jelaskan bahwa ada dua aplikasi yaitu aplikasi web dan aplikasi -->
SetMatic memiliki dua versi: web dan desktop. Versi web dapat diakses di https://setmatic.vercel.app Versi desktop dapat diunduh dari halaman rilis repositori ini.

## Kontribusi

Kontribusi terbuka untuk meningkatkan program ini. Jika Anda menemukan masalah atau ingin melakukan perubahan, silakan ajukan permintaan tarik di repositori ini.

## Lisensi

SetMatic dirilis di bawah Lisensi GPL-3.0. Hak cipta © 2023 Universitas Ahmad Dahlan. Silakan lihat file `LICENSE` untuk informasi lebih lanjut.
