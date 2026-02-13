# 🚀 Deploy ke Vercel Lengkap dengan Database Supabase

## 📋 Overview

Panduan lengkap untuk deploy aplikasi Ayam Geprek ke Vercel dengan database Supabase PostgreSQL.

---

## 🎯 Prerequisites

- ✅ Repository GitHub: `safir2310/ayamgeprek2` (sudah siap)
- ✅ Account Vercel (gratis)
- ✅ Database Supabase: `ayamgeprekku` (sudah ada)
- ✅ Supabase Project REF: `eteuxazhlfpxavxwcztg`
- ✅ Database Password: `aYAGEPREKKU`

---

## 📦 Step 1: Import Repository ke Vercel

### 1.1 Buka Vercel Dashboard
- Kunjungi: https://vercel.com/new
- Login dengan GitHub account Anda

### 1.2 Import Repository
1. Cari repository: **safir2310/ayamgeprek2**
2. K tombol **"Import"**

### 1.3 Configure Project
- **Project Name:** `ayamgeprek2` (atau nama yang Anda inginkan)
- **Framework Preset:** Next.js
- **Root Directory:** `./` (default)
- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.next`
- **Install Command:** `bun install`

### 1.4 Klik **"Deploy"**
- Tunggu proses build selesai
- Deployment pertama akan gagal (karena belum ada environment variables)

---

## 🔐 Step 2: Add Environment Variables di Vercel

### 2.1 Buka Project Settings
1. Setelah deploy, klik **"Continue to Dashboard"**
2. Pergi ke **Settings** → **Environment Variables**

### 2.2 Hapus Environment Variables Lama (jika ada)
Jika ada variables berikut, **HAPUS** dulu:
- ❌ `POSTGRES_PRISMA_URL`
- ❌ `POSTGRES_URL`
- ❌ `POSTGRES_URL_NON_POOLING`
- ❌ `PRISMA_ACCELERATE_URL`
- ❌ Variable lain yang mereferensikan Secrets

### 2.3 Add Environment Variables Baru

#### Variable 1: DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:**
  ```
  postgresql://postgres.eteuxazhlfpxavxwcztg:aYAGEPREKKU@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
  ```
- **Environments:** ☑ Production ☑ Preview ☑ Development
- **Type:** Plain
- Click: **Save**

#### Variable 2: NEXTAUTH_SECRET
- **Name:** `NEXTAUTH_SECRET`
- **Value:**
  ```
  j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=
  ```
- **Environments:** ☑ Production ☑ Preview ☑ Development
- **Type:** Encrypted
- Click: **Save**

#### Variable 3: NEXTAUTH_URL
- **Name:** `NEXTAUTH_URL`
- **Value:** Copy production URL dari Vercel (lihat di bagian atas halaman)
  - Contoh: `https://ayamgeprek2.vercel.app`
- **Environments:** ☑ Production only
- **Type:** Plain
- Click: **Save**

**Catatan:** Jika deployment URL belum diketahui, bisa update NEXTAUTH_URL setelah deployment pertama berhasil.

---

## 📊 Step 3: Setup Database di Supabase

### 3.1 Buka Supabase Dashboard
- Kunjungi: https://supabase.com/dashboard/project/eteuxazhlfpxavxwcztg

### 3.2 Verify Database Connection
1. Pergi ke **Settings** → **Database**
2. Cek **Connection Info**
3. Pastikan database aktif

### 3.3 (Opsional) Push Schema via Vercel CLI

Jika Anda ingin meng-push schema dari lokal:

```bash
# Di komputer lokal Anda
git clone https://github.com/safir2310/ayamgeprek2.git
cd ayamgeprek2

# Create .env.local
cat > .env.local << 'ENVEOF'
DATABASE_URL="postgresql://postgres:aYAGEPREKKU@db.eteuxazhlfpxavxwcztg.supabase.co:5432/postgres?sslmode=require"
NEXTAUTH_SECRET=j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=
NEXTAUTH_URL=http://localhost:3000
ENVEOF

# Install dependencies
bun install

# Generate Prisma Client
bun run db:generate

# Push schema ke Supabase
bun run db:push
```

---

## 🔄 Step 4: Redeploy ke Vercel

### 4.1 Trigger Redeploy
1. Pergi ke **Deployments** tab di Vercel Dashboard
2. Klik tombol **"Redeploy"** (pojok kanan atas)
3. Pilih **"Redeploy without cache"**
4. Tunggu deployment selesai

### 4.2 Verifikasi Deployment
1. Buka deployment URL (contoh: https://ayamgeprek2.vercel.app)
2. Pastikan halaman homepage muncul dengan benar
3. Test navigasi antar halaman

---

## ✅ Step 5: Verify Database Connection

### 5.1 Test Application
1. Buka aplikasi: https://ayamgeprek2.vercel.app
2. Coba fitur-fitur yang ada:
   - Buka homepage
   - Coba cari menu
   - Coba filter kategori

### 5.2 Check Supabase Dashboard
1. Buka: https://supabase.com/dashboard/project/eteuxazhlfpxavxwcztg
2. Pergi ke **Table Editor**
3. Pastikan tables sudah ada (jika schema sudah di-push):
   - Admin
   - User
   - Produk
   - ProdukPoint
   - RedeemCode
   - WalletSaldo
   - WalletHistory
   - CartItem
   - Transaksi
   - TransaksiItem
   - Struk
   - ProfileToko
   - WalletSettings
   - RedeemHistory

---

## 🐛 Troubleshooting

### Error: "Environment Variable POSTGRES_PRISMA_URL references Secret"

**Solution:**
1. Hapus semua environment variables lama yang mereferensikan Secrets
2. Tambah hanya 3 variables baru (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
3. Redeploy

### Error: "Database connection failed"

**Solution:**
1. Verify DATABASE_URL di Vercel Dashboard
2. Cek Supabase project aktif
3. Test connection dari Supabase Dashboard

### Error: "NEXTAUTH_SECRET is invalid"

**Solution:**
1. Verify NEXTAUTH_SECRET sudah di-set
2. Pastikan value: `j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=`

### Error: "NEXTAUTH_URL is not configured"

**Solution:**
1. Add NEXTAUTH_URL environment variable
2. Set value ke production URL (contoh: https://ayamgeprek2.vercel.app)
3. Redeploy

---

## 📋 Environment Variables Summary

| Variable | Value | Environments | Type |
|----------|-------|--------------|------|
| `DATABASE_URL` | Supabase connection (pooling) | Production, Preview, Development | Plain |
| `NEXTAUTH_SECRET` | `j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=` | Production, Preview, Development | Encrypted |
| `NEXTAUTH_URL` | Production URL | Production only | Plain |

**DATABASE_URL (Production):**
```
postgresql://postgres.eteuxazhlfpxavxwcztg:aYAGEPREKKU@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Project (setelah import):** https://vercel.com/dashboard/ayamgeprek2
- **Supabase Dashboard:** https://supabase.com/dashboard/project/eteuxazhlfpxavxwcztg
- **GitHub Repository:** https://github.com/safir2310/ayamgeprek2

---

## 🎯 Quick Checklist

- [ ] Import repository ke Vercel
- [ ] Configure project settings
- [ ] Delete old environment variables (POSTGRES_*, PRISMA_*)
- [ ] Add DATABASE_URL
- [ ] Add NEXTAUTH_SECRET
- [ ] Add NEXTAUTH_URL
- [ ] Redeploy application
- [ ] Verify deployment works
- [ ] Test application functionality
- [ ] Check Supabase tables

---

## 🚀 After Deployment

### Domain Custom (Optional)
Jika ingin menggunakan custom domain:

1. Pergi ke **Settings** → **Domains**
2. Klik **"Add"**
3. Masukkan domain Anda
4. Follow instruksi DNS

### Automatic Deploys
Setiap push ke branch `main` akan otomatis trigger deploy:

```bash
git push origin main
```

---

## 📞 Support

Jika mengalami masalah:

1. **Check Build Logs:** Vercel Dashboard → Deployments → Click deployment → Build Output
2. **Check Runtime Logs:** Vercel Dashboard → Deployments → Click deployment → Function Logs
3. **Verify Environment Variables:** Vercel Dashboard → Settings → Environment Variables
4. **Check Supabase Status:** https://status.supabase.com

---

**Last Updated:** 2025-02-13  
**Status:** Ready to Deploy  
**Project:** Ayam Geprek Sambal Ijo
