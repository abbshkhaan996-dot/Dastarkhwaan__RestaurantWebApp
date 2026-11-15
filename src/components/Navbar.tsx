import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Special Deals', to: '/deals' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-[72px] flex items-center justify-between gap-4 lg:gap-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#7A1C1C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] rounded-sm"
          >
            {RESTAURANT_INFO.brandName}
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-[#3D352E]"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] rounded-sm ${
                    isActive
                      ? 'text-[#7A1C1C] font-bold after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#D9531E]'
                      : 'hover:text-[#D9531E] after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#D9531E] after:transition-all hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Cart Icon Button + Order Online CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <NavLink
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={`View shopping cart, ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}
              className={({ isActive }) =>
                `inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D9531E] ${
                  isActive
                    ? 'bg-[#7A1C1C] text-white border-[#7A1C1C]'
                    : 'bg-white hover:bg-[#F2EBE1] text-[#1E1B18] border-[#DFD3C3]'
                }`
              }
            >
              <ShoppingCart className="w-4 h-4 text-[#D9531E] shrink-0" aria-hidden="true" />
              <span className="tabular-nums">Cart ({totalCount})</span>
            </NavLink>

            <NavLink
              to="/order"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D9531E] ${
                  isActive
                    ? 'bg-[#7A1C1C] text-white'
                    : 'bg-[#D9531E] hover:bg-[#BF4414] text-white'
                }`
              }
            >
              <Utensils className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Order Online</span>
            </NavLink>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5DDD0] bg-white text-[#1E1B18] hover:bg-[#F2EBE1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9531E] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#E5DDD0] bg-white px-4 py-4 space-y-1 shadow-lg"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FAF6F0] text-[#7A1C1C] font-bold'
                    : 'text-[#1E1B18] hover:bg-[#FAF6F0] hover:text-[#D9531E]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/order"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#7A1C1C] text-white'
                  : 'text-[#D9531E] hover:bg-[#FAF6F0]'
              }`
            }
          >
            Order Online
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-3 rounded-lg text-base font-semibold transition-colors ${
                isActive
                  ? 'bg-[#7A1C1C] text-white'
                  : 'text-[#1E1B18] hover:bg-[#FAF6F0]'
              }`
            }
          >
            My Shopping Cart ({totalCount})
          </NavLink>
        </nav>
      )}
    </header>
  );
}
