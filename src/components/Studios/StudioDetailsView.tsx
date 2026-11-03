"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Maximize2,
  Users,
  DollarSign,
  Mail,
  User,
  X,
  Sparkles,
} from "lucide-react";
import { Studio, Booking } from "@/Types";
import { useSession } from "@/lib/auth-client";
import { createBooking } from "@/lib/api";
import confetti from "canvas-confetti";

interface StudioDetailsViewProps {
  studio: Studio;
}

export default function StudioDetailsView({ studio }: StudioDetailsViewProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-11-15");
  const [callTime, setCallTime] = useState("08:00");
  const [wrapTime, setWrapTime] = useState("18:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fireCelebration = () => {
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const callHour = parseInt(callTime.split(":")[0]) || 8;
  const wrapHour = parseInt(wrapTime.split(":")[0]) || 18;
  const totalHours = Math.max(wrapHour - callHour, 1);
  const baseRate = totalHours * studio.hourlyRate;
  const deposit = studio.securityDeposit || 250;
  const totalAmount = baseRate + deposit;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Studio link copied to clipboard!");
    }
  };

  const handleToggleWishlist = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success("Added to your saved wishlist!");
    } else {
      toast("Removed from wishlist", { icon: "ℹ️" });
    }
  };

  const handleOpenBooking = () => {
    if (!session?.user) {
      toast.error("Please log in to book this workspace");
      router.push(`/log-in?callbackUrl=/studios/${studio._id}`);
      return;
    }

    if (session.user.email === studio.ownerEmail) {
      toast.error("This is your studio listing. You cannot book your own space.");
      return;
    }

    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("renterName") as string) || "";
    const email = (formData.get("renterEmail") as string) || "";
    const specialNotes = (formData.get("specialNotes") as string) || "";

    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email to proceed");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<Booking> = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioImage: studio.image,
        studioLocation: studio.location,
        category: studio.category,
        hourlyRate: studio.hourlyRate,
        renterName: name,
        renterEmail: email,
        date: selectedDate,
        hours: totalHours,
        callTime,
        wrapTime,
        totalAmount,
        specialNotes,
      };

      const result = await createBooking(payload);
      if (result.success) {
        setBookingSuccess(true);
        fireCelebration();
      } else {
        toast.error(result.message || "Failed to submit booking");
      }
    } catch {
      toast.error("Server connection failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-film-black py-8">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-text-muted overflow-x-auto">
            <Link href="/studios" className="hover:text-brand-orange transition-colors">
              Explore Studios
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-text-secondary">{studio.category}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-text-primary font-semibold truncate max-w-[200px]">
              {studio.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-border-subtle font-mono text-xs text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-border-subtle font-mono text-xs transition-all cursor-pointer ${
                isSaved ? "text-brand-orange border-brand-orange/40" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-brand-orange" : ""}`} />
              <span>{isSaved ? "Saved" : "Save to Wishlist"}</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-surface-1 border border-border-subtle font-mono text-[11px] font-semibold text-brand-orange uppercase">
              {studio.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-1 border border-border-subtle font-mono text-[11px] font-semibold text-emerald-400 uppercase">
              ● VERIFIED PRODUCTION STAGE
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-1 border border-border-subtle font-mono text-[11px] font-semibold text-brand-amber uppercase inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber shrink-0" />
              <span>{studio.rating} RATING</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            {studio.title}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-text-secondary">
            <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
            <span>{studio.location}</span>
            <span>•</span>
            <span>Hosted by <strong className="text-text-primary">{studio.ownerName || "Studio Host"}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          <div className="lg:col-span-8 flex flex-col gap-10">

            <div className="relative aspect-[16/10] w-full bg-surface-2 rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group">
              <img
                src={studio.image}
                alt={studio.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-film-black/90 via-transparent to-film-black/30 pointer-events-none" />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-film-black/85 backdrop-blur-md border border-white/10 font-mono text-xs font-semibold text-text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                <span>{`VERIFIED PRODUCTION STAGE // ${studio.category.toUpperCase()}`}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-surface-1 border border-border-subtle p-5">
                <div className="flex items-center gap-2 text-text-muted mb-2 font-mono text-xs uppercase">
                  <Maximize2 className="w-4 h-4 text-brand-orange" />
                  <span>SHOOTING SIZE</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-black text-text-primary">
                  {studio.sqft || 4500} SQ FT
                </div>
                <span className="text-[11px] text-text-muted mt-0.5 block">Clear Floor</span>
              </div>

              <div className="rounded-2xl bg-surface-1 border border-border-subtle p-5">
                <div className="flex items-center gap-2 text-text-muted mb-2 font-mono text-xs uppercase">
                  <Users className="w-4 h-4 text-brand-amber" />
                  <span>MAX CREW</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-black text-text-primary">
                  {studio.maxCapacity || 35} PERSONS
                </div>
                <span className="text-[11px] text-text-muted mt-0.5 block">Capacity</span>
              </div>

              <div className="rounded-2xl bg-surface-1 border border-border-subtle p-5">
                <div className="flex items-center gap-2 text-text-muted mb-2 font-mono text-xs uppercase">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>BASE RATE</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-black text-text-primary">
                  ${studio.hourlyRate}
                </div>
                <span className="text-[11px] text-text-muted mt-0.5 block">Per Hour</span>
              </div>

              <div className="rounded-2xl bg-surface-1 border border-border-subtle p-5">
                <div className="flex items-center gap-2 text-text-muted mb-2 font-mono text-xs uppercase">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  <span>DEPOSIT</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-black text-text-primary">
                  ${deposit}
                </div>
                <span className="text-[11px] text-text-muted mt-0.5 block">Refundable</span>
              </div>
            </div>

            <div className="rounded-3xl bg-surface-1 border border-border-subtle p-8 shadow-xl">
              <div className="font-mono text-xs font-semibold text-brand-orange uppercase tracking-widest mb-2">
                {"// SPACE SPECIFICATIONS & OVERVIEW"}
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                About This Creative Workspace
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                {studio.overview ||
                  "A certified production space engineered for creative workflows, photography, cinematography, and audio engineering. Features comprehensive lighting access, dedicated power connections, and professional amenities for creators and talent."}
              </p>
            </div>

            <div className="rounded-3xl bg-surface-1 border border-border-subtle p-8 shadow-xl">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span>Amenities & Included Equipment</span>
              </h3>

              {studio.features && studio.features.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {studio.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-surface-2 border border-border-subtle"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-text-primary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">Standard studio production amenities included.</p>
              )}
            </div>

            <div className="rounded-3xl bg-surface-1 border border-border-subtle p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center font-mono text-xl font-black text-brand-orange">
                  {(studio.ownerName || "H").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-text-primary">
                      {studio.ownerName || "Marcus Vance"}
                    </h4>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-2 border border-border-subtle text-brand-amber font-semibold">
                      VERIFIED HOST
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Listed on StudioSpace · {studio.ownerEmail || "host@studiospace.io"}
                  </p>
                </div>
              </div>

              <a
                href={`mailto:${studio.ownerEmail || "host@studiospace.io"}?subject=Inquiry regarding ${encodeURIComponent(studio.title)}`}
                className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle font-mono text-xs font-semibold text-text-primary transition-colors cursor-pointer shrink-0 text-center"
              >
                Contact Host
              </a>
            </div>

          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 w-full">
            <div className="rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-7 shadow-2xl flex flex-col gap-6">

              <div className="flex items-baseline justify-between pb-4 border-b border-border-subtle">
                <div>
                  <span className="font-mono text-3xl font-black text-text-primary">
                    ${studio.hourlyRate}
                  </span>
                  <span className="font-mono text-xs text-text-muted"> / hour</span>
                </div>
                <span className="font-mono text-xs text-text-muted">
                  +${deposit} deposit
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>INSTANT BOOKING ACTIVE</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Select Shoot Date
                  </label>
                  <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5">
                    <Calendar className="w-4 h-4 text-text-muted mr-2.5 shrink-0" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-transparent text-text-primary text-xs focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-text-secondary uppercase">
                      Call Time
                    </label>
                    <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3 py-2.5">
                      <Clock className="w-3.5 h-3.5 text-text-muted mr-2 shrink-0" />
                      <select
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                        className="w-full bg-transparent text-text-primary text-xs focus:outline-none cursor-pointer"
                      >
                        <option value="08:00" className="bg-surface-1">08:00 AM</option>
                        <option value="10:00" className="bg-surface-1">10:00 AM</option>
                        <option value="12:00" className="bg-surface-1">12:00 PM</option>
                        <option value="14:00" className="bg-surface-1">02:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-text-secondary uppercase">
                      Wrap Time
                    </label>
                    <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3 py-2.5">
                      <Clock className="w-3.5 h-3.5 text-text-muted mr-2 shrink-0" />
                      <select
                        value={wrapTime}
                        onChange={(e) => setWrapTime(e.target.value)}
                        className="w-full bg-transparent text-text-primary text-xs focus:outline-none cursor-pointer"
                      >
                        <option value="14:00" className="bg-surface-1">02:00 PM</option>
                        <option value="16:00" className="bg-surface-1">04:00 PM</option>
                        <option value="18:00" className="bg-surface-1">06:00 PM</option>
                        <option value="20:00" className="bg-surface-1">08:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-2 border border-border-subtle font-mono text-xs flex flex-col gap-2">
                <div className="flex justify-between text-text-secondary">
                  <span>{totalHours} Hours × ${studio.hourlyRate}/hr</span>
                  <span>${baseRate}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Refundable Deposit</span>
                  <span>${deposit}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Facility Cleaning & Prep</span>
                  <span className="text-emerald-400 font-semibold">INCLUDED</span>
                </div>
                <div className="pt-2.5 border-t border-border-subtle flex justify-between text-sm font-bold text-text-primary">
                  <span>Total Production Lock</span>
                  <span className="text-brand-orange">${totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleOpenBooking}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-sm font-bold shadow-[0_0_24px_rgba(224,79,38,0.4)] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Workspace Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-2 text-[11px] text-text-muted leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  No double-booking guarantee: 100% full refund if cancelled up to 48 hours prior to call time.
                </span>
              </div>

            </div>
          </aside>

        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-film-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-8 shadow-2xl flex flex-col gap-6">

            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div>
                <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-wider">
                  {bookingSuccess
                    ? "RESERVATION CONFIRMED"
                    : "CONFIRM PRODUCTION RESERVATION"}
                </span>
                <h3 className="text-xl font-bold text-text-primary mt-1">
                  {studio.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (bookingSuccess) {
                    setBookingSuccess(false);
                    router.push("/my-bookings");
                  }
                }}
                className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-4 flex flex-col items-center text-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-brand-orange animate-pulse" />
                </div>

                <div>
                  <span className="font-mono text-xs text-brand-orange font-bold uppercase tracking-wider block mb-1">
                    CONGRATULATIONS!
                  </span>
                  <h3 className="text-2xl font-black text-text-primary tracking-tight">
                    Reservation Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-sm">
                    Your stage slot for{" "}
                    <strong className="text-text-primary">{studio.title}</strong>{" "}
                    has been successfully locked on schedule.
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-2 border border-border-subtle font-mono text-xs">
                  <div>
                    <span className="text-text-muted block text-[10px]">
                      SHOOT DATE
                    </span>
                    <span className="font-bold text-text-primary">
                      {selectedDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px]">
                      TIME BLOCK
                    </span>
                    <span className="font-bold text-text-primary">
                      {callTime} – {wrapTime} ({totalHours}h)
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-border-subtle/60 flex justify-between items-center">
                    <span className="text-text-muted">TOTAL RESERVATION</span>
                    <span className="text-base font-black text-emerald-400">
                      ${totalAmount}
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="w-full sm:w-1/2 py-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle font-mono text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingSuccess(false);
                      router.push("/my-bookings");
                    }}
                    className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(224,79,38,0.4)] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>View in My Bookings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-surface-2 border border-border-subtle font-mono text-xs">
                  <div>
                    <span className="text-text-muted block">SHOOT DATE</span>
                    <span className="font-bold text-text-primary">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">HOURS ({totalHours}h)</span>
                    <span className="font-bold text-text-primary">{callTime} – {wrapTime}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-border-subtle/60 flex justify-between items-center">
                    <span className="text-text-muted">TOTAL PRODUCTION LOCK</span>
                    <span className="text-base font-black text-brand-orange">${totalAmount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary uppercase">
                    Creator / Renter Full Name
                  </label>
                  <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5">
                    <User className="w-4 h-4 text-text-muted mr-2.5 shrink-0" />
                    <input
                      type="text"
                      name="renterName"
                      required
                      placeholder="Marcus Vance"
                      defaultValue={session?.user?.name || ""}
                      className="w-full bg-transparent text-text-primary text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary uppercase">
                    Renter Email Address
                  </label>
                  <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5">
                    <Mail className="w-4 h-4 text-text-muted mr-2.5 shrink-0" />
                    <input
                      type="email"
                      name="renterEmail"
                      required
                      placeholder="creator@production.io"
                      defaultValue={session?.user?.email || ""}
                      className="w-full bg-transparent text-text-primary text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary uppercase">
                    Special Production Notes (Optional)
                  </label>
                  <textarea
                    name="specialNotes"
                    rows={2}
                    placeholder="Need freight elevator access, lighting packages..."
                    className="w-full bg-film-black border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-[11px] text-brand-orange font-mono">
                  <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0 animate-ping" />
                  <span>New reservations are submitted with initial status: PENDING</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle font-mono text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(224,79,38,0.4)] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <span>Confirm Reservation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
