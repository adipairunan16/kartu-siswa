import Student from "@/models/Student";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";

async function getStudent(id) {
  await connectDB();

  const student = await Student.findById(id).lean();

  if (!student) return null;

  return JSON.parse(JSON.stringify(student));
}

export default async function Page({ params }) {
  const { id } = await params;

  const student = await getStudent(id);

  if (!student) {
    notFound();
  }

  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${student.nis}`;

  const barcode = `https://barcodeapi.org/api/128/${student.nis}`;

 return (
<div className="min-h-screen bg-slate-200 flex justify-center items-center p-10">

<PrintButton />

<div className="w-[950px] h-[670px] bg-white rounded-[28px] overflow-hidden shadow-xl">
        {/* HEADER */}
        <div className="h-[110px] bg-gradient-to-r from-[#07265d] to-[#35bde7] relative">

          <img
            src="/assets/logo-kiri.png"
            className="absolute left-8 top-4 w-[72px] h-[72px] object-contain bg-white rounded-full p-2"
          />

          <img
            src="/assets/logo-kanan.png"
            className="absolute right-8 top-4 w-[72px] h-[72px] object-contain"
          />

          <div className="text-center text-white pt-4">

            <p className="text-sm">
              YAYASAN PENDIDIKAN KRISTEN BUNTU AMBAANG
            </p>

            <h1 className="text-[40px] font-black leading-none">
              SMK KRISTEN PELANGI MAKALE
            </h1>

            <p>
              Jln. Buisun Burake No.1
            </p>

          </div>

        </div>

        {/* BODY */}
        <div className="grid grid-cols-[220px_1fr_260px] gap-10 p-10">

          {/* FOTO */}
          <div>

            <div className="w-[180px] h-[240px] border bg-red-100">

              {student?.photo ? (
                <img
                  src={student.photo}
                  className="w-full h-full object-cover"
                />
              ) : null}

            </div>

            <div className="mt-6">

              <p className="font-bold text-[18px]">
                BERLAKU S/D :
              </p>

              <p className="text-[38px] font-black">
                06 / 2026
              </p>

            </div>

          </div>

          {/* DATA */}
          <div>

            <h1 className="text-[44px] font-black mb-10">
              {student?.name?.toUpperCase()}
            </h1>

            <div className="space-y-7 text-[20px]">

              <div>
                <b>NIS / NISN</b>
                <span className="ml-8">
                  : {student?.nis}
                </span>
              </div>

              <div>
                <b>T.T.L</b>
                <span className="ml-24">
                  : {student?.ttl || "-"}
                </span>
              </div>

              <div>
                <b>Alamat</b>
                <span className="ml-12">
                  : {student?.alamat || "-"}
                </span>
              </div>

            </div>

            <div className="mt-20 flex gap-6 items-end">

              <img
                src={qr}
                className="w-[140px]"
              />

              <img
                src={barcode}
                className="w-[260px] h-[70px]"
              />

            </div>

          </div>

          {/* TTD */}
          <div className="flex flex-col justify-end items-center">

            <p className="text-[16px]">
              Tana Toraja, 21 Juni 2025
            </p>

            <p className="mb-5">
              Kepala Sekolah
            </p>

            <div className="relative w-[220px] h-[170px]">

              <img
                src="/assets/stempel.png"
                className="absolute w-[130px] left-5 opacity-40"
              />

              <img
                src="/assets/ttd.png"
                className="absolute w-[120px] right-0 top-10"
              />

            </div>

            <p className="font-bold">
              Drs. Marthen Arrung, M.M
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}