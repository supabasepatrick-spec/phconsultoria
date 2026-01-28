
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  // Logo da PH Consultoria (representada pela imagem enviada pelo usuário)
  const logoSrc = "https://static.wixstatic.com/media/87961b_404b988f5f404e4c9c4c7406a3832194~mv2.png/v1/fill/w_500,h_228,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PH%20CONSULTORIA%20HORIZONTAL.png";

  return (
    <img 
      src={logoSrc} 
      alt="PH Consultoria" 
      className={`object-contain ${className}`}
      onError={(e) => {
          // Fallback visual caso a URL externa falhe
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x80/33c2a6/ffffff?text=PH+CONSULTORIA";
      }}
    />
  );
};
