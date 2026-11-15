import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowLeft,
  ShoppingCart,
  Banknote,
  CreditCard,
  Smartphone,
  Loader2,
  UtensilsCrossed,
} from 'lucide-react';
import { formatPkr } from '../data/restaurantData';
import { useCart, CartItem } from '../context/CartContext';
import { FoodImage } from '../components/FoodImage';

interface CheckoutFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  sectorArea: string;
  instructions: string;
  paymentMethod: 'cod';
}

interface CheckoutFormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  sectorArea?: string;
}

interface PlacedDemoOrder {
  orderNumber: string;
  placedAt: string;
  customer: CheckoutFormState;
  items: CartItem[];
  subtotalPkr: number;
  deliveryFeePkr: number;
  discountPkr: number;
  discountLabel?: string;
  totalPayablePkr: number;
}

export function CheckoutPage() {
  const {
    items,
    totalCount,
    subtotalPkr,
    deliveryFeePkr,
    discountPkr,
    totalPayablePkr,
    appliedPromo,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    sectorArea: '',
    instructions: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedDemoOrder | null>(
    null
  );

  const validate = (): CheckoutFormErrors => {
    const nextErrors: CheckoutFormErrors = {};

    if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!/^(?:\+?92|0)?3\d{9}$|^\+?\d{10,14}$/.test(cleanedPhone)) {
      nextErrors.phone =
        'Enter a valid Pakistani phone number (e.g. 0300 1234567).';
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (formData.address.trim().length < 8) {
      nextErrors.address =
        'Please enter your complete delivery address (house/flat & street).';
    }

    if (formData.sectorArea.trim().length < 2) {
      nextErrors.sectorArea = 'Please specify your area or sector (e.g. F-7/2).';
    }

    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isPlacingOrder) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsPlacingOrder(true);

    const snapshotItems = items.map((entry) => ({ ...entry }));
    const snapshotSubtotal = subtotalPkr;
    const snapshotDelivery = deliveryFeePkr;
    const snapshotDiscount = discountPkr;
    const snapshotDiscountLabel = appliedPromo?.code;
    const snapshotTotal = totalPayablePkr;
    const snapshotCustomer: CheckoutFormState = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      sectorArea: formData.sectorArea.trim(),
      instructions: formData.instructions.trim(),
    };

    window.setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `DST-${new Date().getFullYear()}-${randomNum}`;
      const placedAt = new Date().toLocaleTimeString('en-PK', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setConfirmedOrder({
        orderNumber,
        placedAt,
        customer: snapshotCustomer,
        items: snapshotItems,
        subtotalPkr: snapshotSubtotal,
        deliveryFeePkr: snapshotDelivery,
        discountPkr: snapshotDiscount,
        discountLabel: snapshotDiscountLabel,
        totalPayablePkr: snapshotTotal,
      });
      clearCart();
      setIsPlacingOrder(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  /* Confirmed Demo Order Screen */
  if (confirmedOrder) {
    return (
      <>
        <section className="bg-white border-b border-[#E5DDD0] py-8 sm:py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-[#1D8A4E]">
              Portfolio Order Demonstration
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
              Demo Order Confirmed
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-14 bg-[#FAF6F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              role="status"
              className="bg-white rounded-2xl border-2 border-[#1D8A4E] p-6 sm:p-8 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DDD0]">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="w-8 h-8 text-[#1D8A4E] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1D8A4E]">
                      Demo Order #{confirmedOrder.orderNumber}
                    </p>
                    <h2 className="font-display text-2xl font-extrabold text-[#1E1B18] mt-0.5">
                      Thank you, {confirmedOrder.customer.fullName}!
                    </h2>
                    <p className="text-sm text-[#5C534A] mt-1">
                      Recorded at {confirmedOrder.placedAt} · Payment: Cash on Delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-[#7A1C1C]/5 border border-[#7A1C1C]/20 text-sm text-[#7A1C1C] flex items-start gap-2.5">
                <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Demonstration Notice:</strong> This order confirmation is a portfolio demonstration. No order has actually been transmitted to a restaurant kitchen, and no payment has been processed.
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FAF6F0] rounded-xl border border-[#E5DDD0] p-5 space-y-2 text-sm">
                  <h3 className="font-display text-base font-bold text-[#1E1B18] mb-2">
                    Customer &amp; Delivery Details
                  </h3>
                  <p className="text-[#3D352E]">
                    <span className="text-[#5C534A]">Name:</span>{' '}
                    <strong>{confirmedOrder.customer.fullName}</strong>
                  </p>
                  <p className="text-[#3D352E] tabular-nums">
                    <span className="text-[#5C534A]">Phone:</span>{' '}
                    <strong>{confirmedOrder.customer.phone}</strong>
                  </p>
                  {confirmedOrder.customer.email && (
                    <p className="text-[#3D352E]">
                      <span className="text-[#5C534A]">Email:</span>{' '}
                      {confirmedOrder.customer.email}
                    </p>
                  )}
                  <p className="text-[#3D352E]">
                    <span className="text-[#5C534A]">Area / Sector:</span>{' '}
                    <strong>{confirmedOrder.customer.sectorArea}</strong>
                  </p>
                  <p className="text-[#3D352E]">
                    <span className="text-[#5C534A]">Address:</span>{' '}
                    {confirmedOrder.customer.address}
                  </p>
                  {confirmedOrder.customer.instructions && (
                    <p className="text-[#3D352E]">
                      <span className="text-[#5C534A]">Instructions:</span>{' '}
                      {confirmedOrder.customer.instructions}
                    </p>
                  )}
                </div>

                <div className="bg-[#FAF6F0] rounded-xl border border-[#E5DDD0] p-5">
                  <h3 className="font-display text-base font-bold text-[#1E1B18] mb-3">
                    Order Summary
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {confirmedOrder.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-2 text-[#3D352E]"
                      >
                        <span>
                          {item.quantity} &times; {item.name}
                        </span>
                        <span className="font-semibold text-[#1E1B18] tabular-nums">
                          {formatPkr(item.pricePkr * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-4 pt-3 border-t border-[#E5DDD0] space-y-1.5 text-sm">
                    <div className="flex justify-between text-[#5C534A]">
                      <dt>Subtotal</dt>
                      <dd className="font-semibold text-[#1E1B18] tabular-nums">
                        {formatPkr(confirmedOrder.subtotalPkr)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-[#5C534A]">
                      <dt>Delivery Fee</dt>
                      <dd className="font-semibold text-[#1E1B18] tabular-nums">
                        {formatPkr(confirmedOrder.deliveryFeePkr)}
                      </dd>
                    </div>
                    {confirmedOrder.discountPkr > 0 && (
                      <div className="flex justify-between text-[#1D8A4E]">
                        <dt>
                          Discount
                          {confirmedOrder.discountLabel
                            ? ` (${confirmedOrder.discountLabel})`
                            : ''}
                        </dt>
                        <dd className="font-semibold tabular-nums">
                          &minus; {formatPkr(confirmedOrder.discountPkr)}
                        </dd>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E5DDD0] flex justify-between font-display text-base font-extrabold text-[#7A1C1C]">
                      <dt>Total Payable</dt>
                      <dd className="tabular-nums">
                        {formatPkr(confirmedOrder.totalPayablePkr)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
                  <span>Browse Menu Again</span>
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
                >
                  <span>Return Home</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* Empty Cart Guard on Direct /checkout Navigation */
  if (items.length === 0) {
    return (
      <>
        <section className="bg-white border-b border-[#E5DDD0] py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] tracking-tight">
              Checkout
            </h1>
          </div>
        </section>

        <section className="py-12 bg-[#FAF6F0]">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl border border-[#E5DDD0] p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#E5DDD0] text-[#D9531E] flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#1E1B18] mt-5">
                Your cart is currently empty.
              </h2>
              <p className="text-sm text-[#5C534A] mt-2">
                Add dishes from our menu or special deals before proceeding to checkout.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/menu"
                  className="px-6 py-3 text-sm font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] rounded-xl transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/cart"
                  className="px-5 py-3 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* Active Checkout Form + Order Summary */
  return (
    <>
      <section className="bg-white border-b border-[#E5DDD0] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#D9531E]">
                Step 2 of 2 · Delivery &amp; Confirmation
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1E1B18] mt-1 tracking-tight">
                Checkout
              </h1>
              <p className="text-[#5C534A] mt-2">
                Enter your contact and Islamabad delivery details below to complete your demonstration order.
              </p>
            </div>

            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#7A1C1C] bg-[#FAF6F0] hover:bg-[#EFE7DB] border border-[#DFD3C3] rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Cart</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Customer, Delivery & Payment Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-7 space-y-6"
            >
              {/* Customer Information */}
              <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-7 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#1E1B18] pb-3 border-b border-[#E5DDD0]">
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="chk-name"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Full Name <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      id="chk-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }));
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="e.g. Bilal Tariq"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                        errors.fullName ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                        <AlertCircle
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="chk-phone"
                      className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                    >
                      Phone Number <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      id="chk-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }));
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
                        <AlertCircle
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="chk-email"
                    className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="chk-email"
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
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-7 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#1E1B18] pb-3 border-b border-[#E5DDD0]">
                  Delivery Information
                </h2>

                <div>
                  <label
                    htmlFor="chk-sector"
                    className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                  >
                    Area / Sector <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input
                    id="chk-sector"
                    type="text"
                    value={formData.sectorArea}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        sectorArea: e.target.value,
                      }));
                      if (errors.sectorArea) {
                        setErrors((prev) => ({ ...prev, sectorArea: undefined }));
                      }
                    }}
                    placeholder="e.g. Sector F-7/2, F-6 Markaz, G-9, Blue Area"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                      errors.sectorArea ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                    }`}
                  />
                  {errors.sectorArea && (
                    <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.sectorArea}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="chk-address"
                    className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                  >
                    Complete Delivery Address <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input
                    id="chk-address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                      if (errors.address) {
                        setErrors((prev) => ({ ...prev, address: undefined }));
                      }
                    }}
                    placeholder="House / Apartment #, Street #, Near Landmark"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E] ${
                      errors.address ? 'border-[#B91C1C]' : 'border-[#DFD3C3]'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-[#B91C1C] flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="chk-instructions"
                    className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
                  >
                    Additional Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="chk-instructions"
                    rows={2}
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    placeholder="Call on arrival, spice preference, extra raita or cutlery..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F0] rounded-xl border border-[#DFD3C3] text-[#1E1B18] placeholder:text-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-7 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#1E1B18] pb-3 border-b border-[#E5DDD0]">
                  Payment Method
                </h2>

                <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-[#7A1C1C] bg-[#FAF6F0] cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))
                    }
                    className="mt-1 accent-[#7A1C1C]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote
                        className="w-4 h-4 text-[#7A1C1C]"
                        aria-hidden="true"
                      />
                      <span className="font-display text-sm font-bold text-[#1E1B18]">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-xs text-[#5C534A] mt-1">
                      Pay in cash when your order arrives at your doorstep.
                    </p>
                  </div>
                </label>

                <div
                  aria-disabled="true"
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#E5DDD0] bg-[#FAF6F0]/60 opacity-60 cursor-not-allowed"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    disabled
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#5C534A]">
                        <CreditCard className="w-4 h-4" aria-hidden="true" />
                        <span>Credit / Debit Card</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#7A1C1C]">
                        Unavailable in Demo
                      </span>
                    </div>
                    <p className="text-xs text-[#7D7166] mt-0.5">
                      Online card processing is disabled in this portfolio demonstration.
                    </p>
                  </div>
                </div>

                <div
                  aria-disabled="true"
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#E5DDD0] bg-[#FAF6F0]/60 opacity-60 cursor-not-allowed"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    disabled
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#5C534A]">
                        <Smartphone className="w-4 h-4" aria-hidden="true" />
                        <span>JazzCash / Easypaisa</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#7A1C1C]">
                        Unavailable in Demo
                      </span>
                    </div>
                    <p className="text-xs text-[#7D7166] mt-0.5">
                      Mobile wallet integration is not connected in this demonstration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo Disclaimer & Submit */}
              <div className="p-4 rounded-xl bg-[#7A1C1C]/5 border border-[#7A1C1C]/20 text-xs text-[#7A1C1C] flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Portfolio Demonstration Notice:</strong> Placing an order generates a simulated confirmation receipt for demonstration purposes and does not send a real order to a restaurant.
                </span>
              </div>

              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-white bg-[#D9531E] hover:bg-[#BF4414] disabled:opacity-70 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2
                      className="w-5 h-5 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Placing Demo Order...</span>
                  </>
                ) : (
                  <span>
                    Place Order ({formatPkr(totalPayablePkr)})
                  </span>
                )}
              </button>
            </form>

            {/* Right Column: Order Summary */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-white rounded-2xl border border-[#E5DDD0] p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E5DDD0]">
                <h2 className="font-display text-xl font-bold text-[#1E1B18]">
                  Order Summary ({totalCount})
                </h2>
                <Link
                  to="/cart"
                  className="text-xs font-semibold text-[#D9531E] hover:underline"
                >
                  Edit Cart
                </Link>
              </div>

              <ul className="divide-y divide-[#F0E9DF] max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="py-3.5 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#EFE7DB] shrink-0">
                      <FoodImage
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1E1B18] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#5C534A] tabular-nums">
                        {formatPkr(item.pricePkr)} &times; {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#7A1C1C] tabular-nums shrink-0">
                      {formatPkr(item.pricePkr * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 pt-4 border-t border-[#E5DDD0] space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-[#3D352E]">
                  <dt>Subtotal</dt>
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
                    Final Payable Amount
                  </dt>
                  <dd className="font-display text-2xl font-extrabold text-[#7A1C1C] tabular-nums">
                    {formatPkr(totalPayablePkr)}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
