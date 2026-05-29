import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'

const SITE_URL = 'https://saurabhsingh.dev'

export const metadata: Metadata = {
  title: 'Blog — Saurabh Singh',
  description:
    'Practical engineering articles by Saurabh Singh on AI/LLM development, NestJS vs Express architecture, full-stack patterns, and admin dashboard security.',
  keywords: [
    'AI LLM development blog',
    'NestJS vs Express tutorial',
    'Admin dashboard security',
    'Full stack developer blog India',
    'RAG systems tutorial',
    'MERN stack articles',
    'Saurabh Singh blog',
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog — Saurabh Singh | Full-Stack & AI Engineering',
    description:
      'Practical articles on AI/LLM development, NestJS, and admin security from a MERN stack engineer.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Saurabh Singh',
    description: 'AI/LLM, NestJS, security. Engineering articles that skip the fluff.',
    images: [`${SITE_URL}/og-image.png`],
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  'AI & LLM': '#6c63ff',
  Backend: '#00d4aa',
  Security: '#f59e0b',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-sm font-medium px-4 py-2 rounded-full glass mb-4"
            style={{ color: '#6c63ff', border: '1px solid rgba(108,99,255,0.3)' }}
          >
            Writing
          </span>
          <h1
            className="text-4xl lg:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            The{' '}
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
            Practical articles on AI engineering, backend architecture, and building things
            that actually work in production.
          </p>
        </div>

        {/* ── Featured post ───────────────────────────────────────────────── */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block glass rounded-3xl p-8 mb-8 card-hover"
          style={{ border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
        >
          <div className="flex items-start gap-6">
            <div
              className="hidden sm:flex w-20 h-20 rounded-2xl text-4xl items-center justify-center flex-shrink-0"
              style={{ background: `${featured.accentColor}22`, border: `1px solid ${featured.accentColor}44` }}
            >
              {featured.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${CATEGORY_COLORS[featured.category] ?? featured.accentColor}22`, color: CATEGORY_COLORS[featured.category] ?? featured.accentColor, border: `1px solid ${CATEGORY_COLORS[featured.category] ?? featured.accentColor}44` }}
                >
                  {featured.category}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {formatDate(featured.date)} · {featured.readTime}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ background: 'rgba(108,99,255,0.15)', color: '#a89fff' }}
                >
                  Featured
                </span>
              </div>
              <h2
                className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-purple-300 transition-colors"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                {featured.title}
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* ── Rest of posts ───────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block glass rounded-2xl p-6 card-hover"
              style={{ border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-xl text-2xl flex items-center justify-center mb-4"
                style={{ background: `${post.accentColor}22`, border: `1px solid ${post.accentColor}44` }}
              >
                {post.emoji}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${CATEGORY_COLORS[post.category] ?? post.accentColor}22`, color: CATEGORY_COLORS[post.category] ?? post.accentColor, border: `1px solid ${CATEGORY_COLORS[post.category] ?? post.accentColor}44` }}
                >
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {post.readTime}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors leading-snug"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--muted)' }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {formatDate(post.date)}
                </span>
                <span className="text-xs font-medium" style={{ color: post.accentColor }}>
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to portfolio */}
        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-all hover:scale-105"
            style={{ color: 'var(--muted)' }}
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
