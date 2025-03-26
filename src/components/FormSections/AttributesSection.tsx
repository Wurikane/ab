
import React from 'react';
import { CharacterData, allAttributes, attributeGroups } from '../../utils/calculations';

interface AttributesSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const AttributesSection: React.FC<AttributesSectionProps> = ({ character, onChange }) => {
  const handleAttributeChange = (attr: string, value: number) => {
    const newAttributes = {
      ...character.attributes,
      [attr]: value
    };
    onChange('attributes', newAttributes);
  };

  return (
    <div className="scroll-container">
      <h2 className="section-title">💠 Répartition des 13 Attributs</h2>
      <div className="medieval-border">
        <p className="mb-4 text-medieval-brown">
          Chaque attribut commence à 20 points gratuitement. Chaque point ajouté coûte 1 point de création.
        </p>
        
        <div className="space-y-6">
          {Object.entries(attributeGroups).map(([group, attrs]) => (
            <div key={group} className="attribute-group">
              <h3 className="font-medieval text-lg text-medieval-brown mb-2">{group}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {attrs.map(attr => (
                  <div key={attr} className="attribute-box">
                    <label className="block text-medieval-brown mb-1 font-medieval text-sm" htmlFor={attr}>
                      {attr}
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleAttributeChange(attr, Math.max(20, (character.attributes[attr] || 20) - 1))}
                        className="w-6 h-6 flex items-center justify-center bg-medieval-brown text-parchment-light rounded"
                        disabled={(character.attributes[attr] || 20) <= 20}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={attr}
                        value={character.attributes[attr] || 20}
                        onChange={(e) => handleAttributeChange(attr, Math.max(20, parseInt(e.target.value) || 20))}
                        min="20"
                        className="input-medieval mx-2 w-14 text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleAttributeChange(attr, (character.attributes[attr] || 20) + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-medieval-brown text-parchment-light rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-parchment-light/70 rounded border border-medieval-brown/30 text-sm">
          <p className="italic">
            Les attributs sont les capacités de base de votre personnage, regroupées en cinq catégories.
            La moyenne des trois attributs de chaque catégorie détermine votre score dans cette caractéristique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttributesSection;
