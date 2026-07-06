export default function StudentCardBack() {
  return (
    <div
    id="back-card"
      className="
      w-[1011px]
      h-[650px]
      bg-white
      rounded-[30px]
      overflow-hidden
      shadow-2xl
      relative
      "
    >
      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-cyan-100" />

        <img
          src="/assets/bg-sekolah.jpg"
          className="absolute inset-0 w-full h-[150] object-cover opacity-[0.05]"
        />

        {/* Dekorasi */}
        <div className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full bg-cyan-300 opacity-20" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-blue-300 opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-12">

        {/* Judul */}
        <div className="flex justify-center mb-10">

          <div
            className="
            bg-blue-900
            text-white
            px-16
            py-3
            rounded-xl
            text-[34px]
            font-black
            tracking-widest
            shadow-lg
            "
          >
            KETENTUAN
          </div>

        </div>

        {/* Box */}
        <div
          className="
          bg-white/90
          rounded-[25px]
          shadow-lg
          border-2
          border-blue-100
          px-1
          py-1
          "
        >

          <ul className="space-y-6 text-[24px] leading-relaxed">

            <li>
              • Kartu ini berlaku selama pemilik masih menjadi siswa SMK Kristen Pelangi Makale.
            </li>

            <li>
              • Kartu wajib dibawa setiap hari selama berada di lingkungan sekolah.
            </li>

            <li>
              • Apabila kartu hilang atau rusak segera laporkan kepada wali kelas atau tata usaha.
            </li>

            <li>
              • Kartu tidak boleh dipinjamkan atau dipindahtangankan kepada orang lain.
            </li>

            <li>
              • Jika menemukan kartu ini harap mengembalikan ke pihak sekolah.
            </li>

          </ul>

        </div>

      </div>

      {/* Footer */}
      <div
        className="
        absolute
        bottom-0
        left-0
        right-0
        h-[130px]
        bg-gradient-to-r
        from-blue-900
        via-blue-710
        to-cyan-400
        text-white
        flex
        items-center
        px-10
        "
      >

        <img
          src="/assets/logo-kanan.png"
          className="w-[80px] h-[80px] bg-white rounded-full p-1"
        />

        <div className="ml-6">

          <h2 className="text-[30px] font-black">
            SMK KRISTEN PELANGI MAKALE
          </h2>

          <p className="text-[18px]">
            Jl. Buisun Burake No.1, Makale, Tana Toraja
          </p>

          <p className="text-[18px]">
            ☎ 0859 2253 0706
          </p>

        </div>

      </div>

    </div>
  );
}