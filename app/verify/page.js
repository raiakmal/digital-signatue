"use client"

import { useState, useRef } from "react"
import { CheckSquare, ArrowLeft, Upload, Loader2, FileCheck, Key, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from "next/link"

export default function VerifyPage() {
  const [file, setFile] = useState(null)
  const [signature, setSignature] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setResult("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("signature", signature)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/verify`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

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
            {result && (
              <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h2 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasil Verifikasi
                  </h2>
                </div>

                <div className="p-4">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-all text-slate-700">{result}</pre>
                  </div>

                  {result.includes("Error") ? (
                    <div className="mt-4 flex items-start gap-2 bg-red-50 text-red-800 p-3 rounded-md text-sm">
                      <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p>
                        Terjadi kesalahan saat memverifikasi tanda tangan. Periksa kembali file dan tanda tangan
                        yang dimasukkan.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-slate-500">
                      Hasil verifikasi tanda tangan. Pastikan semua bagian tanda tangan terverifikasi dengan benar.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}