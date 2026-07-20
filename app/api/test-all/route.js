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

export async function GET() {
  const res = await drive.files.list({
    pageSize: 20,
    fields: "files(id,name,mimeType,parents)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return Response.json(res.data.files);
}