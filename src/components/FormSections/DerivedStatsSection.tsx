
import React from 'react';
import { CharacterData, attributeGroups, calculateDerivedStats } from '../../utils/calculations';

interface DerivedStatsSectionProps {
  character: CharacterData;
}

const DerivedStatsSection: React.FC<DerivedStatsSectionProps> = ({ character }) => {
  const derivedStats = calculateDerivedStats(character);

  return (
    <div className="scroll-container">
      <h2 className="section-title">🧠 Caractéristiques dérivées</h2>
      <div className="medieval-border">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {Object.entries(derivedStats).map(([stat, value]) => (
            <div key={stat} className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70 text-center">
              <div className="font-medieval text-lg text-medieval-brown mb-2">{stat}</div>
              <div className="text-2xl font-bold text-medieval-red">{value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-3">
          {Object.entries(attributeGroups).map(([group, attrs]) => (
            <div key={group} className="p-3 bg-parchment-light/70 rounded border border-medieval-brown/30 text-sm">
              <p className="font-medieval text-medieval-brown">
                {group} = moyenne ({attrs.join(' + ')})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DerivedStatsSection;
