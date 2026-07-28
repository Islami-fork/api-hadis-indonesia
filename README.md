# API Hadis Indonesia - RESTful API & Interactive Explorer 📖✨

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black.svg)](https://vercel.com/)

**API Hadis Indonesia** adalah layanan RESTful API gratis, terbuka, dan performa tinggi untuk mengakses teks 9 Kitab Hadis (*Kutubut Tis'ah*) berserta terjemahan bahasa Indonesia, teks Arab, penomoran, serta fitur pencarian. 

Aplikasi ini hadir lengkap dengan **Interactive API Sandbox/Tester**, **Eksplorator Hadis** (fitur Audio Text-to-Speech, Bookmark, dan Pembuat Kartu Kutipan), serta siap dideploy secara serverless ke **Vercel** atau server Node.js pilihan Anda.

---

## 🌟 Fitur Utama

- **9 Kitab Hadis Utama (*Kutubut Tis'ah*)**:
  - Shahih Bukhari (~7.008 Hadis)
  - Shahih Muslim (~5.362 Hadis)
  - Sunan Abu Daud (~4.419 Hadis)
  - Jami' At-Tirmidzi (~3.896 Hadis)
  - Sunan An-Nasa'i (~5.364 Hadis)
  - Sunan Ibnu Majah (~4.285 Hadis)
  - Musnad Ahmad (~4.305 Hadis)
  - Muwatta' Malik (~1.587 Hadis)
  - Sunan Ad-Darimi (~3.367 Hadis)
- **Endpoint Fleksibel**: Mendukung skema `/hadith/:perawiSlug` (dengan paginasi `page` & `limit`), `/hadith/:perawiSlug/:nomor`, `/books`, `/range`, `/random`, serta pencarian kata kunci `/api/search`.
- **Dukungan Berkas JSON Lokal + Multi-CDN Fallback**: Sistem pintar membaca berkas `.json` lokal di folder `data/`, dan otomatis mengalihkan ke CDN mirror jika berkas belum ada.
- **Bebas Akses CORS**: Dapat dipanggil langsung dari aplikasi Web (React, Vue, Angular), Mobile (Flutter, React Native, Kotlin, Swift), maupun backend server.
- **Tanpa API Key**: Layanan bebas digunakan tanpa registrasi atau otentikasi rumit.
- **Vercel Serverless Ready**: Dilengkapi konfigurasi `vercel.json` dan `server.ts` yang terintegrasi.

---

## 📂 Lokasi Berkas Data JSON Hadis

Jika Anda memiliki berkas database JSON (`abu-dawud.json`, `bukhari.json`, `muslim.json`, `list.json`, dll), letakkan berkas-berkas tersebut di salah satu folder berikut pada akar project:

```text
api-hadis-indonesia/
├── data/                    <-- [REKOMENDASI LOKASI UTAMA]
│   ├── abu-dawud.json
│   ├── ahmad.json
│   ├── bukhari.json
│   ├── darimi.json
│   ├── ibnu-majah.json
│   ├── list.json
│   ├── malik.json
│   ├── muslim.json
│   ├── nasai.json
│   └── tirmidzi.json
├── src/
│   └── data/               <-- [LOKASI ALTERNATIF]
└── public/
    └── data/               <-- [LOKASI ALTERNATIF]
```

> **Sistem secara otomatis akan mendeteksi dan memuat berkas dari folder `data/` secara instan tanpa perlu memanggil CDN eksternal.**

---

## 🚀 Dokumentasi Endpoint REST API

### 1. Daftar Perawi (Imam Hadis)
Mengembalikan daftar seluruh perawi beserta total ketersediaan hadis.

- **Endpoint**: `GET /hadith` atau `GET /api/hadith`
- **Contoh Request**: `GET https://domain-anda.com/hadith`
- **Contoh Response**:
  ```json
  {
    "code": 200,
    "message": "Success fetching list of narrators",
    "data": [
      { "name": "Abu Daud", "slug": "abu-dawud", "total": 4419, "id": "abu-daud" },
      { "name": "Bukhari", "slug": "bukhari", "total": 7008, "id": "bukhari" },
      { "name": "Muslim", "slug": "muslim", "total": 5362, "id": "muslim" }
    ]
  }
  ```

---

### 2. Daftar Hadis Berdasarkan Perawi (Paginasi)
Mengambil daftar hadis milik perawi tertentu secara terpaginasi.

- **Endpoint**: `GET /hadith/{perawiSlug}?page={page}&limit={limit}`
- **Parameter Query**:
  - `page` *(opsional, default: 1)*: Nomor halaman.
  - `limit` *(opsional, default: 20)*: Batas jumlah hadis per halaman.
- **Contoh Request**: `GET https://domain-anda.com/hadith/abu-dawud?page=1&limit=20`
- **Contoh Response**:
  ```json
  {
    "code": 200,
    "message": "Success fetching Hadiths for perawi abu-dawud",
    "data": {
      "name": "Abu Daud",
      "slug": "abu-dawud",
      "total": 4419,
      "pagination": {
        "totalItems": 4419,
        "currentPage": 1,
        "pageSize": 20,
        "totalPages": 221
      },
      "items": [
        {
          "number": 1,
          "arab": "...",
          "id": "..."
        }
      ]
    }
  }
  ```

---

### 3. Detail Hadis Spesifik Berdasarkan Perawi & Nomor
Mengambil 1 hadis spesifik dari perawi tertentu berdasarkan nomor hadis.

- **Endpoint**: `GET /hadith/{perawiSlug}/{nomorHadis}`
- **Contoh Request**: `GET https://domain-anda.com/hadith/abu-dawud/2`
- **Contoh Response**:
  ```json
  {
    "code": 200,
    "message": "Success fetching Hadith",
    "data": {
      "name": "Abu Daud",
      "slug": "abu-dawud",
      "total": 4419,
      "contents": {
        "number": 2,
        "arab": "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ مَسْلَمَةَ...",
        "id": "Telah menceritakan kepada kami Abdullah bin Maslamah..."
      }
    }
  }
  ```

---

### 4. Endpoint Tambahan

| Endpoint | Contoh Method & URL | Deskripsi |
| :--- | :--- | :--- |
| **Daftar Kitab** | `GET /books` | Mengembalikan status 9 kitab |
| **Range Batch** | `GET /books/bukhari/range/1-10` | Mengambil range nomor 1 s/d 10 |
| **Hadis Acak** | `GET /books/bukhari/random` atau `GET /random` | Mengambil 1 hadis secara acak |
| **Pencarian** | `GET /api/search?q=niat&book=bukhari` | Mencari kata kunci dalam teks hadis |
| **Server Health**| `GET /ping` | Cek status server/API (`{"status": "ok"}`) |

---

## 💻 Cara Menggunakan / Integration Snippet

### JavaScript (Fetch API)
```javascript
fetch('https://domain-anda.com/hadith/abu-dawud/2')
  .then(res => res.json())
  .then(response => {
    console.log("Nomor Hadis:", response.data.contents.number);
    console.log("Teks Arab:", response.data.contents.arab);
    console.log("Terjemahan:", response.data.contents.id);
  })
  .catch(err => console.error("Error:", err));
```

### cURL
```bash
curl -X GET "https://domain-anda.com/hadith/abu-dawud?page=1&limit=20" \
     -H "Accept: application/json"
```

### Python
```python
import requests

url = "https://domain-anda.com/hadith/abu-dawud/2"
response = requests.get(url)
data = response.json()

print(data['data']['contents']['id'])
```

---

## 🛠️ Instalasi & Pengembangan Lokal

### Prerequisites
- Node.js versi 18+ atau versi LTS terbaru.
- npm / yarn / pnpm.

### Langkah-langkah:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/username/api-hadis-indonesia.git
   cd api-hadis-indonesia
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Mode Mode Server Dev**:
   ```bash
   npm run dev
   ```
   Aplikasi dan API server akan berjalan di: `http://localhost:3000`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

5. **Jalankan Server Produksi**:
   ```bash
   npm start
   ```

---

## ☁️ Panduan Deploy ke Vercel

Aplikasi ini sudah dilengkapi berkas `vercel.json` dan siap dideploy langsung ke Vercel Serverless Functions.

### Metode 1: Via Vercel Dashboard (Rekomendasi)
1. Push repositori ini ke akun **GitHub** Anda.
2. Buka [Vercel New Project](https://vercel.com/new).
3. Import repositori dari GitHub.
4. Klik **Deploy** (Vercel akan secara otomatis mendeteksi `vercel.json` dan mengkonfigurasi Node.js Serverless Function).

### Metode 2: Via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## 📄 Lisensi

Project ini dilindungi di bawah lisensi [MIT License](LICENSE). Anda bebas menggunakan, memodifikasi, dan mendistribusikan aplikasi ini untuk keperluan komersial maupun non-komersial.

---

<p center>
  Dibuat untuk memudahkan umat Islam dan pengembang perangkat lunak dalam mengakses referensi Hadis Nabi SAW secara digital.
</p>
