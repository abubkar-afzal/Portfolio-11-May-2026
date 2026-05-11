import SectionWrapper from '@/components/ui/SectionWrapper';
import { skills } from '@/components/data/portfolio-data';

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-16 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-accent font-mono text-xs tracking-[0.3em] mb-4">TECH STACK</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-12 md:mb-16">
          Skills & <span className="text-accent">Tools</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((group, idx) => (
            <div key={idx} className="group p-6 rounded-2xl border border-border bg-surface-elevated hover:border-accent transition-all duration-300">
              <h3 className="text-sm font-mono text-accent mb-4">{group.category}</h3>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm hover:bg-accent/5 hover:border-accent transition-all"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}