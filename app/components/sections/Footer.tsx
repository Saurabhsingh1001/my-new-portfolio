export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Saurabh Singh. Built with Next.js & Framer Motion.
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </div>
      </div>
    </footer>
  )
}
