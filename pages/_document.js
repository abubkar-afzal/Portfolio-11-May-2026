import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
           <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700&display=swap"
            rel="stylesheet"
          />
          <title>Hafiz Abubakar Afzal | Full-Stack Developer Portfolio</title>
          <meta name="title" content="Hafiz Abubakar Afzal - Full-Stack Developer" />
          <meta
            name="description"
            content="Hafiz Abubakar Afzal is a skilled full-stack developer specializing in React, Next.js, Node.js, and cloud technologies. Explore his projects, education, and certificates."
          />
          <meta
            name="keywords"
            content="Hafiz Abubakar Afzal, full-stack developer, Next.js, React, Node.js, portfolio, software engineer, web developer, Hafiz Abubakar"
          />
          <meta name="author" content="Hafiz Abubakar Afzal" />
          <meta name="robots" content="index, follow" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomain.com/" />
          <meta property="og:title" content="Hafiz Abubakar Afzal | Full-Stack Developer" />
          <meta
            property="og:description"
            content="Crafting modern web experiences. View the portfolio of Hafiz Abubakar Afzal."
          />
          <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://yourdomain.com/" />
          <meta property="twitter:title" content="Hafiz Abubakar Afzal | Full-Stack Developer" />
          <meta
            property="twitter:description"
            content="Full-stack developer portfolio of Hafiz Abubakar Afzal."
          />
          <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap"
            rel="stylesheet"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Hafiz Abubakar Afzal',
                url: 'https://yourdomain.com',
                jobTitle: 'Full-Stack Developer',
                knowsAbout: [
                  'Web Development',
                  'React',
                  'Next.js',
                  'Node.js',
                  'TypeScript',
                  'Tailwind CSS',
                  'MongoDB',
                  'AWS',
                ],
                sameAs: [
                  'https://github.com/hafizabubakar',
                  'https://linkedin.com/in/hafizabubakar',
                  'https://twitter.com/hafizabubakar',
                ],
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