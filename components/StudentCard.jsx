export default function StudentCard({
student,
qr,
barcode,
}) {

return (

<div className="w-[860px] bg-white rounded-[26px] overflow-hidden shadow-2xl">

{/* HEADER */}
<div className="relative bg-gradient-to-r from-[#0a2a63] to-[#37c1ea] h-[110px]">

<img
src="/assets/logo-kiri.png"
className="absolute left-8 top-3 w-[70px] h-[70px] bg-white rounded-full p-2"
/>

<img
src="/assets/logo-kanan.png"
className="absolute right-8 top-3 w-[70px]"
/>

<div className="text-center text-white pt-4">

<p className="text-[13px]">
YAYASAN PENDIDIKAN KRISTEN BUNTU AMBAANG
</p>

<h1 className="text-[35px] font-black leading-none">
SMK KRISTEN PELANGI
</h1>

<h1 className="text-[35px] font-black leading-none">
MAKALE
</h1>

<p className="text-[12px]">
Jln. Buisun Burake No.1
</p>

</div>

</div>


{/* BODY */}
<div className="grid grid-cols-[200px_1fr_250px] px-10 py-8 gap-8">


{/* FOTO */}
<div>

<div className="w-[160px] h-[210px] bg-red-100 border">

{student?.photo && (

<img
src={student.photo}
alt=""
className="w-full h-full object-cover"
/>

)}

</div>

<div className="mt-5">

<p className="font-bold text-[18px]">
BERLAKU S/D :
</p>

<p className="text-[34px] font-black">
06 / 2026
</p>

</div>

</div>


{/* DATA */}
<div>

<h2 className="text-[40px] font-black mb-10">
{student?.name}
</h2>

<div className="space-y-6 text-[18px]">

<div>
<b>NIS / NISN</b> :
{student?.nis}
</div>

<div>
<b>T.T.L</b> :
{student?.ttl || "-"}
</div>

<div>
<b>Alamat</b> :
{student?.alamat || "-"}
</div>

</div>

<div className="mt-16 flex gap-6">

<img
src={qr}
className="w-[130px]"
/>

<img
src={barcode}
className="w-[220px] h-[70px]"
/>

</div>

</div>


{/* TTD */}
<div className="flex flex-col justify-end items-center">

<p>
Tana Toraja, 21 Juni 2025
</p>

<p>
Kepala Sekolah
</p>

<div className="relative h-[180px] w-[220px]">

<img
src="/assets/stempel.png"
className="absolute w-[130px] left-10 opacity-40"
/>

<img
src="/assets/ttd.png"
className="absolute w-[120px] right-0 top-12"
/>

</div>

<p className="font-bold">
Drs. Marthen Arrung, M.M
</p>

</div>

</div>

</div>

);

}