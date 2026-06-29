import StudentCardNew from "@/components/StudentCardNew";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";

async function getStudent(id) {
  await connectDB();

  const student =
    await Student
      .findById(id)
      .lean();

  if (!student) return null;

  return JSON.parse(
    JSON.stringify(student)
  );
}

export default async function Page({
  params,
}) {

const { id } =
await params;

const student =
await getStudent(id);

if (!student) {
notFound();
}

const qr =
`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${student.nis}`;

const barcode =
`https://barcodeapi.org/api/128/${student.nis}?showtext=false`;

return (

<div className="min-h-screen bg-slate-300 py-10">

<PrintButton />

<div className="flex justify-center">

 <StudentCardNew
        student={student}
        qr={qr}
        barcode={barcode}
      />

</div>

</div>

);

}