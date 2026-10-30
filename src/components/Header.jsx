export default function Header({ search, onSearchChange, count }) {
  return (
    <kb-header site="cdn" tag={`archivos públicos · ${count} elementos`}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar fichero..."
        aria-label="Buscar fichero"
        className="w-full sm:w-64 bg-transparent border-[1.5px] border-kb-green-dark rounded-[10px] px-4 py-2 text-sm text-kb-text placeholder-kb-text-muted focus:outline-none focus:border-kb-orange transition-colors"
      />
    </kb-header>
  );
}
