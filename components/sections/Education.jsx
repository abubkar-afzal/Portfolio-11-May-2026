import SectionWrapper from '@/components/ui/SectionWrapper';
import { education } from '@/components/data/portfolio-data';

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-16 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">PATH OF</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-12 md:mb-16">
          Education
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-1 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent hover:from-accent/40 transition-all duration-500"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-surface border border-border h-full">
                {/* <span className="text-5xl font-display font-bold text-border/20">
                  {String(idx + 1).padStart(2, '0')}
                </span> */}
                <p className="text-accent font-mono text-xs mt-4">{item.year}</p>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2">{item.degree}</h3>
                <p className="text-foreground-muted mt-1">{item.school}</p>
                <p className="text-foreground-muted mt-3 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}