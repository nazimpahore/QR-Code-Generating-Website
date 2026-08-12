import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";

const LAST_INPUT_KEY = "qr_last_input";
const LAST_QR_KEY = "qr_last_qr";
const SAVED_LIST_KEY = "qr_saved_list";

export function getSavedList() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_LIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveToList(entry) {
  const list = getSavedList();
  const exists = list.find((item) => item.value === entry.value);
  if (exists) {
    const updated = list.map((item) =>
      item.value === entry.value ? { ...item, dataUrl: entry.dataUrl, savedAt: entry.savedAt } : item
    );
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updated));
  } else {
    const updated = [entry, ...list];
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updated));
  }
}

export default function QRGenerator({ reuseValue, clearReuseValue }) {
  const [inputValue, setInputValue] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const lastInput = localStorage.getItem(LAST_INPUT_KEY) || "";
    const lastQr = localStorage.getItem(LAST_QR_KEY) || "";
    if (lastInput) setInputValue(lastInput);
    if (lastQr) setQrDataUrl(lastQr);
  }, []);

  useEffect(() => {
    if (reuseValue) {
      setInputValue(reuseValue);
      setQrDataUrl("");
      setError("");
      clearReuseValue();
    }
  }, [reuseValue, clearReuseValue]);

  const generateQR = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Please enter a URL or text to generate your free QR code.");
      return;
    }
    setError("");
    try {
      const dataUrl = await QRCode.toDataURL(trimmed, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });

      setQrDataUrl(dataUrl);
      localStorage.setItem(LAST_INPUT_KEY, trimmed);
      localStorage.setItem(LAST_QR_KEY, dataUrl);

      saveToList({
        id: Date.now().toString(),
        value: trimmed,
        dataUrl,
        savedAt: new Date().toISOString(),
      });

      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2500);
    } catch {
      setError("Failed to generate QR code. Please enter valid text or URL.");
    }
  }, [inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") generateQR();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "custom-qrcode.png";
    link.click();
  };

  const handleClear = () => {
    setInputValue("");
    setQrDataUrl("");
    setError("");
    setSavedFeedback(false);
    localStorage.removeItem(LAST_INPUT_KEY);
    localStorage.removeItem(LAST_QR_KEY);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is QRcraft completely free to use?",
      a: "Yes, QRcraft is a 100% free online QR code generator. There are no registration forms, subscriptions, dynamic scan limits, or hidden fees.",
    },
    {
      q: "Do generated QR codes expire?",
      a: "No! Standard static QR codes created on QRcraft contain direct encoded data, meaning they will work permanently without ever expiring.",
    },
    {
      q: "Are my QR codes private and secure?",
      a: "Absolutely. All QR code generation is performed locally inside your browser using JavaScript. No links or data are sent to any remote server.",
    },
    {
      q: "Can I download high-resolution PNG QR codes?",
      a: "Yes, you can generate and download print-ready, crisp 300x300 PNG QR codes directly to your device with a single click.",
    },
    {
      q: "What content can I turn into a QR code?",
      a: "You can convert website URLs, social media profiles, Wi-Fi access details, contact information, email messages, payment links, or plain text.",
    },
    {
      q: "How can I reuse or access my previously generated QR codes?",
      a: "QRcraft automatically stores your generated QR codes in your browser's local storage. Navigate to the 'Saved QR Codes' tab anytime to retrieve or re-download them.",
    },
  ];

  return (
    <div className="px-4 py-10 max-w-5xl mx-auto space-y-16">
      {/* Hero & Generator Tool Section */}
      <section aria-labelledby="main-heading" className="flex flex-col items-center">
        <div className="w-full max-w-xl text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
            100% Free &amp; Unlimited QR Code Maker
          </span>
          <h1
            id="main-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
          >
            Free QR Code Generator Online
          </h1>
          <p id="qr-input-help" className="text-base text-slate-600 leading-relaxed">
            Create custom high-resolution QR codes instantly for website URLs, text, Wi-Fi, email, and phone numbers without registration.
          </p>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <label htmlFor="qr-input" className="block text-sm font-semibold text-slate-800 mb-2">
            Enter URL, Text, or Data
          </label>
          <div className="relative">
            <input
              id="qr-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. https://yourwebsite.com or text"
              aria-describedby="qr-input-help"
              className="w-full px-4 py-3 text-sm text-slate-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
            />
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-600 font-medium" role="alert">
              {error}
            </p>
          )}

          <button
            onClick={generateQR}
            aria-label="Generate QR Code"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
          >
            Generate QR Code Now
          </button>
        </div>

        {/* QR Code Output Card */}
        {qrDataUrl && (
          <div
            className="mt-6 w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center animate-fadeIn"
            aria-live="polite"
          >
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-inner">
              <img
                src={qrDataUrl}
                alt="Custom generated high-resolution QR code PNG"
                width={240}
                height={240}
                className="block rounded-md"
              />
            </div>

            {savedFeedback && (
              <p className="mt-3 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Saved automatically to your browser history!
              </p>
            )}

            <div className="mt-5 flex gap-3 w-full">
              <button
                onClick={handleDownload}
                aria-label="Download PNG image of QR Code"
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Download PNG
              </button>
              <button
                onClick={handleClear}
                aria-label="Clear input and generated QR code"
                className="flex-1 bg-white hover:bg-gray-100 text-slate-700 text-sm font-semibold py-2.5 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </section>

      {/* How It Works Section (On-Page SEO) */}
      <section aria-labelledby="how-it-works-heading" className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 id="how-it-works-heading" className="text-2xl font-bold text-slate-900 mb-3">
            How to Create a Custom QR Code in 3 Simple Steps
          </h2>
          <p className="text-sm text-slate-600">
            Generating a QR code with QRcraft is fast, secure, and completely free. Follow these quick steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Paste Link or Data</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter any website URL, social link, text message, Wi-Fi credentials, or contact info into the generator box above.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Click Generate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hit the 'Generate' button. Our instant browser engine generates a crisp, high-density matrix QR code pattern in milliseconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Download &amp; Share</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download your print-ready PNG image instantly. Print it on flyers, business cards, menus, or post it across your digital channels.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section aria-labelledby="why-choose-heading" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="why-choose-heading" className="text-2xl font-bold text-slate-900 mb-3">
            Why Choose QRcraft Free QR Code Generator?
          </h2>
          <p className="text-sm text-slate-600">
            Designed for businesses, marketers, educators, and personal use with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">100% Free &amp; Unlimited</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Create as many static QR codes as you need without limits, hidden subscription fees, or trial restrictions.
            </p>
          </article>

          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Complete Privacy &amp; Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your inputs remain strictly inside your browser. No external tracking databases or server logs are created.
            </p>
          </article>

          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">High-Density PNG Output</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download crisp, high-resolution 300px PNG files optimized for mobile scanning and high-quality print materials.
            </p>
          </article>

          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Automatic Offline Saving</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never lose your generated QR codes. Save them automatically in your local browser history for easy re-downloading.
            </p>
          </article>

          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">No Account Required</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip annoying signup forms and password creation. Open the tool, paste your link, and download your QR code right away.
            </p>
          </article>

          <article className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Global Compatibility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compatible with all standard smartphone camera scanners across iOS, Android, and industrial QR reader hardware.
            </p>
          </article>
        </div>
      </section>

      {/* Popular Use Cases Section */}
      <section aria-labelledby="use-cases-heading" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="max-w-2xl mb-8">
          <h2 id="use-cases-heading" className="text-2xl sm:text-3xl font-bold mb-3">
            Popular Use Cases for QR Codes
          </h2>
          <p className="text-sm text-slate-300">
            From modern contactless marketing to physical print distribution, QR codes connect physical spaces with instant digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Business &amp; Marketing</h3>
            <p className="text-xs text-slate-300">Drive traffic to landing pages, promotional campaigns, and social channels.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Restaurant Menus</h3>
            <p className="text-xs text-slate-300">Provide touchless digital menus and online ordering links for customers.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Events &amp; Ticketing</h3>
            <p className="text-xs text-slate-300">Streamline check-ins, ticket validation, and event schedules seamlessly.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Wi-Fi &amp; Contact Sharing</h3>
            <p className="text-xs text-slate-300">Share Wi-Fi networks or digital business card details without manual typing.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section (Matches JSON-LD Schema) */}
      <section aria-labelledby="faq-heading" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm text-slate-600">
            Got questions about QR code generation? Find answers to the most common queries below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                aria-expanded={activeFaq === idx}
                className="w-full px-6 py-4 text-left flex justify-between items-center text-sm font-semibold text-slate-900 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 font-normal text-lg">
                  {activeFaq === idx ? "−" : "+"}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Blog & Guide Section Framework for Content Marketing */}
      <section aria-labelledby="blog-preview-heading" className="border-t border-gray-200 pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 id="blog-preview-heading" className="text-xl font-bold text-slate-900">
              QR Code Guides &amp; Resources
            </h2>
            <p className="text-xs text-slate-500">
              Explore tutorials on QR code design, scanning, and marketing best practices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-5 border border-gray-200 rounded-2xl bg-white hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Tutorial</span>
            <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1">
              Static vs. Dynamic QR Codes: Which Should You Use?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover the key differences between permanent static QR codes and editable dynamic QR codes for marketing.
            </p>
          </article>

          <article className="p-5 border border-gray-200 rounded-2xl bg-white hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Design Guide</span>
            <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1">
              Best Practices for Printing QR Codes on Packaging
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensure high scannability by following optimal sizing, contrast ratios, and quiet zone margin rules.
            </p>
          </article>

          <article className="p-5 border border-gray-200 rounded-2xl bg-white hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Marketing</span>
            <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1">
              10 Creative QR Code Uses for Small Businesses in 2026
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn how modern stores and venues boost customer engagement with contactless digital menus and Wi-Fi access.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
