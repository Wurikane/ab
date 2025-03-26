
import React from 'react';
import { CharacterData } from '../../utils/calculations';

interface BasicInfoSectionProps {
  character: CharacterData;
  onChange: (field: string, value: any) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ character, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange('symbolImage', e.target.files[0]);
    }
  };

  return (
    <div className="scroll-container">
      <h2 className="section-title">📜 Informations de base</h2>
      <div className="medieval-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="name">
              Nom du personnage
            </label>
            <input
              type="text"
              id="name"
              value={character.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="input-medieval w-full"
              placeholder="Entrez le nom de votre personnage"
            />
          </div>
          
          <div>
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="age">
              Âge
            </label>
            <input
              type="text"
              id="age"
              value={character.age}
              onChange={(e) => onChange('age', e.target.value)}
              className="input-medieval w-full"
              placeholder="Âge du personnage"
            />
          </div>
          
          <div>
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="origin">
              Origine
            </label>
            <input
              type="text"
              id="origin"
              value={character.origin}
              onChange={(e) => onChange('origin', e.target.value)}
              className="input-medieval w-full"
              placeholder="D'où vient votre personnage?"
            />
          </div>
          
          <div>
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="eyeColor">
              Couleur des yeux
            </label>
            <input
              type="text"
              id="eyeColor"
              value={character.eyeColor}
              onChange={(e) => onChange('eyeColor', e.target.value)}
              className="input-medieval w-full"
              placeholder="Couleur des yeux"
            />
          </div>
          
          <div>
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="hairColor">
              Couleur des cheveux
            </label>
            <input
              type="text"
              id="hairColor"
              value={character.hairColor}
              onChange={(e) => onChange('hairColor', e.target.value)}
              className="input-medieval w-full"
              placeholder="Couleur des cheveux"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="personalSymbol">
              Symbole personnel
            </label>
            <input
              type="text"
              id="personalSymbol"
              value={character.personalSymbol}
              onChange={(e) => onChange('personalSymbol', e.target.value)}
              className="input-medieval w-full"
              placeholder="Décrivez votre symbole personnel"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-medieval-brown mb-2 font-medieval" htmlFor="symbolImage">
              Image du symbole (optionnel)
            </label>
            <input
              type="file"
              id="symbolImage"
              onChange={handleFileChange}
              className="block w-full border border-medieval-brown/50 rounded-md px-3 py-2"
              accept="image/*"
            />
            {character.symbolImage && (
              <div className="mt-2">
                <p className="text-sm text-medieval-brown">Image sélectionnée: {character.symbolImage.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
