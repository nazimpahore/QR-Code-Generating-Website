import { useState, useRef } from "react";
import { WEB3FORMS_ACCESS_KEY } from "../contact.config";

const INITIAL_FORM = { from_name: "", from_email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};

  if (!form.from_name.trim()) {
    errors.from_name = "Full name is required.";
  }

  if (!form.from_email.trim()) {
    errors.from_email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email.trim())) {
    errors.from_email = "Enter a valid email address.";
  }

  if (!form.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = formRef.current?.querySelector("[data-error='true']");
      firstErrorField?.focus();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      setStatus("error");
      setErrorMessage(
        "Please paste your free Web3Forms access key in src/contact.config.js to enable email sending."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.from_name,
          email: form.from_email,
          subject: form.subject,
          message: form.message,
          from_name: "QRcraft Website Contact",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please check your access key.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection and try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setForm(INITIAL_FORM);
    setErrors({});
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <main className="px-4 py-12 max-w-lg mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-xs text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Message Sent Successfully
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you for contacting the QRcraft team. We appreciate your feedback and will respond shortly.
          </p>
          <button
            onClick={handleReset}
            aria-label="Send another contact message"
            className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Send another message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-12 max-w-lg mx-auto">
      <article>
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Contact QRcraft Support &amp; Feedback
          </h1>
          <p className="text-sm text-slate-600">
            Have questions, feature requests, or partnership inquiries regarding our free QR code generator? Send us a message below.
          </p>
        </header>

        {status === "error" && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl px-4 py-3.5 flex items-start gap-3" role="alert">
            <svg
              className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-700 leading-snug">
                Failed to send your message.
              </p>
              {errorMessage && (
                <p className="text-xs text-red-600 mt-0.5 leading-snug">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5"
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                value={form.from_name}
                onChange={handleChange}
                placeholder="Jane Smith"
                autoComplete="name"
                data-error={!!errors.from_name}
                disabled={status === "sending"}
                className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:border-transparent transition placeholder-gray-400 disabled:opacity-60 ${
                  errors.from_name
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.from_name && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.from_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                value={form.from_email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoComplete="email"
                data-error={!!errors.from_email}
                disabled={status === "sending"}
                className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:border-transparent transition placeholder-gray-400 disabled:opacity-60 ${
                  errors.from_email
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.from_email && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.from_email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              data-error={!!errors.subject}
              disabled={status === "sending"}
              className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:border-transparent transition placeholder-gray-400 disabled:opacity-60 ${
                errors.subject
                  ? "border-red-300 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.subject && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message or inquiry here..."
              data-error={!!errors.message}
              disabled={status === "sending"}
              className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:border-transparent transition placeholder-gray-400 resize-none disabled:opacity-60 ${
                errors.message
                  ? "border-red-300 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            aria-label="Submit contact form message"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white text-sm font-semibold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            {status === "sending" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </article>
    </main>
  );
}
