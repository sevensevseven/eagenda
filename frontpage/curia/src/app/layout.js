import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CuriaChronos | Asistentul digital de încredere pentru profesioniștii juridici",
  description: "Agenda ta juridică, complet automatizată.",
  keywords: [
    "portal.just.ro",
    "agenda juridică",
    "gestionare dosare",
    "programări instanță",
    "CuriaChronos",
    "asistent legal digital",
    "legal tech România",
    "dosar electronic"
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  charset: "UTF-8",
  icons: {
    icon: "https://curiachronos.ro/favicon.ico"
  },
  openGraph: {
    title: "CuriaChronos | Asistentul digital de încredere pentru profesioniștii juridici",
    locale: "ro_RO",
    siteName: "CuriaChronos",
    type: "website",
    description: "Agenda ta juridică, complet automatizată.",
    url: "https://curiachronos.ro",
    images: [
      {
        url: "https://curiachronos.ro/frontpage.png",
        width: 1903,
        height: 872,
        alt: "CuriaChronos - Asistentul digital de încredere pentru profesioniștii juridici",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CuriaChronos | Asistentul digital de încredere pentru profesioniștii juridici",
    description: "Agenda ta juridică, complet automatizată.",
    site: "@sevensofire",
    creator: "@sevensofire",
    images: ["https://curiachronos.ro/frontpage.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
