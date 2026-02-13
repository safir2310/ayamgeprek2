'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingBag, Star, Flame, Clock, Truck, ShieldCheck, Menu as MenuIcon, X, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/logo';

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: string;
  promo: boolean;
  diskon: number;
  gambar?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Semua', icon: '🍽️' },
    { id: 'makanan', name: 'Makanan', icon: '🍗' },
    { id: 'minuman', name: 'Minuman', icon: '🥤' },
    { id: 'promo', name: 'Promo', icon: '🔥' },
    { id: 'diskon', name: 'Diskon', icon: '💰' },
    { id: 'terbaru', name: 'Terbaru', icon: '✨' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.kategori.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const features = [
    { icon: <Clock className="h-6 w-6" />, title: 'Pengiriman Cepat', description: 'Pesanan sampai dalam 30 menit' },
    { icon: <Truck className="h-6 w-6" />, title: 'Gratis Ongkir', description: 'Minimal belanja Rp 50.000' },
    { icon: <ShieldCheck className="h-6 w-6" />, title: 'Jaminan Kualitas', description: 'Bahan segar dan higienis' },
    { icon: <Flame className="h-6 w-6" />, title: 'Rasa Otentik', description: 'Sambal ijo khas Aceh' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#menu" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Menu
              </Link>
              <Link href="#promo" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Promo
              </Link>
              <Link href="#tentang" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Tentang
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hidden md:block">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Daftar
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <div className="flex flex-col gap-4">
                <Link href="#menu" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Menu
                </Link>
                <Link href="#promo" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Promo
                </Link>
                <Link href="#tentang" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Tentang
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Masuk
                  </Button>
                </Link>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Flame className="h-4 w-4 mr-2" />
                Promo Spesial Hari Ini!
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                AYAM GEPREK
                <br />
                <span className="text-yellow-300">SAMBAL IJO</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Pedasnya bikin nagih! 🔥 Nikmati ayam geprek dengan sambal ijo yang
                menggugah selera. Kualitas terbaik, harga terjangkau!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#menu">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-yellow-100 text-lg px-8">
                    Pesan Sekarang
                  </Button>
                </Link>
                <Link href="#tentang">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                  >
                    Tentang Kami
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <div className="text-orange-600">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Menu Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai menu lezat yang siap menggugah selera Anda
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari menu favorit Anda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg border-2 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'hover:border-orange-500 hover:text-orange-600'
                }
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="flex items-center justify-between mt-3">
                          <div className="h-6 bg-gray-200 rounded w-1/2" />
                          <div className="h-8 w-8 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                        {product.gambar ? (
                          <img
                            src={product.gambar}
                            alt={product.nama}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-8xl">🍗</span>
                        )}
                        {product.promo && (
                          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                            Promo {product.diskon}%
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{product.nama}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{product.deskripsi}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.promo && product.diskon > 0 && (
                              <p className="text-sm text-gray-400 line-through">
                                {formatCurrency(product.harga)}
                              </p>
                            )}
                            <p className="text-xl font-bold text-orange-600">
                              {formatCurrency(product.harga * (1 - (product.diskon || 0) / 100))}
                            </p>
                          </div>
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Beli
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Tidak ada menu yang ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Promo Section */}
      <section id="promo" className="py-16 md:py-24 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">PROMO SPESIAL!</h2>
              <p className="text-white/90 text-xl mb-8">
                Diskon hingga <span className="font-bold text-yellow-300">20%</span> untuk semua menu
                hari ini
              </p>
              <Link href="#menu">
                <Button size="lg" className="bg-white text-red-600 hover:bg-yellow-100 text-lg px-8">
                  Pesan Sekarang
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Tentang Kami</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Ayam Geprek Sambal Ijo hadir dengan resep khas Aceh yang melegenda. Sambal ijo
                kami dibuat dari cabai hijau segar pilihan yang dihaluskan dengan bumbu rahasia,
                menghasilkan rasa pedas yang nikmat dan tidak bikin sakit perut. Setiap ayam
                digoreng hingga krispi dan gurih, disajikan dengan nasi hangat dan lalapan
                segar.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
                  <div className="text-gray-600">Pelanggan Puas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Menu Variasi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
                  <div className="text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
                  <div className="text-gray-600">Rating Bintang</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Siap Mencoba Pedasnya?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Pesan sekarang dan nikmati ayam geprek sambal ijo terbaik di kota!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8">
                    Daftar Sekarang
                  </Button>
                </Link>
                <Link href="#menu">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg px-8"
                  >
                    Lihat Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 text-sm">
                Ayam Geprek Sambal Ijo - Pedasnya bikin nagih!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Menu</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#menu" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Makanan
                  </Link>
                </li>
                <li>
                  <Link href="#menu" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Minuman
                  </Link>
                </li>
                <li>
                  <Link href="#menu" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Promo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Bantuan</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Pengiriman
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Akun</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Masuk
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                    Daftar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Ayam Geprek Sambal Ijo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
