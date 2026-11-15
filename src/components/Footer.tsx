import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Special Deals', to: '/deals' },
  { label: 'Order Online', to: '/order' },
  { label: 'My Cart', to: '/cart' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#1E1B18] text-white border-t border-[#342E28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Introduction */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="font-display text-2xl font-extrabold tracking-tight text-white"
            >
              {RESTAURANT_INFO.brandName}
            </Link>
            <p className="mt-3 text-sm text-[#CFC6BC] leading-relaxed max-w-sm">
              Authentic Pakistani karahi, charcoal BBQ, dum biryani, and fresh tandoor breads served with warm family hospitality in {RESTAURANT_INFO.city}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dastarkhwan on Facebook"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#D9531E] text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dastarkhwan on Instagram"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#D9531E] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#FFB07A] mb-4">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-[#CFC6BC]">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#FFB07A] mb-4">
              Contact Information (Demo)
            </h3>
            <ul className="space-y-3 text-sm text-[#CFC6BC]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9531E] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-[#D9531E] shrink-0" aria-hidden="true" />
                <span>{RESTAURANT_INFO.displayPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9531E] shrink-0" aria-hidden="true" />
                <span>{RESTAURANT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A3988C]">
          <p>
            &copy; {new Date().getFullYear()} {RESTAURANT_INFO.brandName}. Fictional restaurant website built for agency portfolio demonstration.
          </p>
          <p>Islamabad, Pakistan · Demo Menu &amp; Pricing</p>
        </div>
      </div>
    </footer>
  );
}
