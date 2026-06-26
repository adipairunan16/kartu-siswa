import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "File kosong" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();

    const workbook = XLSX.read(Buffer.from(bytes), {
      type: "buffer",
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Baca semua data sebagai array
    const data = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    if (data.length < 2) {
      return Response.json(
        { error: "File Excel tidak memiliki data." },
        { status: 400 }
      );
    }

    // Header (baris pertama)
    const headers = data[0].map((h) => String(h).trim());

    // Data mulai baris kedua
    const students = data.slice(1).map((row) => {
      const obj = {};

      headers.forEach((header, index) => {
        obj[header] = row[index] ?? "";
      });

      return {
        name: String(obj["NAMA"] || ""),
        kelas: String(obj["KELAS"] || ""),
        nis: String(obj["NIS"] || ""),
        nisn: String(obj["NISN"] || ""),
        jk: String(obj["JK"] || ""),
        tempat: String(obj["TEMPAT"] || ""),
        ttl: String(
          obj["Tempat, Tanggal Lahir"] ||
          obj["TTL"] ||
          ""
        ),
        alamat: String(obj["ALAMAT"] || ""),
        photo: String(obj["FOTO"] || ""),
      };
    });

    // Hapus data lama
    await Student.deleteMany({});

    // Simpan data baru
    await Student.insertMany(students);

    return Response.json({
      success: true,
      total: students.length,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}