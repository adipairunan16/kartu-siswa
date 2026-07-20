import { google } from "googleapis";
import stringSimilarity from "string-similarity";

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

// =========================
// CACHE
// =========================

const folderCache = new Map();
const fileCache = new Map();

// =========================
// NORMALIZE
// =========================

function normalize(text = "") {
  return text
  .replace(/\.[^.]+$/, "")  
    .toLowerCase()
    .replace(/['`]/g, "")      // hapus apostrof
    .replace(/[^a-z0-9\s]/g, "") // selain huruf, angka, spasi
    .replace(/\s+/g, " ")
    .trim();
}

// =========================
// CARI FOLDER BERDASARKAN KELAS
// =========================
console.log("Folder ID:", process.env.GOOGLE_DRIVE_FOLDER_ID);
async function getFolderId(kelas) {
  if (folderCache.has(kelas)) {
    return folderCache.get(kelas);
  }
    const info = await drive.files.get({
    fileId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    fields: "id,name",
  });

  console.log("=== ROOT FOLDER ===");
  console.log(info.data);

  const response = await drive.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name,mimeType)",
    pageSize: 200,

    supportsAllDrives: true,
includeItemsFromAllDrives: true,
  });
const folders = response.data.files || [];

 console.log("=== HASIL GOOGLE DRIVE ===");
console.log(JSON.stringify(response.data.files, null, 2));
console.log("==========================");

  const folder = folders.find(
    (f) => normalize(f.name) === normalize(kelas)
  );

  if (!folder) {
    console.log("❌ Folder tidak ditemukan:", kelas);
    return null;
  }

  console.log("✅ Folder ditemukan:", folder.name);

  folderCache.set(kelas, folder.id);

  return folder.id;
}

// =========================
// AMBIL FILE DALAM FOLDER
// =========================

async function getFiles(folderId)

{
  if (fileCache.has(folderId)) {
    return fileCache.get(folderId);
  }

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id,name)",
    pageSize: 1000,

supportsAllDrives: true,
includeItemsFromAllDrives: true,

  });

  const files = (response.data.files || []).map((file) => ({
  ...file,
  normalized: normalize(file.name),
}));

  fileCache.set(folderId, files);

  console.log(`📁 ${files.length} foto ditemukan`);

  return files;
}

// =========================
// CARI FOTO SISWA
// =========================

export async function findStudentPhoto(nama, kelas) {
  try {
    console.log("--------------------------------");
    console.log("Nama :", nama);
    console.log("Kelas:", kelas);

    const folderId = await getFolderId(kelas);

    if (!folderId) {
      return "";
    }

    const files = await getFiles(folderId);
const target = normalize(nama);
  let file = files.find(
    (f) => f.normalized === target
);

    if (file) {
      console.log("✅ Exact Match");
    }

    // KEYWORD MATCH
    if (!file) {
      const words = target.split(" ").filter(Boolean);

      file = files.find((f) => {
        const fileName = f.normalized;

        const matched = words.filter((w) =>
          fileName.includes(w)
        );

        return matched.length >= Math.min(2, words.length);
      });

      if (file) {
        console.log("✅ Keyword Match");
      }
    }

  // FUZZY MATCH
if (!file) {
  let bestScore = 0;
  let bestFile = null;

  for (const f of files) {
    const score = stringSimilarity.compareTwoStrings(
      target,
      f.normalized
    );

    if (score > bestScore) {
      bestScore = score;
      bestFile = f;
    }
  }

  console.log("Best Candidate:", bestFile?.name);
  console.log("Similarity:", bestScore);

  // =========================
  // VALIDASI KEYWORD
  // =========================
 const targetWords = target.split(" ").filter(Boolean);
  const fileWords = normalize(bestFile?.name || "")
    .split(" ")
    .filter(Boolean);

  const matched = targetWords.filter(word =>
    fileWords.includes(word)
  );

  console.log("Matched Keyword:", matched);

  const minKeyword = Math.min(2, targetWords.length);

  if (matched.length < minKeyword) {
    console.log("❌ Keyword tidak cukup");
    return "";
  }

  // =========================
  // AMBIL HASIL FUZZY
  // =========================
  if (bestScore >= 0.25) {
    file = bestFile;
    console.log("✅ Fuzzy Match");
  }
}

    if (!file) {
      console.log("❌ Foto tidak ditemukan");
      return "";
    }

    console.log("✅ Foto ditemukan");
    console.log(file.name);

    return file.id;
  } catch (err) {
    console.error("Google Drive Error:", err);
    return "";
  }
}