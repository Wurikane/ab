
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CharacterData, attributeGroups, calculateDerivedStats, calculateTotalPointsSpent } from './calculations';

// Fonction pour générer le PDF de la fiche de personnage
export const generateCharacterPDF = (character: CharacterData) => {
  // Création d'un nouveau document PDF
  const doc = new jsPDF();
  
  // En-tête avec logo et titre
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text("Fiche de Personnage d'Abérion", 105, 20, { align: 'center' });
  
  // Sous-titre avec le nom du personnage
  doc.setFontSize(18);
  doc.text(character.name || "Personnage sans nom", 105, 30, { align: 'center' });
  
  // Informations de base
  doc.setFontSize(12);
  doc.setFont('times', 'normal');
  doc.text("Informations de base", 20, 45);
  
  const basicInfo = [
    [`Âge: ${character.age || 'Non spécifié'}`, `Origine: ${character.origin || 'Non spécifiée'}`],
    [`Yeux: ${character.eyeColor || 'Non spécifiés'}`, `Cheveux: ${character.hairColor || 'Non spécifiés'}`],
    [`Génération: ${character.generation || 'Non spécifiée'}`, `Karma: ${character.karma || '0'}`],
    [`Symbole personnel: ${character.personalSymbol || 'Non spécifié'}`]
  ];
  
  autoTable(doc, {
    startY: 50,
    body: basicInfo,
    theme: 'plain',
    styles: {
      cellPadding: 2,
      fontSize: 10
    }
  });
  
  // Caractéristiques dérivées
  const derivedStats = calculateDerivedStats(character);
  
  doc.text("Caractéristiques principales", 20, doc.previousAutoTable.finalY + 10);
  
  const derivedStatsTable = [
    ['PHYSIQUE', 'ENDURANCE', 'PSYCHE', 'PERCEPTION', 'CHARISME'],
    [
      derivedStats.PHYSIQUE.toString(),
      derivedStats.ENDURANCE.toString(),
      derivedStats.PSYCHE.toString(),
      derivedStats.PERCEPTION.toString(),
      derivedStats.CHARISME.toString()
    ]
  ];
  
  autoTable(doc, {
    startY: doc.previousAutoTable.finalY + 15,
    head: [derivedStatsTable[0]],
    body: [derivedStatsTable[1]],
    theme: 'grid',
    headStyles: {
      fillColor: [107, 66, 38],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: {
      halign: 'center',
      valign: 'middle'
    }
  });
  
  // Attributs détaillés
  doc.text("Attributs détaillés", 20, doc.previousAutoTable.finalY + 10);
  
  const attributeTables = Object.entries(attributeGroups).map(([group, attrs]) => {
    return [
      [group],
      ...attrs.map(attr => [attr, character.attributes[attr] || 20])
    ];
  });
  
  let col1Y = doc.previousAutoTable.finalY + 15;
  let col2Y = col1Y;
  let colWidth = 90;
  
  // Première colonne (3 premiers groupes)
  for (let i = 0; i < 3; i++) {
    autoTable(doc, {
      startY: i === 0 ? col1Y : doc.previousAutoTable.finalY + 5,
      head: [attributeTables[i][0]],
      body: attributeTables[i].slice(1),
      theme: 'grid',
      tableWidth: colWidth,
      margin: { left: 20 },
      headStyles: {
        fillColor: [107, 66, 38],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      }
    });
    
    if (i === 2) {
      col1Y = doc.previousAutoTable.finalY;
    }
  }
  
  // Deuxième colonne (2 derniers groupes)
  for (let i = 3; i < 5; i++) {
    autoTable(doc, {
      startY: i === 3 ? col2Y : doc.previousAutoTable.finalY + 5,
      head: [attributeTables[i][0]],
      body: attributeTables[i].slice(1),
      theme: 'grid',
      tableWidth: colWidth,
      margin: { left: 105 },
      headStyles: {
        fillColor: [107, 66, 38],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      }
    });
  }
  
  // Détermine le Y le plus bas entre les deux colonnes
  const lowestY = Math.max(col1Y, doc.previousAutoTable.finalY);
  
  // Pouvoirs
  doc.text("Pouvoirs", 20, lowestY + 10);
  
  const powersTable = character.powers.map(power => [
    power.name,
    power.level.toString()
  ]);
  
  if (powersTable.length === 0) {
    powersTable.push(['Aucun pouvoir sélectionné', '']);
  }
  
  autoTable(doc, {
    startY: lowestY + 15,
    head: [['Pouvoir', 'Niveau']],
    body: powersTable,
    theme: 'grid',
    headStyles: {
      fillColor: [107, 66, 38],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Nouvelle page si nécessaire
  if (doc.previousAutoTable.finalY > 250) {
    doc.addPage();
  }
  
  // Artefacts, créatures et ombres
  const nextY = doc.previousAutoTable.finalY + 10;
  doc.text("Objets et entités personnelles", 20, nextY);
  
  // Artefacts
  const artifactsTable = character.artifacts.map(item => [
    item.name,
    item.type,
    item.ability
  ]);
  
  if (artifactsTable.length === 0) {
    artifactsTable.push(['Aucun artefact', '', '']);
  }
  
  autoTable(doc, {
    startY: nextY + 5,
    head: [['Artefact', 'Type', 'Capacité']],
    body: artifactsTable,
    theme: 'grid',
    headStyles: {
      fillColor: [107, 66, 38],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Créatures
  autoTable(doc, {
    startY: doc.previousAutoTable.finalY + 5,
    head: [['Créature', 'Type', 'Lien']],
    body: character.creatures.length ? character.creatures.map(c => [c.name, c.type, c.bond]) : [['Aucune créature', '', '']],
    theme: 'grid',
    headStyles: {
      fillColor: [107, 66, 38],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Ombres
  autoTable(doc, {
    startY: doc.previousAutoTable.finalY + 5,
    head: [['Ombre', 'Description', 'Statut']],
    body: character.shadows.length ? character.shadows.map(s => [s.name, s.description, s.status]) : [['Aucune ombre', '', '']],
    theme: 'grid',
    headStyles: {
      fillColor: [107, 66, 38],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Récapitulatif des points
  const points = calculateTotalPointsSpent(character);
  
  autoTable(doc, {
    startY: doc.previousAutoTable.finalY + 10,
    head: [['Récapitulatif des points']],
    body: [
      [`Points de base (${character.generation}ème génération): ${points.basePoints}`],
      [`Points dépensés pour les attributs: ${points.attributeCost}`],
      [`Points dépensés pour les pouvoirs: ${points.powersCost}`],
      [`Ajustement de karma (${character.karma}): ${points.karmaAdjustment}`],
      [`Bonus de faiblesse: ${points.weaknessBonus}`],
      [`Ajustement alliés/ennemis: ${points.alliesEnemiesAdjustment}`],
      [`Bonus de contributions: ${points.contributionsBonus}`],
      [`Total dépensé: ${points.totalSpent}`],
      [`Points restants: ${points.remainingPoints}`]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [142, 59, 70],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Pied de page
  const totalPages = doc.getNumberOfPages();
  
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Personnage: ${character.name || 'Sans nom'} - Page ${i} sur ${totalPages}`, 105, 290, { align: 'center' });
  }
  
  // Téléchargement du PDF
  doc.save(`Personnage_Aberion_${character.name || 'Sans_nom'}.pdf`);
};
