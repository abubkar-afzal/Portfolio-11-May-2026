import SectionWrapper from '@/components/ui/SectionWrapper';
import SplideSlider from '@/components/ui/SplideSlider';
import { projects } from '@/components/data/portfolio-data';

export default function Work() {
  return (
    <SectionWrapper id="work" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-accent font-mono text-sm">PORTFOLIO</p>
        <h2 className="text-5xl font-display font-bold text-foreground mt-4 mb-16">
          Selected <span className="text-accent">Projects</span>
        </h2>
        <SplideSlider items={projects} />
      </div>
    </SectionWrapper>
  );
}