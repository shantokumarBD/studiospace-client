import { Booking } from "@/Types";

/**
 * Generates and downloads a standard .ics calendar event file for a studio booking.
 * Compatible with Google Calendar, Apple Calendar, Outlook, and mobile devices.
 */
export function downloadIcsCalendar(booking: Booking): void {
  if (typeof document === "undefined") return;

  const cleanDate = (booking.date || "").replace(/-/g, "");
  const shortId = booking._id.slice(-6).toUpperCase();

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//StudioSpace//Production Shoot Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:studiospace-${booking._id}@studiospace.io`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${cleanDate}`,
    `DTEND;VALUE=DATE:${cleanDate}`,
    `SUMMARY:Studio Shoot: ${booking.studioTitle}`,
    `DESCRIPTION:StudioSpace Production Reservation #${shortId}\\nCall Time: ${booking.callTime}\\nWrap Time: ${booking.wrapTime}\\nDuration: ${booking.hours} Hours\\nRenter: ${booking.renterName}`,
    `LOCATION:${booking.studioLocation || "Calibrated Film Stage"}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `StudioSpace_Shoot_${cleanDate || shortId}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

