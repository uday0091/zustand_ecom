import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const Qrcode = () => {
  const [scanResults, setScanResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Scanner instance banate hi nahi start karenge
    scannerRef.current = new Html5Qrcode("reader");
    console.log(scannerRef.current)
    return () => {
        if (scannerRef.current?.isScanning) {
          scannerRef.current
            .stop()
            .then(() => {
              setIsScanning(false);
              try {
                scannerRef.current.clear(); // ✅ no .catch
              } catch (e) {
                console.warn("Clear failed", e);
              }
            })
            .catch((err) => console.error("Stop failed", err));
        } else {
          try {
            scannerRef.current?.clear(); // ✅ safe call
          } catch (e) {
            console.warn("Clear failed", e);
          }
        }
      };
      
  }, []);

  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }, // ✅ Ye visible box hoga
    formatsToSupport: [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.ITF,
      Html5QrcodeSupportedFormats.PDF_417,
      Html5QrcodeSupportedFormats.DATA_MATRIX,
      Html5QrcodeSupportedFormats.AZTEC,
      Html5QrcodeSupportedFormats.MAXICODE,
    ],
  };

  const startScanner = () => {
    if (!scannerRef.current) return;

    scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setScanResults((prev) =>
            prev.includes(decodedText) ? prev : [...prev, decodedText]
          );
        }
      )
      .then(() => setIsScanning(true))
      .catch((err) => console.error("Camera start failed", err));
  };

  const stopScanner = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().then(() => {
          setIsScanning(false);
          return scannerRef.current.clear(); // ✅ div ko empty karega
        })
        .catch((err) => console.error("Stop failed", err));
    }
  };

  return (
    <div className="qrcode bgcolor">
      <motion.h1
        className="mb-3"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        Multi QR/Barcode Scanner
      </motion.h1>

      {/* Scanner Box */}
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          minHeight: "300px",
          border: "2px dashed #fff",
          borderRadius: "8px",
          marginLeft:"10px"
        }}
      ></div>

      {/* Buttons */}
      <div className="flex gap-3 mt-3 ">
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="px-4 py-2 bg-green-600 ms-3 text-white rounded-lg shadow hover:bg-green-700"
          >
            Start Scanner
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Stop Scanner
          </button>
        )}
      </div>

      {/* Live Results */}
      <div className="mt-5">
        <h2 className="text-lg font-bold mb-2">✅ Scanned Codes:</h2>
        <div className="max-h-60 overflow-y-auto border rounded p-2">
          <ul className="space-y-1">
            {scanResults.map((code, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <a
                  href={code.startsWith("http") ? code : undefined}
                  target="_blank"
                  rel="noreferrer"
                >
                  {code}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Qrcode;
