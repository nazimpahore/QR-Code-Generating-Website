export default function About({ navigate }) {
  return (
    <main className="px-4 py-12 max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="border-b border-gray-200 pb-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            About QRcraft - Free Online QR Code Generator
          </h1>
          <p className="text-base text-slate-600">
            Learn more about our mission to provide fast, private, and 100% free QR code creation.
          </p>
        </header>

        <section aria-labelledby="mission-heading" className="space-y-4">
          <h2 id="mission-heading" className="text-xl font-bold text-slate-800">
            Our Mission &amp; Purpose
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            QRcraft was created to solve a common internet problem: hidden subscription paywalls, forced registration forms, and intrusive ad tracking just to generate a basic QR code. Our tool runs 100% client-side in your web browser, giving you instant access to clean, high-resolution QR codes without compromising your privacy or data.
          </p>
        </section>

        <section aria-labelledby="key-features-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Privacy First Technology
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every QR code you generate is computed inside your browser using JavaScript. No links, text messages, Wi-Fi keys, or phone numbers are ever stored on external cloud databases.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Universal Content Encoding
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supports website URLs, social media profiles, PDF document links, Wi-Fi credentials, vCard contact information, email messages, and raw text formats.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Browser Local History
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your generated QR codes automatically save to HTML5 LocalStorage. Access, re-download, or delete your previous codes anytime without needing an account.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Permanent Static QR Codes
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard QR codes produced by QRcraft encode data directly. They will never expire, redirect unexpectedly, or ask for paid renewal fees.
            </p>
          </div>
        </section>

        <footer className="pt-6">
          <button
            onClick={() => navigate("home")}
            aria-label="Return to QR Code Generator home page"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-150 cursor-pointer shadow-sm"
          >
            Start Generating Free QR Codes
          </button>
        </footer>
      </article>
    </main>
  );
}
