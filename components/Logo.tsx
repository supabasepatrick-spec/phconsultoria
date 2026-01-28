import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente de Logo da PH Consultoria.
 * Tenta carregar o SVG oficial. Se falhar, renderiza o nome em texto estilizado.
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  const [hasError, setHasError] = useState(false);
  
  // Caminho absoluto começando com / é o mais seguro para SPAs
  const logoPath = "/assets/logo.svg";

  // Se houver erro no carregamento da imagem, mostramos um fallback elegante em texto
  if (hasError) {
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
      src={logoPath} 
      alt="PH Consultoria" 
      // object-contain garante que a logo mantenha sua proporção original
      className={`block mx-auto object-contain ${className || 'h-12 w-auto'}`}
      loading="eager"
      onError={() => {
        console.warn("Logo não encontrada em: " + logoPath + ". Usando fallback de texto.");
        setHasError(true);
      }}
    />
  );
};
