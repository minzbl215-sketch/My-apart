# Lantai Atas

Game horror 2D berbasis web (HTML/CSS/JS murni) — bab 1 "Kunci Lama". Setting: apartemen kosong di lantai teratas gedung tua. Ada 3 ruangan detail buat dijelajahi pake karakter 2D + joystick, 4 cutscene sinematik, sistem dialog, 1 puzzle kode gembok, dan 2 jumpscare scripted.

**Soal chapter 2-5:** rencana besarnya emang mau sampe 5 chapter, tapi itu dikerjain bertahap per sesi (bukan sekali jadi) — chapter 1 ini dulu yang dirapihin standarnya, baru lanjut chapter berikutnya.

**Soal voice/dubbing:** belum ada di build ini. Nanti pas rekaman suara udah siap, tinggal dikasihkan filenya buat diintegrasiin.

## Cara main lokal
Buka `index.html` langsung di browser HP/laptop — file statis, gak butuh server.

## Cara upload ke GitHub Pages
1. Buat repo baru di GitHub (Public)
2. Upload semua file & folder ini: `index.html`, `style.css`, `story.js`, `game.js`, `manifest.json`, `service-worker.js`, `README.md`, dan folder `assets/` (isinya ikon + foto)
3. Settings → Pages → Source: **Deploy from a branch** → Branch `main` / `root` → Save
4. Tunggu 1-2 menit, buka link `https://username-lu.github.io/nama-repo/`

## Install jadi app di HP
- **Android (Chrome):** notifikasi "Install app" muncul otomatis, atau titik tiga → "Add to Home screen"
- **iPhone (Safari):** tombol Share → "Add to Home Screen"

## Struktur cerita bab 1
1. **Cutscene — Kedatangan**: naik tangga ke lantai 14
2. **Scene — Lorong**: cek kotak surat, apar rusak, buka pintu unit
3. **Cutscene — Masuk Unit**: lampu berkedip saat masuk
4. **Scene — Ruang Tengah**: TV tua (jumpscare pertama), kalender (petunjuk kode), foto keluarga (trigger flashback), rak buku
5. **Cutscene — Kilas Balik**: visi masa lalu penghuni sebelumnya
6. **Scene — Kamar**: meja rias (petunjuk kode kedua), buka lemari pake kode 3 digit (jumpscare kedua), lihat ke jendela
7. **Cutscene — Akhir Bab**: cliffhanger, sosok di gedung seberang
8. **Credits** (bisa diakses dari tombol di layar akhir)

## Puzzle kode gembok
Kode-nya "927" — didapat dari 2 petunjuk yang tersebar (kalender di ruang tengah kasih 2 digit pertama, catatan di meja rias kamar kasih digit terakhir). Kalau mau ganti kode/nambah puzzle baru, edit `STORY.puzzles` di `story.js`, lalu pasang `puzzle: "id_puzzle_baru"` di hotspot yang mau dikunci.

## Nambah cerita / bab baru
Semua isi ada di `story.js`:
- `STORY.scenes` — ruangan yang bisa dijelajahi (`bg()`, `playerStart`, `hotspots`)
- `STORY.cutscenes` — sekuens sinematik (`lines` + `draw()`)
- `STORY.puzzles` — teka-teki kode 3 digit (`solution`, `prompt`)
- `STORY.jumpscares` — jumpscare terjadwal
- Hotspot bisa punya kombinasi `puzzle`, `jumpscare`, `cutscene`, `goto` — urutannya: puzzle dulu (kalau ada) → baru jumpscare → baru cutscene → baru pindah scene/tamat

`game.js` (mesin game) gak perlu diubah kecuali mau nambah mekanik baru.

## Orientasi layar
Game ini didesain **landscape (horizontal)**. Kalau HP dipegang tegak, tampilan otomatis dipaksa landscape lewat CSS (gak bergantung ke pengaturan auto-rotate HP).

## Kontrol
- **Joystick bulat di pojok kiri bawah** → gerakin karakter
- Tap di layar (bukan di area joystick) saat dekat objek bercahaya → "ketuk untuk berinteraksi"
- Tap saat dialog/cutscene → percepat teks / lanjut
- Saat puzzle muncul → pakai tombol ▲▼ di tiap digit, lalu tap "buka"

## Karakter
Sprite karakter (cowok, hoodie) digambar langsung pake canvas di `game.js` (fungsi `drawPlayerSprite`) — bukan file gambar. Kalau mau ubah tampilannya, edit fungsi itu langsung.

## Ganti foto di loading screen
Timpa `assets/user-photo.jpg` dengan foto lu sendiri (idealnya persegi, ~400x400px), upload ulang ke GitHub di folder `assets/`.
