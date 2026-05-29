'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../ui/FadeIn'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium px-4 py-2 rounded-full glass" style={{ color: '#6c63ff', border: '1px solid rgba(108,99,255,0.3)' }}>
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            Let's{' '}
            <span className="gradient-text">Work Together</span>
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
            Open to full-time roles, freelance projects, and collaboration. Let's build something great.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn direction="left">
            <div className="space-y-6">
              {[
                { label: 'Email', value: 'saurabh146singh.1001@gmail.com', href: 'mailto:saurabh146singh.1001@gmail.com', icon: '✉️' },
                { label: 'Phone', value: '+91 7754040908', href: 'tel:+917754040908', icon: '📱' },
                { label: 'LinkedIn', value: 'linkedin.com/in/saurabh-singh1001', href: 'https://www.linkedin.com/in/saurabh-singh1001/', icon: '💼' },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-2xl p-5 card-hover group"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
                >
                  <div className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.2)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>{c.label}</div>
                    <div className="text-sm font-medium group-hover:text-purple-400 transition-colors" style={{ color: 'var(--text)' }}>{c.value}</div>
                  </div>
                </a>
              ))}

              <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(0,212,170,0.2)', background: 'rgba(0,212,170,0.04)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Currently Available</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Open to full-time MERN / AI engineering roles and exciting freelance projects.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {status === 'sent' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <div className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>Message Sent!</div>
                  <div style={{ color: 'var(--muted)' }}>I'll get back to you within 24 hours.</div>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm underline"
                    style={{ color: '#6c63ff' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Your Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.6)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                    />
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                    >
                      <span>⚠️</span>
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 rounded-xl font-medium text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4aa)', boxShadow: '0 0 30px rgba(108,99,255,0.3)' }}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
