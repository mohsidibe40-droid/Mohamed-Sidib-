import React, { useState } from 'react';
import { Copy, Check, FileCode, Code, Terminal, Download } from 'lucide-react';
import { CodeArtifact } from '../types';

interface CodeViewerProps {
  artifacts: CodeArtifact[];
  isDarkMode: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  artifacts,
  isDarkMode,
}) => {
  const [selectedFilename, setSelectedFilename] = useState<string>(
    artifacts[0]?.filename || 'App.tsx'
  );
  const [copied, setCopied] = useState(false);

  const activeArtifact = artifacts.find((a) => a.filename === selectedFilename) || artifacts[0];

  const handleCopy = () => {
    if (!activeArtifact) return;
    navigator.clipboard.writeText(activeArtifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!artifacts || artifacts.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
        <Code className="w-8 h-8 text-violet-400 mx-auto mb-2" />
        <p>Aucun fichier de code généré pour le moment.</p>
      </div>
    );
  }

  const lines = (activeArtifact?.content || '').split('\n');

  return (
    <div className={`rounded-2xl border overflow-hidden shadow-2xl ${
      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* File Selector Tabs Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 overflow-x-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {artifacts.map((art) => {
            const isSelected = art.filename === selectedFilename;
            return (
              <button
                key={art.filename}
                onClick={() => setSelectedFilename(art.filename)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-violet-300" />
                <span>{art.filename}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded-md bg-slate-800">
            {activeArtifact?.language || 'typescript'}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>
        </div>
      </div>

      {/* Code description */}
      {activeArtifact?.description && (
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{activeArtifact.description}</span>
        </div>
      )}

      {/* Code Lines Display */}
      <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto bg-slate-950 text-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60">
                <td className="w-10 text-right pr-4 text-slate-600 select-none text-[11px] border-r border-slate-800/60">
                  {idx + 1}
                </td>
                <td className="pl-4 whitespace-pre font-mono text-slate-200">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
