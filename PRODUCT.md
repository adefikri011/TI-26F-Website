# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pengunjung acak dari tautan Instagram @ti26f (target tidak pasti, demografis tidak diketahui), anggota kelas TI26F yang butuh info kelas, serta admin/pengurus kelas (ketua atau wakil) yang mengelola data lewat panel admin terproteksi login.

## Product Purpose

Website profil kelas kuliah TI26F: menampilkan identitas kelas, anggota, jadwal kuliah, galeri kenangan, dan pengumuman. Kesuksesan = pengunjung dari Instagram bisa mengenal kelas dan menemukan info yang dicari (terutama jadwal & pengumuman) dengan mudah, terutama dari HP.

## Positioning

Kelas kuliah dengan identitas dunia sihir Harry Potter — "Our Little Hogwarts" — yang terhubung langsung ke kehadiran Instagram @ti26f. Mekanisme yang tidak bisa ditiru tetangga: satu-satunya website kelas yang menyatukan tema HP konsisten (dari nama halaman sampai detail visual) dengan data kelas yang dikelola real-time dari database.

## Operating Context

- Tautan website dibagikan lewat Instagram @ti26f; pengunjung datang dari feed/story, biasanya dari perangkat mobile.
- Admin mengelola konten (member, jadwal, galeri, pengumuman) melalui halaman /admin dengan login Supabase Auth.
- Backend: Supabase (PostgreSQL + Auth + Storage); frontend deploy ke Vercel/Netlify.
- Konten diperbarui berkala mengikuti kehidupan kelas kuliah (jadwal per semester, pengumuman mendadak, foto acara).

## Capabilities and Constraints

- Halaman publik: Home, About, Members, Schedule, Gallery, Announcements, 404.
- Panel admin: CRUD member (dengan foto), jadwal, galeri (upload/hapus), pengumuman — semua data asli dari Supabase, tanpa data dummy di halaman publik.
- Wajib mobile-first: pengalaman di HP lebih diutamakan daripada desktop.
- Ringan & performa baik (tanpa library berat; animasi hemat).
- Bahasa isi: Indonesia dominan; judul/brand halaman boleh istilah Inggris ala Harry Potter.
- Tidak ada fitur akun publik; hanya admin yang login.

## Brand Commitments

- Nama kelas: TI26F.
- Tema visual & naratif: Harry Potter (ikatan eksplisit dari pemilik — wajib dipertahankan di semua permukaan).
- Tagline: "Our Little Hogwarts".
- Kehadiran sosial: Instagram @ti26f.
- Suara: playful-fan, hangat, sedikit teatrikal ala dunia sihir, tetapi tetap jelas & berguna.

## Evidence on Hand

- Foto anggota, data jadwal, dan foto galeri sudah disiapkan pemilik (belum semua masuk database).
- Skema database Supabase sudah dibuat dan terverifikasi (5 tabel + storage buckets).
- Admin panel sudah berfungsi penuh.
- Aset asli (foto, konten) milik kelas; belum ada di repo — pekerjaan berikutnya harus mengisi dari data asli, jangan mengarang konten palsu.

## Product Principles

1. Data nyata, tanpa dummy — website gagal jika menampilkan konten palsu di halaman publik.
2. Mobile-first — keputusan layout diambil dari layar kecil ke besar, bukan sebaliknya.
3. Ringan & cepat — animasi dan dekorasi tidak boleh mengorbankan performa.
4. Bebas jejak "AI slop" — tampilan harus punya karakter HP yang konsisten, bukan template generik.
5. Admin semudah WhatsApp — pengurus kelas non-teknis harus bisa update konten tanpa bantuan developer.

## Accessibility & Inclusion

Standar dasar: kontras warna terbaca, navigasi keyboard berfungsi, alt text pada foto, dan dukungan prefers-reduced-motion untuk animasi.
