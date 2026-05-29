'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../ui/FadeIn'
import { skills } from '@/lib/data'

import {
  SiReact, SiJavascript, SiHtml5, SiCss,
  SiNodedotjs, SiNestjs, SiExpress,
  SiMongodb, SiDocker, SiGooglecloud,
  SiGit, SiStripe, SiVercel, SiPython,
  SiPostgresql, SiOpenai, SiGithubactions,
} from 'react-icons/si'
import {
  TbCode, TbDeviceMobile, TbShieldLock, TbHexagon,
  TbBrain, TbSearch, TbLink, TbDatabase, TbServer,
  TbCloud, TbCreditCard, TbPlug, TbTerminal, TbAtom,
  TbApi, TbBrandAws,
} from 'react-icons/tb'
import type { IconType } from 'react-icons'

type SkillEntry = { icon: IconType; color: string }

const skillMap: Record<string, SkillEntry> = {
  'React.js':             { icon: SiReact,          color: '#61DAFB' },
  'JavaScript ES6+':      { icon: SiJavascript,     color: '#F7DF1E' },
  'HTML5':                { icon: SiHtml5,          color: '#E34F26' },
  'CSS3':                 { icon: SiCss,            color: '#1572B6' },
  'REST API Integration': { icon: TbApi,            color: '#6c63ff' },
  'Responsive UI':        { icon: TbDeviceMobile,   color: '#00d4aa' },
  'Node.js':              { icon: SiNodedotjs,      color: '#339933' },
  'NestJS':               { icon: SiNestjs,         color: '#E0234E' },
  'Express.js':           { icon: SiExpress,        color: '#AAAAAA' },
  'RESTful APIs':         { icon: TbCode,           color: '#6c63ff' },
  'JWT Auth':             { icon: TbShieldLock,     color: '#A78BFA' },
  'Microservices':        { icon: TbHexagon,        color: '#00d4aa' },
  'RAG Systems':          { icon: TbBrain,          color: '#F59E0B' },
  'LLMs':                 { icon: SiOpenai,         color: '#A78BFA' },
  'Vector Embeddings':    { icon: TbAtom,           color: '#F59E0B' },
  'Semantic Search':      { icon: TbSearch,         color: '#F59E0B' },
  'LangChain':            { icon: TbLink,           color: '#1BC8A0' },
  'Prompt Engineering':   { icon: TbTerminal,       color: '#F59E0B' },
  'Python':               { icon: SiPython,         color: '#3776AB' },
  'MongoDB':              { icon: SiMongodb,        color: '#47A248' },
  'SQL':                  { icon: SiPostgresql,     color: '#336791' },
  'ChromaDB':             { icon: TbDatabase,       color: '#EC4899' },
  'Schema Design':        { icon: TbServer,         color: '#EC4899' },
  'AWS':                  { icon: TbBrandAws,       color: '#FF9900' },
  'GCP':                  { icon: SiGooglecloud,    color: '#4285F4' },
  'Docker':               { icon: SiDocker,         color: '#2496ED' },
  'CI/CD':                { icon: SiGithubactions,  color: '#2088FF' },
  'Vercel':               { icon: SiVercel,         color: '#CCCCCC' },
  'Render':               { icon: TbCloud,          color: '#46E3B7' },
  'Git':                  { icon: SiGit,            color: '#F05032' },
  'Stripe':               { icon: SiStripe,         color: '#635BFF' },
  'Razorpay':             { icon: TbCreditCard,     color: '#528FF0' },
  'Third-Party APIs':     { icon: TbPlug,           color: '#8B5CF6' },
}

const categoryColors: Record<string, string> = {
  Frontend:         '#6c63ff',
  Backend:          '#00d4aa',
  'AI & LLM':      '#f59e0b',
  Database:         '#ec4899',
  'Cloud & DevOps': '#3b82f6',
  Tools:            '#8b5cf6',
}

// ── Per-card flip card (framer-motion, no CSS classes for 3D) ────────────────
function SkillCard({ skill, color, Icon, delay }: {
  skill: string
  color: string
  Icon: IconType
  delay: number
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      // perspective must be on the parent of the rotating element
      style={{ perspective: '1000px', height: '148px', borderRadius: '16px' }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      {/* Rotating wrapper — transform-style preserve-3d MUST NOT have backdrop-filter */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0.2, 0.2, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Front face ─────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            // plain semi-transparent bg — NO backdrop-filter (breaks 3D context)
            background: 'var(--card-bg)',
            border: `1px solid ${color}35`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Icon
            size={32}
            color={color}
            style={{ filter: `drop-shadow(0 0 7px ${color}90)` }}
          />
          <span style={{
            color: 'var(--text)',
            opacity: 0.85,
            fontSize: '12px',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.3,
            padding: '0 10px',
          }}>
            {skill}
          </span>
        </div>

        {/* ── Back face ──────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            // pre-rotated 180° so it faces away initially
            transform: 'rotateY(180deg)',
            background: `radial-gradient(ellipse at center, ${color}25 0%, ${color}0a 60%, transparent 100%)`,
            border: `1px solid ${color}65`,
            boxShadow: `inset 0 0 50px ${color}18, 0 0 30px ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            size={76}
            color={color}
            style={{
              filter: [
                `drop-shadow(0 0 10px ${color})`,
                `drop-shadow(0 0 25px ${color}bb)`,
                `drop-shadow(0 0 50px ${color}66)`,
              ].join(' '),
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState('AI & LLM')
  const categories = Object.keys(skills)

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium px-4 py-2 rounded-full glass" style={{ color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}>
            Tech Stack
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === cat ? 'scale-105' : 'glass hover:scale-105'
                }`}
                style={
                  active === cat
                    ? { background: categoryColors[cat], color: '#fff', boxShadow: `0 0 20px ${categoryColors[cat]}50` }
                    : { border: '1px solid var(--glass-border)', color: 'var(--muted)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {skills[active as keyof typeof skills].map((skill, i) => {
              const entry = skillMap[skill] ?? { icon: TbCode, color: categoryColors[active] }
              return (
                <SkillCard
                  key={skill}
                  skill={skill}
                  color={entry.color}
                  Icon={entry.icon}
                  delay={i * 0.06}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.2} className="mt-16">
          <div
            className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.07))',
              border: '1px solid rgba(108,99,255,0.2)',
            }}
          >
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-space)', color: 'var(--text)' }}>
              Currently deepening expertise in
            </h3>
            <p style={{ color: 'var(--muted)' }}>
              Agentic AI systems · Multi-modal LLMs · Vector search at scale · Real-time AI streaming
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
