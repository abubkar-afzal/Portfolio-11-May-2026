import SectionWrapper from '@/components/ui/SectionWrapper';
import { aboutText, personalInfo } from '@/components/data/portfolio-data';
import { FaLocationDot } from 'react-icons/fa6';

export default function About() {
  return (
    <SectionWrapper id="about" className="py-16 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-center">
          {/* Left - Decorative */}
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-secondary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative p-6 md:p-10 rounded-3xl bg-surface-elevated border-2 border-border">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-8xl font-display font-bold text-foreground">4+</span>
                    <span className="text-foreground-muted">Years</span>
                  </div>
                  <p className="text-foreground-muted">Building digital products</p>
                  
                  <div className="h-px bg-border" />
                  <p className="text-sm text-foreground-muted flex items-center space-x-2"><FaLocationDot className="mx-2"/> {personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="md:col-span-3 order-1 md:order-2">
            <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">ABOUT ME</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
              Digital
              <br />
              <span className="text-accent">experiences</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-foreground-muted leading-relaxed">
              {aboutText.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}