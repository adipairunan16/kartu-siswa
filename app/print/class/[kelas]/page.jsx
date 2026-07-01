import Student from "@/models/Student";
import { connectDB } from "@/lib/mongodb";
import StudentCardNew from "@/components/StudentCardNew";
import DownloadAllJPGButton from "@/components/DownloadAllJPGButton";


async function getStudents(kelas) {
  await connectDB();

  const students = await Student.find({
    kelas: decodeURIComponent(kelas),
  }).lean();



  return JSON.parse(JSON.stringify(students));
}

export default async function Page({ params }) {
  const { kelas } = await params;

  const students = await getStudents(kelas);

  return (
    <div className="min-h-screen bg-slate-200 py-10">

      <div className="flex justify-center mb-8 print:hidden">
  <DownloadAllJPGButton />
    </div>

      <div className="flex flex-col items-center gap-10">

        {students.map((student) => {

          const qr =
            `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${student.nis}`;

          const barcode =
            `https://barcodeapi.org/api/128/${student.nis}?showtext=false`;

          return (
            <div
            id={`card-${student._id}`}
            data-name={student.name}
              key={student._id}
              className="print:break-after-page"
            >
              <StudentCardNew
                student={student}
                qr={qr}
                barcode={barcode}
              />
            </div>
          );
        })}

      </div>

    </div>
  );
}