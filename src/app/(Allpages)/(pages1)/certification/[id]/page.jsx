"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const CertificationPage = () => {
  const params = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/certification/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch certification");
        }

        const data = await response.json();
        setCertificateData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCertification();
    }
  }, [params.id]);

  // PDF Download function
  const downloadCertificate = async () => {
    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const certificateElement = document.getElementById("certificate-canvas");
      if (!certificateElement) {
        console.error("Certificate element not found");
        return;
      }

      // Show loading state
      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = "Generating PDF...";
      }

      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: certificateElement.offsetWidth,
        height: certificateElement.offsetHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");

      // Calculate dimensions to fit the certificate properly
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image on the page
      const x = 0;
      const y = (210 - imgHeight) / 2; // A4 height is 210mm

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // Generate filename
      const studentName =
        certificateData?.studntName ||
        certificateData?.StudntName ||
        certificateData?.userName ||
        certificateData?.UserName ||
        "Student";
      const courseName =
        certificateData?.courseName || certificateData?.CourseName || "Course";
      const filename = `${studentName}_${courseName}_Certificate.pdf`;

      // Download the PDF
      pdf.save(filename);

      // Reset button state
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = "Download certificate";
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Reset button state on error
      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = "Download certificate";
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certification...</p>
        </div>
      </div>
    );
  }

  if (error || !certificateData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Certification Not Found
          </h1>
          <p className="text-gray-600">
            This certification ID is not valid or has been revoked.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100 p-8 select-none">
      {/* Download Button */}
      <button
        id="download-btn"
        onClick={downloadCertificate}
        className="absolute top-[20%] right-[5%] z-40 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        Download certificate
      </button>

      {/* CERTIFICATE CANVAS */}
      <div
        id="certificate-canvas"
        className="relative w-full h-[35rem] bg-white"
      >
        {/* Watermark */}
        <span className="absolute inset-0 flex items-center justify-center text-[10rem] leading-none font-extrabold text-green-50 pointer-events-none">
          Codixa
        </span>

        {/* Top‑left logo */}
        <img
          src="/logo.gif"
          alt="Codixa Logo"
          className="absolute top-8 left-8 w-24"
        />

        {/* MAIN TEXT BLOCK */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-4">
          <h2 className="text-2xl font-extrabold tracking-wider text-yellow-800 mb-8">
            CERTIFICATE OF COMPLETION
          </h2>

          <p className="text-lg text-gray-700 mb-2">This certifies that</p>

          <p className="text-3xl font-bold text-gray-900 mb-4">
            {certificateData.studntName ||
              certificateData.StudntName ||
              certificateData.userName ||
              certificateData.UserName ||
              "[Student Name]"}
          </p>

          <p className="text-lg text-gray-700 mb-2">
            has completed the necessary courses of study and passed
          </p>

          <p className="text-2xl font-semibold text-green-700 mb-6">
            {certificateData.courseName ||
              certificateData.CourseName ||
              "[Course Name]"}
          </p>

          {/* Extra descriptor line to mimic sample certificate */}
          <p className="text-md text-gray-600 mb-8 max-w-xl">
            with fundamental knowledge of web development using HTML5
          </p>

          {/* Instructor & association */}
          <p className="text-md text-gray-600 mb-1">
            Instructor:{" "}
            {certificateData.instructorName ||
              certificateData.InstructorName ||
              "[Instructor]"}
          </p>
          <p className="text-md text-gray-600 mb-8">
            Association:{" "}
            <span className="font-bold text-green-700">codixa</span>
          </p>

          <p className="text-sm text-gray-600">
            Issued{" "}
            {certificateData.certificationDate ||
              certificateData.CertificationDate ||
              certificateData.date ||
              certificateData.Date ||
              "[Date]"}
          </p>
        </div>

        {/* Signature block */}
        <div className="absolute bottom-20 right-16 text-center">
          <span className="text-sm font-medium text-gray-800">
            Instructor:{" "}
            {certificateData?.instructorName ||
              certificateData?.InstructorName ||
              "[Instructor]"}
          </span>
          <br />
          <span className="text-xs text-gray-600">for Codixa</span>
        </div>

        {/* Verification link */}
        <div className="absolute bottom-8 left-16 text-xs text-gray-600 leading-snug">
          Verify completion at:
          <br />
          <a
            href={`https://codixa.vercel.app/certification/${params.id}`}
            className="underline text-blue-600 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://codixa.vercel.app/certification/{params.id}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificationPage;
