"use client";

import { useState, useRef } from "react";
import {
  Stamp,
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle,
  User,
  Info,
  Pencil,
  FileCheck,
  FileDigit,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignCollectiveWatermarkPage() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [designerSignature, setDesignerSignature] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Tambahkan state baru untuk menyimpan hasil
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!["designer", "brand"].includes(role.toLowerCase())) {
      setMessage("Error: Peran harus 'designer' atau 'brand'");
      return;
    }

    if (role.toLowerCase() === "brand" && !designerSignature) {
      setMessage("Error: Tanda tangan designer diperlukan untuk peran 'brand'");
      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null); // Reset hasil sebelumnya

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);
    formData.append("ownerInfo", ownerInfo);
    formData.append("designerSignature", designerSignature);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/signCollectiveWithWatermark`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      setMessage(JSON.stringify(result, null, 2));
      setResult(result); // Simpan hasil dalam state terpisah
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengunduh gambar hasil watermark
  const downloadImage = () => {
    if (!result || !result.watermarkedImage) return;

    // Buat link untuk download
    const link = document.createElement("a");
    link.href = result.watermarkedImage;
    link.download = `watermarked-${file ? file.name : "image"}`; // Nama file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Tanda Tangan dengan Watermark
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
              <Stamp className="h-6 w-6" />
              <h1 className="text-2xl font-bold">
                Tanda Tangan Kolektif dengan Watermark
              </h1>
            </div>
            <p className="mt-1 text-[#1a1a1a] relative z-10">
              Tandatangani file dengan informasi kolektif dan tambahkan
              watermark untuk perlindungan tambahan
            </p>
          </div>

          <div className="p-6">
            {/* Process Flow Info */}
            <div className="bg-[#0e1424]/80 border-l-4 border-[#d4af37] p-4 mb-6">
              <h3 className="text-sm font-medium text-[#d4af37] mb-2">
                Alur Tanda Tangan Kolektif:
              </h3>
              <ul className="mt-2 text-xs text-[#d4af37]/80 list-disc pl-5 space-y-1">
                <li>
                  Designer: Pilih role &quot;designer&quot;, upload file dan isi
                  info pemilik. Salin tanda tangan yang dihasilkan.
                </li>
                <li>
                  Brand: Pilih role &quot;brand&quot;, upload file yang sama,
                  dan pasang tanda tangan designer yang sudah dibuat sebelumnya.
                </li>
              </ul>
            </div>

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
                        : "Dokumen, gambar, dan file lainnya didukung"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Role Input */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Peran (Role)
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
                    required
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4af37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="">-- Pilih Peran --</option>
                    <option value="designer">Designer</option>
                    <option value="brand">Brand</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-[#d4af37]/60">
                  Peran Anda dalam proyek ini (misalnya: brand, designer)
                </p>
              </div>

              {/* Owner Info Input */}
              <div>
                <label
                  htmlFor="ownerInfo"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Informasi Pemilik
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Info className="h-5 w-5 text-[#d4af37]/70" />
                  </div>
                  <input
                    id="ownerInfo"
                    type="text"
                    placeholder="Informasi pemilik file"
                    value={ownerInfo}
                    onChange={(e) => setOwnerInfo(e.target.value)}
                    className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-[#d4af37]/60">
                  Informasi tentang pemilik file atau proyek (nama, perusahaan,
                  dll.)
                </p>
              </div>

              {/* Designer Signature Input - Hanya ditampilkan jika role adalah "brand" */}
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
                      <Pencil className="h-5 w-5 text-[#d4af37]/70" />
                    </div>
                    <input
                      id="designerSignature"
                      type="text"
                      placeholder="Tanda tangan designer"
                      value={designerSignature}
                      onChange={(e) => setDesignerSignature(e.target.value)}
                      className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#d4af37]/60">
                    Masukkan tanda tangan designer yang sudah dibuat sebelumnya
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-3.5 px-4 rounded-lg hover:from-[#d4af37] hover:to-[#f0d77c] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="h-5 w-5" />
                    <span>Tandatangani File dengan Watermark</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Section */}
            {result && (
              <div className="mt-8 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                  <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                    Hasil Tanda Tangan
                  </h2>
                </div>

                <div className="p-4">
                  {/* Tampilkan gambar dari base64 */}
                  {result.watermarkedImage && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-[#d4af37] mb-2">
                        Gambar dengan Watermark:
                      </h3>
                      <div className="border border-[#d4af37]/20 rounded-lg p-2 bg-[#0e1424]">
                        <Image
                          src={result.watermarkedImage}
                          alt="Gambar Dengan Watermark"
                          width={600}
                          height={400}
                          className="rounded mx-auto"
                          style={{
                            maxHeight: "400px",
                            height: "auto",
                            width: "auto",
                          }}
                          unoptimized
                        />
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={downloadImage}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-[#b8860b]/90 to-[#d4af37]/90 text-black rounded hover:from-[#d4af37] hover:to-[#f0d77c] transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5-8v13"></path>
                          </svg>
                          Download Gambar
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-[#d4af37]/60">
                        Gambar dengan watermark tersembunyi telah diterapkan.
                        Download gambar ini untuk digunakan pada proses tanda
                        tangan Brand.
                      </p>
                    </div>
                  )}

                  {/* Tampilkan informasi tanda tangan */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-[#d4af37] mb-1">
                        Hash:
                      </h3>
                      <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-xs font-mono overflow-x-auto text-[#e0c56e]">
                        {result.hash}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[#d4af37] mb-1">
                        Tanda Tangan:
                      </h3>
                      <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-xs font-mono overflow-x-auto text-[#e0c56e]">
                        {result.signature}
                      </div>
                    </div>

                    {result.collectiveSignature && (
                      <div>
                        <h3 className="text-sm font-medium text-[#d4af37] mb-1">
                          Tanda Tangan Kolektif:
                        </h3>
                        <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-xs font-mono overflow-x-auto text-[#e0c56e]">
                          {result.collectiveSignature}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-[#d4af37]/60">
                    File telah ditandatangani dengan watermark. Simpan informasi
                    tanda tangan untuk verifikasi di masa mendatang.
                  </p>

                  {/* Tombol simpan informasi */}
                  <button
                    className="mt-3 px-4 py-2 bg-[#0e1424] text-[#d4af37] rounded-lg text-sm hover:bg-[#131b2e] transition-colors flex items-center gap-2 border border-[#d4af37]/30"
                    onClick={() =>
                      navigator.clipboard.writeText(JSON.stringify(result))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    Salin Informasi
                  </button>

                  {/* Tombol untuk mengunduh gambar watermark */}
                  {result.watermarkedImage && (
                    <button
                      onClick={downloadImage}
                      className="mt-3 px-4 py-2 bg-[#0e1424] text-[#d4af37] rounded-lg text-sm hover:bg-[#131b2e] transition-colors flex items-center gap-2 border border-[#d4af37]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 9.343a.5.5 0 0 1-.707 0L8 6.707 5.465 9.343a.5.5 0 0 1-.707-.707l3-3a.5.5 0 0 1 .707 0l3 3a.5.5 0 0 1 0 .707z" />
                        <path d="M4 13.5V15h8v-1.5H4z" />
                      </svg>
                      Unduh Gambar Watermark
                    </button>
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
