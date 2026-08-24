import FileItem from './FileItem';

export default function FileList({ items, loading, error, currentPath, copiedName, onNavigate, onCopy }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/40 text-sm font-mono gap-2">
        <div className="w-6 h-6 border-2 border-brand-light-blue border-t-brand-orange rounded-full animate-spin" />
        <span>Consultando CDN...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-brand-orange text-sm font-mono">
        <span>Error al cargar archivos: {error}</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white/30 text-sm">
        <span>Directorio vacío o sin coincidencias</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 min-h-70">
      {items.map((item) => (
        <FileItem
          key={item.name}
          item={item}
          currentPath={currentPath}
          copiedName={copiedName}
          onNavigate={onNavigate}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}