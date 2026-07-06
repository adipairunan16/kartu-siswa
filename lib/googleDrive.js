import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_PROJECT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

// Cache daftar file agar tidak request berkali-kali
let cachedFiles = null;

async function getFiles() {
  if (cachedFiles) return cachedFiles;

  const response = await drive.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed=false`,
    fields: "files(id,name)",
    pageSize: 1000,
  });

  cachedFiles = response.data.files || [];
  console.log(`📁 Google Drive: ${cachedFiles.length} file ditemukan`);

  return cachedFiles;
}

export async function findStudentPhoto(nama, kelas) {
  const files = await getFiles();

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const words = normalize(nama).split(" ");

const file = files.find((f) => {
  const fileName = normalize(f.name);

  return words.every((word) => fileName.includes(word));
});
  console.log("Mencari:", nama);

  if (!file) {
    console.log("❌ Foto tidak ditemukan");
    return "";
  }

console.log("FILE:", file);

console.log("================================");
console.log("SISWA :", nama);
console.log("FILE  :", file.name);
console.log("ID    :", file.id);
console.log("================================");

// Simpan hanya File ID
return file.id;
}