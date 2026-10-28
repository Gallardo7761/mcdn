export default function Breadcrumbs({ currentPath, onNavigate }) {
  const parts = currentPath.split('/').filter(Boolean);

  const handleClick = (index) => {
    if (index === -1) {
      onNavigate('');
    } else {
      const target = parts.slice(0, index + 1).join('/') + '/';
      onNavigate(target);
    }
  };

  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-miarma-text-muted overflow-x-auto">
      <button
        onClick={() => handleClick(-1)}
        className="hover:text-miarma-orange-light transition-colors flex items-center gap-1 cursor-pointer"
      >
        ~ storage
      </button>
      {parts.map((folder, index) => (
        <div key={folder} className="flex items-center gap-2">
          <span className="text-miarma-blue">/</span>
          <button
            onClick={() => handleClick(index)}
            className={`transition-colors cursor-pointer ${
              index === parts.length - 1 ? 'text-miarma-orange-light' : 'hover:text-miarma-orange-light'
            }`}
          >
            {folder}
          </button>
        </div>
      ))}
    </nav>
  );
}
