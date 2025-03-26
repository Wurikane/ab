
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface GenerationSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const GenerationSection: React.FC<GenerationSectionProps> = ({ character, onChange }) => {
  return (
    <div className="scroll-container">
      <h2 className="section-title">🔥 Choix de génération</h2>
      <div className="medieval-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
              character.generation === 1 ? 'bg-medieval-gold/20 border-medieval-gold' : 'bg-parchment-light border-medieval-brown/30'
            }`}
            onClick={() => onChange('generation', 1)}
          >
            <div className="text-center mb-2">
              <span className="text-xl font-medieval text-medieval-brown">1ère génération</span>
            </div>
            <div className="text-center font-bold text-medieval-red">
              800 points
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
              character.generation === 2 ? 'bg-medieval-gold/20 border-medieval-gold' : 'bg-parchment-light border-medieval-brown/30'
            }`}
            onClick={() => onChange('generation', 2)}
          >
            <div className="text-center mb-2">
              <span className="text-xl font-medieval text-medieval-brown">2ème génération</span>
            </div>
            <div className="text-center font-bold text-medieval-red">
              600 points
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
              character.generation === 3 ? 'bg-medieval-gold/20 border-medieval-gold' : 'bg-parchment-light border-medieval-brown/30'
            }`}
            onClick={() => onChange('generation', 3)}
          >
            <div className="text-center mb-2">
              <span className="text-xl font-medieval text-medieval-brown">3ème génération</span>
            </div>
            <div className="text-center font-bold text-medieval-red">
              400 points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationSection;
