import React from "react";

export function TechnologyDetails() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl" data-aos="fade-up" data-aos-duration="400">
            Teknologi di Balik SHIELD
          </h2>
          <div className="mt-2 mb-6 flex justify-center" data-aos="fade-up" data-aos-delay="50">
            <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3]"></div>
          </div>
          <p className="mt-4 text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            SHIELD menggunakan teknologi kriptografi canggih untuk menjamin
            keamanan dan autentikasi karya digital Anda
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* ECDSA Technology */}
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg" data-aos="fade-right" data-aos-delay="150">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-white">
                ECDSA
              </h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                  <line x1="2" y1="20" x2="2" y2="20" />
                </svg>
              </div>
            </div>
            <p className="mb-4 text-gray-300">
              Elliptic Curve Digital Signature Algorithm (ECDSA) adalah
              algoritma kriptografi yang memberikan tanda tangan digital yang
              aman, efisien, dan tidak dapat dipalsukan.
            </p>
            <div className="space-y-3">
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Keamanan Tinggi</h4>
                  <p className="text-sm text-gray-400">
                    ECDSA menggunakan kurva eliptik yang menawarkan keamanan
                    tingkat tinggi dengan ukuran kunci yang lebih kecil
                  </p>
                </div>
              </div>
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="250">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Efisiensi</h4>
                  <p className="text-sm text-gray-400">
                    Proses yang cepat dan efisien untuk menandatangani dan
                    memverifikasi karya digital
                  </p>
                </div>
              </div>
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Non-repudiation</h4>
                  <p className="text-sm text-gray-400">
                    Menjamin bahwa pengirim tidak dapat menyangkal keaslian
                    tanda tangan mereka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BLAKE3 Technology */}
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg" data-aos="fade-left" data-aos-delay="150">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-white">
                BLAKE3
              </h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </div>
            </div>
            <p className="mb-4 text-gray-300">
              BLAKE3 adalah fungsi hash kriptografi modern yang sangat cepat dan
              aman, dirancang untuk menghasilkan "sidik jari" unik dari setiap
              desain.
            </p>
            <div className="space-y-3">
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Kecepatan Tinggi</h4>
                  <p className="text-sm text-gray-400">
                    BLAKE3 sangat cepat, memproses gigabyte data per detik
                    bahkan pada perangkat standar
                  </p>
                </div>
              </div>
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="250">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Paralelisme</h4>
                  <p className="text-sm text-gray-400">
                    Mendukung komputasi paralel untuk kinerja yang lebih baik
                    pada file besar
                  </p>
                </div>
              </div>
              <div className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">
                    Ketahanan Terhadap Tabrakan
                  </h4>
                  <p className="text-sm text-gray-400">
                    Memberikan perlindungan terhadap tabrakan (collision) yang
                    memastikan keunikan sidik jari digital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg" data-aos="fade-up" data-aos-delay="150">
          <h3 className="mb-4 font-serif text-xl font-bold text-white">
            Bagaimana Keduanya Bekerja Bersama
          </h3>
          <p className="mb-6 text-gray-300">
            SHIELD menggabungkan kekuatan ECDSA dan BLAKE3 untuk menciptakan
            sistem perlindungan dokumen fashion digital yang komprehensif:
          </p>
          <ol className="space-y-4 text-gray-300">
            <li className="flex items-start" data-aos="fade-up" data-aos-delay="200">
              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
                1
              </span>
              <span>
                BLAKE3 menghasilkan hash unik dari desain fashion Anda sebagai
                identitas digital
              </span>
            </li>
            <li className="flex items-start" data-aos="fade-up" data-aos-delay="250">
              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
                2
              </span>
              <span>
                ECDSA menandatangani hash ini menggunakan kunci privat desainer,
                menghasilkan tanda tangan digital yang tidak dapat dipalsukan
              </span>
            </li>
            <li className="flex items-start" data-aos="fade-up" data-aos-delay="300">
              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
                3
              </span>
              <span>
                Verifikasi dilakukan menggunakan kunci publik desainer,
                memastikan karya tidak dimodifikasi dan benar-benar milik
                desainer tersebut
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
