
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface ContributionsSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const ContributionsSection: React.FC<ContributionsSectionProps> = ({ character, onChange }) => {
  const handleContributionChange = (index: number, value: string) => {
    const newContributions = [...character.contributions];
    newContributions[index] = value;
    onChange('contributions', newContributions);
  };

  return (
    <div className="scroll-container">
      <h2 className="section-title">🕯️ Contributions</h2>
      <div className="medieval-border">
        <div className="mb-4">
          <p className="mb-4 text-medieval-brown">
            Vous pouvez décrire jusqu'à 2 contributions pour votre univers de jeu.
            Chaque contribution vous rapporte <span className="font-bold text-medieval-gold">15 points</span> de création.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="contribution1">
                Première contribution
              </label>
              <textarea
                id="contribution1"
                value={character.contributions[0] || ''}
                onChange={(e) => handleContributionChange(0, e.target.value)}
                className="input-medieval w-full h-24 resize-none"
                placeholder="Décrivez votre première contribution à l'univers (lieu, personnage, concept...)"
              />
            </div>
            
            <div>
              <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="contribution2">
                Deuxième contribution
              </label>
              <textarea
                id="contribution2"
                value={character.contributions[1] || ''}
                onChange={(e) => handleContributionChange(1, e.target.value)}
                className="input-medieval w-full h-24 resize-none"
                placeholder="Décrivez votre deuxième contribution à l'univers (lieu, personnage, concept...)"
              />
            </div>
          </div>
        </div>
        
        <div className="text-sm p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
          <p className="italic">
            Une contribution est un élément narratif que vous ajoutez à l'univers du jeu: un lieu,
            un personnage non-joueur, un concept, une organisation... En créant ces éléments, vous 
            enrichissez l'univers de jeu et gagnez des points pour votre personnage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionsSection;
