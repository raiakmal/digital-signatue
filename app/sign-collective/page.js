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
        "https://digital-signature-application-production.up.railway.app/api/signature/signCollective",
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
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Tanda Tangan Kolektif</h1>
            </div>
            <p className="mt-1 text-orange-100">
              Tandatangani dokumen secara kolektif dengan peran yang berbeda
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Pilih File
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                  <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    required
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-1">
                      {file
                        ? file.name
                        : "Klik untuk memilih file atau tarik dan lepas file di sini"}
                    </p>
                    <p className="text-xs text-slate-500">
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
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Pilih Peran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all appearance-none bg-white"
                  >
                    <option value="designer">Designer</option>
                    <option value="brand">Brand</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Pilih peran Anda dalam proses penandatanganan kolektif
                </p>
              </div>

              {/* Designer Signature Input (only for "brand" role) */}
              {role === "brand" && (
                <div>
                  <label
                    htmlFor="designerSignature"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Tanda Tangan Designer
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="designerSignature"
                      type="text"
                      placeholder="Masukkan tanda tangan designer"
                      value={designerSignature}
                      onChange={(e) => setDesignerSignature(e.target.value)}
                      className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Masukkan tanda tangan designer untuk melanjutkan
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading || !file || (role === "brand" && !designerSignature)}
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
              <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h2 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasil Tanda Tangan Kolektif
                  </h2>
                </div>

                <div className="p-4 space-y-4">
                  {/* Signature */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                        <User className="h-4 w-4 text-blue-500" />
                        Signature
                      </label>
                      <button
                        onClick={() =>
                          copyToClipboard(result.signature, "signature")
                        }
                        className="text-xs flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                        title="Salin ke clipboard"
                      >
                        {copySignatureSuccess ? (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-green-500">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <FileCheck className="h-3.5 w-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all text-slate-700">
                        {result.signature}
                      </pre>
                    </div>
                  </div>

                  {/* Hash */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                        <Key className="h-4 w-4 text-blue-500" />
                        Hash
                      </label>
                      <button
                        onClick={() => copyToClipboard(result.hash, "hash")}
                        className="text-xs flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                        title="Salin ke clipboard"
                      >
                        {copyHashSuccess ? (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-green-500">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <FileCheck className="h-3.5 w-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all text-slate-700">
                        {result.hash}
                      </pre>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3">
                    Simpan signature dan hash ini dengan aman. Keduanya
                    diperlukan untuk verifikasi dokumen.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}