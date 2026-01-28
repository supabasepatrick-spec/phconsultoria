
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  // Buscando a logo da pasta local conforme solicitado
  // Certifique-se de salvar sua imagem como 'logo.png' dentro de uma pasta 'assets'
  const localLogoPath = "assets/logo.png";

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={localLogoPath} 
        alt="PH Consultoria" 
        className="h-full w-auto object-contain"
        onError={(e) => {
            // Se o arquivo ainda não existir na pasta, mostra um ícone estilizado com as cores da marca
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-[#33c2a6] rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold">PH</span>
                    </div>
                </div>
            `;
        }}
      />
    </div>
  );
};
