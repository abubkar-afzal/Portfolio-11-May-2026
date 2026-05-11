import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Work />
      <Education />
      <Certificates />
      <Skills />
      <Contact />
    </Layout>
  );
}