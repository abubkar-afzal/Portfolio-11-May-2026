import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import '@splidejs/react-splide/css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}