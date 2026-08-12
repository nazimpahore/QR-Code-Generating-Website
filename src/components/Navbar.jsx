import { useState } from "react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "saved", label: "Saved QR Codes" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    navigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav("home")}
            className="flex items-baseline gap-0.5 cursor-pointer group"
            aria-label="Go to home"
          >
            <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-500 transition-colors duration-150">
              QR
            </span>
            <span className="text-lg font-bold text-blue-500 tracking-tight">
              craft
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  currentPage === link.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer gap-1.5"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  currentPage === link.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
