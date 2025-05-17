"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ImageIcon,
  ArrowLeft,
  Upload,
  Loader2,
  Download,
  Copy,
  CheckCircle,
  Settings,
  Type,
  User,
  Sliders,
  FileDigit,
} from "lucide-react";
import Link from "next/link";

export default function SignVisibleWatermarkPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);

  // Watermark settings state
  const [watermarkText, setWatermarkText] = useState("SHIELD");
  const [opacity, setOpacity] = useState("0.4");
  const [fontSize, setFontSize] = useState("40");
  const [designerName, setDesignerName] = useState("Aceng");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("watermarkText", watermarkText);
    formData.append("opacity", opacity);
    formData.append("fontSize", fontSize);
    formData.append("designerName", designerName);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/signWithVisibleWatermark`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setPreviewUrl(data.watermarkedImage);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBase64 = () => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (previewUrl) {
      const a = document.createElement("a");
      a.href = previewUrl;
      a.download = "watermarked-image.jpg";
      a.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setLocalPreviewUrl(objectUrl);
    } else {
      setLocalPreviewUrl(null);
    }
  };

  useEffect(() => {
    if (!localPreviewUrl) return;

    const img = new window.Image();
    img.src = localPreviewUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Add centered main watermark text
      const centerX = img.width / 2;
      const centerY = img.height / 2;

      // Add semi-transparent overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, img.width, img.height);

      // Add main watermark text
      ctx.save();
      ctx.globalAlpha = parseFloat(opacity);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";

      // Add shadow effect
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw main centered watermark
      ctx.fillText(watermarkText, centerX, centerY);
      ctx.restore();

      // Add subtle diagonal watermarks
      ctx.save();
      ctx.globalAlpha = parseFloat(opacity) * 0.5;
      ctx.font = `${Math.floor(parseInt(fontSize) * 0.4)}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";

      const text = watermarkText;
      const diagonalCount = Math.ceil((img.width * img.height) / 200000);

      for (let i = 0; i < diagonalCount; i++) {
        const x = Math.random() * img.width;
        const y = Math.random() * img.height;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 8);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }

      // Add decorative circular elements
      const circleCount = 5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < circleCount; i++) {
        const radius = Math.min(img.width, img.height) * (0.2 + i * 0.05);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Add designer name at bottom
      ctx.font = "16px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.textAlign = "right";
      ctx.fillText(`By: ${designerName}`, img.width - 20, img.height - 20);

      ctx.restore();
    };
  }, [localPreviewUrl, watermarkText, opacity, fontSize, designerName]);

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
              <ImageIcon className="h-6 w-6" />
              <h1 className="text-2xl font-bold">
                Tanda Tangan Gambar dengan Watermark
              </h1>
            </div>
            <p className="mt-1 text-[#1a1a1a] relative z-10">
              Tambahkan watermark yang terlihat pada gambar untuk perlindungan
              dan identifikasi
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-[#d4af37] mb-1"
                >
                  Pilih Gambar
                </label>
                <div className="border-2 border-dashed border-[#d4af37]/40 rounded-lg p-6 text-center hover:border-[#d4af37] transition-colors bg-[#0e1424]/50">
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-[#d4af37]/70 mx-auto mb-2" />
                    <p className="text-sm text-[#d4af37]/90 mb-1">
                      {file
                        ? file.name
                        : "Klik untuk memilih gambar atau tarik dan lepas gambar di sini"}
                    </p>
                    <p className="text-xs text-[#d4af37]/70">
                      {file
                        ? `${(file.size / 1024).toFixed(2)} KB`
                        : "JPG, PNG, dan format gambar lainnya didukung"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Watermark Settings Form */}
              <div className="bg-[#0e1424]/80 rounded-lg p-4 border border-[#d4af37]/30">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="font-medium text-[#d4af37]">
                    Pengaturan Watermark
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Watermark Text */}
                  <div>
                    <label
                      htmlFor="watermarkText"
                      className="text-sm font-medium text-[#d4af37] mb-1 flex items-center gap-1.5"
                    >
                      <Type className="h-4 w-4 text-[#d4af37]" />
                      Watermark Text
                    </label>
                    <input
                      id="watermarkText"
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full p-2 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                      placeholder="Masukkan teks watermark"
                    />
                  </div>

                  {/* Opacity */}
                  <div>
                    <label
                      htmlFor="opacity"
                      className="text-sm font-medium text-[#d4af37] mb-1 flex items-center gap-1.5"
                    >
                      <Sliders className="h-4 w-4 text-[#d4af37]" />
                      Opacity ({(Number.parseFloat(opacity) * 100).toFixed(0)}%)
                    </label>
                    <input
                      id="opacity"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={opacity}
                      onChange={(e) => setOpacity(e.target.value)}
                      className="w-full h-2 bg-[#0e1424] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                  </div>

                  {/* Font Size */}
                  <div>
                    <label
                      htmlFor="fontSize"
                      className="text-sm font-medium text-[#d4af37] mb-1 flex items-center gap-1.5"
                    >
                      <Type className="h-4 w-4 text-[#d4af37]" />
                      Font Size ({fontSize}px)
                    </label>
                    <input
                      id="fontSize"
                      type="range"
                      min="10"
                      max="500"
                      step="2"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full h-2 bg-[#0e1424] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                  </div>

                  {/* Designer Name */}
                  <div>
                    <label
                      htmlFor="designerName"
                      className="text-sm font-medium text-[#d4af37] mb-1 flex items-center gap-1.5"
                    >
                      <User className="h-4 w-4 text-[#d4af37]" />
                      Designer Name
                    </label>
                    <input
                      id="designerName"
                      type="text"
                      value={designerName}
                      onChange={(e) => setDesignerName(e.target.value)}
                      className="w-full p-2 border border-[#d4af37]/30 rounded-md bg-[#0e1424] text-[#e0c56e] placeholder:text-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                      placeholder="Masukkan nama designer"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-3.5 px-4 rounded-lg hover:from-[#d4af37] hover:to-[#f0d77c] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Mengunggah...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload & Tambah Watermark</span>
                  </>
                )}
              </button>

              {/* Preview Section */}
              {previewUrl && (
                <div className="mt-8 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                  <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                    <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                      Hasil Watermark
                    </h2>
                  </div>

                  <div className="p-4">
                    <div className="bg-[#0e1424] p-2 rounded-lg mb-4 border border-[#d4af37]/20">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Watermarked"
                        width={800}
                        height={500}
                        className="rounded shadow w-full h-auto"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleCopyBase64}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0e1424] border border-[#d4af37]/30 hover:border-[#d4af37] text-[#d4af37] py-2.5 px-4 rounded-lg transition-colors"
                      >
                        {copySuccess ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5" />
                            <span>Salin Base64</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-black py-2.5 px-4 rounded-lg transition-colors hover:from-[#d4af37] hover:to-[#f0d77c]"
                      >
                        <Download className="h-5 w-5" />
                        <span>Unduh Gambar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Watermark */}
              {localPreviewUrl && (
                <div className="mt-6 border border-[#d4af37]/30 rounded-lg overflow-hidden bg-[#0c1526]/50">
                  <div className="bg-[#131b2e] px-4 py-3 border-b border-[#d4af37]/30">
                    <h2 className="font-medium text-[#d4af37] flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-[#d4af37]" />
                      <span>Preview Watermark</span>
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="bg-[#0e1424] p-2 rounded-lg border border-[#d4af37]/20">
                      <canvas
                        ref={canvasRef}
                        className="w-full h-auto rounded"
                      />
                      <p className="text-xs text-[#d4af37]/60 mt-2 text-center">
                        Preview sebelum upload. Hasil akhir mungkin sedikit
                        berbeda.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
