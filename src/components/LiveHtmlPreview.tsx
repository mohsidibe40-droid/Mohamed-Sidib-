import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, RefreshCw, ExternalLink } from 'lucide-react';
import { UIWireframe } from '../types';

interface LiveHtmlPreviewProps {
  wireframe: UIWireframe;
  isDarkMode: boolean;
}

export const LiveHtmlPreview: React.FC<LiveHtmlPreviewProps> = ({
  wireframe,
  isDarkMode,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  const fullHtmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 0;
      padding: 1rem;
      background-color: ${isDarkMode ? '#020617' : '#f8fafc'};
      color: ${isDarkMode ? '#f8fafc' : '#0f172a'};
    }
  </style>
</head>
<body>
  ${wireframe.htmlMockup}
</body>
</html>
  `;

  const getWidthClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-sm mx-auto h-[600px] border-x border-slate-700 shadow-2xl';
      case 'tablet':
        return 'max-w-2xl mx-auto h-[650px] border-x border-slate-700 shadow-xl';
      default:
        return 'w-full h-[700px]';
    }
  };

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Device Toolbar */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-violet-400">{wireframe.title}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Prévisualisation HTML & Tailwind v4 Live</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${deviceMode === 'desktop' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Vue Ordinateur"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-md transition-colors ${deviceMode === 'tablet' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Vue Tablette"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-md transition-colors ${deviceMode === 'mobile' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Vue Mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIframeKey((prev) => prev + 1)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            title="Rafraîchir la maquette"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="p-4 bg-slate-950/40 flex items-center justify-center overflow-auto">
        <div className={`transition-all duration-300 ${getWidthClass()}`}>
          <iframe
            key={iframeKey}
            title={wireframe.title}
            srcDoc={fullHtmlContent}
            className="w-full h-full rounded-xl border border-slate-800/80 bg-slate-950 shadow-inner"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* Component Tokens List */}
      {wireframe.componentsList && wireframe.componentsList.length > 0 && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold flex-shrink-0">Composants détectés :</span>
          {wireframe.componentsList.map((comp, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[11px]">
              {comp}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
