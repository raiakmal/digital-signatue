"use client";

import { useState, useRef } from "react";
import {
  CheckSquare,
  ArrowLeft,
  Upload,
  Loader2,
  FileCheck,
  Key,
  AlertTriangle,
  CheckCircle,
  Calendar,
  XCircle,
  Clock,
  FileDigit,
} from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const [file, setFile] = useState(null);
  const [signature, setSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setVerificationResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/verify`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setVerificationResult(data);
    } catch (error) {
      setVerificationResult({
        valid: false,
        pesan: "Error: " + error.message,
      });
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
            Verifikasi Tanda Tangan
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
              <CheckSquare className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Verifikasi Tanda Tangan</h1>
            </div>
            <p className="mt-1 text-[#1a1a1a] relative z-10">
              Verifikasi keaslian dokumen yang telah ditandatangani
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Pilih File untuk Diverifikasi
                </label>
                <div className="border-2 border-dashed border-[#d4af37]/40 rounded-lg p-6 text-center hover:border-[#d4af37] transition-colors bg-[#0e1424]/50">
                  <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    required
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-[#d4af37]/70 mx-auto mb-2" />
                    <p className="text-sm text-[#d4af37]/90 mb-1">
                      {file
                        ? file.name
                        : "Klik untuk memilih file atau tarik dan lepas file di sini"}
                    </p>
                    <p className="text-xs text-[#d4af37]/70">
                      {file
                        ? `${(file.size / 1024).toFixed(2)} KB`
                        : "Pilih file yang ingin diverifikasi tanda tangannya"}
                    </p>
                  </label>
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-[#d4af37]/70" />
                  </div>
                  <input
                    id="signature"
                    type="text"
                    placeholder="Masukkan tanda tangan"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-3.5 px-4 rounded-lg hover:from-[#d4af37] hover:to-[#f0d77c] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={loading || !file || !signature}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="h-5 w-5" />
                    <span>Verifikasi Tanda Tangan</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Section */}
            {verificationResult && (
              <div className="mt-8 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                  <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-[#d4af37]" />
                    Hasil Verifikasi
                  </h2>
                </div>

                <div className="p-4">
                  {/* Replace the custom function with a proper one using our new styles */}
                  {verificationResult.valid ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-[#0e1424]/80 border border-[#d4af37]/40 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-[#d4af37]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#d4af37]">
                            Tanda Tangan Valid
                          </h3>
                          <p className="text-[#e0c56e]">
                            Dokumen ini memiliki tanda tangan digital yang
                            valid.
                          </p>
                        </div>
                      </div>

                      {/* Tampilkan informasi masa berlaku */}
                      {verificationResult.validUntil && (
                        <div className="flex items-center gap-3 p-4 bg-[#0e1424]/80 border border-[#d4af37]/40 rounded-lg">
                          <Calendar className="h-6 w-6 text-[#d4af37]" />
                          <div>
                            <h3 className="font-medium text-[#d4af37]">
                              Berlaku Hingga
                            </h3>
                            <p className="text-[#e0c56e]">
                              {verificationResult.validUntil}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Handle invalid signatures
                    <div>
                      {verificationResult.pesan?.includes("kedaluwarsa") ||
                      verificationResult.pesan?.includes("expired") ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-[#0e1424]/80 border border-amber-500/40 rounded-lg">
                            <Clock className="h-8 w-8 text-amber-500" />
                            <div>
                              <h3 className="text-lg font-medium text-amber-500">
                                Tanda Tangan Sudah Kedaluwarsa
                              </h3>
                              <p className="text-amber-400/90">
                                {verificationResult.pesan ||
                                  "Tanda tangan digital sudah melewati masa berlakunya."}
                              </p>
                            </div>
                          </div>

                          {/* Tampilkan kapan kedaluwarsa */}
                          {verificationResult.expiredAt && (
                            <div className="flex items-center gap-3 p-4 bg-[#0e1424]/80 border border-[#d4af37]/30 rounded-lg">
                              <Calendar className="h-6 w-6 text-[#d4af37]" />
                              <div>
                                <h3 className="font-medium text-[#d4af37]">
                                  Kedaluwarsa Pada
                                </h3>
                                <p className="text-[#e0c56e]">
                                  {verificationResult.expiredAt}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Tidak valid karena alasan lain
                        <div className="flex items-center gap-3 p-4 bg-[#0e1424]/80 border border-red-500/40 rounded-lg">
                          <XCircle className="h-8 w-8 text-red-500" />
                          <div>
                            <h3 className="text-lg font-medium text-red-500">
                              Tanda Tangan Tidak Valid
                            </h3>
                            <p className="text-red-400/90">
                              {verificationResult.pesan ||
                                "Dokumen ini memiliki tanda tangan digital yang tidak valid."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
