"use client";

import { useRouter } from "next/navigation";
import {
  FileDigit,
  ShieldCheck,
  ChevronRight,
  Lock,
  ImageIcon,
  Stamp,
  CheckSquare,
  Users,
  QrCode,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

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
    router.push("/sign-collective")
  }

  const handleVerifyCollective = () => {
    router.push("/verify-collective");
  };

  // const handleGenerateQR = () => {
  //   router.push("/generate-qr");
  // };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-center mb-16">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              SHIELD
            </h1>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 sm:text-5xl">
            Secure Hash for Integrated Electronic Design Protection
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Solusi terpercaya untuk keamanan dokumen digital Anda dengan
            teknologi tanda tangan digital canggih
          </p>
          <div className="inline-flex p-1 rounded-full bg-blue-50 mb-8">
            <span className="px-4 py-2 text-sm font-medium text-blue-600">
              Aman • Terpercaya • Terverifikasi
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Sign Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileDigit className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tanda Tangan Digital
                </h3>
                <p className="text-slate-600 mb-6">
                  Buat tanda tangan digital yang aman untuk dokumen penting Anda
                </p>
                <button
                  onClick={handleSign}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  <span>Tanda Tangan Digital</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Verify Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Verifikasi Tanda Tangan Digital
                </h3>
                <p className="text-slate-600 mb-6">
                  Verifikasi keaslian dokumen yang telah ditandatangani secara
                  digital
                </p>
                <button
                  onClick={handleVerify}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  <span>Verifikasi Tanda Tangan Digital</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sign Visible Watermark Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tanda Tangan Gambar dengan Watermark
                </h3>
                <p className="text-slate-600 mb-6">
                  Tandatangani gambar dengan watermark untuk keamanan informasi tambahan
                </p>
                <button
                  onClick={handleSignWatermark}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  <span>Tanda Tangan Gambar dengan Watermark</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Collective Watermark Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Stamp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tanda Tangan Kolektif dengan Watermark
                </h3>
                <p className="text-slate-600 mb-6">
                  Tandatangani dokumen dengan informasi yang kolektif dengan watermark
                </p>
                <button
                  onClick={handleCollectiveWatermark}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition"
                >
                  <span>Tanda Tangan Kolektif dengan Watermark</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sign Collective Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tanda Tangan Kolektif
                </h3>
                <p className="text-slate-600 mb-6">
                  Tandatangani dokumen secara kolektif dengan peran yang berbeda
                </p>
                <button
                  onClick={handleSignCollective}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition"
                >
                  <span>Tanda Tangan Kolektif</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Verify Collective Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Verifikasi Tanda Tangan Kolektif
                </h3>
                <p className="text-slate-600 mb-6">
                  Verifikasi keaslian dokumen yang telah ditandatangani secara
                  kolektif
                </p>
                <button
                  onClick={handleVerifyCollective}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  <span>Verifikasi Tanda Tangan Kolektif</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Generate QR Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
              <div className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Generate QR Code
                </h3>
                <p className="text-slate-600 mb-6">
                  Hasilkan QR Code untuk tanda tangan digital Anda
                </p>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition cursor-not-allowed"
                >
                  <span>Generate QR Code</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-16 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Keamanan Terjamin
              </h3>
            </div>
            <p className="text-slate-600 text-sm">
              SHIELD menggunakan teknologi kriptografi canggih untuk memastikan
              keamanan dan keaslian dokumen digital Anda. Semua proses tanda
              tangan dan verifikasi dilakukan dengan standar keamanan tertinggi.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} SHIELD - Secure Hash for Integrated
            Electronic Design Protection
          </p>
        </footer>
      </div>
    </main>
  );
}
