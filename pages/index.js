import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Head from 'next/head';

export default function Home() {
  return (<>
    <Head>
        <title>Hafiz Abubakar Afzal — Full‑Stack Developer | React, Next.js & Node.js</title>
      </Head>
    <Layout>
      <Hero />
      <About />
      <Work />
      <Education />
      <Certificates />
      <Skills />
      <Contact />
    </Layout>
 </> );
}