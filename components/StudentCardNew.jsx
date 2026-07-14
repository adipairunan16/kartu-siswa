export default function StudentCardNew({
  student,
  qr,
  barcode,
}) {
  return (
<div
id="student-card"
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

{/* BACKGROUND */}
<div
className="
absolute
inset-0
pointer-events-none
"
>

<img
src="/assets/bg-sekolah.jpg"
className="
w-full
h-full
object-cover
opacity-[0.10]
"
/>

</div>


{/* HEADER */}
<div
style={{
background:
"linear-gradient(120deg,#07265d 0%,#0d4f8b 45%,#35bde7 100%)"
}}
className="
h-[120px]
relative
"
>

<div
className="
absolute
left-[5px]
top-[12px]
w-[130px]
h-[95px]
rounded-full
bg-blue
flex
items-center
justify-center
shadow-md
"
>

<img
src="/assets/logo-kiri.png"
className="
w-[500px]
h-[110px]
object-contain
bg-white
rounded-full
"
/>

</div>
<div
className="
absolute
right-[1060px]
top-[12px]
w-[130px]
h-[95px]
rounded-full
bg-blue
flex
items-center
justify-center
shadow-md
"
>


<img
src="/assets/logo-kanan.png"
className="
absolute
left-265
top-12px
w-[120px]
h-[115px]
object-contain
bg-white
rounded-full
"
/>
</div>
<div className="text-center text-white pt-3">

<p className="text-[15px]">

YAYASAN PENDIDIKAN KRISTEN
BUNTU AMBAANG

</p>

<h1
className="
text-[40px]
font-black
leading-none
"
>

SMK KRISTEN PELANGI MAKALE

</h1>

<p className="text-[15px]">

Jln. Buisun Burake No.1, Kel.Buntu Burake, Kec.Makale,Kab. Tana Toraja Prov.Sulawesi Selatan

</p>

</div>

</div>



{/* BODY */}
<div
  className="
  relative
  z-10
  px-14
  py-6
"
>

  {/* JUDUL */}
  <div className="text-center mb-">
    <h2
      className="
      text-[25px]
      font-black
      tracking-[6px]
      text-[#07265d]
      uppercase
      "
    >
      KARTU SISWA
    </h2>
   
  </div>

  <div
    className="
    grid
    grid-cols-[260px_1fr_300px]
    gap-8
    "
  ></div>

{/* FOTO */}
<div>

<div
  className="
  w-[190px]
  h-[250px]
  border
  overflow-hidden
  "
>

  

  {student.photo ? (
  <img
    src={`/api/photo/${student.photo}`}
    alt={student.name}
    className="w-full h-full object-cover block"
  />
) : (
  <div
    className="
      w-full
      h-full
      border-2
      border-dashed
      border-gray-400
      bg-gray-100
      flex
      flex-col
      items-center
      justify-center
    "
  >
    <div className="text-5xl font-bold text-gray-500">
      3×4
    </div>

    <div className="text-lg text-gray-500 mt-2">
      FOTO
    </div>
  </div>
)}

</div>

<div className="mt-10">

<p className="text-[22px] font-bold">

BERLAKU S/D :

</p>

<p
className="
text-[45px]
font-black
"
>

06 / 2027

</p>

</div>

</div>



{/* DATA */}
<div>

<h1
className="
absolute
left-70
top-[65px]
text-[34px]
font-black
uppercase
leading-relaxed
whitespace-nowrap
overflow-hidden
text-ellipsis
"
>

{student.name}

</h1>


<div
className="
buttom-20px
space-y-7
text-[28px]
"
>

<div className="leading-relaxed absolute top-[55px] left-70 grid grid-cols-[180px_1fr] translate-y-20">

<b>NIS / NISN</b>

<span>

: {student.nis} / {student.nisn}

</span>






<b>T.T.L</b>
<span>


: {student.ttl || "-"}

</span>






<b>Alamat</b>

<span>

: {student.alamat || "-"}

</span>

</div>

</div>

</div>



{/* TTD */}
<div
className="
absolute
right-10
top-[60px]
flex-col
items-center
pt-[200px]
"
>

<p className="translate-y-10 text-[22px]">

Tana Toraja,
1 Juli 2026

</p>

<p className="translate-y-9 text-[22px]">

Kepala Sekolah

</p>


<div
className="
relative
w-[220px]
h-[140px]
-translate-y-4
"
>

<img
src="/assets/stempel.png"
className="
absolute
right-[150px]
top-[10px]
w-[160px]
opacity-90
"
/>

<img
src="/assets/ttd.png"
className="
absolute
right-[20px]
top-[-40px]

w-[400px]
object-contain
"
/>

</div>

<p
className="
font-bold
text-center
text-[22px]



"
>

Andarias Palallo, S.E., S.Pd.

</p>

</div>

</div>


{/* QR */}
<div
className="
absolute
bottom-[60px]
left-[310px]
z-40
"
>

<img
src={qr}
className="
w-[170px]
"
/>

</div>



{/* BARCODE FULL */}
{/* BARCODE FULL */}
<div
className="
absolute
left-[35px]
right-[35px]
bottom-[15px]
h-[20px]
overflow-hidden
"
>

<img
src={barcode}
className="
w-full
h-[80px]
object-cover
object-top
"
/>

</div>

</div>
);
}
