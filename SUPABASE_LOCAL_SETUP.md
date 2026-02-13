# 🐘 Supabase Database Setup - Local Development Guide

## ⚠️ Important Note

**The cloud development environment cannot connect to external databases (like Supabase) due to firewall restrictions.**

You need to perform the database setup **on your local computer**.

---

## 🚀 Quick Setup (5 Minutes)

### Prerequisites

- Node.js 18+ or Bun installed
- Git installed
- Supabase account (already created: `ayamgeprekku`)
- Supabase project reference: `eteuxazhlfpxavxwcztg`
- Supabase password: `aYAGEPREKKU`

---

## 📋 Step-by-Step Instructions

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/safir2310/ayamgeprekku.git

# Navigate to project directory
cd ayamgeprekku
```

---

### Step 2: Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

---

### Step 3: Verify Environment Files

The `.env.local` file should already be configured with Supabase credentials:

```env
DATABASE_URL="postgresql://postgres:aYAGEPREKKU@db.eteuxazhlfpxavxwcztg.supabase.co:5432/postgres?sslmode=require"
NEXTAUTH_SECRET=j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=
NEXTAUTH_URL=http://localhost:3000
```

**Verify the file exists:**
```bash
cat .env.local
```

If `.env.local` doesn't exist, copy from `.env`:
```bash
cp .env .env.local
```

---

### Step 4: Generate Prisma Client

```bash
# Generate Prisma Client
bun run db:generate

# Expected output:
# ✔ Generated Prisma Client (v6.19.2)
```

---

### Step 5: Push Schema to Supabase

```bash
# Push schema to database
bun run db:push

# Expected output:
# Prisma schema loaded from prisma/schema.prisma
# Datasource "db": PostgreSQL database "postgres", schema "public" at "db.eteuxazhlfpxavxwcztg.supabase.co:5432"
# 
# 🚀  Your database is now in sync with your Prisma schema
# 
# ✔ Generated Prisma Client (v6.19.2)
```

---

### Step 6: Verify Database Tables

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project `ayamgeprekku`
3. Go to **Table Editor**
4. Verify all 14 tables are created:
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

### Step 7: Run Development Server

```bash
# Start development server
bun run dev

# Open browser to: http://localhost:3000
```

---

## 🔧 Troubleshooting

### Error: "Can't reach database server"

**Cause:** Network issue or wrong connection string

**Solution:**
1. Check your internet connection
2. Verify Supabase project is active (not paused)
3. Check `.env.local` file for correct connection string
4. Try pinging Supabase: `ping db.eteuxazhlfpxavxwcztg.supabase.co`

---

### Error: "FATAL: password authentication failed"

**Cause:** Incorrect password

**Solution:**
1. Verify password in `.env.local` is: `aYAGEPREKKU`
2. If password was changed, reset in Supabase Dashboard:
   - Go to: Settings → Database → Database password → Reset
3. Update `.env.local` with new password

---

### Error: "Environment variable not found"

**Cause:** `.env.local` file not found or not loaded

**Solution:**
1. Verify `.env.local` exists in project root
2. Check file content: `cat .env.local`
3. Restart development server
4. Ensure no typos in variable names

---

### Error: "relation does not exist"

**Cause:** Database tables not created yet

**Solution:**
```bash
# Push schema to database
bun run db:push
```

---

### Error: "Prisma Client not generated"

**Cause:** Prisma Client not generated

**Solution:**
```bash
# Generate Prisma Client
bun run db:generate
```

---

## 🌍 Production Deployment (Vercel)

### 1. Add Environment Variables in Vercel

Go to: **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**

Add the following variables:

| Name | Value | Environments |
|------|-------|--------------|
| `DATABASE_URL` | `postgresql://postgres.eteuxazhlfpxavxwcztg:aYAGEPREKKU@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require` | All |
| `NEXTAUTH_SECRET` | `j+GaOQzGbkcxbnoQEkCTVrHxP/YcD54cqNnC6h+5InY=` | All |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | All |

**Important:** Update `NEXTAUTH_URL` with your actual Vercel deployment URL.

---

### 2. Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Add Supabase database configuration"
git push origin main

# Deploy to Vercel (via GitHub integration or Vercel CLI)
vercel --prod
```

---

### 3. Verify Production Database

After deployment:
1. Open your app URL (e.g., https://your-app.vercel.app)
2. Try registering a new user
3. Check Supabase Dashboard → Table Editor → User table
4. Verify new user is created

---

## 📊 Database Schema Summary

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `Admin` | Admin accounts | userId, username, email, password |
| `User` | User accounts | userId, username, email, password, memberLevel |
| `Produk` | Menu items | nama, harga, kategori, gambar |
| `ProdukPoint` | Redeemable items | nama, poin, gambar |
| `RedeemCode` | Point codes | kode, poin, aktif |
| `RedeemHistory` | Redemption records | userId, poin, deskripsi |
| `WalletSaldo` | User wallet balances | userId, saldo |
| `WalletHistory` | Transaction history | userId, tipe, jumlah |
| `CartItem` | Shopping cart | userId, produkId, jumlah |
| `Transaksi` | Orders | strukId, userId, total, status |
| `TransaksiItem` | Order items | transaksiId, produkId, jumlah |
| `Struk` | Receipts | strukId, transaksiId, total |
| `ProfileToko` | Store profile | nama, alamat, noHp |
| `WalletSettings` | Wallet config | pointValue, minSaldoUse |

---

## 🔐 Security Notes

### ✅ DO:
- Keep `.env.local` file secure (never commit to git)
- Use strong passwords (min 12 characters)
- Enable SSL for all database connections
- Use connection pooling in production
- Regularly update dependencies

### ❌ DON'T:
- Never commit `.env.local` to git (it's in .gitignore)
- Never share connection strings publicly
- Never use default or weak passwords
- Never hardcode credentials in code

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## ✅ Setup Checklist

- [ ] Clone repository to local computer
- [ ] Install dependencies (bun install / npm install)
- [ ] Verify `.env.local` file exists with correct credentials
- [ ] Generate Prisma Client: `bun run db:generate`
- [ ] Push schema to Supabase: `bun run db:push`
- [ ] Verify 14 tables in Supabase Dashboard → Table Editor
- [ ] Run development server: `bun run dev`
- [ ] Test app locally: http://localhost:3000
- [ ] Add environment variables to Vercel
- [ ] Deploy to Vercel
- [ ] Update NEXTAUTH_URL with production URL
- [ ] Test production deployment

---

## 🆘 Support

If you encounter issues:

1. **Check logs:** Run `bun run dev` and check console output
2. **Verify connection:** Test database connection manually
3. **Check Supabase Dashboard:** Ensure project is active and tables exist
4. **Review logs:** Supabase Dashboard → Database → Logs
5. **Community:** [Supabase Discord](https://supabase.com/discord)

---

**Project:** Ayam Geprek  
**Database:** Supabase PostgreSQL  
**Project REF:** eteuxazhlfpxavxwcztg  
**Region:** Singapore (ap-southeast-1)  
**Last Updated:** 2025-02-13

---

**🎉 Congratulations! Your Supabase database is ready to use!**
