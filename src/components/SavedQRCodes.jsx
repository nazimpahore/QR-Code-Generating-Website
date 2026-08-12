import { useState, useEffect } from "react";
import { getSavedList } from "./QRGenerator";

const SAVED_LIST_KEY = "qr_saved_list";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function truncate(str, max = 48) {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export default function SavedQRCodes({ navigate, onReuse }) {
  const [list, setList] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setList(getSavedList());
  }, []);

  const handleDelete = (id) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updated));
    setDeleteId(null);
  };

  const handleDownload = (item) => {
    const link = document.createElement("a");
    link.href = item.dataUrl;
    link.download = "qrcode.png";
    link.click();
  };

  const handleReuse = (value) => {
    onReuse(value);
  };

  const handleClearAll = () => {
    setList([]);
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify([]));
    setDeleteId(null);
  };

  return (
    <main className="px-4 py-12 max-w-5xl mx-auto">
      <section aria-labelledby="saved-qr-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h1 id="saved-qr-heading" className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Saved QR Codes
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {list.length === 0
                ? "No QR codes saved in your browser history yet."
                : `${list.length} QR code${list.length !== 1 ? "s" : ""} saved locally`}
            </p>
          </div>

          {list.length > 0 && (
            <button
              onClick={handleClearAll}
              aria-label="Clear all saved QR codes from history"
              className="self-start sm:self-auto text-sm text-red-500 hover:text-red-700 font-semibold transition-colors cursor-pointer px-3.5 py-1.5 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-200"
            >
              Clear All History
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border border-gray-200 rounded-3xl text-center">
            <p className="text-slate-600 text-sm mb-6 max-w-md">
              QR codes you create with QRcraft are automatically saved locally in your browser so you can download or edit them anytime.
            </p>
            <button
              onClick={() => navigate("home")}
              aria-label="Navigate to home page to generate a QR code"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Generate a QR Code Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col items-center hover:border-blue-200 transition-colors"
              >
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 shadow-inner">
                  <img
                    src={item.dataUrl}
                    alt={`Generated QR code for ${item.value}`}
                    width={160}
                    height={160}
                    className="block"
                  />
                </div>

                <div className="mt-4 w-full text-center">
                  <p
                    className="text-sm text-slate-800 font-semibold leading-snug break-all"
                    title={item.value}
                  >
                    {truncate(item.value)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Saved on {formatDate(item.savedAt)}
                  </p>
                </div>

                <div className="mt-5 flex gap-2 w-full">
                  <button
                    onClick={() => handleDownload(item)}
                    aria-label={`Download PNG QR code for ${item.value}`}
                    className="flex-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleReuse(item.value)}
                    aria-label={`Reuse value ${item.value} in QR generator`}
                    className="flex-1 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-slate-700 py-2 rounded-xl border border-gray-200 transition-colors cursor-pointer"
                  >
                    Reuse
                  </button>
                  <button
                    onClick={() =>
                      deleteId === item.id
                        ? handleDelete(item.id)
                        : setDeleteId(item.id)
                    }
                    aria-label={`Delete QR code for ${item.value}`}
                    className={`flex-1 text-xs font-semibold py-2 rounded-xl border transition-colors cursor-pointer ${
                      deleteId === item.id
                        ? "bg-red-600 hover:bg-red-700 text-white border-transparent"
                        : "bg-white hover:bg-red-50 text-red-500 hover:text-red-700 border-gray-200 hover:border-red-200"
                    }`}
                  >
                    {deleteId === item.id ? "Confirm" : "Delete"}
                  </button>
                </div>

                {deleteId === item.id && (
                  <button
                    onClick={() => setDeleteId(null)}
                    aria-label="Cancel deletion"
                    className="mt-2 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
