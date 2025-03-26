
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface AlliesEnemiesSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const AlliesEnemiesSection: React.FC<AlliesEnemiesSectionProps> = ({ character, onChange }) => {
  return (
    <div className="scroll-container">
      <h2 className="section-title">🤝 Alliés & Ennemis</h2>
      <div className="medieval-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-center mb-4">
              <span className="text-xl font-medieval text-medieval-gold">Alliés: {character.allies}</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="15"
              value={character.allies}
              onChange={(e) => onChange('allies', parseInt(e.target.value))}
              className="w-full h-2 bg-parchment-dark rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-sm mt-1">
              <span>0</span>
              <span>15</span>
            </div>
            
            <div className="mt-4 p-3 bg-parchment-light/70 rounded border border-medieval-brown/30 text-sm">
              <p>Chaque allié <span className="font-bold text-medieval-red">coûte 1 point</span> de création</p>
            </div>
          </div>
          
          <div>
            <div className="text-center mb-4">
              <span className="text-xl font-medieval text-medieval-red">Ennemis: {character.enemies}</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="15"
              value={character.enemies}
              onChange={(e) => onChange('enemies', parseInt(e.target.value))}
              className="w-full h-2 bg-parchment-dark rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between text-sm mt-1">
              <span>0</span>
              <span>15</span>
            </div>
            
            <div className="mt-4 p-3 bg-parchment-light/70 rounded border border-medieval-brown/30 text-sm">
              <p>Chaque ennemi <span className="font-bold text-medieval-gold">rapporte 1 point</span> de création</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlliesEnemiesSection;
