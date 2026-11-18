// Edit file ini untuk mengganti aset atau menambah tautan kampanye.
window.CAMPAIGN_CONFIG = {
  // Isi dengan path file Baskerville BT Italic jika kamu punya lisensi webfont.
  baskervilleFont: "",

  images: {
    logo: {
      src: "./assets/logo-kampanye.png",
      alt: "Logo kampanye Pijarkan Cita",
    },
    portrait: {
      src: "./assets/foto-marvin.webp",
      alt: "Foto Marvin Dzaky Yahya, calon Ketua IMTI FTUI 2027 nomor urut 2",
      fit: "cover", // Ganti ke "contain" untuk foto PNG dengan latar transparan.
      position: "center 30%",
    },
  },

  // Urutan di sini sama dengan urutan kartu di website.
  // Isi url dengan https://... atau path lokal seperti ./assets/grand-design.pdf.
  // URL kosong menampilkan status "Segera tersedia".
  links: [
    {
      id: "narakarsa",
      title: "NaraKarsa dari Pijarkan Cita",
      description: "Visi, misi, dan rencana kerja untuk IMTI FTUI 2027.",
      url: "https://drive.google.com/drive/folders/1OoocOYxprg2I8felYhYQdJ0mv_DkKLN3",
      icon: "document",
      featured: true,
      preview: {
        src: "./assets/cover-narakarsa.webp",
        alt: "Sampul NaraKarsa dari Pijarkan Cita dengan foto Marvin Dzaky Yahya dan tiga nilai kampanye",
      },
    },
    {
      title: "Bukti Pengundangan",
      description: "Dokumentasi pengundangan kepada warga Teknik Industri.",
      url: "https://drive.google.com/drive/folders/1RkbZl-3yBxYISXlRzIWDC4VZYzE7AsTA",
      icon: "folder",
    },
  ],
};
