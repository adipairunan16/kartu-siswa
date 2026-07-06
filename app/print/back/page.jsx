import StudentCardBack from "@/components/StudentCardBack";
import DownloadBackButton from "@/components/DownloadBackButton";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-200 py-10">

      <div className="flex justify-center mb-8 print:hidden">
        <DownloadBackButton />
      </div>

      <div className="flex justify-center">
        <StudentCardBack />
      </div>

    </div>
  );
}