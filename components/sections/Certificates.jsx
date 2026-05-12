import SectionWrapper from '@/components/ui/SectionWrapper';
import { certificates } from '@/components/data/portfolio-data';
import { FiAward } from 'react-icons/fi';

export default function Certificates() {
  return (
    <SectionWrapper id="certificates" className="py-16 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">CREDENTIALS</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-12 md:mb-16">
          Certificates
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certificates.map((cert, idx) => (
            <a
              key={idx}
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border-2 border-border bg-surface hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
            >
              <FiAward className="text-accent mb-4" size={28} />
              <p className="text-xs text-accent font-mono">{cert.date}</p>
              <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-foreground-muted mt-1">{cert.issuer}</p>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}