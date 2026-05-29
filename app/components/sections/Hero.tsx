'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { stats } from '@/lib/data'
import HeroPendulumOrb from '@/app/components/ui/HeroPendulumOrb'

const roles = ['MERN Stack Engineer', 'AI & LLM Engineer', 'RAG Systems Builder', 'Full-Stack Developer']

function TypeWriter() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = roles[idx]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    } else if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
      return () => clearTimeout(t)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIdx((prev) => (prev + 1) % roles.length)
    }
  }, [displayed, deleting, idx])

  return (
    <span className="gradient-text" style={{ fontFamily: 'var(--font-space)' }}>
      {displayed}
      <span className="ml-0.5 inline-block w-0.5 h-8 bg-purple-400 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* items-start so the pendulum hangs from the top of the right column */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left column: text ─────────────────────────────────────────── */}
          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 glass"
              style={{ color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold leading-[1.05] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Saurabh</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl lg:text-3xl font-semibold mb-6 h-10"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              <TypeWriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--muted)' }}
            >
              3+ years building scalable full-stack applications with React, Node.js, and MongoDB.
              Specializing in AI-powered products — LLMs, RAG systems, and intelligent user experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4aa)', boxShadow: '0 0 30px rgba(108,99,255,0.3)' }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 glass"
                style={{ color: 'var(--text)', border: '1px solid var(--glass-border)' }}
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Resume buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="/resume-saurah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.35)', color: '#a89fff' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                View Resume
              </a>
              <a
                href="/resume-saurah.pdf"
                download="Saurabh-Singh-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.3)', color: '#34d4aa' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4"
            >
              {[
                {
                  label: 'GitHub',
                  href: 'https://github.com/Saurabhsingh1001',
                  icon: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z',
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/saurabh-singh1001/',
                  icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-purple-500/50 hover:scale-110 transition-all duration-200"
                  style={{ border: '1px solid var(--glass-border)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text)', opacity: 0.7 }}>
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: pendulum photo ───────────────────────────────── */}
          <HeroPendulumOrb />

        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center card-hover" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl font-bold gradient-text mb-1" style={{ fontFamily: 'var(--font-space)' }}>{s.value}</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
