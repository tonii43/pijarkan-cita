# Pijarkan Cita

Halaman tautan kampanye Marvin, calon Ketua IMTI FTUI 2027 nomor urut 2. Buka `index.html` di browser untuk melihat halaman. Website memakai HTML, CSS, dan JavaScript dan bisa langsung disajikan oleh Vercel.

## Isi tautan dan aset

1. Buka `campaign.config.js` untuk mengatur `url` pada **Narakarsa dari Pijarkan Cita** dan **Bukti Pengundangan**. Kartu dengan `url: ""` menampilkan **Segera tersedia**. Ganti `preview.src` dan `preview.alt` pada tautan Narakarsa jika sampulnya berubah.
2. Untuk menambah tautan, salin satu blok di dalam `links`, lalu edit `title`, `description`, `url`, dan `icon`. Ikon yang tersedia adalah `document`, `folder`, dan `link`. Gunakan `featured: true` untuk kartu dengan aksen kuning. Urutan kartu mengikuti urutan blok di file.
3. Logo dan foto dimuat dari `images.logo.src` dan `images.portrait.src`. Jika mengganti aset, sesuaikan path dengan nama file yang baru. Untuk foto berlatar transparan, coba `fit: "contain"`. Untuk mengatur area foto yang terlihat, ubah `position`, misalnya `"center 15%"`.
4. Untuk Baskerville BT Italic, simpan webfont yang kamu punya lisensinya sebagai `assets/baskerville-bt-italic.woff2` dan isi `baskervilleFont: "./assets/baskerville-bt-italic.woff2"`. Halaman memakai Baskerville BT jika sudah tersedia di perangkat pengunjung, lalu memakai Baskervville Italic sebagai cadangan. Inter dimuat dari Google Fonts dengan Arial sebagai cadangan.
5. Pada folder Google Drive bukti pengundangan, atur **Share → General access → Anyone with the link → Viewer**. Buka tautan di jendela incognito untuk mengecek bahwa warga bisa melihat dokumennya.

Contoh blok tambahan di dalam `links`:

```js
{
  title: "Instagram Pijarkan Cita",
  description: "Ikuti kabar kampanye Marvin.",
  url: "", // Isi dengan URL profil resmi.
  icon: "link",
},
```

## Hubungkan ke GitHub

1. Ekstrak paket di laptop dan buka PowerShell di dalam folder `pijarkan-cita-links`.
2. Buat repository kosong di GitHub. Kalau file ini akan masuk repo yang sudah ada, clone repo tersebut dan salin isi folder ke lokasi yang kamu pilih, lalu jalankan bagian **Update setelah terhubung** dari checkout itu.
3. Untuk repo baru, jalankan perintah di bawah. Ganti `USERNAME` dan `NAMA-REPO` dengan nama akun dan repo GitHub-mu. Saat Git meminta login, selesaikan lewat prompt Git Credential Manager atau metode autentikasi GitHub yang sudah kamu pakai.

```powershell
git init -b main
git add .
git commit -m "Buat website Pijarkan Cita"
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

[Panduan GitHub untuk mengunggah project lokal](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## Deploy ke Vercel

1. Buka dashboard Vercel, pilih **Add New → Project**, lalu impor repo GitHub. Vercel mungkin meminta akses ke repo tersebut.
2. Pilih **Framework Preset → Other**. Aktifkan **Override** untuk **Build Command** dan biarkan kolomnya kosong agar Vercel melewati langkah build. Biarkan **Output Directory** memakai default. Bila `index.html` ada di subfolder repo, pilih subfolder itu sebagai **Root Directory**. Bila `index.html` ada di root repo, gunakan root repo.
3. Klik **Deploy**. Buka URL produksi dan coba kedua kartu yang sudah diisi, termasuk di browser HP.

[Konfigurasi build Vercel](https://vercel.com/docs/builds/configure-a-build) · [Deploy dari Git ke Vercel](https://vercel.com/docs/git)

## Update setelah terhubung

Edit aset atau `campaign.config.js`, cek halaman, lalu commit dan push ke branch produksi. Contoh jika file berada di root repository dan branch produksi adalah `main`:

```powershell
git add campaign.config.js assets
git commit -m "Update tautan dan aset kampanye"
git push origin main
```

Vercel akan menerbitkan deployment produksi baru setelah push ke branch produksi berhasil. Untuk meminta bantuan update dari ChatGPT nanti, buka folder repo ini sebagai workspace dan bagikan URL repo GitHub serta nama branch produksi. Push dari workspace membutuhkan autentikasi Git dengan izin tulis pada repo.
