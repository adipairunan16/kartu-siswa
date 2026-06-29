"use client";

import { domToPng } from "modern-screenshot";

export default function PrintButton() {

async function downloadPNG() {

try {

const card =
document.getElementById(
"student-card"
);

if (!card) {
alert("Kartu tidak ditemukan");
return;
}

const dataUrl =
await domToPng(
card,
{
scale:2
}
);

const link =
document.createElement(
"a"
);

link.href =
dataUrl;

link.download =
"kartu-siswa.png";

link.click();

}

catch(err){

console.error(err);

alert(
"Gagal download gambar"
);

}

}

return (

<div
className="
fixed
bottom-6
right-6
z-50
print:hidden
"
>

<button
onClick={
downloadPNG
}
className="
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
shadow-lg
"
>

⬇ Download PNG

</button>

</div>

);

}