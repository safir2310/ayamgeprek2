# 🐘 Supabase Database Setup Guide

## 📋 Overview

Panduan lengkap untuk menghubungkan aplikasi **Ayam Geprek** dengan database **Supabase PostgreSQL**.

---

## 🚀 Quick Setup (5 Menit)

### 1. Buat Project Supabase

1. Buka [https://supabase.com/new](https://supabase.com/new)
2. Login atau buat akun baru (Gratis untuk starter)
3. Isi detail project:
   - **Organization**: Pilih atau buat baru
   - **Name**: `ayamgeprekku`
   - **Database Password**: Buat password yang kuat dan simpan!
   - **Region**: `Southeast Asia (Singapore)` (Disarankan untuk Indonesia)
4. Klik **"Create new project"**
5. Tunggu 2-3 menit hingga project ready

---

### 2. Dapatkan Connection Strings

Setelah project ready:

1. Buka: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Pilih project `ayamgeprekku`
3. Go to: **Settings** → **Database**
4. Scroll ke **"Connection string"**
5. Tab **"URI"** → Copy **"Node.js"** connection string

Format connection string:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

---

### 3. Update `.env.local`

Edit file `.env.local` di root project:

```bash
nano .env.local
```

Ganti placeholder dengan nilai asli:

```env
# Primary connection dengan pooling (Recommended)
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

# Direct connection tanpa pooling (untuk migrations)
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@xxxxx.supabase.co:5432/postgres"

# Authentication (sudah di-set)
NEXTAUTH_SECRET=j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=
NEXTAUTH_URL=http://localhost:3000
```

**Contoh lengkap:**
```env
DATABASE_URL="postgresql://postgres.abc123:MyS3cur3P@ssw0rd@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:MyS3cur3P@ssw0rd@abc123.supabase.co:5432/postgres"
NEXTAUTH_SECRET=j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=
NEXTAUTH_URL=http://localhost:3000"
```

**PENTING:**
- `[PROJECT-REF]` → Ganti dengan project reference dari Supabase
- `[PASSWORD]` → Ganti dengan database password yang Anda buat
- `[REGION]` → Ganti dengan region project Anda

---

### 4. Push Schema ke Supabase

Setelah `.env.local` diupdate, jalankan:

```bash
# Generate Prisma Client
bun run db:generate

# Push schema ke Supabase
bun run db:push
```

Output yang diharapkan:
```
✨ Generated Prisma Client
🚀  Your database is now in sync with your Prisma schema
```

---

### 5. Verifikasi di Supabase Dashboard

1. Buka: Supabase Dashboard → **Table Editor**
2. Pastikan semua tables terbentuk:
   - ✅ Admin
   - ✅ User
   - ✅ Produk
   - ✅ ProdukPoint
   - ✅ RedeemCode
   - ✅ WalletSaldo
   - ✅ WalletHistory
   - ✅ CartItem
   - ✅ Transaksi
   - ✅ TransaksiItem
   - ✅ Struk
   - ✅ ProfileToko
   - ✅ WalletSettings
   - ✅ RedeemHistory

---

## 🔧 Troubleshooting

### Error: `password authentication failed`

**Cause:** Password salah di connection string

**Solution:**
1. Reset password di Supabase: Settings → Database → Database password → Reset
2. Update password di `.env.local`
3. Push ulang schema: `bun run db:push`

---

### Error: `Connection timeout`

**Cause:** Koneksi internet atau project belum ready

**Solution:**
1. Cek koneksi internet
2. Pastikan project Supabase sudah **active** (bukan "Restoring...")
3. Cek region di connection string (harus sama dengan region project)

---

### Error: `Database does not exist`

**Cause:** Project reference salah

**Solution:**
1. Cek project reference di Supabase Dashboard URL:
   `https://supabase.com/dashboard/project/[PROJECT-REF]/...`
2. Pastikan `[PROJECT-REF]` di `.env.local` sama

---

### Error: `relation does not exist`

**Cause:** Schema belum di-push

**Solution:**
```bash
bun run db:push
```

---

### Error: `Environment variable not found`

**Cause:** `.env.local` tidak terbaca

**Solution:**
1. Pastikan file `.env.local` ada di root project
2. Pastikan formatnya benar (tanpa quotes di value, atau dengan quotes)
3. Restart dev server: Ctrl+C → `bun run dev`

---

## 📊 Database Schema

Berikut adalah 14 tables yang akan dibuat:

| Table | Deskripsi |
|-------|-----------|
| `Admin` | Data admin login |
| `User` | Data user & member |
| `Produk` | Produk makanan & minuman |
| `ProdukPoint` | Produk yang bisa ditukar dengan poin |
| `RedeemCode` | Kode redeem poin |
| `RedeemHistory` | Riwayat penukaran poin |
| `WalletSaldo` | Saldo wallet user |
| `WalletHistory` | Riwayat transaksi wallet |
| `CartItem` | Keranjang belanja |
| `Transaksi` | Pesanan / order |
| `TransaksiItem` | Item dalam pesanan |
| `Struk` | Struk pembelian |
| `ProfileToko` | Profil toko |
| `WalletSettings` | Pengaturan wallet & poin |

---

## 🔐 Security Best Practices

### ✅ DO:
- Gunakan password yang kuat (min 12 karakter, kombinasi huruf, angka, simbol)
- Jaga kerahasiaan `.env.local` (JANGAN share atau commit ke git)
- Gunakan connection pooling untuk production
- Set firewall rules di Supabase jika perlu

### ❌ DON'T:
- Jangan commit `.env.local` ke git (sudah di .gitignore)
- Jangan share connection string secara publik
- Jangan gunakan password default atau lemah
- Jangan hardcode credentials di code

---

## 🌍 Production Deployment

### Vercel Deployment

Untuk deploy ke Vercel dengan Supabase:

1. **Copy connection strings dari `.env.local`**

2. **Add ke Vercel Environment Variables:**
   - Buka: Vercel Dashboard → Project → Settings → Environment Variables
   - Add:
     - `DATABASE_URL` → (paste value dari .env.local)
     - `DIRECT_URL` → (paste value dari .env.local)
     - `NEXTAUTH_SECRET` → `j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=`
     - `NEXTAUTH_URL` → `https://your-app.vercel.app` (update setelah deploy)

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Supabase database configuration"
   git push origin main
   ```

4. **Update NEXTAUTH_URL:**
   - Setelah deploy berhasil, update `NEXTAUTH_URL` dengan production URL
   - Redeploy

---

### Netlify Deployment

1. **Add Environment Variables:**
   - Netlify Dashboard → Site → Settings → Environment Variables
   - Add: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

2. **Deploy:**
   - Connect Git repository
   - Build command: `bun run build`
   - Publish directory: `.next`

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs/prisma)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma Client](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

---

## ✅ Setup Checklist

- [ ] Buat project Supabase
- [ ] Copy connection strings
- [ ] Update `.env.local` dengan credentials
- [ ] Generate Prisma Client: `bun run db:generate`
- [ ] Push schema ke Supabase: `bun run db:push`
- [ ] Verifikasi tables di Supabase Dashboard
- [ ] Test koneksi lokal: `bun run dev`
- [ ] Deploy ke production (Vercel/Netlify)
- [ ] Add environment variables di platform hosting
- [ ] Update NEXTAUTH_URL dengan production URL
- [ ] Test production deployment

---

## 🆘 Support

Jika mengalami masalah:

1. Cek **Troubleshooting** section di atas
2. Cek error logs: `bun run dev`
3. Cek Supabase Dashboard → Database → Logs
4. Refer ke [Supabase Community](https://supabase.com/community)

---

**Last Updated:** 2025-02-13  
**Version:** 1.0.0
