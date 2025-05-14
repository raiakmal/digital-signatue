"use client"

import { useState, useRef } from "react"
import { FileDigit, ArrowLeft, Upload, Loader2, CheckCircle, Copy, FileCheck, Hash } from "lucide-react"
import Link from "next/link"

export default function SignFilePage() {
  const [file, setFile] = useState(null)
  const [signature, setSignature] = useState("")
  const [hash, setHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [copySignatureSuccess, setCopySignatureSuccess] = useState(false)
  const [copyHashSuccess, setCopyHashSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert("File wajib diisi.")

    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/sign`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setSignature(data.signature)
      setHash(data.hash)
    } catch (err) {
      console.error(err)
      alert("Gagal menandatangani file.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "signature") {
        setCopySignatureSuccess(true)
        setTimeout(() => setCopySignatureSuccess(false), 2000)
      } else {
        setCopyHashSuccess(true)
        setTimeout(() => setCopyHashSuccess(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <FileDigit className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Tandatangani File</h1>
            </div>
            <p className="mt-1 text-blue-100">Buat tanda tangan digital untuk file Anda dengan aman</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-1">
                  Pilih File untuk Ditandatangani
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-1">
                      {file ? file.name : "Klik untuk memilih file atau tarik dan lepas file di sini"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {file ? `${(file.size / 1024).toFixed(2)} KB` : "Dokumen, gambar, dan file lainnya didukung"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
              <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h2 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasil Tanda Tangan
                  </h2>
                </div>

                <div className="p-4 space-y-4">
                  {/* Signature Result */}
                  {signature && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <FileDigit className="h-4 w-4 text-blue-500" />
                          Signature
                        </label>
                        <button
                          onClick={() => copyToClipboard(signature, "signature")}
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
                              <Copy className="h-3.5 w-3.5" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap break-all text-slate-700">{signature}</pre>
                      </div>
                    </div>
                  )}

                  {/* Hash Result */}
                  {hash && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Hash className="h-4 w-4 text-blue-500" />
                          Hash
                        </label>
                        <button
                          onClick={() => copyToClipboard(hash, "hash")}
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
                              <Copy className="h-3.5 w-3.5" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap break-all text-slate-700">{hash}</pre>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mt-3">
                    Simpan signature dan hash ini dengan aman. Keduanya diperlukan untuk verifikasi dokumen.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}