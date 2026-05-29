'use client'
import FadeIn from '../ui/FadeIn'

const highlights = [
  { icon: '🎓', title: 'MCA Graduate', sub: 'PES University, Bangalore — 2023' },
  { icon: '📍', title: 'Based in India', sub: 'Open to remote & relocation' },
  { icon: '🌐', title: 'Languages', sub: 'English & Hindi' },
  { icon: '⚡', title: 'Focus Area', sub: 'AI-powered full-stack products' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-sm font-medium px-4 py-2 rounded-full glass" style={{ color: '#6c63ff', border: '1px solid rgba(108,99,255,0.3)' }}>
              About Me
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              Building the future,{' '}
              <span className="gradient-text">one commit</span> at a time
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="space-y-5">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                I'm a MERN Stack engineer with <strong style={{ color: 'var(--text)', fontWeight: 600 }}>3+ years</strong> of experience crafting scalable web applications from the ground up — responsive frontends, robust backend APIs, and cloud deployments.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                Recently, I've been deep in the AI/LLM space — building <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Retrieval-Augmented Generation (RAG)</strong> systems, integrating large language models, and creating intelligent search experiences that actually work in production.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                I've shipped production features across <strong style={{ color: 'var(--text)', fontWeight: 600 }}>healthcare</strong> (LivoLabs) and <strong style={{ color: 'var(--text)', fontWeight: 600 }}>fintech</strong> (KWATAKI) platforms, collaborating across frontend, DevOps, and product teams to deliver full lifecycle products.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['React.js', 'Node.js', 'LangChain', 'RAG', 'MongoDB', 'AWS'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm glass"
                    style={{ color: '#00d4aa', border: '1px solid rgba(0,212,170,0.25)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-5 card-hover"
                  style={{ border: '1px solid var(--glass-border)' }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-semibold mb-1" style={{ fontFamily: 'var(--font-space)', color: 'var(--text)' }}>{item.title}</div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
