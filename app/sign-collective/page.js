"use client";

import { useState, useRef } from "react";
import {
  Users,
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle,
  User,
  Key,
  FileCheck,
  FileDigit,
  Copy,
} from "lucide-react";
import Link from "next/link";

export default function SignCollectivePage() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("designer");
  const [designerSignature, setDesignerSignature] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [copySignatureSuccess, setCopySignatureSuccess] = useState(false);
  const [copyHashSuccess, setCopyHashSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    // Only append designerSignature if role is "brand"
    if (role === "brand") {
      formData.append("designerSignature", designerSignature);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/signCollective`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "signature") {
        setCopySignatureSuccess(true);
        setTimeout(() => setCopySignatureSuccess(false), 2000);
      } else {
        setCopyHashSuccess(true);
        setTimeout(() => setCopyHashSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
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
            Tanda Tangan Kolektif
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
              <Users className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Tanda Tangan Kolektif</h1>
            </div>
            <p className="mt-1 text-[#1a1a1a] relative z-10">
              Tandatangani dokumen secara kolektif dengan peran yang berbeda
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
                  Pilih File
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
                        : "Semua jenis file didukung"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Pilih Peran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#d4af37]/70" />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4af37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="designer">Designer</option>
                    <option value="brand">Brand</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-[#d4af37]/60">
                  Pilih peran Anda dalam proses penandatanganan kolektif
                </p>
              </div>

              {/* Designer Signature Input (only for "brand" role) */}
              {role === "brand" && (
                <div>
                  <label
                    htmlFor="designerSignature"
                    className="block text-sm font-medium text-[#d4af37] mb-1"
                  >
                    Tanda Tangan Designer
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-[#d4af37]/70" />
                    </div>
                    <input
                      id="designerSignature"
                      type="text"
                      placeholder="Masukkan tanda tangan designer"
                      value={designerSignature}
                      onChange={(e) => setDesignerSignature(e.target.value)}
                      className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#d4af37]/60">
                    Masukkan tanda tangan designer untuk melanjutkan
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-3.5 px-4 rounded-lg hover:from-[#d4af37] hover:to-[#f0d77c] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={
                  loading || !file || (role === "brand" && !designerSignature)
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="h-5 w-5" />
                    <span>Tandatangani Dokumen</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Section */}
            {result?.signature && result?.hash && (
              <div className="mt-8 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                  <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                    Hasil Tanda Tangan Kolektif
                  </h2>
                </div>

                <div className="p-4 space-y-4">
                  {/* Signature */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                        <User className="h-4 w-4 text-[#d4af37]" />
                        Signature
                      </label>
                      <button
                        onClick={() =>
                          copyToClipboard(result.signature, "signature")
                        }
                        className="text-xs flex items-center gap-1 text-[#d4af37]/70 hover:text-[#f0d77c] transition-colors"
                        title="Salin ke clipboard"
                      >
                        {copySignatureSuccess ? (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 text-[#d4af37]" />
                            <span className="text-[#d4af37]">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all text-[#e0c56e]">
                        {result.signature}
                      </pre>
                    </div>
                  </div>

                  {/* Hash */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                        <Key className="h-4 w-4 text-[#d4af37]" />
                        Hash
                      </label>
                      <button
                        onClick={() => copyToClipboard(result.hash, "hash")}
                        className="text-xs flex items-center gap-1 text-[#d4af37]/70 hover:text-[#f0d77c] transition-colors"
                        title="Salin ke clipboard"
                      >
                        {copyHashSuccess ? (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 text-[#d4af37]" />
                            <span className="text-[#d4af37]">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all text-[#e0c56e]">
                        {result.hash}
                      </pre>
                    </div>
                  </div>

                  {/* Collective Signature (only shown for brand role) */}
                  {result?.collectiveSignature && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-[#d4af37]" />
                          Tanda Tangan Kolektif
                        </label>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              result.collectiveSignature,
                              "collectiveSignature"
                            )
                          }
                          className="text-xs flex items-center gap-1 text-[#d4af37]/70 hover:text-[#f0d77c] transition-colors"
                          title="Salin ke clipboard"
                        >
                          {copySignatureSuccess ? (
                            <>
                              <CheckCircle className="h-3.5 w-3.5 text-[#d4af37]" />
                              <span className="text-[#d4af37]">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap break-all text-[#e0c56e]">
                          {result.collectiveSignature}
                        </pre>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#d4af37]/60 mt-3">
                    Simpan signature dan hash ini dengan aman. Keduanya
                    diperlukan untuk verifikasi dokumen.
                  </p>
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
