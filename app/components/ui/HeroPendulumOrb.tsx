'use client'
/**
 * HeroPendulumOrb
 * ───────────────────────────────────────────────────────────────────────────
 * Profile photo as a pendulum bob hanging from a ceiling hook.
 *
 * DRAG  (free-position, not arc-locked)
 *   Mouse position → ball position directly.
 *   Rope clamps to length L (can't stretch).
 *   Dragging toward the pivot → rope goes slack → bezier droops visibly.
 *   Release anywhere → resumes pendulum physics from that angle.
 *
 * ROPE SAG  (quadratic bezier, gravity-biased)
 *   ctrlY = midY + sag
 *   sag  = horizDist × 0.22                ← rope weight under swing
 *          + tangentialSpeed × 0.07         ← dynamic lag when fast
 *          + L × 0.018                      ← always-visible soft curve
 *          + slack × 0.48                   ← extra droop when rope is loose
 *   Control point is ALWAYS pushed downward (+Y = screen down), so the
 *   curve droops under gravity regardless of which direction the ball faces.
 *
 * SETTLE
 *   DAMPING = 0.992 → ball stops in ≈ 8–10 s naturally.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// ── Pre-computed orbiting accent dots ─────────────────────────────────────
const ORB_DOTS = [0, 1, 2, 3, 4, 5].map((i) => ({
  backgroundColor: i % 2 === 0 ? '#6c63ff' : '#00d4aa',
  top:  `${(15 + Math.sin((i / 6) * Math.PI * 2) * 40).toFixed(3)}%`,
  left: `${(50 + Math.cos((i / 6) * Math.PI * 2) * 42).toFixed(3)}%`,
}))

// ── Physics ───────────────────────────────────────────────────────────────
const G         = 0.40
const DAMPING   = 0.992
const INIT_ANGLE = 1.1   // ≈ 63° — dramatic drop on load

interface Sim {
  pivotX   : number
  pivotY   : number
  L        : number   // rope length (px)
  angle    : number   // radians from downward vertical
  angVel   : number
  ballX    : number
  ballY    : number
  halfW    : number   // half-width of outer orb element
  dragging : boolean
  history  : number[] // recent angles → release velocity
  raf      : number
}

export default function HeroPendulumOrb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ropeRef      = useRef<SVGPathElement>(null)
  const orbRef       = useRef<HTMLDivElement>(null)

  const sim = useRef<Sim>({
    pivotX: 0, pivotY: 0, L: 0,
    angle: INIT_ANGLE, angVel: 0,
    ballX: 0, ballY: 0, halfW: 144,
    dragging: false, history: [], raf: 0,
  })

  useEffect(() => {
    const container = containerRef.current
    const rope      = ropeRef.current
    const orb       = orbRef.current
    if (!container || !rope || !orb) return

    const s = sim.current

    // Sync ball Cartesian coords from polar angle
    function syncBall() {
      s.ballX = s.pivotX + Math.sin(s.angle) * s.L
      s.ballY = s.pivotY + Math.cos(s.angle) * s.L
    }

    // DOM update — move orb + redraw rope
    function renderFrame() {
      if (!orb || !rope) return

      orb.style.transform = `translate(${s.ballX - s.halfW}px, ${s.ballY - s.halfW}px)`

      // ── Rope bezier ─────────────────────────────────────────────────
      const mx  = (s.pivotX + s.ballX) / 2
      const my  = (s.pivotY + s.ballY) / 2
      const hd  = Math.abs(s.ballX - s.pivotX)
      const spd = Math.abs(s.angVel) * s.L

      // Slack: how much rope is hanging loose
      const dx   = s.ballX - s.pivotX
      const dy   = s.ballY - s.pivotY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 8) return                            // ball too close to pivot
      const slack = Math.max(0, s.L - dist)

      // Control point always pushed downward (gravity effect on rope weight)
      const sag = hd * 0.22 + spd * 0.07 + s.L * 0.018 + slack * 0.48

      rope.setAttribute(
        'd',
        `M ${s.pivotX},${s.pivotY} Q ${mx},${my + sag} ${s.ballX},${s.ballY}`,
      )
    }

    // Resize: recompute layout from live DOM measurements
    function resize() {
      if (!container || !orb) return
      s.halfW  = orb.offsetWidth / 2
      const rect = container.getBoundingClientRect()
      s.pivotX   = rect.width / 2
      s.pivotY   = 18
      // L: keep ball + orb inside container at rest
      const maxL = rect.height - s.pivotY - s.halfW - 20
      s.L = Math.min(maxL, 340)
      if (!s.dragging) { syncBall(); renderFrame() }
    }

    resize()
    orb.style.opacity = '1'              // reveal after first position set

    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(container)
    window.addEventListener('resize', resize)

    // ── Physics RAF ───────────────────────────────────────────────────
    function tick() {
      if (!s.dragging) {
        const acc  = -(G / s.L) * Math.sin(s.angle)
        s.angVel   = (s.angVel + acc) * DAMPING
        s.angle   += s.angVel
        syncBall()
        renderFrame()
      }
      s.raf = requestAnimationFrame(tick)
    }
    tick()

    // ── Coordinate helpers ────────────────────────────────────────────
    function toLocal(cx: number, cy: number) {
      if (!container) return { x: 0, y: 0 }
      const r = container.getBoundingClientRect()
      return { x: cx - r.left, y: cy - r.top }
    }

    function isNearOrb(cx: number, cy: number) {
      const p  = toLocal(cx, cy)
      const dx = p.x - s.ballX, dy = p.y - s.ballY
      return dx * dx + dy * dy < (s.halfW + 20) ** 2
    }

    // ── Drag ─────────────────────────────────────────────────────────
    function startDrag(cx: number, cy: number): boolean {
      if (!container || !orb || !isNearOrb(cx, cy)) return false
      s.dragging             = true
      s.angVel               = 0
      s.history              = []
      // Initial angle from current mouse position
      const p                = toLocal(cx, cy)
      const dx = p.x - s.pivotX, dy = p.y - s.pivotY
      s.angle                = Math.atan2(dx, dy)
      syncBall()
      renderFrame()
      orb.style.cursor       = 'grabbing'
      container.style.cursor = 'grabbing'
      return true
    }

    function doDrag(cx: number, cy: number) {
      if (!s.dragging) return
      const p  = toLocal(cx, cy)
      const dx = p.x - s.pivotX
      const dy = p.y - s.pivotY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1) return

      // FREE position: ball follows mouse, only constrained to rope length
      const clamped = Math.min(dist, s.L)
      s.ballX = s.pivotX + (dx / dist) * clamped
      s.ballY = s.pivotY + (dy / dist) * clamped

      // Keep angle in sync for physics resumption after release
      s.angle = Math.atan2(s.ballX - s.pivotX, s.ballY - s.pivotY)

      // Rolling angle window for velocity estimation
      s.history.push(s.angle)
      if (s.history.length > 8) s.history.shift()

      renderFrame()
    }

    function endDrag() {
      if (!container || !orb || !s.dragging) return
      s.dragging             = false
      container.style.cursor = ''
      orb.style.cursor       = 'grab'

      // Velocity from last two stored angles (most recent motion)
      const h = s.history
      if (h.length >= 2) {
        // Unwrap the difference to handle crossing ±π boundary
        let diff = h[h.length - 1] - h[h.length - 2]
        if (diff >  Math.PI) diff -= 2 * Math.PI
        if (diff < -Math.PI) diff += 2 * Math.PI
        s.angVel = Math.max(-0.22, Math.min(0.22, diff))
      }
    }

    // ── Event listeners ───────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      if (s.dragging) {
        doDrag(e.clientX, e.clientY)
      } else if (orb) {
        orb.style.cursor = isNearOrb(e.clientX, e.clientY) ? 'grab' : ''
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()   // also kills ghost image drag from native browser
      startDrag(e.clientX, e.clientY)
    }
    const onMouseUp = () => endDrag()

    function onTouchStart(e: TouchEvent) {
      if (startDrag(e.touches[0].clientX, e.touches[0].clientY)) e.preventDefault()
    }
    function onTouchMove(e: TouchEvent) {
      if (!s.dragging) return
      e.preventDefault()
      doDrag(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => endDrag()

    container.addEventListener('mousedown',  onMouseDown)
    window.addEventListener   ('mousemove',  onMouseMove)
    window.addEventListener   ('mouseup',    onMouseUp)
    container.addEventListener('touchstart', onTouchStart, { passive: false })
    container.addEventListener('touchmove',  onTouchMove,  { passive: false })
    container.addEventListener('touchend',   onTouchEnd)

    return () => {
      cancelAnimationFrame(s.raf)
      resizeObs.disconnect()
      window.removeEventListener   ('resize',    resize)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener   ('mousemove', onMouseMove)
      window.removeEventListener   ('mouseup',   onMouseUp)
      container.removeEventListener('touchstart',onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend',  onTouchEnd)
    }
  }, [])

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: 'clamp(480px, 58vw, 660px)' }}
    >
      {/* ── SVG: hook + rope ─────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        {/* Halo glow at ceiling */}
        <circle cx="50%" cy="18" r="38" fill="rgba(108,99,255,0.13)" />
        {/* Hook outer ring */}
        <circle cx="50%" cy="18" r="12" fill="none" stroke="rgba(180,160,255,0.28)" strokeWidth="1.5" />
        {/* Hook bolt */}
        <circle cx="50%" cy="18" r="6" fill="rgba(215,205,255,0.92)" />
        {/* Rope — path updated every frame by renderFrame() */}
        <path
          ref={ropeRef}
          d=""
          fill="none"
          stroke="rgba(160,142,255,0.68)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Orb (pendulum bob) ─────────────────────────────────────────
           orbRef is positioned at (ballX - halfW, ballY - halfW) so its
           center sits exactly on the physics ball position.
           Starts opacity:0 so it never flashes at (0,0) on load.          */}
      <div
        ref={orbRef}
        style={{
          position  : 'absolute',
          top       : 0,
          left      : 0,
          opacity   : 0,
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Full orb — same visual structure as original static Orb */}
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center">

          {/* Spinning conic gradient ring (outermost) */}
          <div
            className="absolute inset-0 rounded-full spin-slow"
            style={{
              background: 'conic-gradient(from 0deg, #6c63ff55, #00d4aa55, #6c63ff55)',
              filter    : 'blur(1px)',
            }}
          />

          {/* Inner radial glow ring */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(108,99,255,0.35) 0%, rgba(0,212,170,0.12) 55%, transparent 75%)',
              border    : '1px solid rgba(108,99,255,0.4)',
            }}
          />

          {/* Profile photo circle */}
          <div
            className="relative z-10 w-44 h-44 lg:w-56 lg:h-56 rounded-full overflow-hidden pulse-glow"
            style={{
              border    : '2px solid rgba(108,99,255,0.5)',
              boxShadow : '0 0 40px rgba(108,99,255,0.3), 0 0 80px rgba(0,212,170,0.15)',
            }}
            /* Prevent browser showing native image-ghost on mousedown */
            onMouseDown={(e) => e.preventDefault()}
          >
            <Image
              src="/mypic.jpg"
              alt="Saurabh Singh — MERN Stack & AI Engineer"
              fill
              sizes="(max-width: 1024px) 176px, 224px"
              className="object-cover object-top"
              priority
              draggable={false}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            />
            {/* Gradient fade at bottom */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(10,10,26,0.45) 100%)' }}
            />
          </div>

          {/* Orbiting accent dots — animated (same as original Orb) */}
          {ORB_DOTS.map((dotStyle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={dotStyle}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
