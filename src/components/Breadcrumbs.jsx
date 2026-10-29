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
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-kb-text-muted overflow-x-auto">
      <button
        onClick={() => handleClick(-1)}
        className="hover:text-kb-orange-light transition-colors flex items-center gap-1 cursor-pointer"
      >
        ~ storage
      </button>
      {parts.map((folder, index) => (
        <div key={folder} className="flex items-center gap-2">
          <span className="text-kb-blue">/</span>
          <button
            onClick={() => handleClick(index)}
            className={`transition-colors cursor-pointer ${
              index === parts.length - 1 ? 'text-kb-orange-light' : 'hover:text-kb-orange-light'
            }`}
          >
            {folder}
          </button>
        </div>
      ))}
    </nav>
  );
}
