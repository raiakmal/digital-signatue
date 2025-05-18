"use client";

import { useState, useRef, useEffect } from "react";
import {
  FileDigit,
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle,
  Copy,
  FileCheck,
  Hash,
  FileX,
  QrCode,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignFilePage() {
  const [file, setFile] = useState(null);
  const [signature, setSignature] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySignatureSuccess, setCopySignatureSuccess] = useState(false);
  const [copyHashSuccess, setCopyHashSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [designerName, setDesignerName] = useState("");
  const fileInputRef = useRef(null);
  const [qrCode, setQrCode] = useState("");
  const [validityType, setValidityType] = useState("days");
  const [validityValue, setValidityValue] = useState(7);
  const [validUntil, setValidUntil] = useState("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("File wajib diisi.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("designerName", designerName);

    if (validityType === "days") {
      formData.append("validityDays", validityValue);
    } else {
      formData.append("validityMonths", validityValue);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/sign`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setSignature(data.signature);
      setHash(data.hash);
      setQrCode(data.qrCode || "");
      setValidUntil(data.validUntil || "");
    } catch (err) {
      console.error(err);
      alert("Gagal menandatangani file.");
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

  const FilePreview = () => {
    if (!file) return null;

    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <Image
            src={previewUrl}
            alt="Preview"
            width={800}
            height={600}
            className="max-w-full max-h-[600px] object-contain border rounded shadow"
            unoptimized
          />
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="h-full w-full">
          <iframe
            src={previewUrl}
            title="PDF Preview"
            className="w-full h-[600px] border rounded"
          />
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <FileX className="w-16 h-16 text-slate-400 mb-4" />
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          Preview tidak tersedia
        </h3>
        <p className="text-sm text-slate-500">
          Tipe file &quot;{file.name.split(".").pop()}&quot; tidak dapat
          ditampilkan dalam preview
        </p>
      </div>
    );
  };

  const validityInputElement = (
    <div>
      <label className="block text-sm font-medium text-[#d4af37] mb-1">
        Masa Berlaku Tanda Tangan
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-[#d4af37]/70" />
          </div>
          <input
            type="number"
            min="1"
            max="365"
            value={validityValue}
            onChange={(e) => setValidityValue(parseInt(e.target.value) || 1)}
            className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
          />
        </div>
        <select
          value={validityType}
          onChange={(e) => setValidityType(e.target.value)}
          className="w-full p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all appearance-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4af37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
            backgroundPosition: "right 0.5rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.5em 1.5em",
          }}
        >
          <option value="days">Hari</option>
          <option value="months">Bulan</option>
        </select>
      </div>
      <p className="mt-1 text-xs text-[#d4af37]/60">
        Tentukan berapa lama tanda tangan akan tetap valid
      </p>
    </div>
  );

  const validUntilElement = validUntil && (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-[#d4af37]" />
          Berlaku Hingga
        </label>
      </div>
      <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-sm">
        <span className="text-[#e0c56e]">{validUntil}</span>
      </div>
    </div>
  );

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

      <div className="max-w-5xl mx-auto">
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
            Tandatangani Dokumen
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#b8860b] to-[#d4af37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel: Form */}
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
                <FileDigit className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Tandatangani File</h1>
              </div>
              <p className="mt-1 text-[#1a1a1a] relative z-10">
                Buat tanda tangan digital untuk file Anda dengan aman
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
                    Pilih File untuk Ditandatangani
                  </label>
                  <div className="border-2 border-dashed border-[#d4af37]/40 rounded-lg p-6 text-center hover:border-[#d4af37] transition-colors bg-[#0e1424]/50">
                    <input
                      id="file"
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
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

                {/* Designer Name Input */}
                <div>
                  <label className="block text-sm font-medium text-[#d4af37] mb-1">
                    Input Nama Designer
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={designerName}
                      onChange={(e) => setDesignerName(e.target.value)}
                      className="w-full px-3 py-3 pl-10 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
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

                {/* Validity Input */}
                <div>
                  <label className="block text-sm font-medium text-[#d4af37] mb-1">
                    Masa Berlaku Tanda Tangan
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-[#d4af37]/70" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={validityValue}
                        onChange={(e) =>
                          setValidityValue(parseInt(e.target.value) || 1)
                        }
                        className="w-full pl-10 p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                      />
                    </div>
                    <select
                      value={validityType}
                      onChange={(e) => setValidityType(e.target.value)}
                      className="w-full p-3 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d4af37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="days">Hari</option>
                      <option value="months">Bulan</option>
                    </select>
                  </div>
                  <p className="mt-1 text-xs text-[#d4af37]/60">
                    Tentukan berapa lama tanda tangan akan tetap valid
                  </p>
                </div>

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
                      <span>Tandatangani File</span>
                    </>
                  )}
                </button>
              </form>

              {/* Results Section */}
              {(signature || hash) && (
                <div className="mt-8 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                  <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                    <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                      Hasil Tanda Tangan
                    </h2>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Signature Result */}
                    {signature && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                            <FileDigit className="h-4 w-4 text-[#d4af37]" />
                            Signature
                          </label>
                          <button
                            onClick={() =>
                              copyToClipboard(signature, "signature")
                            }
                            className="text-xs flex items-center gap-1 text-[#d4af37]/70 hover:text-[#f0d77c] transition-colors"
                            title="Salin ke clipboard"
                          >
                            {copySignatureSuccess ? (
                              <>
                                <CheckCircle className="h-3.5 w-3.5 text-[#d4af37]" />
                                <span className="text-[#d4af37]">
                                  Tersalin!
                                </span>
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
                            {signature}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Hash Result */}
                    {hash && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                            <Hash className="h-4 w-4 text-[#d4af37]" />
                            Hash
                          </label>
                          <button
                            onClick={() => copyToClipboard(hash, "hash")}
                            className="text-xs flex items-center gap-1 text-[#d4af37]/70 hover:text-[#f0d77c] transition-colors"
                            title="Salin ke clipboard"
                          >
                            {copyHashSuccess ? (
                              <>
                                <CheckCircle className="h-3.5 w-3.5 text-[#d4af37]" />
                                <span className="text-[#d4af37]">
                                  Tersalin!
                                </span>
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
                            {hash}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Valid Until Result */}
                    {validUntil && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-[#d4af37]" />
                            Berlaku Hingga
                          </label>
                        </div>
                        <div className="bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md text-sm">
                          <span className="text-[#e0c56e]">{validUntil}</span>
                        </div>
                      </div>
                    )}

                    {/* QR Code Result */}
                    {qrCode && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-[#d4af37] flex items-center gap-1.5">
                            <QrCode className="h-4 w-4 text-[#d4af37]" />
                            QR Code
                          </label>
                        </div>
                        <div className="flex justify-center bg-[#0e1424] border border-[#d4af37]/20 p-3 rounded-md">
                          <Image
                            src={qrCode}
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="max-w-[200px]"
                            unoptimized
                          />
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

          {/* Right panel: Document Preview */}
          {file ? (
            <div className="bg-[#131b2e] rounded-2xl shadow-xl shadow-black/40 overflow-hidden border border-[#d4af37]/20 backdrop-blur-sm relative">
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-md"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-md"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-md"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-md"></div>

              <div className="bg-gradient-to-r from-[#b8860b] to-[#d4af37] px-6 py-5 text-black relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMTAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzAwMDAwMDEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-30"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <FileDigit className="h-6 w-6" />
                  <h1 className="text-2xl font-bold">Preview Dokumen</h1>
                </div>
                <p className="mt-1 text-[#1a1a1a] truncate max-w-md relative z-10">
                  {file?.name}
                </p>
              </div>

              <div className="p-2 h-[650px] bg-[#0e1424]">
                <FilePreview />
              </div>
            </div>
          ) : (
            <div className="bg-[#131b2e] rounded-2xl shadow-xl shadow-black/40 overflow-hidden border border-[#d4af37]/20 backdrop-blur-sm relative flex flex-col justify-center items-center p-8">
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-md"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-md"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-md"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-md"></div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <FileDigit className="h-10 w-10 text-[#d4af37]" />
                </div>
                <h3 className="text-[#d4af37] text-xl font-medium mb-2">
                  Tandatangan Digital Premium
                </h3>
                <p className="text-[#d4af37]/70 mb-6 max-w-xs">
                  Pilih file dokumen untuk ditandatangani dan dapatkan digital
                  signature yang aman dan terenkripsi
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3 bg-[#0e1424] p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                      1
                    </div>
                    <p className="text-sm text-[#d4af37]/80">
                      Pilih file yang ingin ditandatangani
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#0e1424] p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                      2
                    </div>
                    <p className="text-sm text-[#d4af37]/80">
                      Masukkan nama designer dan masa berlaku
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#0e1424] p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                      3
                    </div>
                    <p className="text-sm text-[#d4af37]/80">
                      Dapatkan tanda tangan digital dan QR code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
