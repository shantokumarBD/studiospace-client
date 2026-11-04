# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**StudioSpace** is a high-performance peer-to-peer creative marketplace engineered for filmmakers, photographers, audio engineers, podcasters, and visual artists. Studio hosts can list their verified production stages, daylight cyc lofts, cinema sound stages, and soundproof mastering suites. Fellow creators can discover calibrated spaces, inspect real-time hourly rates, and reserve production slots with transparent pricing, instant booking confirmations, and host approval workflows.

---

## 🌐 Live Website & Repositories

- **Live Client Web App**: [https://studiospace-client-bd.vercel.app](https://studiospace-client-bd.vercel.app)
- **Live Server API**: [https://studiospace-server-sem6.onrender.com](https://studiospace-server-sem6.onrender.com)
- **Client Repository**: [https://github.com/shantokumarBD/studiospace-client](https://github.com/shantokumarBD/studiospace-client)
- **Server Repository**: [https://github.com/shantokumarBD/studiospace-server](https://github.com/shantokumarBD/studiospace-server)

---

## 🎯 Target Audience

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

## 💡 Core Problems Solved

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

## ✨ Key Features (Core & Challenge Highlights)

1. **Dynamic Workspace Discovery & Multi-Faceted Filtering**:
   - Filter studios across verified categories (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops).
   - Real-time search by studio title or city location, sortable by hourly rates and rating tiers, with responsive 9-item pagination.

2. **Complete Host Studio Management (Full CRUD & Dedicated Edit Route)**:
   - Dedicated private host portal (`/add-studio`) with read-only host credentials and full stage specification inputs.
   - Dedicated private edit route (`/studios/edit/[id]`) pre-filled with existing listing data and server-side ownership protection.
   - Host management dashboard (`/my-listings`) to inspect active stages and safely delete listings with confirmation modals.

3. **Direct ImgBB Cloud CDN Upload Integration (Core Rubric Requirement)**:
   - Built-in drag-and-drop file upload calling the ImgBB REST API (`/1/upload`) directly from the browser, with local image preview and fallback URL toggle.

4. **Hourly Shoot Scheduler & Collision Prevention (Challenge Requirement)**:
   - Precision call-time and wrap-time duration calculator on `/studios/[id]` with real-time deposit math.
   - Server-side collision detection to prevent double-booking conflicts on identical dates and overlapping shoot hours.

5. **Digital Receipt Generation & Printable Accounting Ledgers (Optional Requirement)**:
   - Comprehensive reservation tracker (`/my-bookings`) displaying pending, confirmed, and cancelled booking status badges.
   - Built-in printable invoice/receipt viewer (`window.print()`) formatted for commercial accounting ledgers.

6. **Universal Light & Dark Mode System with Zero-FOUC (Challenge Requirement)**:
   - System-synchronized and user-toggled theme preference with immediate inline script execution to eliminate Flash of Unstyled Content.
   - Rebranded styling featuring film aperture logo and the new official X platform logo.

7. **Cryptographic JWT Security with HTTPOnly Cookies & JWKS (Challenge Requirement)**:
   - Strict `verifyToken` middleware securing all mutations (`POST`, `PUT`, `PATCH`, `DELETE`) with remote JWKS cryptographic key rotation.

---

## 🌟 Extra & Beyond-Rubric Features (Innovations & Problems Solved)

The following production-grade features were engineered beyond the standard assignment requirements to turn StudioSpace into a true commercial-grade marketplace:

### 1. Two-Sided Host Booking Approval Engine (`/dashboard` & `/my-listings`)
- **What Was Added:**
  - Standard rubrics only require renters to submit reservations with a static "Pending" status and allow renters to cancel.
  - We implemented a complete **Two-Sided Production Approval Engine**. Incoming stage requests appear live in the host's **Control Center (`/dashboard`)** and `/my-listings`.
  - Studio hosts inspect the renter's identity, contact email, shoot date, call-to-wrap time block, total payout, and special production notes.
  - Hosts can click **"Accept & Confirm"** (which updates the reservation to "Confirmed Stage Lock" and synchronizes instantly across both host and renter ledgers) or **"Reject / Decline"** (which immediately releases the slot).
  - Backed by dedicated authenticated endpoints: `GET /host-bookings?email=...` and `PATCH /bookings/:id/status`.
- **Problem It Solves:**
  - *Problem*: In commercial studio facilities, hosts cannot have unvetted renters automatically showing up with high-amperage cinema lighting or large crews without prior host review. A one-sided booking model leaves expensive facilities vulnerable to damage.
  - *Solution*: Provides studio hosts with total schedule authority, allowing them to verify crew requirements before officially locking the stage.

---

### 2. Creator & Host Telemetry Control Center (`/dashboard`)
- **What Was Added:**
  - Rather than redirecting `/dashboard` to `/my-listings` or showing a placeholder, we engineered an active operational control center.
  - Displays four live telemetry stat cards (**My Listed Studios**, **Incoming Stage Requests**, **My Reservations**, and **Saved Wishlist items**) with direct quick-action buttons and the embedded host reservation approval manager.
- **Problem It Solves:**
  - *Problem*: Creators who both host studios and rent other facilities get disoriented having to navigate fragmented pages to monitor their activity.
  - *Solution*: Unifies studio listings, incoming requests, and outbound reservations into a single high-level telemetry overview.

---

### 3. Dedicated Wishlist Management Dashboard (`/wishlist`)
- **What Was Added:**
  - Beyond the rubric's basic requirement of a heart icon on cards, we built a dedicated private management portal at `/wishlist`.
  - Allows creators to review all saved workspaces in a responsive grid, filter by category, check current hourly rates, and remove items with instant synchronization to MongoDB.
- **Problem It Solves:**
  - *Problem*: Producers scout dozens of prospective stages before a production shoot; without a centralized workspace, saved locations get lost across browser tabs.
  - *Solution*: Provides a unified scouting workspace to compare hourly rates, crew capacities, and amenities before making final booking decisions.

---

### 4. Host Self-Booking Safety Restriction
- **What Was Added:**
  - Automated session comparison on `/studios/[id]` checking `session.user.email` against `studio.ownerEmail`.
  - When a host inspects their own stage, the booking button is replaced with a disabled **"This Is Your Listing"** state and an explanatory notice.
- **Problem It Solves:**
  - *Problem*: Marketplace hosts accidentally booking their own listings causes circular financial transactions, distorts calendar availability, and pollutes booking ledgers.
  - *Solution*: Permanently prevents self-booking collisions while offering hosts quick shortcuts to edit their studio specifications.

---

### 5. Context-Preserving Return Navigation (`callbackUrl`)
- **What Was Added:**
  - Seamless query parameter tracking (`/log-in?callbackUrl=...`) across both standard Email/Password authentication and Google OAuth sign-in.
- **Problem It Solves:**
  - *Problem*: When an unauthenticated creator finds a stage they want to book and clicks to sign in, standard auth flows redirect them to the home page, losing their selected studio and booking intent.
  - *Solution*: Automatically redirects the creator directly back to the exact studio stage they were evaluating.

---

## 🛠️ Technology Stack

| Layer | Technologies Selected |
|---|---|
| **Frontend Framework** | Next.js 16.4.3 (App Router with Turbopack), React 19, TypeScript |
| **Styling & UI Components** | Tailwind CSS v4, Shadcn UI / Base UI, Lucide React Icons |
| **Sliders & Micro-Animations** | Swiper.js v14 (Autoplay & Fade), Canvas Confetti |
| **Authentication & Auth** | Better-Auth v1.7, Google OAuth 2.0, Email & Password, JWT via JWKS |
| **Form Management & Schema** | Zod v4 (Strict validation schemas for auth & studios), Native FormData |
| **Image CDN Integration** | ImgBB Cloud REST API (`https://api.imgbb.com/1/upload`) |
| **Backend & Database** | Node.js, Express.js, MongoDB Native Driver, Jose (JWKS verification) |
| **Notification Engine** | React Hot Toast (Zero native alert/confirm popups) |

---

## 🔐 Examiner Test Credentials

Examiners can evaluate the application using either **Google One-Tap OAuth** or the pre-configured test account below:

- **Test Host Email**: `examiner@studiospace.io`
- **Test Password**: `Studio@2026` *(satisfies uppercase, lowercase, and length criteria)*
- **Role**: Creative Producer / Verified Stage Host
- **Pre-loaded Data**: Contains listed soundstages, active bookings, and saved wishlist items.

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **MongoDB Atlas**: Database connection string
- **Git**

### 2. Client Setup (`studiospace-client`)
```bash
# Navigate to client directory
cd studiospace-client

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Run Next.js development server
npm run dev
```
Client runs at: `http://localhost:3000`

### 3. Server Setup (`studiospace-server`)
```bash
# Navigate to server directory
cd studiospace-server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run Express server
npm run dev # or node index.js
```
Server runs at: `http://localhost:8000`
