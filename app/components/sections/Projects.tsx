'use client'
import { motion } from 'framer-motion'
import FadeIn from '../ui/FadeIn'
import { projects } from '@/lib/data'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium px-4 py-2 rounded-full glass" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Production applications across healthcare, fintech, and AI — built end-to-end.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.12}>
              <div
                className="glass rounded-2xl p-6 h-full flex flex-col card-hover relative overflow-hidden group"
                style={{ border: `1px solid ${project.color}25` }}
              >
                {project.highlight && (
                  <div
                    className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
                  >
                    Featured
                  </div>
                )}

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12 0%, transparent 60%)` }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}
                  >
                    {project.icon?.includes(".png") ? (
                      <img
                        src={project.icon}
                        alt="icon"
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      project.icon
                    )}
                  </div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: 'var(--font-space)', color: 'var(--text)' }}>{project.title}</div>
                    <div className="text-xs font-medium" style={{ color: project.color }}>{project.metrics}</div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--muted)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <FadeIn delay={0.3} className="mt-10 text-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium glass transition-all duration-200 hover:scale-105"
            style={{ border: '1px solid var(--glass-border)', color: 'var(--text)' }}
          >
            Live 
          </a>
        </FadeIn>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* <FadeIn delay={0.3} className="mt-10 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium glass transition-all duration-200 hover:scale-105"
            style={{ border: '1px solid var(--glass-border)', color: 'var(--text)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
            </svg>
            View All on GitHub
          </a>
        </FadeIn> */}
      </div>
    </section>
  )
}
