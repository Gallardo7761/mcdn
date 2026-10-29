import clipboardSvg from '../assets/icons/clipboard.svg';
import clipboardCheckSvg from '../assets/icons/clipboard-check.svg';
import downloadSvg from '../assets/icons/download.svg';
import hashSvg from '../assets/icons/hash.svg';

function MaskIcon({ src, className }) {
  return (
    <span
      className={`inline-block mask-no-repeat mask-center mask-contain ${className}`}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`
      }}
    />
  );
}

export function CopyIcon({ className = "w-4 h-4 bg-current" }) {
  return <MaskIcon src={clipboardSvg} className={className} />;
}

export function CheckIcon({ className = "w-4 h-4 bg-current" }) {
  return <MaskIcon src={clipboardCheckSvg} className={className} />;
}

export function DownloadIcon({ className = "w-5 h-5 bg-kb-orange" }) {
  return <MaskIcon src={downloadSvg} className={className} />;
}

export function HashIcon({ className = "w-4 h-4 bg-current" }) {
  return <MaskIcon src={hashSvg} className={className} />;
}