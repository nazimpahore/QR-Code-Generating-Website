import { useEffect } from "react";

const pageConfigs = {
  home: {
    title: "Free QR Code Generator Online - Custom QR Code Maker | QRcraft",
    description:
      "Generate custom QR codes instantly for free with QRcraft. Create high-resolution PNG & SVG QR codes for URLs, text, Wi-Fi & email without signup.",
    canonical: "https://qrcraft.app/",
    breadcrumb: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qrcraft.app/" },
    ],
  },
  saved: {
    title: "Saved QR Codes - Free Online QR Code Generator | QRcraft",
    description:
      "Access and manage your saved QR codes offline in your browser. Download, reuse, or manage your custom generated QR codes anytime for free.",
    canonical: "https://qrcraft.app/#saved",
    breadcrumb: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qrcraft.app/" },
      { "@type": "ListItem", position: 2, name: "Saved QR Codes", item: "https://qrcraft.app/#saved" },
    ],
  },
  about: {
    title: "About Us - Free Browser QR Code Generator Tool | QRcraft",
    description:
      "Learn about QRcraft, the 100% free, private browser-based QR code generator. No account needed, zero tracking, and instant QR code creation.",
    canonical: "https://qrcraft.app/#about",
    breadcrumb: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qrcraft.app/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://qrcraft.app/#about" },
    ],
  },
  contact: {
    title: "Contact Us - Support & Feedback | QRcraft Generator",
    description:
      "Get in touch with the QRcraft team. Send us your feedback, questions, or feature requests about our free online QR code generator tool.",
    canonical: "https://qrcraft.app/#contact",
    breadcrumb: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qrcraft.app/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://qrcraft.app/#contact" },
    ],
  },
};

export default function SEO({ currentPage }) {
  const config = pageConfigs[currentPage] || pageConfigs.home;

  useEffect(() => {
    // 1. Update Document Title
    document.title = config.title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", config.description);
    }

    // 3. Update OG Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", config.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", config.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", config.canonical);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", config.canonical);
    }

    // 5. Inject Structured Data (Schema.org JSON-LD)
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach((s) => s.remove());

    // Software/WebApplication Schema
    const appSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "QRcraft - Free QR Code Generator",
      alternateName: ["QRcraft", "QR Code Maker Online"],
      url: "https://qrcraft.app/",
      description:
        "Free, browser-based QR Code Generator to build instant custom QR codes for URLs, text, Wi-Fi, email, and phone numbers.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      browserRequirements: "Requires HTML5 compatible web browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "QRcraft",
        url: "https://qrcraft.app/",
      },
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: config.breadcrumb,
    };

    // Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "QRcraft",
      url: "https://qrcraft.app/",
      logo: "https://qrcraft.app/logo.png",
      sameAs: [],
    };

    // FAQ Schema for Home page
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is QRcraft completely free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, QRcraft is 100% free with no sign-up required, no daily limits, and no hidden fees.",
          },
        },
        {
          "@type": "Question",
          name: "Do generated QR codes expire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, standard static QR codes generated on QRcraft do not expire and will work forever.",
          },
        },
        {
          "@type": "Question",
          name: "Are my QR codes saved anywhere online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No! All QR code generation and saving takes place locally inside your browser using HTML5 local storage for maximum privacy.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download high resolution PNG QR codes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can generate and download high-resolution PNG QR codes instantly with one click.",
          },
        },
        {
          "@type": "Question",
          name: "What types of content can I encode in a QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can encode website URLs, plain text, Wi-Fi credentials, email addresses, social media links, and phone numbers.",
          },
        },
      ],
    };

    const appendScript = (data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    appendScript(appSchema);
    appendScript(breadcrumbSchema);
    appendScript(orgSchema);
    if (currentPage === "home") {
      appendScript(faqSchema);
    }
  }, [config, currentPage]);

  return null;
}
