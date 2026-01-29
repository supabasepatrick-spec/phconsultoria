import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente de Logo da PH Consultoria.
 * Hierarquia de carregamento:
 * 1. URL Remota (Google Drive Direct Link)
 * 2. /assets/logo.svg (Local)
 * 3. /assets/logo.png (Local)
 * 4. Fallback de Texto Estilizado
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  const [sourceType, setSourceType] = useState<'remote' | 'svg' | 'png' | 'text'>('remote');
  
  // Convertendo link de visualização do Drive para link direto de imagem
  // ID do arquivo: 1KQTRzRWxSOjAjoL7janWnl_gkaFSBomI
  const remotePath = "https://drive.google.com/uc?export=view&id=1KQTRzRWxSOjAjoL7janWnl_gkaFSBomI";
  
  const svgPath = "/assets/logo.svg";
  const pngPath = "/assets/logo.png";

  const handleError = () => {
    if (sourceType === 'remote') {
      console.log("Logo remota falhou, tentando SVG local...");
      setSourceType('svg');
    } else if (sourceType === 'svg') {
      console.log("SVG local não encontrado, tentando PNG local...");
      setSourceType('png');
    } else if (sourceType === 'png') {
      console.warn("Nenhuma imagem de logo encontrada. Usando fallback de texto.");
      setSourceType('text');
    }
  };

  if (sourceType === 'text') {
    return (
      <div className={`flex items-center justify-center ${className || 'h-12'}`}>
        <span className="text-primary-600 font-bold tracking-tight text-xl whitespace-nowrap">
          PH <span className="text-gray-800">Consultoria</span>
        </span>
      </div>
    );
  }

  const getSrc = () => {
    switch (sourceType) {
      case 'remote': return remotePath;
      case 'svg': return svgPath;
      case 'png': return pngPath;
      default: return '';
    }
  };

  return (
    <img 
      src={getSrc()} 
      alt="PH Consultoria" 
      className={`block mx-auto object-contain transition-opacity duration-300 ${className || 'h-12 w-auto'}`}
      loading="eager"
      onError={handleError}
    />
  );
};
