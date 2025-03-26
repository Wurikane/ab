
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface KarmaSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const KarmaSection: React.FC<KarmaSectionProps> = ({ character, onChange }) => {
  return (
    <div className="scroll-container">
      <h2 className="section-title">☯️ Karma</h2>
      <div className="medieval-border">
        <div className="mb-4">
          <div className="text-center mb-4">
            <span className="text-2xl font-medieval text-medieval-brown">{character.karma}</span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-medieval-red">-15</span>
            <span className="text-medieval-brown">0</span>
            <span className="text-medieval-gold">+15</span>
          </div>
          
          <input
            type="range"
            min="-15"
            max="15"
            value={character.karma}
            onChange={(e) => onChange('karma', parseInt(e.target.value))}
            className="w-full h-2 bg-parchment-dark rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
            <p className="font-medieval text-medieval-red">Karma négatif:</p>
            <p>Gagnez <span className="font-bold">2 points</span> de création par point négatif</p>
          </div>
          
          <div className="p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
            <p className="font-medieval text-medieval-gold">Karma positif:</p>
            <p>Perdez <span className="font-bold">2 points</span> de création par point positif</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarmaSection;
