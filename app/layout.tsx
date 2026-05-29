import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { ThemeProvider } from './contexts/ThemeContext'
import './globals.css'

// ── Change this to your real deployed URL once you go live ───────────────────
const SITE_URL = 'https://saurabhsingh.dev'

// ── Rich JSON-LD structured data (Google rich results) ───────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saurabh Singh',
  url: SITE_URL,
  email: 'saurabh146singh.1001@gmail.com',
  telephone: '+917754040908',
  jobTitle: 'Full-Stack Engineer & AI Developer',
  description:
    'MERN Stack Engineer with 2.5+ years of experience building scalable full-stack applications and AI-powered products. Specialising in React, Node.js, MongoDB, LLMs, and RAG systems.',
  image: `${SITE_URL}/og-image.png`,
  sameAs: [
    'https://www.linkedin.com/in/saurabh-singh1001/',
    'https://github.com/saurabh1001',
  ],
  knowsAbout: [
    'MERN Stack',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'AI Engineering',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Full-Stack Development',
    'REST APIs',
    'GraphQL',
    'AWS',
    'Docker',
  ],
  offers: {
    '@type': 'Offer',
    description: 'Available for full-time engineering roles and freelance projects.',
    areaServed: 'Worldwide',
  },
}

// ── Static metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Saurabh Singh — MERN Stack & AI Engineer',
    template: '%s | Saurabh Singh',
  },
  description:
    'Full-stack engineer with 2.5+ years of experience in React, Node.js, MongoDB, and AI (LLMs & RAG systems). Available for full-time roles and freelance projects worldwide.',
  keywords: [
    'MERN Stack Developer',
    'Full Stack Developer India',
    'React Developer for hire',
    'Node.js Developer',
    'AI Engineer',
    'LLM Engineer',
    'RAG Systems Developer',
    'Next.js Developer',
    'MongoDB Developer',
    'TypeScript Developer',
    'Freelance Full Stack Developer',
    'Hire React Developer',
    'AI Powered Applications',
    'Saurabh Singh Developer',
    'Saurabh Singh Portfolio',
  ],
  authors: [{ name: 'Saurabh Singh', url: SITE_URL }],
  creator: 'Saurabh Singh',
  publisher: 'Saurabh Singh',
  category: 'Technology',

  // ── Canonical & alternate ──────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Open Graph (Facebook, WhatsApp, Slack, etc.) ──────────────────────────
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Saurabh Singh Portfolio',
    title: 'Saurabh Singh — MERN Stack & AI Engineer',
    description:
      'Full-stack engineer specialising in React, Node.js, AI/LLMs, and RAG systems. 2.5+ years building production-grade applications. Available for hire.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Saurabh Singh — MERN Stack & AI Engineer portfolio',
      },
    ],
    locale: 'en_US',
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Saurabh Singh — MERN Stack & AI Engineer',
    description:
      'Full-stack engineer specialising in React, Node.js, AI/LLMs, and RAG systems. Available for hire.',
    images: [`${SITE_URL}/og-image.png`],
    creator: '@saurabhsingh',
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // ── Verification (add your codes once you set up Search Console) ──────────
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
}

// ── Viewport (separate export required in Next.js App Router) ─────────────────
export const viewport: Viewport = {
  themeColor: '#6c63ff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/*
          Anti-FOUC script — runs synchronously before React hydrates so the
          correct theme class is applied before any paint, eliminating the
          "flash of wrong theme" on page load.
        */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light');}}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise mesh-bg">
        {/* ThemeProvider is a Client Component — wraps all children */}
        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* ── JSON-LD structured data ── */}
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
