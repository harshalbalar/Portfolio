import "./globals.css";
import { profile } from "@/lib/data";
import { AppProvider } from "@/components/AppProvider";

export const metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

const initScript = `(function(){try{
  var t = localStorage.getItem('theme') || 'dark';
  var l = localStorage.getItem('lang') || 'de';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.setAttribute('lang', l);
}catch(e){
  document.documentElement.setAttribute('data-theme','dark');
  document.documentElement.setAttribute('lang','de');
}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
