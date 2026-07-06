"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [students, setStudents] = useState([]);
const [kelas, setKelas] = useState("");
  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
  try {
    const res = await fetch("/api/students");
    const data = await res.json();

    if (Array.isArray(data)) {
      setStudents(data);
    } else if (data.success && Array.isArray(data.data)) {
      setStudents(data.data);
    } else {
      console.error("API Error:", data);
      setStudents([]);
    }
  } catch (err) {
    console.error(err);
    setStudents([]);
  }
}

  async function upload() {
    if (!file) {
      alert("Pilih file Excel terlebih dahulu");
     
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/import", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      setResult(data);

      // Refresh tabel setelah upload berhasil
      await loadStudents();
    } catch (err) {
      alert("Upload gagal");
      console.log(err);
    }

    setLoading(false);
  }

  async function syncPhotos() {
  if (!confirm("Sinkronkan semua foto dari Google Drive?")) {
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/sync-photos", {
      method: "POST",
    });

    const data = await res.json();

    if (data.success) {
      alert(
        `Berhasil mengupdate ${data.updated} dari ${data.total} siswa`
      );

      await loadStudents();
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Sinkron gagal");
  }

  setLoading(false);
}
  const studentList = Array.isArray(students) ? students : [];

  const kelasList = [...new Set(studentList.map((s) => s.kelas))].sort();
 const filteredStudents =
  kelas === ""
    ? studentList
    : studentList.filter((s) => s.kelas === kelas);

return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-500 text-white p-10">
        <h1 className="text-5xl font-black">
          Dashboard Admin
        </h1>

        <p className="mt-2">
          Upload Data Siswa
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-10">

        {/* Card Upload & Template */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Upload */}
          <div className="bg-white rounded-3xl shadow p-10">

            <h2 className="text-3xl font-bold mb-6">
              Upload Excel
            </h2>

            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-6"
            />

            <br />

            <button
              onClick={upload}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
            >
              {loading ? "Upload..." : "Upload Sekarang"}
            </button>

            <button
  onClick={syncPhotos}
  className="ml-3 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
>
  📷 Sinkronkan Foto
</button>

            {result && (
              <div className="mt-8 bg-green-50 p-5 rounded">
                <pre>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

          </div>

          {/* Template */}
          <div className="bg-white rounded-3xl shadow p-10">

            <h2 className="text-3xl font-bold mb-6">
              Format Excel
            </h2>

            <table className="w-full border">

             <thead className="bg-blue-600 text-white">
  <tr>
    <th className="border p-2">No</th>
    <th className="border p-2">Nama</th>
    <th className="border p-2">Kelas</th>
    <th className="border p-2">NIS</th>
    <th className="border p-2">NISN</th>
    <th className="border p-2">JK</th>
    <th className="border p-2">Tempat</th>
    <th className="border p-2">TTL</th>
    <th className="border p-2">Alamat</th>
    <th className="border p-2">Aksi</th>
  </tr>
</thead>

              <tbody>

                <tr>

                  <td className="border p-2">ADY</td>
                  <td className="border p-2">XI TKJ</td>
                  <td className="border p-2">0209</td>
                  <td className="border p-2">123456</td>
                  <td className="border p-2">L</td>
                  <td className="border p-2">Makale</td>
                  <td className="border p-2">21 Juni 2008</td>
                  <td className="border p-2">Toraja</td>
                  <td className="border p-2">URL FOTO</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Data Siswa */}
        <div className="bg-white rounded-3xl shadow mt-10 p-10">

          <div className="flex justify-between items-center mb-5">

  <h2 className="text-3xl font-bold">
    Data Siswa
  </h2>

  <div className="flex items-center gap-3">
 <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
    Total : {filteredStudents.length}
  </span>
    <select
      value={kelas}
      onChange={(e) => setKelas(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">Pilih Kelas</option>

      {kelasList.map((k) => (
        <option key={k} value={k}>
          {k}
        </option>
      ))}

    </select>

    <button
      onClick={() =>
        window.open(
          `/print/class/${encodeURIComponent(kelas)}`,
          "_blank"
        )
      }
      disabled={!kelas}
      className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
    >
      🖨 Cetak Semua
    </button>
<button
  onClick={() => window.open("/print/back", "_blank")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
>
  📄 Cetak Belakang
</button>
  </div>

</div>

          <div className="overflow-auto">

            <table className="w-full border">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="border p-2">No</th>
                  <th className="border p-2">Nama</th>
                  <th className="border p-2">Kelas</th>
                  <th className="border p-2">NIS</th>
                  <th className="border p-2">NISN</th>
                  <th className="border p-2">JK</th>
                  <th className="border p-2">Tempat</th>
                  <th className="border p-2">TTL</th>
                  <th className="border p-2">Alamat</th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="10"
                      className="text-center p-5"
                    >
                      Belum ada data siswa
                    </td>

                  </tr>

                ) : (

                  filteredStudents.map((student, index) => (

                    <tr
                      key={student._id}
                      className="hover:bg-gray-100"
                    >

                      <td className="border p-2">
                        {index + 1}
                      </td>

                      <td className="border p-2">
                        {student.name}
                      </td>

                      <td className="border p-2">
                        {student.kelas}
                      </td>

                      <td className="border p-2">
                        {student.nis}
                      </td>

                      <td className="border p-2">
                        {student.nisn}
                      </td>

                      <td className="border p-2">
                        {student.jk}
                      </td>

                      <td className="border p-2">
                        {student.tempat}
                      </td>

                      <td className="border p-2">
                        {student.ttl}
                      </td>

                      <td className="border p-2">
  {student.alamat}
</td>

<td className="border p-2">
  <div className="flex gap-2 justify-center">

    <a
      href={`/card/${student._id}`}
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
    >
      🖨 Cetak
    </a>

    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
    >
      ✏ Edit
    </button>

    <button
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      🗑 Hapus
    </button>

  </div>
</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}