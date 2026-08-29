import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* ===== FAVICON & THEME ===== */}
          <link rel="icon" href="/me.jpg" sizes="any" />
          <link rel="apple-touch-icon" href="/me.jpg" />
          <meta name="theme-color" content="#6366f1" />
          <meta name="application-name" content="Hafiz Abubakar Afzal Portfolio" />

          {/* ===== FONTS ===== */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700&display=swap"
            rel="stylesheet"
          />

          {/* =====  META TAGS ===== */}
          <meta name="description" content="I'm Hafiz Abubakar Afzal, a full‑stack developer crafting high‑performance applications with React, Next.js, Electron.js, React Native, and cloud technologies. View my projects, education, and certificates." />
          <meta name="keywords" content="Hafiz Abubakar Afzal, full-stack developer, React developer, Next.js expert, Node.js developer, JavaScript, TypeScript, portfolio, web developer, software engineer, Lahore, Pakistan, hafiz abubakar afzal, hafizabubakarafzal, hafizabubakarafzal vercel app, Hafiz Abubakar Afzal Vercel App, Electron.js, React Native, Best Full Stack Developer in Lahore, Best Full Stack Developer in Pakistan" />
          <meta name="author" content="Hafiz Abubakar Afzal" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <link rel="canonical" href="https://hafizabubakarafzal.vercel.app/" />
          <link rel="manifest" href="/manifest.json" />
          {/* ===== OPEN GRAPH ===== */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://hafizabubakarafzal.vercel.app/" />
          <meta property="og:title" content="Hafiz Abubakar Afzal — Full‑Stack Developer" />
          <meta property="og:description" content="I build modern, performant applications with React, Next.js, Electron.js, and React Native. Explore my portfolio showcasing projects, education, and technical skills." />
          <meta property="og:image" content="https://hafizabubakarafzal.vercel.app/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Hafiz Abubakar Afzal - Full-Stack Developer Portfolio" />
          <meta property="og:site_name" content="Hafiz Abubakar Afzal" />
          <meta property="og:locale" content="en_US" />

          {/* ===== TWITTER CARD ===== */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://hafizabubakarafzal.vercel.app/" />
          <meta name="twitter:title" content="Hafiz Abubakar Afzal — Full‑Stack Developer" />
          <meta name="twitter:description" content="Full‑stack developer specializing in React, Next.js, and Node.js. See my work, education, and certificates." />
          <meta name="twitter:image" content="https://hafizabubakarafzal.vercel.app/og-image.jpg" />
          <meta name="twitter:image:alt" content="Hafiz Abubakar Afzal Portfolio Preview" />

          {/* ===== STRUCTURED DATA ===== */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Hafiz Abubakar Afzal",
                "son of": "Mirza Muhammad Afzal Baig",
                "url": "https://hafizabubakarafzal.vercel.app/",
                "jobTitle": "Full-Stack Developer",
                "email": "mailto:hafizabubakarafzal@gmail.com",
                "telephone": "+923270972423",
                "whatsapp": "https://wa.me/923270972423",
                "image": "https://hafizabubakarafzal.vercel.app/og-image.jpg",
                "description": "Full‑stack developer with expertise in React, Next.js, Electron.js, React Native, and cloud technologies. Based in Lahore, Pakistan.",
                "knowsAbout": [
                  "Web Development",
                  "Desktop Application Development",
                  "Mobile Application Development",
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "MongoDB",
                  "Vercel",
                  "AWS",
                  "Git",
                  "Electron.js",
                  "React Native",
                ],
                "sameAs": [
                  "https://github.com/abubkar-afzal",
                  "https://www.linkedin.com/in/hafiz-abubakar-afzal-b77a46354/",
                  "https://www.instagram.com/ar_codes504/",
                  "https://wa.me/923270972423",
                  "https://x.com/arcodes504",
                  "https://www.facebook.com/ar.codes504/",
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lahore",
                  "addressCountry": "Pakistan",
                },
              }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;