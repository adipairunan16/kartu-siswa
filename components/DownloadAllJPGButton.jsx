"use client";

import { domToPng } from "modern-screenshot";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function DownloadAllJPGButton() {
  async function downloadAll() {
    try {
      const zip = new JSZip();

      // Ambil semua kartu
      const cards = document.querySelectorAll("[id^='card-']");

      if (cards.length === 0) {
        alert("Tidak ada kartu ditemukan");
        return;
      }

      for (const card of cards) {
        // Ambil nama siswa untuk nama file
        const nama = card.dataset.name || "Siswa";

        // Render menjadi PNG
        const png = await domToPng(card, {
          scale:4,
          backgroundColor:"#ffffff"
        });

        // Konversi PNG -> JPG
        const img = new Image();
        img.src = png;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        // Background putih
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

        const jpg = canvas.toDataURL("image/jpeg", 1);

        // Base64 -> Blob
        const blob = await (await fetch(jpg)).blob();

        zip.file(`${nama}.jpg`, blob);
      }

      // Buat ZIP
      const content = await zip.generateAsync({
        type: "blob",
      });

      saveAs(content, "Kartu-Siswa.zip");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat ZIP");
    }
  }

  return (
    <button
      onClick={downloadAll}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
    >
      📥 Download Semua JPG
    </button>
  );
}