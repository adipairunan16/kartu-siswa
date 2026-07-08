import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import { findStudentPhoto } from "@/lib/googleDrive";

export async function POST() {
  try {
    await connectDB();

    const students = await Student.find();

    let success = 0;

  for (const student of students) {
  const photo = await findStudentPhoto(
    student.name,
    student.kelas
  );

  if (photo) {
    student.photo = photo;
    console.log(`✅ Update: ${student.name}`);
    success++;
  } else {
    student.photo = "";      // atau null
    console.log(`❌ Tidak ditemukan: ${student.name}`);
  }

  await student.save();
}

    return Response.json({
      success: true,
      total: students.length,
      updated: success,
    });

  } catch (err) {
    console.error(err);

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