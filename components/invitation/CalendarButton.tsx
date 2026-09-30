"use client";

interface CalendarButtonProps {
  eventDateTime: string;
  title: string;
  location: string;
}

function toICS(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export default function CalendarButton({ eventDateTime, title, location }: CalendarButtonProps) {
  const downloadCalendar = () => {
    const start = new Date(eventDateTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Engagement Invitation//FA",
      "BEGIN:VEVENT",
      `DTSTART:${toICS(start)}`,
      `DTEND:${toICS(end)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "engagement-invitation.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <button className="outline-btn" type="button" onClick={downloadCalendar}>＋ افزودن به تقویم</button>;
}
