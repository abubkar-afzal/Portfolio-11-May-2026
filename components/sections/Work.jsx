import dynamic from 'next/dynamic';
import { projects } from '../data/portfolio-data';

const OfficeScene = dynamic(() => import('../ui/OfficeScene'), {
  ssr: false,
  loading: () => (
    <section className="h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-accent border-t-transparent" />
    </section>
  ),
});

export default function Work() {
  return (
    <section id="work" className="relative bg-background">
      <OfficeScene items={projects} />
    </section>
  );
}