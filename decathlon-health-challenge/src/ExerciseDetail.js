import React, { useState } from 'react';
import './ExerciseDetail.css';

// Données complètes pour chaque exercice avec instructions et visualisation
const EXERCISE_DETAILS = {
  sq1: {
    name: 'Squat Assisté',
    category: 'senior',
    difficulty: 'Facile',
    duration: '3-5 min',
    emoji: '🪑',
    description: 'Mouvement fondamental pour renforcer les jambes en toute sécurité.',
    
    // Niveau 2 : Instructions textuelles détaillées
    instructions: {
      preparation: [
        'Trouve une chaise stable ou un support solide',
        'Place-toi face à la chaise, pieds écartés à la largeur des hanches',
        'Tends les bras vers l\'avant pour l\'équilibre',
        'Engage ton cœur en rentrant légèrement le ventre'
      ],
      execution: [
        'Abaisse lentement tes fesses vers la chaise en pliant les genoux',
        'Garde la poitrine relevée et le dos droit',
        'Descends jusqu\'à ce que tu touches légèrement la chaise',
        'Reste 1-2 secondes en bas de la position',
        'Remonte en poussant avec l\'énergie de tes jambes'
      ],
      breathing: [
        'Inspire en descendant',
        'Expire en remontant',
        'Ne retiens jamais ta respiration'
      ],
      mistakes_to_avoid: [
        '❌ Genoux qui rentrent vers l\'intérieur',
        '❌ Buste qui s\'incline trop vers l\'avant',
        '❌ Talons qui se décollent du sol',
        '❌ Descendre trop vite (contrôle du mouvement !)'
      ]
    },

    // Niveau 3 : Illustration avec postures
    postures: [
      {
        phase: 'Position de départ',
        icon: '🫡',
        description: 'Debout, pieds écartés, mains vers l\'avant',
        keyPoints: ['Dos droit', 'Regard vers l\'horizon', 'Poids sur les talons']
      },
      {
        phase: 'Descente',
        icon: '⬇️',
        description: 'Abaisse-toi progressivement',
        keyPoints: ['Genoux au-dessus des chevilles', 'Hanches qui reculent', 'Buste stable']
      },
      {
        phase: 'Bas du mouvement',
        icon: '🎯',
        description: 'Touche légèrement la chaise',
        keyPoints: ['Genou ~90°', 'Cuisses parallèles au sol', 'Équilibre maintenu']
      },
      {
        phase: 'Remontée',
        icon: '⬆️',
        description: 'Pousse avec les jambes',
        keyPoints: ['Talons collés au sol', 'Respiration complète', 'Posture initiale']
      }
    ],

    tips: [
      '💡 Variation facile : Reste plus longtemps assis sur la chaise avant de remonter',
      '💡 Variation medium : Utilise seulement un bras pour te stabiliser',
      '💡 Progression : Essaie sans la chaise (squat classique)'
    ],

    sets_reps: '3 séries × 10-12 répétitions',
    rest_time: '60 secondes entre les séries',
    muscles_worked: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Mollets']
  },

  sq2: {
    name: 'Air Squat',
    category: 'cardio',
    difficulty: 'Moyen',
    duration: '4-6 min',
    emoji: '🏋️',
    description: 'Squat sans assistance pour un engagement musculaire total.',
    
    instructions: {
      preparation: [
        'Place-toi debout, pieds légèrement plus écartés que la largeur des épaules',
        'Pointe tes pieds légèrement vers l\'extérieur (environ 5-10°)',
        'Mains croisées sur la poitrine ou vers l\'avant pour l\'équilibre'
      ],
      execution: [
        'Fléchis les genoux en gardant le buste vertical',
        'Descends jusqu\'à ce que tes cuisses soient parallèles au sol',
        'Garde les genoux alignés avec tes chevilles',
        'Pousse fortement pour remonter',
        'Reviens à la position de départ en maîtrisant le mouvement'
      ],
      breathing: [
        'Inspire en descendant lentement',
        'Expire en remontant avec force',
        'Maintiens une respiration régulière'
      ],
      mistakes_to_avoid: [
        '❌ Genoux qui rentrent vers l\'intérieur (Valgus)',
        '❌ Talons qui se décollent du sol',
        '❌ Buste qui s\'incline trop en avant',
        '❌ Vitesse d\'exécution trop rapide'
      ]
    },

    postures: [
      {
        phase: 'Position de départ',
        icon: '🫡',
        description: 'Debout, pieds écartés, bras tendus',
        keyPoints: ['Poids équilibré', 'Regard droit', 'Sangle abdominale engagée']
      },
      {
        phase: 'Phase excentrique',
        icon: '⬇️',
        description: 'Descente contrôlée',
        keyPoints: ['Mouvement fluide', 'Genoux dehors', 'Talons au sol']
      },
      {
        phase: 'Profondeur maximale',
        icon: '🎯',
        description: 'Cuisses parallèles ou plus bas',
        keyPoints: ['Équilibre stable', 'Tronc droit', 'Genou 90°']
      },
      {
        phase: 'Remontée explosive',
        icon: '⬆️',
        description: 'Pousse avec énergie',
        keyPoints: ['Jambes qui poussent', 'Corps qui se redresse', 'Respiration complète']
      }
    ],

    tips: [
      '💡 Débute sans charge pour maîtriser la technique',
      '💡 Utilise un miroir pour vérifier ton alignement',
      '💡 Augmente progressivement la profondeur'
    ],

    sets_reps: '4 séries × 12-15 répétitions',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Stabilisateurs']
  },

  plank: {
    name: 'Gainage Planche',
    category: 'beginner',
    difficulty: 'Moyen',
    duration: '3-5 min',
    emoji: '➖',
    description: 'Renforce la sangle abdominale et la stabilité du tronc.',
    
    instructions: {
      preparation: [
        'Couche-toi face au sol',
        'Positionne tes avant-bras parallèles, coudes sous les épaules',
        'Garde tes jambes tendues, appuyé sur les orteils',
        'Engage tes abdominaux avant de te lever'
      ],
      execution: [
        'Lève ton corps du sol en te tenant sur les avant-bras et les orteils',
        'Forme une ligne droite de ta tête à tes talons',
        'Rentre le ventre et serre tes fesses',
        'Maintiens cette position sans bouger',
        'Respire profondément pendant toute la durée'
      ],
      breathing: [
        'Commence par inspirer profondément',
        'Respire régulièrement sans retenir ton souffle',
        'Évite de retenir ta respiration (aucun apnée !)'
      ],
      mistakes_to_avoid: [
        '❌ Hanches qui s\'affaissent vers le bas',
        '❌ Buste qui se penche en avant',
        '❌ Épaules remontées vers les oreilles',
        '❌ Tête qui regarde vers le haut au lieu de rester neutre'
      ]
    },

    postures: [
      {
        phase: 'Position de préparation',
        icon: '🫡',
        description: 'Au sol, avant-bras et genoux au sol',
        keyPoints: ['Coudes sous les épaules', 'Corps détendu', 'Engagement du cœur']
      },
      {
        phase: 'Élévation du corps',
        icon: '⬆️',
        description: 'Lève-toi progressivement',
        keyPoints: ['Engagement progressif', 'Ligne droite', 'Stabilité']
      },
      {
        phase: 'Position de maintien',
        icon: '🎯',
        description: 'Position finale - corps aligné',
        keyPoints: ['Tête neutre', 'Abdominaux serrés', 'Fesses engagées']
      },
      {
        phase: 'Modification facile',
        icon: '🧘',
        description: 'Sur les genoux pour débuter',
        keyPoints: ['Même alignement', 'Moins d\'intensité', 'Progression sûre']
      }
    ],

    tips: [
      '💡 Débute avec 20-30 secondes et augmente progressivement',
      '💡 Variation : Planche sur les mains au lieu des avant-bras',
      '💡 Variation : Planche latérale pour les obliques'
    ],

    sets_reps: '3-4 séries × 30-60 secondes',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Abdominaux profonds', 'Transverse', 'Érecteurs du rachis', 'Épaules']
  },

  catcow: {
    name: 'Chat-Vache (Mobilité Dos)',
    category: 'senior',
    difficulty: 'Facile',
    duration: '2-4 min',
    emoji: '🐈',
    description: 'Améliore la mobilité et la flexibilité du rachis cervical et lombaire.',
    
    instructions: {
      preparation: [
        'Place-toi à quatre pattes (genoux et mains)',
        'Écarte tes mains à la largeur des épaules',
        'Écarte tes genoux à la largeur des hanches',
        'Garde le cou neutre au départ'
      ],
      execution: [
        'Phase 1 - Chat : Arrondi le dos, rentre le menton vers la poitrine',
        'Sens l\'étirement le long de toute ta colonne vertébrale',
        'Reste 2-3 secondes dans cette position',
        'Phase 2 - Vache : Laisse ton ventre tomber vers le sol',
        'Lève le cou et le regard graduellement vers le haut',
        'Sens l\'ouverture de la poitrine',
        'Alterne lentement entre les deux positions'
      ],
      breathing: [
        'Inspire en passant en position vache',
        'Expire en passant en position chat',
        'Mouvements fluides et synchronisés avec la respiration'
      ],
      mistakes_to_avoid: [
        '❌ Mouvements rapides ou saccadés',
        '❌ Hyperextension du cou (ne force pas)',
        '❌ Oubli de la respiration',
        '❌ Mouvements qui créent de la douleur'
      ]
    },

    postures: [
      {
        phase: 'Position neutre',
        icon: '🫡',
        description: 'À quatre pattes, colonne neutre',
        keyPoints: ['Dos plat', 'Cou neutre', 'Mains sous les épaules']
      },
      {
        phase: 'Position Chat',
        icon: '🐈',
        description: 'Dos arrondi, menton vers poitrine',
        keyPoints: ['Arc complet', 'Étirement maximal', 'Respiration calme']
      },
      {
        phase: 'Position Vache',
        icon: '🐄',
        description: 'Ventre vers le bas, regard vers le haut',
        keyPoints: ['Ouverture poitrine', 'Mobilité complète', 'Douceur']
      }
    ],

    tips: [
      '💡 Parfait pour débuter une séance de mobilité',
      '💡 À faire le matin pour réveiller la colonne',
      '💡 Essaie 10-15 cycles lentement pour la flexibilité'
    ],

    sets_reps: '3 séries × 10-15 cycles',
    rest_time: '30 secondes entre les séries',
    muscles_worked: ['Érecteurs du rachis', 'Abdominaux', 'Mobilité', 'Flexibilité']
  }
};

const ExerciseDetail = ({ exerciseId, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, instructions, postures, tips
  const exercise = EXERCISE_DETAILS[exerciseId];

  if (!exercise) {
    return <div>Exercice non trouvé</div>;
  }

  return (
    <div className="exercise-detail-modal">
      <div className="exercise-detail-container">
        {/* Header avec fermeture */}
        <div className="exercise-header">
          <div className="exercise-title">
            <span className="exercise-emoji">{exercise.emoji}</span>
            <div>
              <h2>{exercise.name}</h2>
              <div className="exercise-meta">
                <span className="badge difficulty">{exercise.difficulty}</span>
                <span className="badge duration">⏱️ {exercise.duration}</span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Description courte */}
        <p className="exercise-description">{exercise.description}</p>

        {/* Navigation des onglets */}
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Aperçu
          </button>
          <button
            className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            📝 Instructions
          </button>
          <button
            className={`tab-btn ${activeTab === 'postures' ? 'active' : ''}`}
            onClick={() => setActiveTab('postures')}
          >
            🎯 Postures
          </button>
          <button
            className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            💡 Conseils
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="tabs-content">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="info-grid">
                <div className="info-item">
                  <h4>Séries & Répétitions</h4>
                  <p>{exercise.sets_reps}</p>
                </div>
                <div className="info-item">
                  <h4>Repos entre séries</h4>
                  <p>{exercise.rest_time}</p>
                </div>
              </div>

              <div className="muscles-section">
                <h4>Muscles travaillés</h4>
                <div className="muscles-list">
                  {exercise.muscles_worked.map((muscle, idx) => (
                    <span key={idx} className="muscle-tag">{muscle}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Instructions détaillées */}
          {activeTab === 'instructions' && (
            <div className="tab-pane">
              <div className="instruction-section">
                <h4>🎬 Préparation</h4>
                <ol className="instruction-list">
                  {exercise.instructions.preparation.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="instruction-section">
                <h4>⚙️ Exécution</h4>
                <ol className="instruction-list">
                  {exercise.instructions.execution.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="instruction-section">
                <h4>💨 Respiration</h4>
                <ol className="instruction-list">
                  {exercise.instructions.breathing.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="instruction-section warning">
                <h4>⚠️ Erreurs à éviter</h4>
                <ul className="warning-list">
                  {exercise.instructions.mistakes_to_avoid.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Postures/Visualisation */}
          {activeTab === 'postures' && (
            <div className="tab-pane">
              <div className="postures-grid">
                {exercise.postures.map((posture, idx) => (
                  <div key={idx} className="posture-card">
                    <div className="posture-icon-big">{posture.icon}</div>
                    <h5>{posture.phase}</h5>
                    <p className="posture-desc">{posture.description}</p>
                    <div className="posture-keypoints">
                      {posture.keyPoints.map((point, pidx) => (
                        <div key={pidx} className="keypoint">
                          ✓ {point}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Tips & Variations */}
          {activeTab === 'tips' && (
            <div className="tab-pane">
              <div className="tips-section">
                {exercise.tips.map((tip, idx) => (
                  <div key={idx} className="tip-item">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
