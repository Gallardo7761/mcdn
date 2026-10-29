import FileItem from './FileItem';

export default function FileList({ items, loading, error, currentPath, copiedName, onNavigate, onCopy }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-kb-text-muted text-sm gap-2">
        <div className="w-6 h-6 border-2 border-kb-blue border-t-kb-orange rounded-full animate-spin" />
        <span>Consultando CDN...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-kb-orange text-sm">
        <span>Error al cargar archivos: {error}</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-kb-text-muted text-sm">
        <span>Directorio vacío o sin coincidencias</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-[1.5px] border-kb-blue rounded-[10px] overflow-hidden divide-y divide-kb-blue-dark">
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
