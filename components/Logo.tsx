import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente de Logo da PH Consultoria.
 * Renderiza o arquivo SVG oficial localizado em /assets/logo.svg.
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  // Caminho absoluto para a sua logo dentro da pasta assets na raiz do portal.
  const logoPath = "/assets/logo.svg";

  return (
    <img 
      src={logoPath} 
      alt="PH Consultoria" 
      // Usamos object-contain para garantir que sua logo nunca seja distorcida.
      // O mx-auto garante que ela fique centralizada nos containers de login e sidebar.
      className={`object-contain block mx-auto ${className || 'h-12 w-auto'}`}
      // Prioridade máxima de carregamento para a identidade visual.
      loading="eager"
      decoding="async"
    />
  );
};
