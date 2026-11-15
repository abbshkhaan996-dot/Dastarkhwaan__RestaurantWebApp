import { useState, FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Info,
  Send,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: 'General Inquiry' | 'Table Reservation' | 'Family Catering & Events';
  message: string;
}

interface ContactErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submittedMessage, setSubmittedMessage] =
    useState<ContactFormData | null>(null);

  const validate = (): ContactErrors => {
    const nextErrors: ContactErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!/^(?:\+?92|0)?3\d{9}$|^\+?\d{10,14}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Enter a valid Pakistani phone number (e.g. 0300 1234567).';
    }
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.trim().length < 8) {
      nextErrors.message = 'Please enter a short message (at least 8 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedMessage({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#FAF6F0] border-b border-[#E5DDD0] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#D9531E]">
            Visit Us in {RESTAURANT_INFO.city}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight text-balance">
            Contact Us &amp; Location
          </h1>
          <p className="text-[#5C534A] mt-2 max-w-2xl">
            Editable demonstration branch details, map location, opening hours, and a contact message form.
          </p>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-10 sm:py-14 bg-white border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Info Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D9531E]/10 text-[#D9531E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-[#1E1B18]">
                    Restaurant Address (Demo)
                  </h2>
                  <p className="text-sm text-[#5C534A] mt-1">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7A1C1C]/10 text-[#7A1C1C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-[#1E1B18]">
                    Phone Numbers (Placeholder)
                  </h2>
                  <p className="text-sm text-[#5C534A] mt-1 tabular-nums">
                    Mobile / WhatsApp: {RESTAURANT_INFO.displayPhone}
                  </p>
                  <p className="text-sm text-[#5C534A] tabular-nums">
                    Landline: {RESTAURANT_INFO.landlinePhone}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D9531E]/10 text-[#D9531E] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-[#1E1B18]">
                    Email Inquiries (Placeholder)
                  </h2>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-sm text-[#7A1C1C] hover:text-[#D9531E] underline underline-offset-4 mt-1 inline-block"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7A1C1C]/10 text-[#7A1C1C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="w-full">
                  <h2 className="font-display text-sm font-bold text-[#1E1B18]">
                    Opening Hours
                  </h2>
                  <dl className="mt-2 space-y-1 text-sm">
                    {RESTAURANT_INFO.openingHours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex items-center justify-between gap-4 text-[#5C534A]"
                      >
                        <dt>{slot.days}</dt>
                        <dd className="font-medium text-[#1E1B18] tabular-nums">
                          {slot.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl border border-[#E5DDD0] overflow-hidden flex flex-col">
              <div className="px-5 py-3.5 border-b border-[#E5DDD0] flex items-center justify-between gap-4 bg-[#F7F1E7]">
                <div>
                  <p className="font-display text-sm font-bold text-[#1E1B18]">
                    F-7 Markaz, Islamabad — Google Maps Location
                  </p>
                  <p className="text-xs text-[#5C534A]">
                    Map placeholder for flagship branch directions
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=F-7+Markaz+Islamabad+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1C1C] hover:text-[#D9531E] whitespace-nowrap shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="relative flex-1 min-h-[340px] bg-[#EFE7DB]">
                <iframe
                  title="Dastarkhwan Islamabad Map Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.0479%2C33.7155%2C73.0659%2C33.7275&layer=mapnik&marker=33.7215%2C73.0569"
                  className="w-full h-full min-h-[340px] border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-10 sm:py-14 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1B18]">
              Send Us a Message
            </h2>
            <p className="text-sm text-[#5C534A] mt-1">
              Questions about family table bookings, group catering, or feedback? Fill out the demonstration contact form below.
            </p>

            {submittedMessage ? (
              <div
                role="status"
                className="mt-6 bg-[#FAF6F0] rounded-2xl border border-[#DFD3C3] p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#1D8A4E] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1E1B18]">
                      Demo Message Received
                    </h3>
                    <p className="text-sm text-[#5C534A] mt-1">
                      Thank you, <strong className="text-[#1E1B18]">{submittedMessage.name}</strong>. Your inquiry preview is displayed below.
                    </p>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-white rounded-xl p-4 border border-[#E5DDD0]">
                  <div>
                    <dt className="text-xs text-[#5C534A]">Topic</dt>
                    <dd className="font-semibold text-[#1E1B18]">
                      {submittedMessage.subject}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#5C534A]">Phone</dt>
                    <dd className="font-semibold text-[#1E1B18] tabular-nums">
                      {submittedMessage.phone}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#5C534A]">Message</dt>
                    <dd className="text-[#3D352E] mt-0.5">
                      {submittedMessage.message}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 p-3 rounded-xl bg-[#7A1C1C]/5 border border-[#7A1C1C]/20 text-xs text-[#7A1C1C] flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Portfolio Demo Notice:</strong> This contact form is for demonstration purposes only and does not dispatch emails.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedMessage(null);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'General Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Demo Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder="e.g. Saad Mahmood"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                        errors.name ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder="e.g. 0300 1234567"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                        errors.phone ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="you@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                        errors.email ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value as ContactFormData['subject'],
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border border-[#DFD3C3] text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Family Catering & Events">
                        Family Catering &amp; Events
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Share your preferred table date/time, party size, or question..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                      errors.message ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#5C534A]">
                    Demonstration form — no real emails or bookings are transmitted.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
