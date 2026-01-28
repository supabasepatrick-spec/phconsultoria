
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente de Logo da PH Consultoria.
 * Tenta carregar o arquivo SVG físico em /assets/logo.svg.
 * Se não encontrar, utiliza o fallback embutido.
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  const [hasError, setHasError] = useState(false);
  
  // Caminho atualizado para buscar o arquivo .svg
  const logoPath = "/assets/logo.svg";

  // Fallback caso o arquivo logo.svg não exista na pasta assets
  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg 
          version="1.0" 
          xmlns="http://www.w3.org/2000/svg"
          width="100%" 
          height="100%" 
          viewBox="0 0 741 336" 
          preserveAspectRatio="xMidYMid meet"
          className="max-h-full w-auto"
        >
          <g transform="translate(0.000000,336.000000) scale(0.100000,-0.100000)" fill="#33c2a6" stroke="none">
            <rect x="0" y="0" width="7410" height="3360" fill="transparent" />
            <text 
              transform="scale(1, -1) translate(0, -2200)" 
              fill="#1f2937" 
              fontSize="1200" 
              fontWeight="900" 
              fontFamily="Inter, sans-serif"
            >
              PH
            </text>
            <text 
              transform="scale(1, -1) translate(1800, -2200)" 
              fill="#33c2a6" 
              fontSize="1200" 
              fontWeight="900" 
              fontFamily="Inter, sans-serif"
            >
              Consultoria
            </text>
            <text 
              transform="scale(1, -1) translate(0, -2800)" 
              fill="#9ca3af" 
              fontSize="400" 
              fontWeight="600" 
              letterSpacing="20"
              fontFamily="Inter, sans-serif"
            >
              SOLUÇÕES EM TECNOLOGIA
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src={logoPath} 
        alt="PH Consultoria" 
        className="max-h-full w-auto object-contain transition-opacity duration-300"
        onLoad={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = '1';
        }}
        onError={() => {
          console.warn("Logo física não encontrada em /assets/logo.svg. Utilizando fallback.");
          setHasError(true);
        }}
        style={{ opacity: 0 }}
      />
    </div>
  );
};
