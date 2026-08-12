import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QRGenerator from "./components/QRGenerator";
import SavedQRCodes from "./components/SavedQRCodes";
import About from "./components/About";
import Contact from "./components/Contact";
import SEO from "./components/SEO";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [reuseValue, setReuseValue] = useState("");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReuse = (value) => {
    setReuseValue(value);
    navigate("home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <SEO currentPage={currentPage} />
      <Navbar currentPage={currentPage} navigate={navigate} />
      <div className="flex-1">
        {currentPage === "home" && (
          <QRGenerator reuseValue={reuseValue} clearReuseValue={() => setReuseValue("")} />
        )}
        {currentPage === "saved" && (
          <SavedQRCodes navigate={navigate} onReuse={handleReuse} />
        )}
        {currentPage === "about" && <About navigate={navigate} />}
        {currentPage === "contact" && <Contact />}
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
