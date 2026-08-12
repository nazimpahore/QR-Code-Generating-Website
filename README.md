<p align="center">
  <strong>QR</strong><span style="color:#3b82f6"><strong>craft</strong></span>
</p>

<h1 align="center">QRcraft — Free QR Code Generator</h1>

<p align="center">
  A fast, privacy-first, and 100% free QR code generator built with React, Vite, and Tailwind CSS.<br/>
  Generate, download, save, and manage high-resolution QR codes — entirely in your browser.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔗 **Instant QR Generation** | Generate QR codes from any URL, text, Wi-Fi credentials, email, or phone number in milliseconds |
| 📥 **PNG Download** | Download crisp, high-resolution 300×300 PNG QR code images with a single click |
| 💾 **Auto-Save to Browser** | All generated QR codes are automatically saved to localStorage — no account needed |
| 📋 **Saved QR Library** | Browse, re-download, reuse, or delete previously generated QR codes from a dedicated page |
| 🔒 **Privacy First** | 100% client-side generation — no data is ever sent to any server |
| ♾️ **No Expiry** | Static QR codes never expire, redirect, or require paid renewals |
| 📱 **Fully Responsive** | Clean, modern UI that works flawlessly on desktop, tablet, and mobile |
| 📧 **Contact Form** | Built-in contact form powered by Web3Forms for feedback and inquiries |
| 🔍 **SEO Optimized** | Full meta tags, Open Graph, Twitter Cards, JSON-LD structured data, and hreflang support |
| ❓ **Interactive FAQ** | Expandable FAQ section with common questions about QR code usage |
| 🍔 **Mobile Navigation** | Animated hamburger menu with smooth transitions for mobile users |

---

## 🌐 Demo

🔗 **Live Site:** https://qr-code-generating-website.vercel.app/

<!-- Add a screenshot of your app here -->
<!-- ![QRcraft Screenshot](./screenshot.png) -->

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [qrcode](https://www.npmjs.com/package/qrcode) | QR code generation library |
| [Web3Forms](https://web3forms.com/) | Contact form email service |
| [TypeScript](https://www.typescriptlang.org/) | Type checking & configuration |
| [vite-plugin-singlefile](https://github.com/nicbarker/vite-plugin-singlefile) | Bundle output as a single HTML file |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
qr-code-generator/
├── public/                  # Static assets & web manifest
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky navigation bar with mobile hamburger menu
│   │   ├── QRGenerator.jsx  # Core QR code generation tool with FAQ section
│   │   ├── SavedQRCodes.jsx # Saved QR codes library with CRUD operations
│   │   ├── About.jsx        # About page with mission & feature highlights
│   │   ├── Contact.jsx      # Contact form with validation & Web3Forms integration
│   │   ├── Footer.jsx       # Site footer
│   │   └── SEO.jsx          # Dynamic SEO meta tags & JSON-LD structured data
│   ├── App.jsx              # Root component with client-side routing
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── contact.config.js    # Web3Forms access key configuration
│   └── emailjs.config.js    # EmailJS configuration (legacy)
├── index.html               # HTML entry with full SEO meta tags
├── vite.config.ts           # Vite configuration with React & Tailwind plugins
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

---

## ⚙️ Configuration

### Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) (free tier). To enable it:

1. Go to [web3forms.com](https://web3forms.com/) and get a free access key
2. Open `src/contact.config.js`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual key

```js
export const WEB3FORMS_ACCESS_KEY = "your_actual_key_here";
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `localhost:5173` |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Nazim Pahore**

- GitHub: [@nazimpahore](https://github.com/nazimpahore)
- LinkedIn: [Nazim Pahore](https://linkedin.com/in/nazimpahore)

---

<p align="center">
  ⭐ If you found this project useful, please consider giving it a star!
</p>

