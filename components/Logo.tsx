
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  // Caminho configurado para buscar da pasta assets
  const logoPath = "assets/logo.png";

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src={logoPath} 
        alt="Portal PH Consultoria" 
        className="max-h-full w-auto object-contain transition-opacity duration-300"
        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
        onError={(e) => {
          // Fallback caso o usuário ainda não tenha colocado a logo.png na pasta assets
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-gradient-to-br from-[#33c2a6] to-[#29a08a] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                  <span class="text-white font-black text-xl tracking-tighter">PH</span>
                </div>
              </div>
            `;
          }
        }}
        style={{ opacity: 0 }}
      />
    </div>
  );
};
