import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { blogPosts, getBlogPost } from '@/lib/blog-data'

const SITE_URL = 'https://saurabhsingh.dev'

// ── Tell Next.js which slugs exist at build time ───────────────────────────────
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

// ── Per-post SEO metadata ──────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: `${post.title} — Saurabh Singh`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: 'Saurabh Singh', url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ['Saurabh Singh'],
      tags: post.tags,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}/og-image.png`],
      creator: '@saurabhsingh',
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const CATEGORY_COLORS: Record<string, string> = {
  'AI & LLM': '#6c63ff',
  Backend: '#00d4aa',
  Security: '#f59e0b',
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const accent = CATEGORY_COLORS[post.category] ?? post.accentColor

  // JSON-LD for blog post (Article schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Saurabh Singh',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Saurabh Singh',
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.png`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'en-US',
  }

  return (
    <>
      {/* Per-post JSON-LD */}
      <Script
        id={`json-ld-post-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-all hover:scale-105"
            style={{ color: 'var(--muted)' }}
          >
            ← All posts
          </Link>

          {/* Post header */}
          <header className="mb-12">
            <div
              className="w-16 h-16 rounded-2xl text-3xl flex items-center justify-center mb-6"
              style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
            >
              {post.emoji}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}
              >
                {post.category}
              </span>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                {formatDate(post.date)} · {post.readTime}
              </span>
            </div>

            <h1
              className="text-3xl lg:text-4xl font-bold leading-tight mb-4"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              {post.title}
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <hr className="mt-8 border-white/10" />
          </header>

          {/* ── Post body ── prose styles via global CSS variables ───────── */}
          <article
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author card */}
          <div
            className="glass rounded-2xl p-6 mt-14 flex items-start gap-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,170,0.2))', border: '1px solid rgba(108,99,255,0.4)' }}
            >
              👨‍💻
            </div>
            <div>
              <div className="font-semibold text-white mb-0.5" style={{ fontFamily: 'var(--font-space)' }}>Saurabh Singh</div>
              <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
                MERN Stack &amp; AI Engineer · 2.5+ years in production full-stack and AI development.
              </div>
              <a
                href="https://www.linkedin.com/in/saurabh-singh1001/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium transition-colors hover:opacity-80"
                style={{ color: accent }}
              >
                Connect on LinkedIn →
              </a>
            </div>
          </div>

          {/* Other posts */}
          <div className="mt-14">
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'var(--font-space)' }}>More Articles</h2>
            <div className="space-y-4">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex items-start gap-4 glass rounded-xl p-4 card-hover"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}
                  >
                    <span className="text-xl flex-shrink-0">{p.emoji}</span>
                    <div>
                      <div className="text-sm font-semibold mb-0.5 group-hover:text-purple-300 transition-colors">{p.title}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>{p.readTime} · {p.category}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
