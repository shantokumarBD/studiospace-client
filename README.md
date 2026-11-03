# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**StudioSpace** is a high-performance peer-to-peer creative marketplace engineered for filmmakers, photographers, audio engineers, podcasters, and visual artists. Studio hosts can list their verified production stages, daylight cyc lofts, cinema sound stages, and soundproof mastering suites. Fellow creators can discover calibrated spaces, inspect real-time hourly rates, and reserve production slots with transparent pricing and instant booking confirmation.

---

## 🌐 Live Website & Repositories

- **Live URL**: [https://studiospace-client.vercel.app](https://studiospace-client.vercel.app) *(or your deployed Vercel URL)*
- **Client Repository**: `https://github.com/Shanto/studiospace-client`
- **Server Repository**: `https://github.com/Shanto/studiospace-server`

---

## 🎯 Target Audience (প্রজেক্টটি কাদের জন্য?)

StudioSpace serves two primary stakeholder groups in the modern creative economy:

1. **Independent Creators & Production Teams**:
   - **Filmmakers & Cinematographers**: Seeking acoustic soundstages, green screen bays, and motorized lighting grids.
   - **Commercial Photographers**: Needing daylight lofts, infinity cyc walls, and high-ceiling studios for fashion, product, and portrait shoots.
   - **Podcasters & Broadcasters**: Looking for 4K multi-cam audio lounges with acoustic treatment.
   - **Musicians & Audio Engineers**: Requiring soundproof recording booths, vocal suites, and mixing consoles on flexible hourly bookings.

2. **Studio Owners & Production Facility Hosts**:
   - Facility managers and independent studio hosts who own creative real estate and want to monetize idle downtime.
   - Production agencies seeking to turn their private sound stages into revenue-generating assets with verified renter screenings and liability protection.

---

## 💡 Core Problems Solved (প্রজেক্টটি কি কি সমস্যা সমাধান করে?)

1. **Elimination of Opaque & Hidden Pricing**:
   - *Problem*: Traditional studio bookings often surprise creators with hidden cleaning charges, opaque utility fees, and surprise equipment surcharges.
   - *Solution*: StudioSpace provides 100% upfront transparent hourly pricing, calculated security deposits, and real-time total cost breakdown before booking.

2. **Double-Booking & Schedule Collisions**:
   - *Problem*: Manual phone calls and email coordination frequently cause overlapping shoot times, ruining production schedules.
   - *Solution*: Automated time slot management with server-side double-booking collision prevention that rejects overlapping reservations on confirmed hours.

3. **Inaccurate Stage Specs & Unverified Facilities**:
   - *Problem*: Creators frequently book spaces only to find insufficient ceiling height, poor acoustic isolation, or inadequate electrical power grids.
   - *Solution*: Every studio profile displays verified stage dimensions, ceiling clearance, 3-phase power availability, and exact crew capacity limits.

4. **Host Financial Protection & Accountability**:
   - *Problem*: Studio hosts risk equipment damage and unpaid overages from unverified renters.
   - *Solution*: Secure user authentication, automated security deposit locks, and strict host approval workflows.

5. **Disorganized Invoicing & Tax Ledger Friction**:
   - *Problem*: Freelancers struggle to collect clean, compliant invoices for production tax deductions.
   - *Solution*: Built-in digital receipt generator with printable ledgers (`window.print()`) formatted for commercial accounting.

---

## ✨ Key Features (Minimum 5 Highlights)

1. **Dynamic Workspace Discovery & Multi-Faceted Filtering**:
   - Filter studios across verified categories (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops).
   - Real-time search by studio title or city location, sortable by hourly rates and rating tiers, with responsive 9-item pagination.

2. **Complete Host Studio Management (Full CRUD)**:
   - Dedicated private host portal (`/add-studio`) to list production spaces with stage dimensions, power rating, and high-res imagery.
   - Host management dashboard (`/my-listings`) to inspect live listings, calculate studio telemetry, edit studio specs (`/studios/edit/[id]`), and safely delete stages with confirmation modals.

3. **Hourly Shoot Scheduler & Collision Prevention (Challenge Requirement)**:
   - Precision call-time and wrap-time duration calculator on `/studios/[id]` with real-time deposit math and self-booking restriction for stage owners.
   - Server-side collision detection to prevent double-booking conflicts on the same date and hours.

4. **Digital Receipt Generation & Printable Ledgers**:
   - Comprehensive reservation tracker (`/my-bookings`) displaying pending, confirmed, and cancelled booking status badges.
   - Built-in printable invoice/receipt viewer (`window.print()`) formatted for production accounting ledgers.

5. **Universal Light & Dark Mode System with Zero-FOUC**:
   - System-synchronized and user-toggled theme preference with immediate inline script execution to eliminate Flash of Unstyled Content.
   - Rebranded styling featuring film aperture logo and the new official X platform logo.

6. **Saved Studios Wishlist & Social Sharing**:
   - Instant heart toggle saving favorite production stages directly to the database.
   - One-click clipboard link sharing and confetti celebrations upon booking completion.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Lucide Icons, Canvas Confetti |
| **Authentication** | Better-Auth, Google OAuth, Email/Password, JWT via JWKS Endpoint |
| **Backend** | Node.js, Express.js, MongoDB Native Driver, Jose (JWKS verification) |
| **Form Validation** | Zod Schema Validation (Uppercase, Lowercase, Min 6 Characters) |
| **Notifications** | React Hot Toast |

---

## 🔐 Examiner Test Credentials

Examiners can evaluate the application using either Google One-Tap OAuth or the pre-configured test account below:

- **Test Email**: `examiner@studiospace.io`
- **Test Password**: `Studio@2026` *(satisfies uppercase, lowercase, and length requirements)*
- **Role**: Creative Producer / Verified Stage Host

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
- Node.js (v18.18+ or v20+)
- MongoDB Atlas database connection string

### 2. Client Setup (`studiospace-client`)
```bash
cd studiospace-client
npm install
cp .env.example .env.local
npm run dev
```
Client runs at: `http://localhost:3000`

### 3. Server Setup (`studiospace-server`)
```bash
cd studiospace-server
npm install
cp .env.example .env
npm run dev # or node index.js
```
Server runs at: `http://localhost:8000`
