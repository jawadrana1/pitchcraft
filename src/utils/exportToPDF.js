import jsPDF from "jspdf";

export const exportPitchToPDF = (pitch) => {
  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(pitch.name || "Untitled Startup", 10, 20);

  // Tagline
  doc.setFont("helvetica", "italic");
  doc.setFontSize(14);
  doc.text(pitch.tagline || "", 10, 30);

  // Pitch section
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Pitch:", 10, 45);
  doc.setFont("helvetica", "normal");
  doc.text(doc.splitTextToSize(pitch.pitch || "No pitch available", 180), 10, 55);

  // Hero section
  doc.setFont("helvetica", "bold");
  doc.text("Hero Line:", 10, 90);
  doc.setFont("helvetica", "normal");
  doc.text(doc.splitTextToSize(pitch.hero || "", 180), 10, 100);

  // Footer with date
  const date = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${date}`, 10, 280);

  // Save PDF
  doc.save(`${pitch.name?.replace(/\s+/g, "_") || "startup_pitch"}.pdf`);
};
