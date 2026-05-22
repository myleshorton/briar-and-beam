import '../styles/globals.css';
import { Fraunces, EB_Garamond } from 'next/font/google';
import Splash from '../components/Splash';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700', '900'],
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${garamond.variable}`} style={{ minHeight: '100vh' }}>
      <Splash />
      <Component {...pageProps} />
    </div>
  );
}
