
// Types pour notre application
export interface CharacterData {
  // Informations générales
  name: string;
  age: string;
  origin: string;
  eyeColor: string;
  hairColor: string;
  personalSymbol: string;
  symbolImage?: File | null;
  
  // Génération et points
  generation: 1 | 2 | 3;
  karma: number;
  weakness: string;
  hasWeakness: boolean;
  allies: number;
  enemies: number;
  contributions: string[];
  
  // Attributs
  attributes: {
    [key: string]: number;
  };
  
  // Pouvoirs
  powers: {
    name: string;
    level: number;
  }[];
  
  // Objets personnels
  artifacts: {
    name: string;
    type: string;
    ability: string;
  }[];
  
  creatures: {
    name: string;
    type: string;
    bond: string;
  }[];
  
  shadows: {
    name: string;
    description: string;
    status: string;
  }[];
}

// Groupes d'attributs pour les caractéristiques dérivées
export const attributeGroups = {
  PHYSIQUE: ['Dextérité', 'Force', 'Réflexe'],
  ENDURANCE: ['Adaptation', 'Régénération', 'Résistance'],
  PSYCHE: ['Intelligence', 'Concentration', 'Volonté'],
  PERCEPTION: ['Sens', 'Sixième Sens', 'Empathie'],
  CHARISME: ['Éloquence', 'Intimidation', 'Apparence']
};

// Liste complète des attributs
export const allAttributes = [
  ...attributeGroups.PHYSIQUE,
  ...attributeGroups.ENDURANCE,
  ...attributeGroups.PSYCHE,
  ...attributeGroups.PERCEPTION,
  ...attributeGroups.CHARISME
];

// Liste des pouvoirs disponibles
export const availablePowers = [
  'Logrus',
  'Marelle',
  'Atouts',
  'Métamorphose',
  'Sorcellerie',
  'Conjuration',
  'Artefact',
  'Créature',
  'Ombre'
];

// Points initiaux par génération
export const pointsByGeneration = {
  1: 800,
  2: 600,
  3: 400
};

// Calcule la moyenne d'un groupe d'attributs
export const calculateAverage = (character: CharacterData, attributeGroup: string[]) => {
  const sum = attributeGroup.reduce((acc, attr) => acc + (character.attributes[attr] || 20), 0);
  return Math.round(sum / attributeGroup.length);
};

// Calcule les caractéristiques dérivées
export const calculateDerivedStats = (character: CharacterData) => {
  return {
    PHYSIQUE: calculateAverage(character, attributeGroups.PHYSIQUE),
    ENDURANCE: calculateAverage(character, attributeGroups.ENDURANCE),
    PSYCHE: calculateAverage(character, attributeGroups.PSYCHE),
    PERCEPTION: calculateAverage(character, attributeGroups.PERCEPTION),
    CHARISME: calculateAverage(character, attributeGroups.CHARISME)
  };
};

// Calcule le coût total des attributs
export const calculateAttributeCost = (character: CharacterData) => {
  let cost = 0;
  
  allAttributes.forEach(attr => {
    // Chaque attribut commence à 20 gratuitement
    const value = character.attributes[attr] || 20;
    cost += Math.max(0, value - 20);
  });
  
  return cost;
};

// Calcule le coût total des pouvoirs
export const calculatePowersCost = (character: CharacterData) => {
  return character.powers.reduce((total, power) => {
    let powerCost = 0;
    
    // Les niveaux 1 à 8 coûtent 15 points chacun
    const lowLevels = Math.min(power.level, 8);
    powerCost += lowLevels * 15;
    
    // Les niveaux 9 à 16 coûtent 20 points chacun
    const highLevels = Math.max(0, power.level - 8);
    powerCost += highLevels * 20;
    
    return total + powerCost;
  }, 0);
};

// Calcule le total des points dépensés
export const calculateTotalPointsSpent = (character: CharacterData) => {
  // Points de base selon la génération
  const basePoints = pointsByGeneration[character.generation] || 0;
  
  // Coût des attributs
  const attributeCost = calculateAttributeCost(character);
  
  // Coût des pouvoirs
  const powersCost = calculatePowersCost(character);
  
  // Ajustements de karma
  const karmaAdjustment = character.karma * -2; // négatif = +points, positif = -points
  
  // Bonus de faiblesse (si sélectionnée)
  const weaknessBonus = character.hasWeakness ? 15 : 0;
  
  // Ajustements alliés/ennemis
  const alliesEnemiesAdjustment = character.enemies - character.allies;
  
  // Bonus de contributions
  const contributionsBonus = character.contributions.filter(c => c.trim() !== '').length * 15;
  
  // Total dépensé = base - (attributs + pouvoirs - karma - faiblesse - ennemis + alliés - contributions)
  const totalSpent = attributeCost + powersCost - karmaAdjustment - weaknessBonus - 
                    alliesEnemiesAdjustment - contributionsBonus;
  
  return {
    basePoints,
    attributeCost,
    powersCost,
    karmaAdjustment,
    weaknessBonus,
    alliesEnemiesAdjustment,
    contributionsBonus,
    totalSpent,
    remainingPoints: basePoints - totalSpent
  };
};
