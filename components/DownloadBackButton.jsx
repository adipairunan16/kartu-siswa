"use client";

import { toJpeg } from "html-to-image";

export default function DownloadBackButton() {
  async function download() {
    const card = document.getElementById("back-card");

    if (!card) return;

    const dataUrl = await toJpeg(card, {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = "belakang-kartu.jpg";
    link.href = dataUrl;
    link.click();
  }

  return (
    <button
      onClick={download}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
    >
      📥 Download JPG
    </button>
  );
}