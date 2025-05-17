"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QrCode, ArrowLeft, Loader2, Upload, FileDigit } from "lucide-react";
import Link from "next/link";

export default function GenerateQRPage() {
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [designerName, setDesignerName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setQrCode("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/generateQR`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hash,
            signature,
            designerName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghasilkan QR Code");
      }

      // Set QR Code as Base64 string
      setQrCode(data.qrCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e1424] to-[#0a0e18] py-6 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#d4af37]/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-[#b8860b]/5 blur-3xl"></div>

        {/* Gold accent lines */}
        <div className="absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
        <div className="absolute bottom-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header with logo and back button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-[#d4af37] hover:text-[#f0d77c] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center">
            <FileDigit className="h-6 w-6 text-[#d4af37] mr-2" />
            <span className="text-[#d4af37] font-semibold text-lg">
              Digital Signature
            </span>
          </div>
        </div>

        {/* Main title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#d4af37] mb-2">
            Generate QR Code
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b8860b] to-[#d4af37] mx-auto"></div>
        </div>

        <div className="bg-[#131b2e] rounded-2xl shadow-xl shadow-black/40 overflow-hidden border border-[#d4af37]/20 backdrop-blur-sm relative">
          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-md"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-md"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-md"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-md"></div>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] px-6 py-5 text-black relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMTAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-30"></div>
            <div className="flex items-center gap-3 relative z-10">
              <QrCode className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Generate QR Code</h1>
            </div>
            <p className="mt-1 text-[#1a1a1a] relative z-10">
              Hasilkan QR Code untuk tanda tangan digital Anda
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hash Input */}
              <div>
                <label
                  htmlFor="hash"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Hash Dokumen
                </label>
                <div className="relative">
                  <input
                    id="hash"
                    type="text"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                    required
                    placeholder="Masukkan hash dokumen"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#d4af37]/70"
                    >
                      <path d="M4 9h16"></path>
                      <path d="M4 15h16"></path>
                      <path d="M10 3L8 21"></path>
                      <path d="M16 3l-2 18"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Signature Input */}
              <div>
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Tanda Tangan
                </label>
                <div className="relative">
                  <input
                    id="signature"
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                    required
                    placeholder="Masukkan tanda tangan digital"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#d4af37]/70"
                    >
                      <path d="M15 8h.01"></path>
                      <rect width="16" height="13" x="4" y="5" rx="2"></rect>
                      <path d="m4 18 4-4a3 3 0 0 1 3 0l5 5"></path>
                      <path d="m14 14 1-1a3 3 0 0 1 3 0l2 2"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Designer Name Input */}
              <div>
                <label
                  htmlFor="designerName"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Nama Designer (Opsional)
                </label>
                <div className="relative">
                  <input
                    id="designerName"
                    type="text"
                    value={designerName}
                    onChange={(e) => setDesignerName(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                    placeholder="Masukkan nama designer"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#d4af37]/70"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-[#0e1424] border border-red-500/30 rounded-md p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-3.5 px-4 rounded-lg hover:from-[#d4af37] hover:to-[#f0d77c] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5" />
                    <span>Generate QR Code</span>
                  </>
                )}
              </button>
            </form>

            {/* QR Code Result */}
            {qrCode && (
              <div className="mt-8 p-6 border border-[#d4af37]/30 rounded-lg text-center bg-[#0c1526]/50">
                <h3 className="text-lg font-semibold text-[#d4af37] mb-4 flex items-center justify-center gap-2">
                  <QrCode className="h-5 w-5 text-[#d4af37]" />
                  QR Code
                </h3>
                <div className="bg-white inline-block p-4 rounded-lg mx-auto mb-4">
                  <Image
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <a
                  href={`data:image/png;base64,${qrCode}`}
                  download="qr-code.png"
                  className="inline-flex items-center gap-2 bg-[#0e1424] text-[#d4af37] px-4 py-2 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#d4af37]"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Unduh QR Code
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mx-auto mb-4"></div>
          <p className="text-[#d4af37]/50 text-sm">
            © {new Date().getFullYear()} Digital Signature System • Aman dan
            Terenkripsi
          </p>
        </div>
      </div>
    </div>
  );
}
