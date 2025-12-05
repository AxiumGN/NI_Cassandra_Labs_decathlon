import React, { useState } from 'react';
import './ExerciseDetail.css';

// Données complètes pour chaque exercice avec instructions et visualisation
const EXERCISE_DETAILS = {
  // ===== JAMBES (Legs) =====
  sq1: {
    name: 'Squat Assisté',
    bodyPart: 'Jambes',
    category: 'senior',
    difficulty: 'Facile',
    duration: '3-5 min',
    emoji: '🪑',
    description: 'Mouvement fondamental pour renforcer les jambes en toute sécurité.',
    
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

    postures: [
      {
        phase: 'Position de départ',
        icon: '🧍',
        description: 'Debout, pieds écartés, mains vers l\'avant',
        keyPoints: ['Dos droit', 'Regard vers l\'horizon', 'Poids sur les talons']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Abaisse-toi progressivement',
        keyPoints: ['Genoux au-dessus des chevilles', 'Hanches qui reculent', 'Buste stable']
      },
      {
        phase: 'Bas du mouvement',
        icon: '🦵',
        description: 'Touche légèrement la chaise',
        keyPoints: ['Genou ~90°', 'Cuisses parallèles au sol', 'Équilibre maintenu']
      },
      {
        phase: 'Remontée',
        icon: '📈',
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
    bodyPart: 'Jambes',
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
        icon: '💪',
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
        icon: '🦵',
        description: 'Cuisses parallèles ou plus bas',
        keyPoints: ['Équilibre stable', 'Tronc droit', 'Genou 90°']
      },
      {
        phase: 'Remontée explosive',
        icon: '⚡',
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

  lunges: {
    name: 'Fentes Avant',
    bodyPart: 'Jambes',
    category: 'muscle',
    difficulty: 'Moyen',
    duration: '5-7 min',
    emoji: '↗️',
    description: 'Renforce les jambes et améliore l\'équilibre unilatéral.',
    
    instructions: {
      preparation: [
        'Tiens-toi debout, pieds écartés à la largeur des hanches',
        'Mains sur les hanches ou croisées sur la poitrine',
        'Engage ton cœur et garde le buste droit'
      ],
      execution: [
        'Fais un grand pas en avant avec une jambe',
        'Fléchis le genou avant jusqu\'à ~90°',
        'Abaisse ton genou arrière vers le sol sans le toucher',
        'Pousse avec ta jambe avant pour revenir à la position initiale',
        'Alterne les jambes de façon contrôlée'
      ],
      breathing: [
        'Inspire en avançant',
        'Expire en remontant',
        'Respiration régulière et fluide'
      ],
      mistakes_to_avoid: [
        '❌ Genou avant qui dépasse la pointe du pied',
        '❌ Buste qui se penche vers l\'avant',
        '❌ Genou arrière qui s\'effondre au sol',
        '❌ Pas assez longs ou trop rapides'
      ]
    },

    postures: [
      {
        phase: 'Position de départ',
        icon: '🧍',
        description: 'Debout, posture droite',
        keyPoints: ['Épaules détendues', 'Cœur engagé', 'Regard devant']
      },
      {
        phase: 'Passage en avant',
        icon: '🚶',
        description: 'Jambe qui avance',
        keyPoints: ['Grand pas contrôlé', 'Buste stable', 'Poids équilibré']
      },
      {
        phase: 'Position basse',
        icon: '📉',
        description: 'Fente maximale',
        keyPoints: ['Genou avant 90°', 'Genou arrière baissé', 'Tronc droit']
      },
      {
        phase: 'Remontée',
        icon: '⬆️',
        description: 'Retour à la position initiale',
        keyPoints: ['Pousse avec jambe avant', 'Équilibre maîtrisé', 'Prêt pour l\'autre côté']
      }
    ],

    tips: [
      '💡 Débute avec des pas plus courts pour maîtriser la technique',
      '💡 Variation : Fentes statiques pour plus d\'intensité',
      '💡 Avance en marche pour plus de cardio'
    ],

    sets_reps: '3 séries × 10 répétitions par jambe',
    rest_time: '60 secondes entre les séries',
    muscles_worked: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Stabilisateurs']
  },

  deadlift: {
    name: 'Soulevé de Terre (Léger)',
    bodyPart: 'Jambes',
    category: 'muscle',
    difficulty: 'Moyen-Difficile',
    duration: '6-8 min',
    emoji: '⬆️',
    description: 'Renforce les jambes, le dos et développe la puissance globale.',
    
    instructions: {
      preparation: [
        'Tiens un objet léger (sac, bouteille) avec les deux mains',
        'Pieds écartés à la largeur des épaules, pointes vers l\'avant',
        'Engage ton cœur avant de commencer'
      ],
      execution: [
        'Abaisse-toi en poussant les hanches vers l\'arrière',
        'Garde le dos droit, poitrine relevée',
        'Les bras restent tendus le long du corps',
        'Pousse avec les jambes pour te relever',
        'Ramène le poids à la position initiale en contrôlant'
      ],
      breathing: [
        'Inspire en descendant',
        'Expire en remontant',
        'Respire toujours, ne retiens pas ton souffle'
      ],
      mistakes_to_avoid: [
        '❌ Dos arrondi ou buste trop penché',
        '❌ Genoux qui rentrent vers l\'intérieur',
        '❌ Poids qui ne descend pas assez bas',
        '❌ Tête qui regarde vers le haut (regarde vers l\'avant)'
      ]
    },

    postures: [
      {
        phase: 'Position initiale',
        icon: '🧍',
        description: 'Debout avec le poids aux mains',
        keyPoints: ['Dos droit', 'Regard vers l\'avant', 'Sangle engagée']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Abaissement contrôlé',
        keyPoints: ['Hanches qui reculent', 'Dos plat', 'Poids sur talons']
      },
      {
        phase: 'Position basse',
        icon: '🦵',
        description: 'Amplitude maximale',
        keyPoints: ['Flexion importante', 'Équilibre maintenu', 'Cœur actif']
      },
      {
        phase: 'Remontée',
        icon: '⬆️',
        description: 'Extension des jambes',
        keyPoints: ['Poussée puissante', 'Dos droit', 'Position initiale']
      }
    ],

    tips: [
      '💡 Débute avec un poids léger ou un objet du quotidien',
      '💡 Priorité à la technique plutôt qu\'au poids',
      '💡 Variation : Unilatéral (une main) pour plus de défi'
    ],

    sets_reps: '3 séries × 8-10 répétitions',
    rest_time: '90 secondes entre les séries',
    muscles_worked: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Érecteurs du rachis']
  },

  calf_raises: {
    name: 'Montées sur les Talons',
    bodyPart: 'Jambes',
    category: 'beginner',
    difficulty: 'Facile',
    duration: '3-4 min',
    emoji: '🦶',
    description: 'Renforce les mollets et améliore la stabilité des chevilles.',
    
    instructions: {
      preparation: [
        'Tiens-toi debout près d\'un mur ou d\'une barre pour l\'équilibre',
        'Pieds écartés à la largeur des hanches',
        'Poids distribué uniformément'
      ],
      execution: [
        'Lève-toi sur les pointes de tes pieds en contractant les mollets',
        'Atteins la hauteur maximale sans basculer vers l\'avant',
        'Reste 1-2 secondes en position haute',
        'Redescends lentement jusqu\'à la position initiale',
        'Répète le mouvement de façon fluide'
      ],
      breathing: [
        'Inspire en position basse',
        'Expire en montant sur les talons',
        'Respiration régulière tout du long'
      ],
      mistakes_to_avoid: [
        '❌ Basculer vers l\'avant (rester droit !)',
        '❌ Descendre trop rapidement',
        '❌ Genoux qui se plient pendant le mouvement',
        '❌ Amplitude insuffisante'
      ]
    },

    postures: [
      {
        phase: 'Position basse',
        icon: '🧍',
        description: 'Debout, pieds à plat',
        keyPoints: ['Talons au sol', 'Corps droit', 'Regard vers l\'avant']
      },
      {
        phase: 'Montée progressive',
        icon: '⬆️',
        description: 'Lève-toi sur les pointes',
        keyPoints: ['Mollets contractés', 'Équilibre stable', 'Buste droit']
      },
      {
        phase: 'Position haute',
        icon: '🚀',
        description: 'Sommet du mouvement',
        keyPoints: ['Hauteur maximale', 'Mollets serrés', 'Stabilité totale']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Retour contrôlé',
        keyPoints: ['Mouvement lent', 'Talons qui touchent', 'Position initiale']
      }
    ],

    tips: [
      '💡 Peux être fait n\'importe où sans équipement',
      '💡 Variation : Une jambe à la fois pour plus d\'intensité',
      '💡 Augmente le nombre de répétitions plutôt que la vitesse'
    ],

    sets_reps: '3 séries × 15-20 répétitions',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Mollets', 'Soléaire', 'Stabilisateurs chevilles']
  },

  // ===== CORE / ABS (Noyau & Abdominaux) =====
  plank: {
    name: 'Gainage Planche',
    bodyPart: 'Core',
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
        icon: '🛑',
        description: 'Au sol, avant-bras et genoux au sol',
        keyPoints: ['Coudes sous les épaules', 'Corps détendu', 'Engagement du cœur']
      },
      {
        phase: 'Élévation du corps',
        icon: '📈',
        description: 'Lève-toi progressivement',
        keyPoints: ['Engagement progressif', 'Ligne droite', 'Stabilité']
      },
      {
        phase: 'Position de maintien',
        icon: '💪',
        description: 'Position finale - corps aligné',
        keyPoints: ['Tête neutre', 'Abdominaux serrés', 'Fesses engagées']
      },
      {
        phase: 'Modification facile',
        icon: '✋',
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

  crunches: {
    name: 'Abdominaux Crunch',
    bodyPart: 'Core',
    category: 'beginner',
    difficulty: 'Facile',
    duration: '3-4 min',
    emoji: '🔄',
    description: 'Renforce les abdominaux superficiels avec un mouvement simple et efficace.',
    
    instructions: {
      preparation: [
        'Couche-toi sur le dos, genoux fléchis à ~90°',
        'Mains légèrement derrière la tête (doigts entrecroisés)',
        'Pieds à plat au sol, écartés à la largeur des hanches'
      ],
      execution: [
        'Contracte tes abdominaux et lève le buste vers les genoux',
        'Soulève seulement les épaules du sol, pas tout le dos',
        'Atteins la hauteur maximale en haut du mouvement',
        'Redescends lentement jusqu\'à la position de départ',
        'Répète de façon contrôlée'
      ],
      breathing: [
        'Inspire en position basse',
        'Expire en montant (contraction)',
        'Inspire en redescendant'
      ],
      mistakes_to_avoid: [
        '❌ Tirer sur le cou au lieu de contracter l\'abdomen',
        '❌ Monter trop haut (jamais jusqu\'au plein assis)',
        '❌ Mouvements rapides et saccadés',
        '❌ Pieds qui se soulèvent du sol'
      ]
    },

    postures: [
      {
        phase: 'Position initiale',
        icon: '🛌',
        description: 'Sur le dos, genoux fléchis',
        keyPoints: ['Dos à plat', 'Pieds au sol', 'Cou neutre']
      },
      {
        phase: 'Montée',
        icon: '⬆️',
        description: 'Contraction des abdos',
        keyPoints: ['Épaules qui se lèvent', 'Abdomen contracté', 'Cou détendu']
      },
      {
        phase: 'Sommet',
        icon: '💪',
        description: 'Hauteur maximale',
        keyPoints: ['Contraction maximale', 'Position stable', 'Respiration actuelle']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Retour lent',
        keyPoints: ['Mouvement contrôlé', 'Pas de chute', 'Position initiale']
      }
    ],

    tips: [
      '💡 Focus sur la qualité plutôt que la quantité',
      '💡 Variation : Crunch oblique en tournant le buste',
      '💡 Ajoute une pause en haut pour plus d\'intensité'
    ],

    sets_reps: '3 séries × 12-15 répétitions',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Abdominaux droits', 'Abdominaux superficiels']
  },

  russian_twist: {
    name: 'Rotation Russe',
    bodyPart: 'Core',
    category: 'muscle',
    difficulty: 'Moyen',
    duration: '4-5 min',
    emoji: '🔁',
    description: 'Renforce les obliques et améliore la stabilité du tronc rotationnel.',
    
    instructions: {
      preparation: [
        'Assieds-toi au sol, genoux fléchis, pieds ancrés',
        'Penche ton buste légèrement vers l\'arrière (position de V)',
        'Mains croisées sur la poitrine ou mains jointes devant toi'
      ],
      execution: [
        'Contracte tes abdominaux et tourne ton buste vers la droite',
        'Touche le sol à côté de ton corps avec tes mains si possible',
        'Reviens au centre en contrôlant le mouvement',
        'Tourne maintenant vers la gauche',
        'Alterne de façon fluide et régulière'
      ],
      breathing: [
        'Inspire en position centrale',
        'Expire en tournant',
        'Respiration régulière sans apnée'
      ],
      mistakes_to_avoid: [
        '❌ Utiliser l\'élan au lieu de contracter les obliques',
        '❌ Pieds qui se lèvent du sol',
        '❌ Mouvement trop rapide',
        '❌ Buste qui s\'effondre vers l\'arrière'
      ]
    },

    postures: [
      {
        phase: 'Position initiale',
        icon: '🧘',
        description: 'Assis en position de V',
        keyPoints: ['Buste légèrement penché', 'Pieds au sol', 'Mains croisées']
      },
      {
        phase: 'Rotation droite',
        icon: '➡️',
        description: 'Tourne vers la droite',
        keyPoints: ['Obliques contractés', 'Buste stable', 'Hanche fixe']
      },
      {
        phase: 'Rotation gauche',
        icon: '⬅️',
        description: 'Tourne vers la gauche',
        keyPoints: ['Rotation complète', 'Abdomen engagé', 'Équilibre maintenu']
      }
    ],

    tips: [
      '💡 Pour plus de difficulté, tiens un poids entre tes mains',
      '💡 Augmente l\'amplitude du mouvement progressivement',
      '💡 Variation : Jambes surélevées pour plus d\'intensité'
    ],

    sets_reps: '3 séries × 20 répétitions (10 par côté)',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Obliques', 'Abdominaux', 'Transverse']
  },

  bicycle_crunch: {
    name: 'Crunch Vélo',
    bodyPart: 'Core',
    category: 'beginner',
    difficulty: 'Moyen',
    duration: '3-5 min',
    emoji: '🚴',
    description: 'Renforce les abdominaux et les obliques avec un mouvement dynamique.',
    
    instructions: {
      preparation: [
        'Couche-toi sur le dos, mains légèrement derrière la tête',
        'Lève tes jambes et fléchis les genoux à ~90°',
        'Engage ton cœur avant de commencer'
      ],
      execution: [
        'Lève les épaules du sol en contractant les abdominaux',
        'Amène ton coude droit vers ton genou gauche en étendant la jambe droite',
        'Reviens au centre et répète de l\'autre côté',
        'Alterne de façon fluide comme un mouvement de pédalage',
        'Maintiens une amplitude constante'
      ],
      breathing: [
        'Respire régulièrement sans retenir ton souffle',
        'Expire lors de la contraction',
        'Inspire lors du changement de côté'
      ],
      mistakes_to_avoid: [
        '❌ Tirer sur le cou',
        '❌ Mouvements trop rapides et saccadés',
        '❌ Amplitude trop petite',
        '❌ Basculer latéralement au lieu de croiser'
      ]
    },

    postures: [
      {
        phase: 'Position de départ',
        icon: '🛌',
        description: 'Sur le dos, jambes levées',
        keyPoints: ['Genoux fléchis', 'Mains à la tête', 'Cou neutre']
      },
      {
        phase: 'Crunch droit',
        icon: '➡️',
        description: 'Coude vers genou opposé',
        keyPoints: ['Contraction diagonale', 'Jambe qui s\'étend', 'Mouvement contrôlé']
      },
      {
        phase: 'Crunch gauche',
        icon: '⬅️',
        description: 'Changement de côté',
        keyPoints: ['Alternance fluide', 'Même intensité', 'Rythme régulier']
      }
    ],

    tips: [
      '💡 Débute plus lentement pour maîtriser la technique',
      '💡 Augmente progressivement la vitesse du mouvement',
      '💡 Variation : Avec jambes tendues pour plus de difficulté'
    ],

    sets_reps: '3 séries × 20 répétitions (10 par côté)',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Abdominaux droits', 'Obliques', 'Fléchisseurs de hanches']
  },

  // ===== DOS & POITRINE (Back & Chest) =====
  catcow: {
    name: 'Chat-Vache (Mobilité Dos)',
    bodyPart: 'Dos',
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
        'Phase 1 - Chat : Arrondi le dos, rentre le mentin vers la poitrine',
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
        icon: '🔄',
        description: 'À quatre pattes, colonne neutre',
        keyPoints: ['Dos plat', 'Cou neutre', 'Mains sous les épaules']
      },
      {
        phase: 'Position Chat',
        icon: '⬆️',
        description: 'Dos arrondi, mentin vers poitrine',
        keyPoints: ['Arc complet', 'Étirement maximal', 'Respiration calme']
      },
      {
        phase: 'Position Vache',
        icon: '⬇️',
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
  },

  superman: {
    name: 'Superman (Renforcement Dorsal)',
    bodyPart: 'Dos',
    category: 'beginner',
    difficulty: 'Facile-Moyen',
    duration: '3-5 min',
    emoji: '🦸',
    description: 'Renforce le dos, les fessiers et améliore la posture.',
    
    instructions: {
      preparation: [
        'Couche-toi sur le ventre, jambes tendues',
        'Bras tendus vers l\'avant (position Superman)',
        'Engage ton cœur avant de commencer'
      ],
      execution: [
        'Contracte ton dos et tes fessiers',
        'Lève lentement tes bras et tes jambes du sol',
        'Atteins une hauteur confortable sans archer excessivement',
        'Maintiens la position 1-2 secondes',
        'Redescends lentement et contrôlé à la position de départ'
      ],
      breathing: [
        'Inspire en position basse',
        'Expire en levant les bras et jambes',
        'Respiration régulière'
      ],
      mistakes_to_avoid: [
        '❌ Archer le dos trop (rester modéré)',
        '❌ Relâcher trop rapidement (contrôle important)',
        '❌ Mouvement trop rapide ou saccadé',
        '❌ Genoux qui se plient'
      ]
    },

    postures: [
      {
        phase: 'Position basse',
        icon: '🛌',
        description: 'Couché sur le ventre',
        keyPoints: ['Bras vers l\'avant', 'Jambes tendues', 'Cou neutre']
      },
      {
        phase: 'Levée progressive',
        icon: '⬆️',
        description: 'Soulève bras et jambes',
        keyPoints: ['Dorsal contracté', 'Fessiers engagés', 'Mouvement fluide']
      },
      {
        phase: 'Position haute',
        icon: '🦸',
        description: 'Sommet du mouvement',
        keyPoints: ['Hauteur modérée', 'Arche du dos légère', 'Tenue stable']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Retour contrôlé',
        keyPoints: ['Lent et maîtrisé', 'Position initiale', 'Prêt pour la suivante']
      }
    ],

    tips: [
      '💡 La hauteur n\'est pas importante, priorité au contrôle',
      '💡 Variation : Lève d\'abord les bras puis les jambes',
      '💡 Progression : Tiens un poids léger pour plus d\'intensité'
    ],

    sets_reps: '3 séries × 10-12 répétitions',
    rest_time: '45 secondes entre les séries',
    muscles_worked: ['Érecteurs du rachis', 'Fessiers', 'Deltoïdes postérieurs', 'Ischio-jambiers']
  },

  push_ups: {
    name: 'Pompes (Flexions)',
    bodyPart: 'Poitrine',
    category: 'beginner',
    difficulty: 'Moyen',
    duration: '4-6 min',
    emoji: '📏',
    description: 'Renforce la poitrine, les épaules et les triceps avec le poids du corps.',
    
    instructions: {
      preparation: [
        'Positionne-toi en planche : mains sous les épaules',
        'Pieds réunis, corps en ligne droite',
        'Engage ton cœur et tes fessiers'
      ],
      execution: [
        'Abaisse ton corps en fléchissant les coudes',
        'Descends jusqu\'à ce que ton poitrine soit près du sol',
        'Garde le corps parfaitement aligné',
        'Pousse avec tes bras pour remonter',
        'Retiens à la position initiale en contrôlant'
      ],
      breathing: [
        'Inspire en descendant',
        'Expire en remontant',
        'Respiration régulière et constante'
      ],
      mistakes_to_avoid: [
        '❌ Hanches qui s\'affaissent vers le bas',
        '❌ Coudes qui s\'écartent trop vers l\'extérieur',
        '❌ Tête qui regarde vers le haut',
        '❌ Amplitude trop petite'
      ]
    },

    postures: [
      {
        phase: 'Position haute',
        icon: '📏',
        description: 'Planche - position de départ',
        keyPoints: ['Corps aligné', 'Cœur engagé', 'Bras tendus']
      },
      {
        phase: 'Descente',
        icon: '📉',
        description: 'Flexion des coudes',
        keyPoints: ['Mouvement contrôlé', 'Coudes près du corps', 'Ligne droite']
      },
      {
        phase: 'Position basse',
        icon: '⬇️',
        description: 'Amplitude maximale',
        keyPoints: ['Poitrine près du sol', 'Corps aligné', 'Respiration active']
      },
      {
        phase: 'Remontée',
        icon: '⬆️',
        description: 'Extension complète',
        keyPoints: ['Poussée puissante', 'Corps stable', 'Position initiale']
      }
    ],

    tips: [
      '💡 Débute sur les genoux pour apprendre la technique',
      '💡 Variation : Mains sur une surface surélevée pour moins de difficulté',
      '💡 Progression : Écarte les mains pour plus de défi'
    ],

    sets_reps: '3 séries × 5-12 répétitions',
    rest_time: '60 secondes entre les séries',
    muscles_worked: ['Grands pectoraux', 'Triceps', 'Deltoïdes antérieurs', 'Cœur']
  },

  rows: {
    name: 'Tirage Buste (Rows)',
    bodyPart: 'Dos',
    category: 'muscle',
    difficulty: 'Moyen',
    duration: '5-7 min',
    emoji: '🏹',
    description: 'Renforce le dos, les épaules et améliore la posture.',
    
    instructions: {
      preparation: [
        'Tiens un poids léger (haltère, bouteille) dans chaque main',
        'Pieds écartés à la largeur des épaules, genoux légèrement fléchis',
        'Penche légèrement le buste vers l\'avant (~45°)'
      ],
      execution: [
        'Lève les poids vers ton buste en tirant les coudes vers l\'arrière',
        'Serre les omoplates ensemble en haut du mouvement',
        'Reste 1 seconde dans cette position',
        'Redescends lentement en contrôlant le poids',
        'Répète de façon fluide'
      ],
      breathing: [
        'Inspire en position basse',
        'Expire en tirant le poids',
        'Respiration régulière'
      ],
      mistakes_to_avoid: [
        '❌ Buste qui se redresse pendant le tirage',
        '❌ Utiliser l\'élan au lieu de contracter le dos',
        '❌ Coudes qui sortent trop vers l\'extérieur',
        '❌ Redescendre trop rapidement'
      ]
    },

    postures: [
      {
        phase: 'Position de départ',
        icon: '🧍',
        description: 'Debout, poids aux mains',
        keyPoints: ['Buste penché légèrement', 'Poids aux mains', 'Cœur engagé']
      },
      {
        phase: 'Tirage initial',
        icon: '🏹',
        description: 'Commence le tirage',
        keyPoints: ['Coudes qui montent', 'Dos contracté', 'Poids contrôlé']
      },
      {
        phase: 'Position haute',
        icon: '💪',
        description: 'Tirage maximal',
        keyPoints: ['Poids proche du buste', 'Omoplates serrées', 'Dos engagé']
      },
      {
        phase: 'Redescente',
        icon: '📉',
        description: 'Retour contrôlé',
        keyPoints: ['Mouvement lent', 'Poids tendus', 'Position initiale']
      }
    ],

    tips: [
      '💡 Débute avec des poids légers pour maîtriser la technique',
      '💡 Variation : Un bras à la fois pour plus de stabilité',
      '💡 Progression : Augmente le poids progressivement'
    ],

    sets_reps: '3 séries × 10-12 répétitions',
    rest_time: '60 secondes entre les séries',
    muscles_worked: ['Grand dorsal', 'Rhomboïde', 'Trapèze', 'Biceps']
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
