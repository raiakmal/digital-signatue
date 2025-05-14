"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QrCode, ArrowLeft, Loader2, Upload } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <QrCode className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Generate QR Code</h1>
            </div>
            <p className="mt-1 text-teal-100">
              Hasilkan QR Code untuk tanda tangan digital Anda
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hash Input */}
              <div>
                <label
                  htmlFor="hash"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Hash Dokumen
                </label>
                <input
                  id="hash"
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  required
                />
              </div>

              {/* Signature Input */}
              <div>
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Tanda Tangan
                </label>
                <input
                  id="signature"
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  required
                />
              </div>

              {/* Designer Name Input */}
              <div>
                <label
                  htmlFor="designerName"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Nama Designer (Opsional)
                </label>
                <input
                  id="designerName"
                  type="text"
                  value={designerName}
                  onChange={(e) => setDesignerName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Generate QR</span>
                  </>
                )}
              </button>
            </form>

            {/* QR Code Result */}
            {qrCode && (
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">
                  QR Code:
                </h3>
                <Image
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto border border-gray-300 p-2 rounded"
                />
                <a
                  href={`data:image/png;base64,${qrCode}`}
                  download="qr-code.png"
                  className="mt-3 inline-block text-teal-600 underline text-sm hover:text-teal-800"
                >
                  Unduh QR Code
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
