import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

// =========================
// GET : Ambil semua data siswa
// =========================
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find().sort({
      name: 1,
    });

    return Response.json(students, {
      status: 200,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// POST : Tambah satu siswa
// =========================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const student = await Student.create({
      name: body.name,
      kelas: body.kelas,
      nis: body.nis,
      nisn: body.nisn,
      jk: body.jk,
      tempat: body.tempat,
      ttl: body.ttl,
      alamat: body.alamat,
      photo: body.photo,
    });

    return Response.json(
      {
        success: true,
        data: student,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}