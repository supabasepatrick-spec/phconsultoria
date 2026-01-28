import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente de Logo da PH Consultoria.
 * 1. Tenta carregar /assets/logo.svg
 * 2. Se falhar, tenta /assets/logo.png
 * 3. Se ambos falharem, renderiza texto estilizado.
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  const [sourceType, setSourceType] = useState<'svg' | 'png' | 'text'>('svg');
  
  const svgPath = "/assets/logo.svg";
  const pngPath = "/assets/logo.png";

  const handleError = () => {
    if (sourceType === 'svg') {
      console.log("SVG não encontrado, tentando PNG...");
      setSourceType('png');
    } else if (sourceType === 'png') {
      console.warn("Nenhuma imagem de logo encontrada em /assets/. Usando fallback de texto.");
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

  return (
    <img 
      src={sourceType === 'svg' ? svgPath : pngPath} 
      alt="PH Consultoria" 
      className={`block mx-auto object-contain ${className || 'h-12 w-auto'}`}
      loading="eager"
      onError={handleError}
    />
  );
};
