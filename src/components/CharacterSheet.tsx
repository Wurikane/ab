
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CharacterData, allAttributes, availablePowers, calculateTotalPointsSpent } from '../utils/calculations';
import { generateCharacterPDF } from '../utils/pdfGenerator';

// Import des sections du formulaire
import BasicInfoSection from './FormSections/BasicInfoSection';
import GenerationSection from './FormSections/GenerationSection';
import KarmaSection from './FormSections/KarmaSection';
import WeaknessSection from './FormSections/WeaknessSection';
import AlliesEnemiesSection from './FormSections/AlliesEnemiesSection';
import ContributionsSection from './FormSections/ContributionsSection';
import AttributesSection from './FormSections/AttributesSection';
import DerivedStatsSection from './FormSections/DerivedStatsSection';
import PowersSection from './FormSections/PowersSection';
import PersonalItemsSection from './FormSections/PersonalItemsSection';
import PointsSummarySection from './FormSections/PointsSummarySection';

const CharacterSheet: React.FC = () => {
  // État initial du personnage
  const [character, setCharacter] = useState<CharacterData>({
    // Informations générales
    name: '',
    age: '',
    origin: '',
    eyeColor: '',
    hairColor: '',
    personalSymbol: '',
    symbolImage: null,
    
    // Génération et points
    generation: 2, // 2ème génération par défaut
    karma: 0,
    weakness: '',
    hasWeakness: false,
    allies: 0,
    enemies: 0,
    contributions: ['', ''],
    
    // Attributs (tous à 20 par défaut)
    attributes: allAttributes.reduce((acc, attr) => {
      acc[attr] = 20;
      return acc;
    }, {} as Record<string, number>),
    
    // Pouvoirs
    powers: [],
    
    // Objets personnels
    artifacts: [],
    creatures: [],
    shadows: []
  });

  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('basic');

  // Gestionnaire pour les changements de valeurs
  const handleChange = (field: string, value: any) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Fonction pour gérer la génération du PDF
  const handleGeneratePDF = () => {
    const points = calculateTotalPointsSpent(character);
    
    if (points.remainingPoints < 0) {
      toast.error("Vous avez dépassé votre budget de points. Veuillez ajuster vos attributs ou pouvoirs avant de générer le PDF.");
      return;
    }
    
    if (!character.name.trim()) {
      toast.error("Veuillez donner un nom à votre personnage avant de générer le PDF.");
      return;
    }
    
    generateCharacterPDF(character);
    toast.success("Votre fiche de personnage a été générée avec succès !");
  };

  // Liste des onglets
  const tabs = [
    { id: 'basic', label: 'Informations de base', icon: '📜' },
    { id: 'generation', label: 'Génération', icon: '🔥' },
    { id: 'adjustments', label: 'Ajustements', icon: '⚖️' },
    { id: 'attributes', label: 'Attributs', icon: '💠' },
    { id: 'powers', label: 'Pouvoirs', icon: '🧙‍♂️' },
    { id: 'items', label: 'Objets & Ombres', icon: '🔮' },
    { id: 'summary', label: 'Résumé', icon: '📄' }
  ];

  // Rendu des onglets
  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoSection character={character} onChange={handleChange} />;
      case 'generation':
        return <GenerationSection character={character} onChange={handleChange} />;
      case 'adjustments':
        return (
          <>
            <KarmaSection character={character} onChange={handleChange} />
            <WeaknessSection character={character} onChange={handleChange} />
            <AlliesEnemiesSection character={character} onChange={handleChange} />
            <ContributionsSection character={character} onChange={handleChange} />
          </>
        );
      case 'attributes':
        return (
          <>
            <AttributesSection character={character} onChange={handleChange} />
            <DerivedStatsSection character={character} />
          </>
        );
      case 'powers':
        return <PowersSection character={character} onChange={handleChange} />;
      case 'items':
        return <PersonalItemsSection character={character} onChange={handleChange} />;
      case 'summary':
        return (
          <>
            <PointsSummarySection character={character} />
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={handleGeneratePDF}
                className="btn-medieval py-3 px-6 text-lg animate-pulse hover:animate-none"
              >
                📥 Générer la fiche PDF
              </button>
            </div>
          </>
        );
      default:
        return <BasicInfoSection character={character} onChange={handleChange} />;
    }
  };

  // Surveillance des points restants
  useEffect(() => {
    const points = calculateTotalPointsSpent(character);
    if (points.remainingPoints < 0) {
      toast.warning(`Attention: vous avez dépassé votre budget de ${Math.abs(points.remainingPoints)} points.`);
    }
  }, [character]);

  return (
    <div className="parchment-container max-w-4xl mx-auto">
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-4xl font-cursive text-medieval-brown mb-2">Créateur d'Abérion</h1>
        <p className="text-medieval-ink/70 italic">Créez votre personnage pour le jeu de rôle Ambre</p>
      </div>
      
      <div className="mb-6">
        <nav className="overflow-x-auto">
          <div className="flex space-x-1 min-w-max p-1 border-b border-medieval-brown/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-t-lg transition-colors text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-medieval-brown text-parchment-light font-medium'
                    : 'text-medieval-brown hover:bg-parchment-dark/50'
                }`}
              >
                <span className="mr-1">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
      
      <div className="quill-appear">
        {renderTabContent()}
      </div>
      
      <div className="mt-8 text-center text-medieval-ink/70 text-sm">
        <p>© Créateur d'Abérion - Tous droits réservés</p>
      </div>
    </div>
  );
};

export default CharacterSheet;
