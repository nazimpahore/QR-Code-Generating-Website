export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-gray-50 border border-gray-200/60 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Free &amp; Client-Side Private
          </span>
        </div>

        <p className="text-xs text-slate-400 font-normal tracking-wide">
          &copy; {year} QRcraft. Fast, secure &amp; browser-based QR code generation.
        </p>
      </div>
    </footer>
  );
}
