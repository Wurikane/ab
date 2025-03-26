
import React from 'react';
import CharacterSheet from '../components/CharacterSheet';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto parchment-container">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl font-cursive text-medieval-brown mb-2">Créateur d'Abérion</h1>
          <p className="text-medieval-ink/70 italic">Créez votre personnage pour les Fanzines d'Ambre</p>
        </div>
        <CharacterSheet />
      </div>
    </div>
  );
};

export default Index;
