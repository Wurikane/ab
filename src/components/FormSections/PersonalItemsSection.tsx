
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface PersonalItemsSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const PersonalItemsSection: React.FC<PersonalItemsSectionProps> = ({ character, onChange }) => {
  // Handlers pour les artefacts
  const handleAddArtifact = () => {
    const newArtifacts = [...character.artifacts];
    newArtifacts.push({
      name: '',
      type: '',
      ability: ''
    });
    onChange('artifacts', newArtifacts);
  };

  const handleRemoveArtifact = (index: number) => {
    const newArtifacts = [...character.artifacts];
    newArtifacts.splice(index, 1);
    onChange('artifacts', newArtifacts);
  };

  const handleArtifactChange = (index: number, field: string, value: string) => {
    const newArtifacts = [...character.artifacts];
    newArtifacts[index] = {
      ...newArtifacts[index],
      [field]: value
    };
    onChange('artifacts', newArtifacts);
  };

  // Handlers pour les créatures
  const handleAddCreature = () => {
    const newCreatures = [...character.creatures];
    newCreatures.push({
      name: '',
      type: '',
      bond: ''
    });
    onChange('creatures', newCreatures);
  };

  const handleRemoveCreature = (index: number) => {
    const newCreatures = [...character.creatures];
    newCreatures.splice(index, 1);
    onChange('creatures', newCreatures);
  };

  const handleCreatureChange = (index: number, field: string, value: string) => {
    const newCreatures = [...character.creatures];
    newCreatures[index] = {
      ...newCreatures[index],
      [field]: value
    };
    onChange('creatures', newCreatures);
  };

  // Handlers pour les ombres
  const handleAddShadow = () => {
    const newShadows = [...character.shadows];
    newShadows.push({
      name: '',
      description: '',
      status: ''
    });
    onChange('shadows', newShadows);
  };

  const handleRemoveShadow = (index: number) => {
    const newShadows = [...character.shadows];
    newShadows.splice(index, 1);
    onChange('shadows', newShadows);
  };

  const handleShadowChange = (index: number, field: string, value: string) => {
    const newShadows = [...character.shadows];
    newShadows[index] = {
      ...newShadows[index],
      [field]: value
    };
    onChange('shadows', newShadows);
  };

  return (
    <div className="scroll-container">
      <h2 className="section-title">🔮 Objets et entités personnelles</h2>
      <div className="medieval-border">
        <div className="space-y-8">
          {/* Section des artefacts */}
          <div>
            <h3 className="font-medieval text-lg text-medieval-brown mb-4">1. Artefacts personnels liés</h3>
            
            {character.artifacts.length === 0 ? (
              <div className="text-center p-4 border border-dashed border-medieval-brown/40 rounded mb-4">
                <p className="text-medieval-brown italic mb-2">Aucun artefact</p>
                <button
                  type="button"
                  onClick={handleAddArtifact}
                  className="btn-medieval"
                >
                  Ajouter un artefact
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-4">
                {character.artifacts.map((artifact, index) => (
                  <div key={index} className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medieval text-medieval-brown">Artefact {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveArtifact(index)}
                        className="px-2 py-1 bg-medieval-red text-parchment-light rounded text-sm hover:bg-medieval-red/80 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Nom de l'artefact
                        </label>
                        <input
                          type="text"
                          value={artifact.name}
                          onChange={(e) => handleArtifactChange(index, 'name', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Nom de l'artefact"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Type (arme, objet, bijou...)
                        </label>
                        <input
                          type="text"
                          value={artifact.type}
                          onChange={(e) => handleArtifactChange(index, 'type', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Type d'artefact"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                        Capacité spéciale ou effet
                      </label>
                      <textarea
                        value={artifact.ability}
                        onChange={(e) => handleArtifactChange(index, 'ability', e.target.value)}
                        className="input-medieval w-full h-16 resize-none"
                        placeholder="Décrivez les capacités de cet artefact"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddArtifact}
                    className="btn-medieval"
                  >
                    Ajouter un artefact
                  </button>
                </div>
              </div>
            )}
            
            {/* Section des créatures */}
            <h3 className="font-medieval text-lg text-medieval-brown mb-4">2. Créature personnelle liée</h3>
            
            {character.creatures.length === 0 ? (
              <div className="text-center p-4 border border-dashed border-medieval-brown/40 rounded mb-4">
                <p className="text-medieval-brown italic mb-2">Aucune créature</p>
                <button
                  type="button"
                  onClick={handleAddCreature}
                  className="btn-medieval"
                >
                  Ajouter une créature
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-4">
                {character.creatures.map((creature, index) => (
                  <div key={index} className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medieval text-medieval-brown">Créature {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveCreature(index)}
                        className="px-2 py-1 bg-medieval-red text-parchment-light rounded text-sm hover:bg-medieval-red/80 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Nom de la créature
                        </label>
                        <input
                          type="text"
                          value={creature.name}
                          onChange={(e) => handleCreatureChange(index, 'name', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Nom de la créature"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Type (dragon, félin, golem...)
                        </label>
                        <input
                          type="text"
                          value={creature.type}
                          onChange={(e) => handleCreatureChange(index, 'type', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Type de créature"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                        Lien affectif ou de contrôle
                      </label>
                      <textarea
                        value={creature.bond}
                        onChange={(e) => handleCreatureChange(index, 'bond', e.target.value)}
                        className="input-medieval w-full h-16 resize-none"
                        placeholder="Décrivez le lien qui vous unit à cette créature"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddCreature}
                    className="btn-medieval"
                  >
                    Ajouter une créature
                  </button>
                </div>
              </div>
            )}
            
            {/* Section des ombres */}
            <h3 className="font-medieval text-lg text-medieval-brown mb-4">3. Ombre personnelle liée</h3>
            
            {character.shadows.length === 0 ? (
              <div className="text-center p-4 border border-dashed border-medieval-brown/40 rounded mb-4">
                <p className="text-medieval-brown italic mb-2">Aucune ombre</p>
                <button
                  type="button"
                  onClick={handleAddShadow}
                  className="btn-medieval"
                >
                  Ajouter une ombre
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {character.shadows.map((shadow, index) => (
                  <div key={index} className="p-4 border border-medieval-brown/40 rounded bg-parchment-light/70">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medieval text-medieval-brown">Ombre {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveShadow(index)}
                        className="px-2 py-1 bg-medieval-red text-parchment-light rounded text-sm hover:bg-medieval-red/80 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Nom de l'Ombre
                        </label>
                        <input
                          type="text"
                          value={shadow.name}
                          onChange={(e) => handleShadowChange(index, 'name', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Nom de l'Ombre"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                          Statut (protégée, cachée, instable...)
                        </label>
                        <input
                          type="text"
                          value={shadow.status}
                          onChange={(e) => handleShadowChange(index, 'status', e.target.value)}
                          className="input-medieval w-full"
                          placeholder="Statut de l'Ombre"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-medieval-brown mb-1 font-medieval text-sm">
                        Description de son univers
                      </label>
                      <textarea
                        value={shadow.description}
                        onChange={(e) => handleShadowChange(index, 'description', e.target.value)}
                        className="input-medieval w-full h-16 resize-none"
                        placeholder="Décrivez cette Ombre et ses particularités"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddShadow}
                    className="btn-medieval"
                  >
                    Ajouter une ombre
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalItemsSection;
