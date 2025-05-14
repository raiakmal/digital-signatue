"use client"

import { useState, useRef } from "react"
import { Stamp, ArrowLeft, Upload, Loader2, CheckCircle, User, Info, Pencil, FileCheck } from 'lucide-react'
import Link from "next/link"

export default function SignCollectiveWatermarkPage() {
  const [file, setFile] = useState(null)
  const [role, setRole] = useState("")
  const [ownerInfo, setOwnerInfo] = useState("")
  const [designerSignature, setDesignerSignature] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("role", role)
    formData.append("ownerInfo", ownerInfo)
    formData.append("designerSignature", designerSignature)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signature/signCollectiveWithWatermark`, {
        method: "POST",
        body: formData,
      })

      const result = await res.json()
      setMessage(JSON.stringify(result, null, 2))
    } catch (error) {
      setMessage("Error: " + error.message)
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
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <Stamp className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Tanda Tangan Kolektif dengan Watermark</h1>
            </div>
            <p className="mt-1 text-purple-100">
              Tandatangani file dengan informasi kolektif dan tambahkan watermark untuk perlindungan tambahan
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-1">
                  Pilih File
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
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
                      {file ? `${(file.size / 1024).toFixed(2)} KB` : "Dokumen, gambar, dan file lainnya didukung"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Role Input */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                  Peran (Role)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="role"
                    type="text"
                    placeholder="Brand atau Designer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">Peran Anda dalam proyek ini (misalnya: brand, designer)</p>
              </div>

              {/* Owner Info Input */}
              <div>
                <label htmlFor="ownerInfo" className="block text-sm font-medium text-slate-700 mb-1">
                  Informasi Pemilik
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Info className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="ownerInfo"
                    type="text"
                    placeholder="Informasi pemilik file"
                    value={ownerInfo}
                    onChange={(e) => setOwnerInfo(e.target.value)}
                    className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Informasi tentang pemilik file atau proyek (nama, perusahaan, dll.)
                </p>
              </div>

              {/* Designer Signature Input */}
              <div>
                <label htmlFor="designerSignature" className="block text-sm font-medium text-slate-700 mb-1">
                  Tanda Tangan Designer
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Pencil className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="designerSignature"
                    type="text"
                    placeholder="Tanda tangan designer"
                    value={designerSignature}
                    onChange={(e) => setDesignerSignature(e.target.value)}
                    className="w-full pl-10 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Tanda tangan atau identifikasi dari designer yang membuat file
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
            {message && (
              <div className="mt-8 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h2 className="font-medium text-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasil Tanda Tangan
                  </h2>
                </div>

                <div className="p-4">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-all text-slate-700">{message}</pre>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    File telah ditandatangani dengan watermark. Simpan informasi ini untuk referensi di masa mendatang.
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