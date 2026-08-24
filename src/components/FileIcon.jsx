const icons = import.meta.glob('../assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
});

export default function FileIcon({ isDirectory, className = "w-5 h-5 bg-brand-light-orange" }) {
  const iconName = isDirectory ? 'folder' : 'file';
  const iconSrc = icons[`../assets/icons/${iconName}.svg`] || icons['../assets/icons/file.svg'];

  return (
    <span
      className={`inline-block mask-no-repeat mask-center mask-contain ${className}`}
      style={{
        maskImage: `url("${iconSrc}")`,
        WebkitMaskImage: `url("${iconSrc}")`
      }}
    />
  );
}