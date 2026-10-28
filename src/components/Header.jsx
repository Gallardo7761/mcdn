export default function Header({ search, onSearchChange, count }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <a href="/" className="group inline-flex items-center gap-3 text-miarma-text hover:text-miarma-text">
        <img
          src="https://cdn.miarma.net/files/img/logo-without-text.svg"
          alt=""
          width={40}
          height={40}
          className="p-1.5 bg-miarma-text rounded-[10px] transition-transform duration-300 group-hover:-rotate-10"
        />
        <span>
          <h1 className="m-0 text-[clamp(1.6rem,4vw,2.2rem)] leading-none tracking-tight">
            cdn<span className="text-miarma-orange">.</span>miarma<span className="text-miarma-orange">.</span>net
          </h1>
          <span className="block mt-1 text-xxs text-miarma-text-muted">archivos públicos · {count} elementos</span>
        </span>
      </a>

      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar fichero..."
        aria-label="Buscar fichero"
        className="w-full sm:w-64 bg-transparent border-[1.5px] border-miarma-blue-dark rounded-[10px] px-4 py-2 text-sm text-miarma-text placeholder-miarma-text-muted focus:outline-none focus:border-miarma-orange transition-colors"
      />
    </header>
  );
}
