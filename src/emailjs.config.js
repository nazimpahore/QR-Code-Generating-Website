// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
//
// HOW TO SET UP EMAILJS (takes about 5 minutes):
//
// 1. Go to https://www.emailjs.com and create a free account.
//
// 2. ADD AN EMAIL SERVICE
//    Dashboard → Email Services → Add New Service
//    Choose Gmail, Outlook, Yahoo, or any SMTP provider.
//    Connect your inbox and click "Create Service".
//    Copy the Service ID shown and paste it as EMAILJS_SERVICE_ID below.
//
// 3. CREATE AN EMAIL TEMPLATE
//    Dashboard → Email Templates → Create New Template
//
//    Paste this template body (the variable names must match exactly):
//    ┌──────────────────────────────────────────────────────┐
//    │  Subject : {{subject}}                               │
//    │                                                      │
//    │  From    : {{from_name}} <{{from_email}}>            │
//    │                                                      │
//    │  Message :                                           │
//    │  {{message}}                                         │
//    └──────────────────────────────────────────────────────┘
//
//    In the template settings set "To Email" to your own email address.
//    Save the template and copy the Template ID shown.
//    Paste it as EMAILJS_TEMPLATE_ID below.
//
// 4. GET YOUR PUBLIC KEY
//    Dashboard → Account → General → Public Key
//    Paste it as EMAILJS_PUBLIC_KEY below.
//
// ─────────────────────────────────────────────────────────────────────────────

export const EMAILJS_SERVICE_ID = "service_cnfplmm";   // e.g. "service_abc123"
export const EMAILJS_TEMPLATE_ID = "template_ovcgqij";  // e.g. "template_xyz789"
export const EMAILJS_PUBLIC_KEY = "qVKpVgFGa1HKlnyrz";   // e.g. "abcDEFghiJKLmno12"
