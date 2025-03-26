
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface WeaknessSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const WeaknessSection: React.FC<WeaknessSectionProps> = ({ character, onChange }) => {
  return (
    <div className="scroll-container">
      <h2 className="section-title">⚖️ Faiblesse (optionnelle)</h2>
      <div className="medieval-border">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="hasWeakness"
              checked={character.hasWeakness}
              onChange={(e) => onChange('hasWeakness', e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-medieval-brown text-medieval-gold focus:ring-medieval-gold"
            />
            <label htmlFor="hasWeakness" className="font-medieval text-medieval-brown">
              J'accepte une faiblesse (+15 points)
            </label>
          </div>
          
          {character.hasWeakness && (
            <div>
              <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="weakness">
                Description de la faiblesse
              </label>
              <textarea
                id="weakness"
                value={character.weakness}
                onChange={(e) => onChange('weakness', e.target.value)}
                className="input-medieval w-full h-24 resize-none"
                placeholder="Décrivez votre faiblesse (ex: phobie, dépendance, malédiction...)"
              />
            </div>
          )}
        </div>
        
        <div className="text-sm p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
          <p className="italic">
            Une faiblesse est un handicap ou un désavantage significatif qui peut affecter votre personnage
            dans certaines situations. En acceptant cette contrainte, vous gagnez 15 points supplémentaires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeaknessSection;
