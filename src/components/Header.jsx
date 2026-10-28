export default function Header({ search, onSearchChange, count }) {
  return (
    <miarma-header site="cdn" tag={`archivos públicos · ${count} elementos`}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar fichero..."
        aria-label="Buscar fichero"
        className="w-full sm:w-64 bg-transparent border-[1.5px] border-miarma-blue-dark rounded-[10px] px-4 py-2 text-sm text-miarma-text placeholder-miarma-text-muted focus:outline-none focus:border-miarma-orange transition-colors"
      />
    </miarma-header>
  );
}
