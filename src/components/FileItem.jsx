import { useState } from 'react';
import { formatBytes } from '@/util/format';
import FileIcon from './FileIcon';
import { CopyIcon, CheckIcon, DownloadIcon, HashIcon } from './ActionIcons';

const formatDate = (mtime) => {
  if (!mtime) return '-';
  
  if (/^\d+(\.\d+)?$/.test(String(mtime))) {
    return new Date(parseFloat(mtime) * 1000).toLocaleString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
  
  return new Date(mtime).toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export default function FileItem({ item, currentPath, copiedName, onNavigate, onCopy }) {
  const isDir = item.type === 'directory';
  const realPath = item.isGlobal ? item.name : `${currentPath}${item.name}`;
  const downloadUrl = `/files/${realPath}`;
  const isCopied = copiedName === realPath;

  const [hashStatus, setHashStatus] = useState('idle');
  const [hashText, setHashText] = useState(null);

  const handleToggleHash = async (e) => {
    e.preventDefault();
    
    if (hashText) {
      setHashText(null);
      setHashStatus('idle');
      return;
    }

    setHashStatus('loading');
    try {
      const fetchUrl = window.location.hostname === 'localhost' 
        ? `https://cdn.killobyte.es/files/${realPath}.sha256` 
        : `/files/${realPath}.sha256`;

      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error();
      
      const text = await res.text();

      if (text.toLowerCase().includes('<!doctype') || text.toLowerCase().includes('<html')) {
        throw new Error("Tell the administrator that this is HTML");
      }

      const cleanHash = text.split(' ')[0]; 
      
      setHashText(cleanHash);
      setHashStatus('done');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setHashStatus('error');
      setTimeout(() => setHashStatus('idle'), 2000);
    }
  };

  const copyHashToClipboard = async (e) => {
    e.preventDefault();
    if (hashText) {
      await navigator.clipboard.writeText(hashText);
      setHashStatus('copied');
      setTimeout(() => setHashStatus('done'), 1500);
    }
  };

  return (
    <div className="flex flex-col p-3 hover:bg-kb-green-night transition-colors duration-150 group">

      <div className="flex items-center justify-between">
        {isDir ? (
          <div
            className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
            onClick={() => onNavigate(`${realPath}/`)}
          >
            <span className="w-9 h-9 rounded-lg flex items-center justify-center border-[1.5px] border-kb-green group-hover:border-kb-orange transition-colors shrink-0">
              <FileIcon
                isDirectory={true}
                className="w-5 h-5 bg-kb-orange"
              />
            </span>
            <div className="truncate">
              <span className="font-display text-sm text-kb-text group-hover:text-kb-orange-light transition-colors">
                {item.name}
              </span>
              <p className="text-xxs text-kb-text-muted">{formatDate(item.mtime)}</p>
            </div>
          </div>
        ) : (
          <a
            href={downloadUrl}
            download
            className="flex items-center gap-3.5 flex-1 min-w-0 no-underline cursor-pointer"
          >
            <span className="w-9 h-9 rounded-lg flex items-center justify-center border-[1.5px] border-kb-green-dark group-hover:border-kb-orange transition-colors relative shrink-0">
              <span className="group-hover:hidden flex items-center justify-center">
                <FileIcon
                  name={item.name}
                  isDirectory={false}
                  className="w-5 h-5 bg-kb-green"
                />
              </span>
              <span className="hidden group-hover:flex items-center justify-center">
                <DownloadIcon className="w-5 h-5 bg-kb-orange" />
              </span>
            </span>
            <div className="truncate">
              <span className="font-display text-sm text-kb-text group-hover:text-kb-orange-light transition-colors">
                {item.name}
              </span>
              <p className="text-xxs text-kb-text-muted">{formatDate(item.mtime)}</p>
            </div>
          </a>
        )}

        <div className="flex items-center gap-4">
          <span className="text-xs text-kb-text-muted w-16 text-right hidden sm:block">
            {formatBytes(item.size)}
          </span>

          {!isDir ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleHash}
                title="Mostrar SHA-256"
                className="flex items-center justify-center p-2 rounded-lg border-[1.5px] border-kb-green-dark text-kb-text-muted hover:bg-kb-orange hover:border-kb-orange hover:text-kb-bg transition-colors cursor-pointer min-w-9"
              >
                {hashStatus === 'idle' && <HashIcon className="w-4 h-4 bg-current" />}
                {hashStatus === 'loading' && <div className="w-4 h-4 border-2 border-kb-green border-t-transparent rounded-full animate-spin" />}
                {(hashStatus === 'done' || hashStatus === 'copied') && <HashIcon className="w-4 h-4 bg-current" />}
                {hashStatus === 'error' && <span className="text-kb-orange font-bold text-xs">X</span>}
              </button>

              <button
                onClick={(e) => { e.preventDefault(); onCopy(realPath); }}
                title="Copiar enlace"
                className="flex items-center justify-center p-2 rounded-lg border-[1.5px] border-kb-green-dark text-kb-text-muted hover:bg-kb-orange hover:border-kb-orange hover:text-kb-bg transition-colors cursor-pointer min-w-9"
              >
                {isCopied ? <CheckIcon /> : <CopyIcon className="w-4 h-4 bg-current" />}
              </button>
            </div>
          ) : (
            <div className="w-20" />
          )}
        </div>
      </div>

      {hashText && (
        <div className="mt-3 ml-12 p-3 border-[1.5px] border-kb-green-dark rounded-lg flex items-center justify-between gap-4">
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] text-kb-green uppercase tracking-wider mb-1">
              SHA-256 Checksum
            </span>
            <span className="text-xs text-kb-orange-light break-all select-all">
              {hashText}
            </span>
          </div>
          <button
            onClick={copyHashToClipboard}
            className="flex items-center justify-center p-2 rounded-lg border-[1.5px] border-kb-green-dark text-kb-text-muted hover:bg-kb-orange hover:border-kb-orange hover:text-kb-bg transition-colors cursor-pointer min-w-9"
            title="Copiar Hash"
          >
            {hashStatus === 'copied' ? <CheckIcon /> : <CopyIcon className="w-4 h-4 bg-current" />}
          </button>
        </div>
      )}

    </div>
  );
}
