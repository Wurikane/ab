
import React from 'react';
import { CharacterData, calculateTotalPointsSpent } from '../../utils/calculations';

interface PointsSummarySectionProps {
  character: CharacterData;
}

const PointsSummarySection: React.FC<PointsSummarySectionProps> = ({ character }) => {
  const points = calculateTotalPointsSpent(character);
  const isOverBudget = points.remainingPoints < 0;

  return (
    <div className="scroll-container">
      <h2 className="section-title">📄 Résumé des points</h2>
      <div className={`medieval-border ${isOverBudget ? 'border-medieval-red' : ''}`}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
              <h3 className="font-medieval text-lg text-medieval-brown mb-2">Points de base</h3>
              <p className="text-2xl font-bold text-medieval-gold">{points.basePoints}</p>
              <p className="text-sm text-medieval-brown/70 mt-1">
                {character.generation}ème génération
              </p>
            </div>
            
            <div className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
              <h3 className="font-medieval text-lg text-medieval-brown mb-2">Points dépensés</h3>
              <p className="text-2xl font-bold text-medieval-red">{points.totalSpent}</p>
            </div>
          </div>
          
          <div className={`p-4 border rounded ${
            isOverBudget 
              ? 'bg-medieval-red/10 border-medieval-red' 
              : 'bg-medieval-gold/10 border-medieval-gold'
          }`}>
            <h3 className="font-medieval text-lg text-medieval-brown mb-2">Points restants</h3>
            <p className={`text-2xl font-bold ${isOverBudget ? 'text-medieval-red' : 'text-medieval-gold'}`}>
              {points.remainingPoints}
            </p>
            {isOverBudget && (
              <p className="text-medieval-red mt-2">
                Attention ! Vous avez dépassé votre budget de points. Réduisez certains attributs ou pouvoirs.
              </p>
            )}
          </div>
          
          <div className="space-y-2 mt-4">
            <h3 className="font-medieval text-lg text-medieval-brown">Détail des coûts</h3>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Attributs:</span>
              <span className="font-bold">{points.attributeCost}</span>
            </div>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Pouvoirs:</span>
              <span className="font-bold">{points.powersCost}</span>
            </div>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Ajustement karma ({character.karma}):</span>
              <span className="font-bold">{points.karmaAdjustment}</span>
            </div>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Bonus de faiblesse:</span>
              <span className="font-bold">{points.weaknessBonus}</span>
            </div>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Ajustement alliés/ennemis:</span>
              <span className="font-bold">{points.alliesEnemiesAdjustment}</span>
            </div>
            
            <div className="p-3 border-b border-medieval-brown/20 flex justify-between">
              <span>Bonus de contributions:</span>
              <span className="font-bold">{points.contributionsBonus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSummarySection;
