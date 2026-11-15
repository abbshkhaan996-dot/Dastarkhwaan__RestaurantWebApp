import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  UtensilsCrossed,
} from 'lucide-react';
import { formatPkr } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { FoodImage } from '../components/FoodImage';

export function CartPage() {
  const {
    items,
    totalCount,
    subtotalPkr,
    deliveryFeePkr,
    discountPkr,
    totalPayablePkr,
    appliedPromo,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const handlePromoSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = applyPromoCode(promoInput);
    setPromoFeedback(result);
    if (result.ok) {
      setPromoInput('');
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-[#E5DDD0] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Order Review &amp; Price Summary
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
                My Shopping Cart
              </h1>
              <p className="text-[#5C534A] mt-2 tabular-nums">
                {totalCount === 0
                  ? 'No items selected yet.'
                  : `${totalCount} ${totalCount === 1 ? 'item' : 'items'} selected across ${items.length} ${items.length === 1 ? 'dish' : 'dishes'}.`}
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Add More Dishes</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <section className="py-10 sm:py-14 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            /* Empty Cart State (No Checkout Button Shown) */
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#E5DDD0] p-8 sm:p-12 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#FAF6F0] border border-[#E5DDD0] text-[#D9531E] flex items-center justify-center mx-auto">
                <ShoppingCart className="w-9 h-9" aria-hidden="true" />
              </div>

              <h2 className="font-display text-2xl font-extrabold text-[#1E1B18] mt-6">
                Your cart is currently empty.
              </h2>
              <p className="text-sm sm:text-base text-[#5C534A] mt-2 leading-relaxed">
                Explore our sizzling karahis, charcoal BBQ platters, dum biryani, paratha rolls, and value family deals to start your order.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
                  <span>Continue Shopping</span>
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
                >
                  <span>Browse Special Deals</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Selected Food Items */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden">
                  <div className="px-5 sm:px-6 py-4 border-b border-[#E5DDD0] flex items-center justify-between gap-4 bg-[#FCF9F4]">
                    <h2 className="font-display text-lg font-bold text-[#1E1B18]">
                      Selected Items ({totalCount})
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-semibold text-[#7A1C1C] hover:underline cursor-pointer"
                    >
                      Clear Cart
                    </button>
                  </div>

                  <ul className="divide-y divide-[#E5DDD0]">
                    {items.map((item) => {
                      const lineTotal = item.pricePkr * item.quantity;
                      return (
                        <li
                          key={item.id}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
                        >
                          {/* Food Photo */}
                          <div className="w-full sm:w-28 h-40 sm:h-24 rounded-xl overflow-hidden bg-[#EFE7DB] border border-[#E5DDD0] shrink-0">
                            <FoodImage
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Item Info & Unit Breakdown */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-lg font-bold text-[#1E1B18] leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-sm text-[#5C534A] mt-1 tabular-nums">
                              {formatPkr(item.pricePkr)} &times; {item.quantity}{' '}
                              ={' '}
                              <strong className="text-[#7A1C1C]">
                                {formatPkr(lineTotal)}
                              </strong>
                            </p>

                            {/* Quantity Controls & Remove */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="inline-flex items-center rounded-xl border border-[#DFD3C3] bg-[#FAF6F0] p-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#EFE7DB] text-[#1E1B18] flex items-center justify-center transition-colors cursor-pointer"
                                >
                                  <Minus
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                </button>
                                <span
                                  aria-label={`Quantity for ${item.name}`}
                                  className="w-10 text-center text-sm font-bold text-[#1E1B18] tabular-nums"
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  aria-label={`Increase quantity of ${item.name}`}
                                  className="w-8 h-8 rounded-lg bg-[#D9531E] hover:bg-[#BF4414] text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                  <Plus
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#7A1C1C] hover:bg-[#7A1C1C]/10 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2
                                  className="w-3.5 h-3.5"
                                  aria-hidden="true"
                                />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>

                          {/* Desktop Line Total Highlight */}
                          <div className="hidden sm:block text-right shrink-0">
                            <p className="text-xs text-[#5C534A]">Item Total</p>
                            <p className="font-display text-lg font-extrabold text-[#7A1C1C] tabular-nums mt-0.5">
                              {formatPkr(lineTotal)}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout CTA */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
                <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-[#1E1B18] pb-4 border-b border-[#E5DDD0]">
                    Order Summary
                  </h2>

                  {/* Optional Promo Code Box */}
                  <div className="py-4 border-b border-[#E5DDD0]">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#1D8A4E]/10 border border-[#1D8A4E]/25 text-xs text-[#166E3E]">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-semibold truncate">
                            {appliedPromo.code} ({appliedPromo.label})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removePromoCode();
                            setPromoFeedback(null);
                          }}
                          aria-label="Remove promo code"
                          className="p-1 hover:text-[#1E1B18] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handlePromoSubmit} className="space-y-2">
                        <label
                          htmlFor="cart-promo-code"
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#3D352E]"
                        >
                          <Tag className="w-3.5 h-3.5 text-[#D9531E]" aria-hidden="true" />
                          <span>Demo Promo Code (Optional)</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="cart-promo-code"
                            type="text"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value);
                              if (promoFeedback) setPromoFeedback(null);
                            }}
                            placeholder="e.g. DASTARKHWAN10"
                            className="flex-1 min-w-0 px-3 py-2 text-xs bg-[#FAF6F0] rounded-lg border border-[#DFD3C3] text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 text-xs font-bold text-white bg-[#7A1C1C] hover:bg-[#5E1414] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-[11px] text-[#7D7166]">
                          Demo codes: <strong>DASTARKHWAN10</strong> (10% off) or{' '}
                          <strong>FAMILY250</strong> (PKR 250 off)
                        </p>
                        {promoFeedback && !promoFeedback.ok && (
                          <p className="text-xs text-[#B91C1C] flex items-center gap-1">
                            <AlertCircle
                              className="w-3.5 h-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{promoFeedback.message}</span>
                          </p>
                        )}
                      </form>
                    )}
                  </div>

                  {/* Dynamic Price Breakdown */}
                  <dl className="py-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between text-[#3D352E]">
                      <dt>Subtotal ({totalCount} items)</dt>
                      <dd className="font-semibold text-[#1E1B18] tabular-nums">
                        {formatPkr(subtotalPkr)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between text-[#3D352E]">
                      <dt>Delivery Fee</dt>
                      <dd className="font-semibold text-[#1E1B18] tabular-nums">
                        {formatPkr(deliveryFeePkr)}
                      </dd>
                    </div>

                    {discountPkr > 0 && (
                      <div className="flex items-center justify-between text-[#1D8A4E]">
                        <dt>
                          Discount
                          {appliedPromo ? ` (${appliedPromo.code})` : ''}
                        </dt>
                        <dd className="font-semibold tabular-nums">
                          &minus; {formatPkr(discountPkr)}
                        </dd>
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between">
                      <dt className="font-display text-base font-bold text-[#1E1B18]">
                        Total Payable
                      </dt>
                      <dd className="font-display text-2xl font-extrabold text-[#7A1C1C] tabular-nums">
                        {formatPkr(totalPayablePkr)}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to="/checkout"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl shadow-sm transition-colors"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link
                    to="/menu"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#7A1C1C] hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
