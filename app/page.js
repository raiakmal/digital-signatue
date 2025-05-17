"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  X,
  FileDigit,
  ShieldCheck,
  CheckSquare,
  ImageIcon,
  Stamp,
  Users,
  QrCode,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TechnologyDetails } from "@/components/technology-details";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tab1");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Router handler functions from original page
  const handleSign = () => {
    router.push("/sign");
  };

  const handleVerify = () => {
    router.push("/verify");
  };

  const handleSignWatermark = () => {
    router.push("/sign-visible-watermark");
  };

  const handleCollectiveWatermark = () => {
    router.push("/sign-collective-watermark");
  };

  const handleSignCollective = () => {
    router.push("/sign-collective");
  };

  const handleVerifyCollective = () => {
    router.push("/verify-collective");
  };

  const handleGenerateQR = () => {
    router.push("/generate-qr");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black/95 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            <span className="text-[#D4AF37]">SHIELD</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="#home"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Beranda
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Tentang Kami
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Fitur Sertifikasi
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Cara Kerja
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Testimoni
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-white hover:text-[#D4AF37]"
            >
              Kontak
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-20 w-full bg-black/95 py-4 shadow-md md:hidden">
            <div className="container mx-auto flex flex-col space-y-4 px-4">
              <Link
                href="#home"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Fitur Sertifikasi
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Cara Kerja
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimoni
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-white hover:text-[#D4AF37]"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-black pt-20 text-white"
      >
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/fabric-texture.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Perlindungan Dokumen Kolaboratif di Industri Fashion Digital
            </h1>
            <h2 className="mt-4 font-serif text-xl font-semibold text-[#D4AF37] sm:text-2xl md:text-3xl">
              Menggunakan Digital Signature ECDSA dan Hash Function BLAKE3
            </h2>
            <p className="mt-6 text-xl text-gray-300">
              SHIELD: Secure Hash for Integrated Electronic Design Protection
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="w-full bg-[#D4AF37] text-black hover:bg-[#C5A028] sm:w-auto"
                onClick={handleSign}
              >
                Tandatangani Koleksi Fashion Anda
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 sm:w-auto"
                onClick={() =>
                  document.getElementById("features").scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5E7A3] to-[#D4AF37]" />
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-900 py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tentang SHIELD
            </h2>
            <div className="mt-2 mb-6 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <p className="mt-4 text-lg text-gray-300">
              SHIELD (Secure Hash for Integrated Electronic Design Protection)
              adalah platform perlindungan dokumen kolaboratif yang dirancang
              khusus untuk industri fashion digital. Kami menggunakan teknologi
              Digital Signature ECDSA dan Hash Function BLAKE3 untuk memberikan
              keamanan maksimal pada karya kreatif para desainer.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-xl font-semibold text-white">
                Visi Kami
              </h3>
              <p className="text-gray-300">
                Menciptakan ekosistem fashion yang aman dan terpercaya, di mana
                setiap desainer dapat melindungi karya mereka dengan teknologi
                digital yang elegan dan efektif.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-xl font-semibold text-white">
                Misi Kami
              </h3>
              <p className="text-gray-300">
                Menyediakan solusi perlindungan digital terbaik yang
                memungkinkan desainer fashion fokus pada kreativitas tanpa
                khawatir tentang peniruan karya mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Tabs */}
      <section id="features" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sertifikasi Digital untuk Karya Fashion Anda
            </h2>
            <div className="mt-2 mb-6 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <p className="mt-4 text-lg text-gray-300">
              Perlindungan gaya dan desain Anda dengan teknologi tanda tangan
              digital
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="tab1" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-3xl grid-cols-2 gap-2 bg-white p-1 md:grid-cols-4">
                  <TabsTrigger
                    value="tab1"
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                  >
                    Tanda Tangan Digital
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab2"
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                  >
                    Verifikasi
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab3"
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                  >
                    Watermark
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab4"
                    className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                  >
                    QR Code
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="tab1" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <FileDigit className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Tanda Tangan Digital
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Buat tanda tangan digital yang aman untuk melindungi
                      desain fashion Anda dari peniruan. Teknologi enkripsi
                      256-bit memastikan keamanan maksimal untuk setiap karya
                      Anda.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleSign}
                    >
                      <span className="flex items-center justify-between">
                        Tanda Tangan Digital
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Tanda Tangan Kolektif
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Ideal untuk brand fashion dengan multiple designers yang
                      perlu melindungi karya bersama. Semua pihak yang terlibat
                      dapat memverifikasi dan mengklaim kepemilikan.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleSignCollective}
                    >
                      <span className="flex items-center justify-between">
                        Tanda Tangan Kolektif
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Verifikasi Tanda Tangan Digital
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Verifikasi keaslian desain fashion yang telah dilindungi
                      dengan tanda tangan digital. Proses verifikasi cepat dan
                      akurat untuk membuktikan keaslian karya Anda.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleVerify}
                    >
                      <span className="flex items-center justify-between">
                        Verifikasi Tanda Tangan Digital
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <CheckSquare className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Verifikasi Tanda Tangan Kolektif
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Verifikasi keaslian karya kolaborasi fashion yang telah
                      dilindungi secara digital. Ideal untuk proyek kolaborasi
                      antar desainer atau brand.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleVerifyCollective}
                    >
                      <span className="flex items-center justify-between">
                        Verifikasi Tanda Tangan Kolektif
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Tanda Tangan Gambar dengan Watermark
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Lindungi lookbook dan katalog fashion Anda dengan
                      watermark digital yang elegan. Watermark dirancang untuk
                      tidak mengganggu estetika desain Anda.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleSignWatermark}
                    >
                      <span className="flex items-center justify-between">
                        Tanda Tangan Gambar dengan Watermark
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                      <Stamp className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      Tanda Tangan Kolektif dengan Watermark
                    </h3>
                    <p className="mb-4 text-gray-300">
                      Sempurna untuk kolaborasi desainer fashion dengan
                      watermark eksklusif untuk karya bersama. Mencakup
                      informasi semua pihak yang terlibat dalam desain.
                    </p>
                    <button
                      className="mt-2 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                      onClick={handleCollectiveWatermark}
                    >
                      <span className="flex items-center justify-between">
                        Tanda Tangan Kolektif dengan Watermark
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tab4" className="mt-6">
                <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#D4AF37]">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                    Generate QR Code
                  </h3>
                  <p className="mb-4 text-gray-300">
                    Buat QR Code eksklusif untuk memudahkan verifikasi keaslian
                    desain fashion Anda. QR Code dapat ditempatkan pada label,
                    tag, atau sertifikat keaslian produk Anda.
                  </p>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Fitur QR Code
                      </h4>
                      <ul className="list-inside list-disc space-y-2 text-gray-300">
                        <li>Verifikasi instan dengan pemindaian sederhana</li>
                        <li>Tampilkan informasi desainer dan detail produk</li>
                        <li>Lacak riwayat kepemilikan dan otentikasi</li>
                        <li>
                          Desain QR code yang elegan dan dapat disesuaikan
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="h-48 w-48 rounded-lg bg-gray-900 p-4 shadow-inner">
                        <div className="flex h-full w-full items-center justify-center rounded bg-black p-2 shadow-sm">
                          <div className="h-32 w-32 bg-black p-2">
                            <div className="grid h-full w-full grid-cols-7 grid-rows-7 gap-1">
                              {/* Simplified QR code visual representation */}
                              <div className="col-span-3 row-span-3 bg-[#D4AF37]"></div>
                              <div className="col-span-1 row-span-3"></div>
                              <div className="col-span-3 row-span-3 bg-[#D4AF37]"></div>
                              <div className="col-span-3 row-span-1"></div>
                              <div className="col-span-1 row-span-1"></div>
                              <div className="col-span-3 row-span-1"></div>
                              <div className="col-span-3 row-span-3 bg-[#D4AF37]"></div>
                              <div className="col-span-1 row-span-3"></div>
                              <div className="col-span-3 row-span-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full rounded-md bg-[#D4AF37] py-2 px-4 text-left text-black transition-all hover:bg-[#C5A028]"
                    onClick={handleGenerateQR}
                  >
                    <span className="flex items-center justify-between">
                      Generate QR Code
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technology Details component will be created separately */}
      <TechnologyDetails />

      {/* How It Works */}
      <section id="how-it-works" className="bg-black py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bagaimana Cara Kerjanya
            </h2>
            <div className="mt-2 mb-6 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <p className="mt-4 text-lg text-gray-300">
              Proses sederhana untuk melindungi karya fashion Anda secara
              digital
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <span className="font-serif text-xl font-bold">1</span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Unggah Desain Fashion Anda
              </h3>
              <p className="text-gray-300">
                Unggah sketsa, foto, lookbook, atau file digital dari desain
                fashion yang ingin Anda lindungi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <span className="font-serif text-xl font-bold">2</span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Pilih Jenis Perlindungan
              </h3>
              <p className="text-gray-300">
                Pilih jenis tanda tangan digital atau watermark yang sesuai
                dengan kebutuhan desain Anda.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <span className="font-serif text-xl font-bold">3</span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Dapatkan Sertifikat Digital
              </h3>
              <p className="text-gray-300">
                Terima sertifikat digital yang elegan dan QR code untuk
                membuktikan keaslian desain fashion Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Keamanan Kelas Atas untuk Desain Anda
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Teknologi enkripsi terkini untuk melindungi karya fashion Anda
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all hover:border-[#D4AF37]/30 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Enkripsi 256-bit
              </h3>
              <p className="text-gray-300">
                Desain Anda dilindungi dengan enkripsi kelas militer yang tidak
                dapat dipecahkan.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all hover:border-[#D4AF37]/30 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Verifikasi Aman
              </h3>
              <p className="text-gray-300">
                Setiap tanda tangan digital tercatat untuk verifikasi yang tidak
                dapat dipalsukan.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all hover:border-[#D4AF37]/30 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                Verifikasi Waktu
              </h3>
              <p className="text-gray-300">
                Buktikan kapan desain Anda dibuat dengan timestamp yang tidak
                dapat dimanipulasi.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all hover:border-[#D4AF37]/30 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                ECDSA & BLAKE3
              </h3>
              <p className="text-gray-300">
                Menggunakan algoritma tanda tangan digital ECDSA dan fungsi hash
                BLAKE3 yang cepat dan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-black py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Dipercaya oleh Desainer Fashion
            </h2>
            <div className="mt-2 mb-6 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
            </div>
            <p className="mt-4 text-lg text-gray-300">
              Lihat apa kata para desainer tentang layanan kami
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <p className="mb-4 text-gray-300">
                "Layanan ini telah membantu saya melindungi koleksi terbaru saya
                dari peniruan. Sangat mudah digunakan dan memberikan ketenangan
                pikiran."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#D4AF37]" />
                <div className="ml-3">
                  <h4 className="font-medium text-white">Rina Wijaya</h4>
                  <p className="text-sm text-gray-400">Fashion Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <p className="mb-4 text-gray-300">
                "Sebagai desainer independen, perlindungan karya adalah
                prioritas utama. Layanan ini memberikan solusi yang terjangkau
                dan efektif."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#D4AF37]" />
                <div className="ml-3">
                  <h4 className="font-medium text-white">Budi Santoso</h4>
                  <p className="text-sm text-gray-400">Independent Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <p className="mb-4 text-gray-300">
                "Sertifikat digital dari layanan ini telah membantu brand saya
                membuktikan keaslian produk kepada pelanggan. Sangat
                direkomendasikan!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#D4AF37]" />
                <div className="ml-3">
                  <h4 className="font-medium text-white">Maya Putri</h4>
                  <p className="text-sm text-gray-400">Fashion Brand Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Lindungi Karya Fashion Anda Sekarang
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Mulai perjalanan melindungi desain fashion Anda dengan tanda
              tangan digital
            </p>
            <div className="mt-8">
              <Button
                className="bg-[#D4AF37] text-black hover:bg-[#C5A028]"
                onClick={handleSign}
              >
                Buat Sertifikat Digital untuk Produk Fashion
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-serif text-xl font-bold text-white">
                <span className="text-[#D4AF37]">SHIELD</span>
              </h3>
              <p className="text-sm">
                Perlindungan digital untuk karya fashion Anda dengan teknologi
                tanda tangan digital terpercaya.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-medium text-white">Layanan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="hover:text-[#D4AF37]" onClick={handleSign}>
                    Tanda Tangan Digital
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-[#D4AF37]"
                    onClick={handleVerify}
                  >
                    Verifikasi Tanda Tangan
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-[#D4AF37]"
                    onClick={handleSignWatermark}
                  >
                    Watermark Digital
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-[#D4AF37]"
                    onClick={handleSignCollective}
                  >
                    Tanda Tangan Kolektif
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-medium text-white">Informasi</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#about" className="hover:text-[#D4AF37]">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-[#D4AF37]">
                    Cara Kerja
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-[#D4AF37]">
                    Testimoni
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-medium text-white">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li>info@shield.com</li>
                <li>+62 21 1234 5678</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} SHIELD: Secure Hash for
              Integrated Electronic Design Protection. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
