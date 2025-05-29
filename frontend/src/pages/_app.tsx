import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-grow">
              <Component {...pageProps} />
          </main>
          <Footer />
      </div>
  );
}
