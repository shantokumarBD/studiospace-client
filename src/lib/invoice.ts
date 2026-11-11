import { Booking } from "@/Types";

/**
 * Generates a clean, standalone, printable HTML document for a studio booking invoice.
 */
export function generateInvoiceHtml(booking: Booking): string {
  const shortId = booking._id.slice(-8).toUpperCase();
  const status = (booking.status || "CONFIRMED").toUpperCase();
  const subtotal = Number(booking.hourlyRate) * Number(booking.hours);
  const total = Number(booking.totalAmount) || subtotal + 250;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudioSpace Invoice #${shortId}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #ffffff;
      color: #111827;
      padding: 48px;
      max-width: 760px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #E04F26;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .brand {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #111827;
    }
    .brand span { color: #E04F26; }
    .tagline {
      font-size: 11px;
      font-family: monospace;
      color: #6B7280;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #111827;
    }
    .invoice-id {
      font-family: monospace;
      font-size: 13px;
      font-weight: 700;
      color: #E04F26;
      margin-top: 2px;
    }
    .invoice-date {
      font-size: 12px;
      color: #6B7280;
      font-family: monospace;
      margin-top: 2px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: #ECFDF5;
      color: #047857;
      border: 1px solid #A7F3D0;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .status-badge.cancelled {
      background: #FFF1F2;
      color: #BE123C;
      border-color: #FECDD3;
    }
    .section-card {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 16px;
      padding: 22px;
      margin-bottom: 24px;
    }
    .section-label {
      font-size: 11px;
      font-weight: 700;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6B7280;
      margin-bottom: 8px;
    }
    .studio-title {
      font-size: 20px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 4px;
    }
    .studio-location {
      font-size: 13px;
      color: #4B5563;
      margin-bottom: 16px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      font-size: 12px;
      border-top: 1px solid #E5E7EB;
      padding-top: 14px;
    }
    .meta-item strong {
      color: #374151;
      font-weight: 600;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
    }
    .table th {
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      font-family: monospace;
      color: #6B7280;
      padding-bottom: 10px;
      border-bottom: 1px solid #E5E7EB;
    }
    .table td {
      padding: 12px 0;
      font-size: 13px;
      border-bottom: 1px solid #F3F4F6;
    }
    .table td:last-child, .table th:last-child {
      text-align: right;
      font-family: monospace;
    }
    .total-row td {
      border-top: 2px solid #E5E7EB;
      border-bottom: none;
      padding-top: 16px;
      font-size: 15px;
      font-weight: 800;
      color: #111827;
    }
    .total-price {
      color: #E04F26 !important;
      font-size: 20px !important;
      font-weight: 900 !important;
    }
    .footer {
      margin-top: 48px;
      border-top: 1px solid #E5E7EB;
      padding-top: 24px;
      text-align: center;
      font-size: 11px;
      font-family: monospace;
      color: #9CA3AF;
      line-height: 1.8;
    }
    @media print {
      body { padding: 0; background: white; }
      .section-card { border: 1px solid #DDD; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Studio<span>Space</span></div>
      <div class="tagline">Peer-to-Peer Verified Production Stage Exchange</div>
    </div>
    <div class="invoice-meta">
      <div class="invoice-title">Official Production Invoice</div>
      <div class="invoice-id">#${shortId}</div>
      <div class="invoice-date">Issued: ${booking.date}</div>
    </div>
  </div>

  <div class="status-badge ${status.includes("CANCEL") ? "cancelled" : ""}">
    ● STATUS: ${status}
  </div>

  <div class="section-card">
    <div class="section-label">Reserved Production Stage</div>
    <div class="studio-title">${booking.studioTitle}</div>
    <div class="studio-location">${booking.studioLocation || "Calibrated Film & Photography Stage"}</div>
    
    <div class="meta-grid">
      <div class="meta-item"><strong>Client / Renter:</strong> ${booking.renterName} (${booking.renterEmail})</div>
      <div class="meta-item"><strong>Production Date:</strong> ${booking.date}</div>
      <div class="meta-item"><strong>Call Time:</strong> ${booking.callTime}</div>
      <div class="meta-item"><strong>Wrap Time:</strong> ${booking.wrapTime} (${booking.hours} Hours)</div>
    </div>
  </div>

  <div class="section-card">
    <div class="section-label">Financial Ledger Breakdown</div>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Rate / Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stage Hourly Rate ($${booking.hourlyRate}/hr × ${booking.hours} hours)</td>
          <td>$${subtotal}</td>
        </tr>
        <tr>
          <td>Refundable Soundstage Security Deposit</td>
          <td>$250</td>
        </tr>
        <tr>
          <td>Facility Preparation & 3-Phase Electrical Power</td>
          <td style="color: #047857; font-weight: 600;">INCLUDED</td>
        </tr>
        <tr class="total-row">
          <td>Total Production Lock</td>
          <td class="total-price">$${total}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    StudioSpace Platform · Official Commercial Accounting Receipt<br />
    Questions? Contact support@studiospace.io · All rights reserved.
  </div>
</body>
</html>`;
}

/**
 * Initiates an instant download of the formatted invoice HTML file.
 */
export function downloadBookingInvoice(booking: Booking): void {
  if (typeof document === "undefined") return;

  const invoiceHtml = generateInvoiceHtml(booking);
  const blob = new Blob([invoiceHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `StudioSpace_Invoice_${booking._id.slice(-8).toUpperCase()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

