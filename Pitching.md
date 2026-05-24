# 🎯 Panduan Pitching & Demonstrasi NusaSiaga AI

Dokumen ini disusun khusus sebagai **panduan presentasi (pitching) interaktif di depan Dosen Penguji**. Panduan ini dirancang untuk mendemonstrasikan keunggulan teknis, kegunaan praktis (*urgency*), keindahan UI/UX (*aesthetic value*), serta kelengkapan fitur prototipe clickable **NusaSiaga AI**.

---

## 🏛️ BAGIAN 1: PEMBUKAAN & STRUKTUR NILAI (Value Proposition)
> *Gunakan narasi ini saat membuka presentasi untuk merebut perhatian dosen penguji.*

* **Judul Proyek**: NusaSiaga AI — Disaster Intelligence & National Tropical Digital Twin Platform.
* **Paradigma Baru**: Transformasi manajemen bencana dari yang bersifat **Reaktif & Pasif** (hanya mencatat setelah kejadian) menjadi **Prediktif, Proaktif, dan Preventif** (mensimulasikan dampak sebelum bencana melanda).
* **Target Utama (B2G)**: Badan Penanggulangan Bencana Nasional (BNPB), BPBD Daerah, Pemerintah Provinsi/Kota, serta Masyarakat Luas.

---

## 🌐 BAGIAN 2: LANDING PAGE — PENJELASAN SETIAP SECTION
> *Jelaskan bagaimana halaman utama dirancang untuk memberikan impresi premium dan meyakinkan pengambil kebijakan.*

 Halaman ini menggunakan tema **Gelap Sinematik (Deep Navy & Emerald Glow)** dengan font modern **Space Grotesk** (`.text-hero`) dan grid topografi (`.contour-bg`) untuk mencerminkan nuansa *command center* taktis militer/kebencanaan.

### 1. **Cinematic Splash Screen**
* **Apa yang terjadi**: Saat pertama kali dibuka, layar tertutup warna hitam pekat dengan logo PNG asli NusaSiaga AI dan teks font Space Grotesk yang megah. Terdapat *loading bar* gradien serta teks status mikro yang berkedip secara periodik.
* **Poin Teknis untuk Dosen**: Mengimplementasikan *stateful loading timer* (3500ms) dengan transisi `transition-all duration-[750ms] ease-out opacity-0` untuk menciptakan transisi visual masuk yang dramatis dan mulus ke landing page.
* **Teks Status Mikro**: Mensimulasikan inisialisasi AI spasial (e.g., *"Memuat Geospatial Foundation Model..."*, *"Sinkronisasi Data BMKG & BNPB..."*).

### 2. **Hero Section (Pintu Utama)**
* **Fungsi**: Memberikan ringkasan instan mengenai platform dan menyajikan metrik statistik utama nasional.
* **Tombol Interaktif**:
  1. **"Eksplorasi Dashboard"**: Mengarahkan pengguna langsung ke halaman masuk sistem / Portal Login (`/login`).
  2. **"Ajukan Pilot" (atau "Ajukan Pilot Project")**: Membuka panel onboarding regional slide-over di sisi kanan layar.

### 3. **Tujuan Utama & Urgensi Section**
* **Fungsi**: Menjelaskan mengapa Indonesia membutuhkan NusaSiaga AI. Menyoroti tiga pilar kebencanaan tropis: kerawanan wilayah cincin api (*ring of fire*), tren curah hujan ekstrem akibat perubahan iklim, dan lambatnya koordinasi manual.

### 4. **Fitur Utama (Bento Grid)**
* **Fungsi**: Menyajikan fitur-fitur andalan dalam tata letak Bento Grid modern yang responsif.
* **Poin Desain**: Menggunakan kartu semi-transparan dengan efek *backdrop blur* (`.glass-card`) dan transisi hover yang halus.

### 5. **Cara Kerja / Alur Sistem (Workflow Infographic)**
* **Fungsi**: Menampilkan diagram linear alur pengolahan data kebencanaan dari hulu ke hilir:
  1. **Data Ingestion** (Mengonsumsi data satelit, sensor IoT, & BMKG).
  2. **AI Risk Modeling** (Memodelkan zona risiko curah hujan).
  3. **Digital Twin Simulation** (Mensimulasikan skenario infrastruktur & hidrologi).
  4. **Emergency Authorization** (Proses validasi dan approval komandan).
  5. **Omnichannel Broadcast** (Penyebaran peringatan evakuasi massal).

### 6. **Target User Section (Aktor Sistem)**
* **Fungsi**: Menunjukkan bahwa sistem mendukung kolaborasi multi-aktor secara terintegrasi (Komandan BNPB, Operator BPBD Daerah, Petugas Lapangan, dan Warga Sipil).

---

## 📑 BAGIAN 3: ALUR KHUSUS — "AJUKAN PILOT PROJECT"
> *Dosen akan sangat mengapresiasi alur onboarding ini karena mensimulasikan sistem Business-to-Government (B2G) yang nyata.*

### **Apa itu "Ajukan Pilot Project"?**
Ini adalah **program penyebaran regional** terpadu. Pemerintah daerah atau dinas terkait (seperti BPBD Kota Semarang atau DKI Jakarta) dapat mendaftarkan wilayah prioritas mereka untuk mendapatkan instalasi sistem NusaSiaga AI yang disesuaikan secara lokal.

### **Cara Kerja & Demonstrasi Langkah-Langkah (4-Step Onboarding):**
1. **Langkah 1: Informasi Instansi**
   * *Trik Demo*: Klik tombol **"Isi contoh data (demo cepat)"** di bagian atas untuk mengotomatisasi pengisian formulir instansi demi kelancaran presentasi. Formulir akan terisi dengan **BPBD Kota Semarang**, PIC **Dr. Ahmad Wijaya**, email, dan nomor telepon.
2. **Langkah 2: Wilayah Pilot**
   * Pengguna menentukan wilayah sasaran (Provinsi, Kota/Kabupaten, jumlah kecamatan terdampak).
   * *Interaksi Keren*: Pengguna dapat **mengklik peta SVG Indonesia** secara langsung untuk memilih wilayah secara spasial, atau memilih jenis risiko prioritas (seperti *Banjir*, *Rob*, atau *Tanah Longsor*).
3. **Langkah 3: Kebutuhan Sistem**
   * Memilih modul apa saja yang ingin dideploy (e.g. *Early Warning System*, *Digital Twin*, *Citizen Reporting*).
4. **Langkah 4: Review Implementasi & Rekomendasi AI**
   * Halaman ini menampilkan **AI Recommendation Card** yang memproses data masukan secara otomatis.
   * Menampilkan grafik gauge **Deployment Readiness Score** (e.g. 85%) untuk mengukur tingkat kesiapan teknis daerah, estimasi cakupan wilayah, dan estimasi waktu deploy (*timeline*).
5. **Pemrosesan & Efek Transisi Sukses**
   * Klik tombol **"Ajukan Pilot"**: Sistem akan menampilkan animasi **Radar Sweep** dengan loading teks berputar (*"Analyzing regional disaster profile..."*).
   * Menghasilkan **Implementation ID** unik (e.g. `NS-SEMARANG-2026-XXXXX`), membuktikan kesiapan alur kerja backend, dan menyediakan tombol unduh proposal PDF.

---

## 📊 BAGIAN 4: DASHBOARD COMMAND CENTER — PENJELASAN SETIAP TAB
> *Tab sidebar di sebelah kiri merupakan pusat operasional taktis NusaSiaga AI. Jelaskan kegunaan dan interaksi teknis di setiap tab berikut.*

### 🛠️ 1. Tab: **Overview**
* **Fungsi**: Beranda utama pusat komando nasional yang menampilkan peta sebaran bencana secara real-time.
* **Fitur Utama**:
  * **Interactive Risk Map (Leaflet)**: Peta interaktif berbasis lokasi. Klik salah satu wilayah bertanda risiko (merah/oranye/kuning) pada peta.
  * **RegionDetailPanel (Slide-out)**: Begitu wilayah diklik, panel detail wilayah akan terbuka di sebelah kanan untuk menyajikan:
    * Tingkat risiko spesifik (e.g., *AWAS*, *SIAGA*).
    * Grafik sensor tinggi air sungai.
    * Estimasi populasi rentan terdampak.
    * Log aktivitas sensor IoT terdekat.
  * **Alert Center Panel**: Daftar kejadian kritis terbaru di Indonesia.
  * **Sensor Status Panel**: Status kesehatan infrastruktur (Telemeter, Sensor Curah Hujan, Stasiun Radar).
  * **Citizen Feed Preview**: Laporan real-time langsung yang dikirim oleh warga di lapangan.

### 🔮 2. Tab: **Digital Twin (Simulasi Banjir)**
* **Fungsi**: Fitur tercanggih platform! Sebuah model simulasi prediktif berbasis input curah hujan dan kondisi fisik infrastruktur.
* **Cara Mendemonstrasikan di Depan Dosen**:
  * Geser **Slider Curah Hujan (Rainfall)** dan **Slider Tinggi Muka Air (Water Level)**.
  * *Lihat Perubahannya*: Nilai **Populasi Terdampak**, **Luasan Area Terendam (km²)**, dan **Jumlah Jalur Aman** akan berubah secara dinamis secara real-time berkat formula matematika prediktif di balik komponen `useSimulation` hook!
  * Klik Checkbox **"Tanggul Jebol (Dam Break)"**: Ini mensimulasikan kegagalan struktur tanggul air. Efeknya, **Populasi Terdampak melonjak 2x lipat**, **Area Terendam bertambah luas 40%**, dan **Risk Level** otomatis melompat ke warna merah menyala (**KRITIS**).
  * Klik Checkbox **"Jalur Evakuasi Tertutup"**: Mengurangi jumlah jalur aman evakuasi tersisa secara drastis menjadi hanya **2 jalur aman**, memicu peringatan rute kritis.
  * *Efek Visual Spasial*: Overlay air banjir pada peta Leaflet akan secara dinamis berubah intensitas birunya mengikuti skala parameter curah hujan yang digeser.

### 🔔 3. Tab: **Alerts (Manajemen Peringatan Dini)**
* **Fungsi**: Pusat otorisasi dan diseminasi peringatan dini multi-channel oleh Komandan BNPB / Operator BPBD.
* **Fitur Utama**:
  * **Alur Persetujuan (Approval Flow)**: Peringatan baru masuk dengan status "Menunggu". Pengguna dapat mengklik tombol **"Setujui"** atau **"Tolak"** untuk mengubah status otorisasi secara instan.
  * **Kustomisasi Pesan**: Tombol **"Edit"** membuka modal dialog interaktif untuk menyesuaikan isi teks instruksi evakuasi darurat sebelum dikirim ke publik.
  * **Diseminasi Omnichannel**: Klik tombol **"Kirim WhatsApp"**, **"Kirim SMS"**, **"Kirim Sirine"**, atau **"Kirim Push Notification"**. Sistem akan memicu notifikasi sukses instan yang mensimulasikan pengiriman pesan siaga ke jutaan nomor warga di wilayah terdampak serta menyalakan sirene fisik di lokasi bencana.

### 👥 4. Tab: **Citizen Reports (Laporan Warga)**
* **Fungsi**: Memfasilitasi partisipasi publik (*crowdsourced intelligence*) untuk memvalidasi kondisi lapangan (*ground truth*).
* **Fitur Utama**:
  * **Interaksi Klik Peta Spasial**: Pengguna dapat mengklik langsung pada peta Leaflet laporan bencana untuk menentukan titik koordinat Latitude & Longitude kejadian bencana secara presisi secara instan.
  * **Formulir Laporan Lengkap**: Masukkan kategori bencana (Banjir/Longsor), tingkat urgensi, ketinggian air (cm), dan unggah file foto nyata.
  * **Real-time Image Preview**: Memilih gambar akan langsung menampilkan pratinjau foto di dalam formulir.
  * **Dark SweetAlert Interaktif**: Saat tombol kirim diklik, modal SweetAlert premium bertema gelap akan muncul untuk verifikasi kebenaran data pelapor sebelum diteruskan ke sistem antrean validasi BPBD. Laporan yang dikirim akan langsung muncul di barisan atas daftar laporan warga.

### 🛢️ 5. Tab: **Data Sources (Sumber Data)**
* **Fungsi**: Menunjukkan transparansi integrasi data API eksternal dan integritas infrastruktur data.
* **Fitur Utama**:
  * Menyajikan kartu detail status koneksi untuk **BMKG Weather API**, **BNPB Inarisk**, **Satelit Himawari-9**, **Sensor IoT Air**, dan **Citizen Crowdsourcing Feed**.
  * Menampilkan metrik krusial: *Uptime (%)*, *Latency (ms)*, dan *Data Quality (%)* dengan visual meter bar warna-warni yang dinamis.
  * **UptimeChart (Recharts)**: Grafik visual interaktif yang menggambarkan perbandingan reliabilitas latensi dan kestabilan uptime koneksi antar penyedia data.

### 📈 6. Tab: **Analytics**
* **Fungsi**: Menyajikan visualisasi data historis dan tren statistik jangka panjang bencana untuk kebutuhan analisis strategis pemangku kebijakan.
* **Fitur Utama**:
  * **Rainfall Chart (Recharts)**: Grafik area interaktif yang menggambarkan fluktuasi curah hujan nasional dalam rentang waktu 24 jam terakhir. Dosen akan mengapresiasi kemampuan *tooltips* interaktif chart saat kursor diarahkan ke grafik.

### ⚙️ 7. Tab: **Settings (Pengaturan Sistem)**
* **Fungsi**: Mengatur konfigurasi operasional pusat komando, profil pengguna, dan parameter simulasi.
* **Fitur Utama**:
  * **Simulasi Pergantian Peran (Role Switcher)**: Pengguna dapat mengganti perannya (BNPB, BPBD, Pemerintah Daerah, Analis, Petugas Lapangan) di dalam tab **Profil**.
  * *Trik Demo Terbaik*: Pilih peran **"BNPB"** lalu klik **"Simpan Profil"**. SweetAlert sukses akan muncul, dan halaman akan memuat ulang secara otomatis (*auto-reload*). Perhatikan bahwa **Badge Peran di pojok kanan atas topbar dashboard** akan langsung berubah mengikuti peran baru yang dipilih! Ini menunjukkan fleksibilitas *state management* prototipe Anda.
  * **Tab Pengaturan Lainnya**: Menyediakan simulasi pengaturan *Notifikasi* (Telegram/WhatsApp Gateway), *Tampilan Peta* (High Contrast, Satelit), *Keamanan* (2FA), dan *Sistem* (BMKG Sync frequency).

---

## 💡 BAGIAN 5: TIPS & TRIK DEMONSTRASI (Best Practices)
* **Kuncinya adalah "Interaktivitas"**: Jangan hanya menunjukkan halaman secara pasif. Tunjukkan ke dosen bahwa prototipe ini **bereaksi secara logis terhadap setiap klik dan input**.
* **Gunakan Skenario Simulasi**: Beritahu dosen, *"Mari kita simulasikan skenario terburuk di Semarang Utara. Kita atur curah hujan di tingkat ekstrem (280mm/h) dan tiba-tiba tanggul jebol."* Tunjukkan bagaimana angka populasi terdampak melonjak drastis di layar.
* **Tekankan Kerapihan Kode & Arsitektur**: Sebutkan bahwa Anda memisahkan logika simulasi ke dalam *custom hook* React (`useSimulation`), memanfaatkan pemuatan komponen peta Leaflet secara dinamis (*lazy loading/dynamic import* tanpa SSR) demi performa kecepatan loading aplikasi yang maksimal, dan menggunakan Tailwind CSS murni untuk fleksibilitas styling tema gelap premium.

---
<p align="center">
  Selamat Presentasi! Tunjukkan yang Terbaik di Depan Dosen Penguji! 🚀🎓<br>
  <strong>NusaSiaga AI — Safer Communities through Intelligent Technology.</strong>
</p>
