"use client"

import { useState, useRef } from "react"
import { CheckSquare, ArrowLeft, Upload, Loader2, FileCheck, Key, AlertTriangle, CheckCircle, Calendar, XCircle, Clock } from 'lucide-react'
import Link from "next/link"

export default function VerifyPage() {
  const [file, setFile] = useState(null)
  const [signature, setSignature] = useState("")
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setVerificationResult(null)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("signature", signature)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/verify`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setVerificationResult(data)
    } catch (error) {
      setVerificationResult({
        valid: false,
        pesan: "Error: " + error.message
      })
    } finally {
      setLoading(false)
    }
  }

  // Render hasil verifikasi dengan tampilan yang lebih baik
  const renderVerificationResult = () => {
    if (!verificationResult) return null;
    
    // Cek hasil verifikasi
    if (verificationResult.valid) {
      // Tanda tangan valid
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-lg font-medium text-green-800">Tanda Tangan Valid</h3>
              <p className="text-green-700">
                Dokumen ini memiliki tanda tangan digital yang valid.
              </p>
            </div>
          </div>
          
          {/* Tampilkan informasi masa berlaku */}
          {verificationResult.validUntil && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium text-blue-800">Berlaku Hingga</h3>
                <p className="text-blue-700">{verificationResult.validUntil}</p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Tanda tangan tidak valid
      // Cek apakah karena kedaluwarsa
      const isExpired = verificationResult.pesan?.includes("kedaluwarsa") || 
                        verificationResult.pesan?.includes("expired");
      
      if (isExpired) {
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-medium text-orange-800">Tanda Tangan Sudah Kedaluwarsa</h3>
                <p className="text-orange-700">
                  {verificationResult.pesan || "Tanda tangan digital sudah melewati masa berlakunya."}
                </p>
              </div>
            </div>
            
            {/* Tampilkan kapan kedaluwarsa */}
            {verificationResult.expiredAt && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <Calendar className="h-6 w-6 text-slate-500" />
                <div>
                  <h3 className="font-medium text-slate-800">Kedaluwarsa Pada</h3>
                  <p className="text-slate-700">{verificationResult.expiredAt}</p>
                </div>
              </div>
            )}
          </div>
        );
      } else {
        // Tidak valid karena alasan lain
        return (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Tanda Tangan Tidak Valid</h3>
              <p className="text-red-700">
                {verificationResult.pesan || "Dokumen ini memiliki tanda tangan digital yang tidak valid."}
              </p>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Verifikasi Tanda Tangan</h1>
            </div>
            <p className="mt-1 text-green-100">
              Verifikasi keaslian dokumen yang telah ditandatangani
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-1">
                  Pilih File untuk Diverifikasi
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
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
                      {file ? file.name : "Klik untuk memilih file atau tarik dan lepas file di sini"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {file
                        ? `${(file.size / 1024).toFixed(2)} KB`
                        : "Pilih file yang ingin diverifikasi tanda tangannya"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Signature Input */}
              <div>
                <label htmlFor="signature" className="block text-sm font-medium text-slate-700 mb-1">
                  Tanda Tangan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="signature"
                    type="text"
                    placeholder="Masukkan tanda tangan"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
              <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h2 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-green-500" />
                    Hasil Verifikasi
                  </h2>
                </div>

                <div className="p-4">
                  {renderVerificationResult()}
                  
                  {/* Raw data (optional, only for debugging) */}
                  {/*
                  <div className="mt-4 bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                    <h3 className="font-medium text-xs text-slate-700 mb-2">Raw Response:</h3>
                    <pre className="whitespace-pre-wrap break-all text-slate-700">
                      {JSON.stringify(verificationResult, null, 2)}
                    </pre>
                  </div>
                  */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}