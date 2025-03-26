
import React from 'react';
import { CharacterData, availablePowers } from '../../utils/calculations';

interface PowersSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const PowersSection: React.FC<PowersSectionProps> = ({ character, onChange }) => {
  const handleAddPower = () => {
    const newPowers = [...character.powers];
    // Trouve un pouvoir qui n'est pas encore sélectionné
    const unusedPowers = availablePowers.filter(
      power => !newPowers.some(p => p.name === power)
    );
    
    if (unusedPowers.length > 0) {
      newPowers.push({
        name: unusedPowers[0],
        level: 1
      });
      onChange('powers', newPowers);
    }
  };

  const handleRemovePower = (index: number) => {
    const newPowers = [...character.powers];
    newPowers.splice(index, 1);
    onChange('powers', newPowers);
  };

  const handlePowerChange = (index: number, field: 'name' | 'level', value: any) => {
    const newPowers = [...character.powers];
    newPowers[index] = {
      ...newPowers[index],
      [field]: field === 'level' ? Math.min(16, Math.max(1, value)) : value
    };
    onChange('powers', newPowers);
  };

  const calculatePowerCost = (level: number) => {
    let cost = 0;
    // Niveaux 1 à 8 à 15 points chacun
    const lowLevels = Math.min(level, 8);
    cost += lowLevels * 15;
    
    // Niveaux 9 à 16 à 20 points chacun
    const highLevels = Math.max(0, level - 8);
    cost += highLevels * 20;
    
    return cost;
  };

  return (
    <div className="scroll-container">
      <h2 className="section-title">🧙‍♂️ Pouvoirs</h2>
      <div className="medieval-border">
        <div className="mb-4">
          <p className="mb-4 text-medieval-brown">
            Sélectionnez les pouvoirs de votre personnage. Chaque pouvoir a un coût qui dépend de son niveau.
          </p>
          
          {character.powers.length === 0 ? (
            <div className="text-center p-4 border border-dashed border-medieval-brown/40 rounded">
              <p className="text-medieval-brown italic mb-2">Aucun pouvoir sélectionné</p>
              <button
                type="button"
                onClick={handleAddPower}
                className="btn-medieval"
              >
                Ajouter un pouvoir
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {character.powers.map((power, index) => (
                <div key={index} className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-grow">
                      <label className="block text-medieval-brown mb-2 font-medieval" htmlFor={`power-${index}`}>
                        Pouvoir
                      </label>
                      <select
                        id={`power-${index}`}
                        value={power.name}
                        onChange={(e) => handlePowerChange(index, 'name', e.target.value)}
                        className="input-medieval w-full"
                      >
                        {availablePowers.map(p => (
                          <option 
                            key={p} 
                            value={p}
                            disabled={character.powers.some((selected, i) => selected.name === p && i !== index)}
                          >
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="w-32">
                      <label className="block text-medieval-brown mb-2 font-medieval" htmlFor={`level-${index}`}>
                        Niveau (1-16)
                      </label>
                      <input
                        type="number"
                        id={`level-${index}`}
                        value={power.level}
                        onChange={(e) => handlePowerChange(index, 'level', parseInt(e.target.value) || 1)}
                        min="1"
                        max="16"
                        className="input-medieval w-full"
                      />
                    </div>
                    
                    <div className="w-20 text-center">
                      <label className="block text-medieval-brown mb-2 font-medieval">
                        Coût
                      </label>
                      <div className="font-bold text-medieval-red">
                        {calculatePowerCost(power.level)}
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemovePower(index)}
                        className="px-3 py-2 bg-medieval-red text-parchment-light rounded hover:bg-medieval-red/80 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {character.powers.length < availablePowers.length && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleAddPower}
                    className="btn-medieval"
                  >
                    Ajouter un pouvoir
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
            <p className="font-medieval text-medieval-brown">Niveaux 1 à 8:</p>
            <p><span className="font-bold">15 points</span> par niveau</p>
          </div>
          
          <div className="p-3 bg-parchment-light/70 rounded border border-medieval-brown/30">
            <p className="font-medieval text-medieval-brown">Niveaux 9 à 16:</p>
            <p><span className="font-bold">20 points</span> par niveau</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowersSection;
