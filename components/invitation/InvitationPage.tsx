import Image from "next/image";
import { invitation } from "@/data/invitation";
import EnvelopeGate from "./EnvelopeGate";
import ScratchCountdown from "./ScratchCountdown";
import Gallery from "./Gallery";
import MusicPlayer from "./MusicPlayer";

export default function InvitationPage() {
  return (
    <>
      <EnvelopeGate groom={invitation.groom} bride={invitation.bride} />

      <main>
        <section className="hero" id="top">
          <div className="ornament ornament-top">❈</div>
          <h1>به نام آنکه عشق را آفرید</h1>
          <div className="hero-photo-wrap cinematic">
            <Image
              src="/images/hero.jpg"
              alt="حسین و مهدیه"
              fill
              priority
              sizes="(max-width: 600px) 92vw, 420px"
            />
            <div className="photo-overlay" />
            <div className="photo-frame" />
          </div>

          <div className="flex flex-col ">
            <h1>
              <span>{invitation.groom}</span>
              <i>♥</i>
              <span>{invitation.bride}</span>
            </h1>
            <p className="text-center mt-20 text-[24px] font-semibold">
              جشن بله‌برون
            </p>
            <div className="gold-line">
              <span>✦</span>
            </div>
            <p className="text-[18px] font-semibold">
              با افتخار از شما دعوت می‌کنیم تا در آغاز یکی از زیباترین فصل‌های
              زندگی‌مان، در کنار ما باشید.
            </p>
          </div>
        </section>

        <section className="details section" id="details">
          <div className="section-heading">
            <span>✦</span>
            <h2>قرار ما</h2>
            <span>✦</span>
          </div>
          <div className="detail-cards">
            <article className="detail-card">
              <div className="card-kicker">تاریخ</div>
              <strong>{invitation.displayDate.day}</strong>
              <small>{invitation.displayDate.month}</small>
            </article>
            <article className="detail-card">
              <div className="card-kicker">زمان دیدار</div>
              <strong>{invitation.displayDate.time}</strong>
              <small>{invitation.displayDate.weekday}</small>
            </article>
            <article className="detail-card invite-card">
              <div className="card-kicker">متن دعوت</div>
              <p>
                با مهر و شادی، چشم به راه حضورتان هستیم تا این شب را در کنار
                یکدیگر به خاطره‌ای شیرین و ماندگار بدل کنیم.
              </p>
            </article>
          </div>
          <ScratchCountdown target={invitation.eventDateTime} />
        </section>

        <section className="story section">
          <div className="story-card">
            <p className="eyebrow">به شوق دیدار</p>
            <h2>
              قدوم شما
              <br />
              زینت‌بخش این محفل است
            </h2>
            <p>
              در کنار خانواده‌ها، این آغاز خجسته را جشن می‌گیریم و حضور گران‌قدر
              شما را مایهٔ دلگرمی و زیبایی این شب می‌دانیم.
            </p>
            <div className="ornament-small">❈</div>
          </div>
        </section>

        <section className="gallery section">
          <div className="section-heading">
            <span>✦</span>
            <h2>لحظه‌های ما</h2>
            <span>✦</span>
          </div>
          <Gallery />
        </section>

        <section className="section timeline-section pt-0" id="program">
          <div className="section-heading">
            <span>✦</span>
            <h2 className="timeline-en text-[24px]">THE NIGHT • TIMELINE</h2>
            <span>✦</span>
          </div>
          <div className="timeline-horizontal">
            {invitation.program.map((item) => (
              <article className="timeline-node" key={item.time}>
                <div className="timeline-icon">{item.icon}</div>
                <div className="time text-[14px]">{item.time}</div>
                <h3>{item.title}</h3>
                <p className="text-[12px]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="venue section">
          <div className="section-heading">
            <span>✦</span>
            <h2>محل دیدار</h2>
            <span>✦</span>
          </div>
          <div className="venue-card">
            <h3>{invitation.venue.name}</h3>
            <p>{invitation.venue.address}</p>
            <a
              className="primary-btn"
              href={invitation.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              راه‌یابی به محل
            </a>
          </div>
        </section>

        <section className="rsvp section">
          <div className="rsvp-card">
            <h2>چشم به راه دیدارتان هستیم</h2>

            <MusicPlayer />
          </div>
        </section>
      </main>
    </>
  );
}
