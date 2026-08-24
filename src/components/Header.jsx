export default function Header({ search, onSearchChange }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-brand-light-blue to-brand-blue flex items-center justify-center text-brand-light-orange shadow-lg border border-white/10 font-mono font-bold">
          CDN
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Archivos públicos</h1>
          <p className="text-xs text-brand-light-orange/70 font-mono">cdn.miarma.net</p>
        </div>
      </div>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar fichero..."
          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-brand-orange/50 transition-colors"
        />
      </div>
    </header>
  );
}