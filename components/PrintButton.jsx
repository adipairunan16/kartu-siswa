"use client";

export default function PrintButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      onClick={handlePrint}
      className="
      fixed
      bottom-6
      right-6
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-6
      py-3
      rounded-xl
      shadow-lg
      z-50
      "
    >
      🖨 Cetak PDF
    </button>
  );
}