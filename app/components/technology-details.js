import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TechnologyDetails() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">Teknologi Keamanan</h2>
          <div className="mt-2 mb-6 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
          </div>
          <p className="mt-4 text-lg text-gray-300">
            Memahami teknologi canggih di balik sistem perlindungan dokumen SHIELD
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="ecdsa" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="grid w-full max-w-3xl grid-cols-2 gap-2 bg-black p-1">
                <TabsTrigger value="ecdsa" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                  Digital Signature ECDSA
                </TabsTrigger>
                <TabsTrigger value="blake3" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                  Hash Function BLAKE3
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="ecdsa" className="mt-6">
              <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                <h3 className="mb-4 font-serif text-2xl font-semibold text-white">Digital Signature ECDSA</h3>
                <p className="mb-4 text-gray-300">
                  Elliptic Curve Digital Signature Algorithm (ECDSA) adalah algoritma tanda tangan digital yang
                  menggunakan kriptografi kurva eliptik untuk memberikan keamanan yang lebih tinggi dengan ukuran kunci
                  yang lebih kecil dibandingkan dengan algoritma tanda tangan digital lainnya.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 text-lg font-medium text-[#D4AF37]">Keunggulan ECDSA</h4>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Keamanan yang lebih tinggi dengan ukuran kunci yang lebih kecil</li>
                      <li>Proses verifikasi yang cepat dan efisien</li>
                      <li>Standar industri untuk keamanan dokumen digital</li>
                      <li>Tahan terhadap serangan kriptografi modern</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 text-lg font-medium text-[#D4AF37]">Implementasi di SHIELD</h4>
                    <p className="text-gray-300">
                      SHIELD mengimplementasikan ECDSA dengan kurva secp256k1 untuk menghasilkan tanda tangan digital
                      yang tidak dapat dipalsukan. Setiap dokumen fashion digital yang dilindungi memiliki tanda tangan
                      unik yang dapat diverifikasi keasliannya kapan saja.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="blake3" className="mt-6">
              <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-md">
                <h3 className="mb-4 font-serif text-2xl font-semibold text-white">Hash Function BLAKE3</h3>
                <p className="mb-4 text-gray-300">
                  BLAKE3 adalah fungsi hash kriptografi modern yang dirancang untuk kecepatan dan keamanan. Fungsi ini
                  menghasilkan nilai hash yang unik untuk setiap dokumen, memastikan integritas dan keaslian konten
                  digital.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 text-lg font-medium text-[#D4AF37]">Keunggulan BLAKE3</h4>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Kecepatan pemrosesan yang sangat tinggi (lebih cepat dari MD5)</li>
                      <li>Keamanan kriptografi yang kuat dan tahan terhadap collision attacks</li>
                      <li>Mendukung paralelisasi untuk performa yang lebih baik</li>
                      <li>Output hash yang dapat disesuaikan panjangnya</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 text-lg font-medium text-[#D4AF37]">Implementasi di SHIELD</h4>
                    <p className="text-gray-300">
                      SHIELD menggunakan BLAKE3 untuk menghasilkan sidik jari digital unik dari setiap dokumen fashion.
                      Perubahan sekecil apapun pada dokumen akan menghasilkan nilai hash yang berbeda, memungkinkan
                      deteksi instan terhadap modifikasi yang tidak sah.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
