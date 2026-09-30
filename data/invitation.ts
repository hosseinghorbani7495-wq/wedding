export const invitation = {
  groom: "حسین",
  bride: "مهدیه",
  eventDateTime: "2026-10-14T20:00:00+03:30",
  displayDate: {
    weekday: "بیست‌ودوم مهر",
    day: "۲۲",
    month: "مهر ۱۴۰۵",
    time: "۲۰:۰۰ تا ۲۳:۰۰",
  },
  venue: {
    name: "خانه عقد الماس",
    address:
      "خیابان اشرفی اصفهانی به سمت شمال، بعد از تقاطع مرزداران، کوچه بی‌نظیر، پلاک ۱۹، طبقه هفتم، مجتمع تجاری امین، خانه عقد الماس",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("خانه عقد الماس، خیابان اشرفی اصفهانی، تهران"),
    neshanUrl: "https://neshan.org/maps",
  },
  program: [
    { time: "20:00", title: "Guest Arrival", text: "ورود مهمانان و خوش‌آمدگویی", icon: "✦" },
    { time: "20:30", title: "Ceremony", text: "اجرای مراسم و همراهی خانواده‌ها", icon: "❈" },
    { time: "21:00", title: "First Dance", text: "نخستین رقص حسین و مهدیه", icon: "♬" },
    { time: "22:00", title: "Family Dance & Cake", text: "رقص خانوادگی و برش کیک", icon: "♡" },
    { time: "23:00", title: "End of Night", text: "پایان شبی سرشار از مهر و خاطره", icon: "✧" },
  ],
} as const;

export type InvitationData = typeof invitation;
