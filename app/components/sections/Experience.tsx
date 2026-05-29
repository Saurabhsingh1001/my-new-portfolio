'use client'
import { motion } from 'framer-motion'
import FadeIn from '../ui/FadeIn'
import { experience } from '@/lib/data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium px-4 py-2 rounded-full glass" style={{ color: '#ec4899', border: '1px solid rgba(236,72,153,0.3)' }}>
            Work History
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            Professional{' '}
            <span className="gradient-text">Experience</span>
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={0.1}>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #6c63ff, #00d4aa, transparent)' }} />
                <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full pulse-glow" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4aa)' }} />

                <div className="glass rounded-2xl p-7 card-hover" style={{ border: '1px solid rgba(108,99,255,0.2)' }}>
                  <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                    <div>
                      {/* Role title: use var(--text) so it's visible in light mode */}
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space)', color: 'var(--text)' }}>{exp.role}</h3>
                      <div className="text-base font-medium mt-1" style={{ color: '#6c63ff' }}>{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 rounded-full text-sm glass" style={{ color: '#00d4aa', border: '1px solid rgba(0,212,170,0.25)' }}>
                        {exp.period}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{exp.duration}</div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.08 }}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#6c63ff' }} />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.2} className="mt-8 pl-8">
            <div className="glass rounded-2xl p-6 text-center" style={{ border: '1px solid var(--glass-border)' }}>
              <div className="text-sm mb-3" style={{ color: 'var(--muted)' }}>Education</div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { deg: 'Master of Computer Applications (MCA)', uni: 'PES University, Bangalore', year: '2023' },
                  { deg: 'Bachelor of Vocational IT (B.Voc IT)', uni: 'Ewing Christian College, Allahabad', year: '2020' },
                ].map((edu, i) => (
                  <div
                    key={i}
                    className="text-left p-4 rounded-xl"
                    style={{
                      background: 'rgba(108,99,255,0.05)',
                      border: '1px solid rgba(108,99,255,0.1)',
                    }}
                  >
                    {/* Degree title: use var(--text) */}
                    <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{edu.deg}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{edu.uni} · {edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
