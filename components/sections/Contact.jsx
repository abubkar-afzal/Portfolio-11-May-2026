import SectionWrapper from '@/components/ui/SectionWrapper';
import { personalInfo } from '@/components/data/portfolio-data';
import { FiMail, FiMapPin, FiSend, FiPhone } from 'react-icons/fi';   // <-- added FiPhone
import { FaWhatsapp } from "react-icons/fa6";

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="py-16 md:py-32 bg-surface">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">GET IN TOUCH</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
          Let's <span className="text-accent">collaborate</span>
        </h2>
        <p className="text-base md:text-lg text-foreground-muted mb-10 max-w-xl mx-auto">
          I'm currently available for freelance projects and exciting opportunities. Whether you have a project or just want to say hi, my inbox is open.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          {/* Email – hidden on small screens, full on larger */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="group hidden lg:inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-contrast font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
          >
            <FiMail size={18} />
            {personalInfo.email}
            <FiSend size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group lg:hidden inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-contrast font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
          >
            <FiMail size={18} />
            Email
            <FiSend size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {/* WhatsApp */}
          <a
            href={personalInfo.socials.whatsapp}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-contrast font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
          >
            <FaWhatsapp size={18} />
            WhatsApp
            <FiSend size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {/* ===== NEW: Phone ===== */}
          <a
            href={`tel:${personalInfo.phone}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent/30 text-foreground hover:bg-accent/10 transition-all"
          >
            <FiPhone size={18} />
            {personalInfo.phone}
          </a>

          {/* Location */}
          <span className="inline-flex items-center gap-2 text-foreground-muted py-4">
            <FiMapPin size={16} /> {personalInfo.location}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}