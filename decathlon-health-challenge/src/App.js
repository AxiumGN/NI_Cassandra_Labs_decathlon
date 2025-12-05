import React, { useState, useRef } from 'react';
import './App.css';
import UserCard from './UserCard';
import ExerciseDetail from './ExerciseDetail';
import QuizPage from './QuizPage';
import WeeklyPlan from './WeeklyPlan';

// --- DONNÉES & LOGIQUE (Le "Cerveau" de l'app) ---

const CATEGORIES = {
  SENIOR: { id: 'senior', label: 'Mobilité & Senior', desc: 'Priorité à l\'équilibre et la souplesse.', tips: ['Échauffement long', 'Pas d\'impacts brusques'] },
  MUSCLE: { id: 'muscle', label: 'Renforcement Musculaire', desc: 'Objectif force et volume.', tips: ['Surcharge progressive', 'Repos adéquat'] },
  CARDIO: { id: 'cardio', label: 'Cardio & Perte de Poids', desc: 'Endurance et dépense calorique.', tips: ['Rythme cardiaque soutenu', 'Régularité'] },
  BEGINNER: { id: 'beginner', label: 'Débutant / Remise en forme', desc: 'Bases solides et sécurité.', tips: ['Focus sur la technique', 'Y aller doucement'] },
  ATHLETE: { id: 'athlete', label: 'Performance Athlétique', desc: 'Puissance et explosivité.', tips: ['Intensité haute', 'Récupération active'] }
};

const QUESTIONS = [
  {
    id: 1,
    text: "Ton niveau sportif actuel :",
    type: "radio",
    answers: [
      { text: "Débutant", weights: { beginner: 5, senior: 2 } },
      { text: "Intermédiaire", weights: { muscle: 3, cardio: 3 } },
      { text: "Avancé / Athlète", weights: { athlete: 5, muscle: 2 } }
    ]
  },
  {
    id: 2,
    text: "Quels sports t'intéressent ? (Focus principal)",
    type: "radio",
    answers: [
      { text: "Fitness / Muscu", weights: { muscle: 5, athlete: 1 } },
      { text: "Course / Cardio", weights: { cardio: 5, beginner: 1 } },
      { text: "Yoga / Mobilité", weights: { senior: 5, beginner: 2 } },
      { text: "Performance / Cross-training", weights: { athlete: 5, cardio: 1 } }
    ]
  },
  {
    id: 3,
    text: "As-tu des douleurs connues ?",
    type: "radio", // Simplifié en radio pour l'algo, pourrait être checkbox
    answers: [
      { text: "Dos / Lombaires", weights: { senior: 3, beginner: 2 } },
      { text: "Genoux", weights: { senior: 3, cardio: -2 } }, // Moins de cardio impact
      { text: "Épaules", weights: { beginner: 2 } },
      { text: "Aucune douleur (Machine)", weights: { athlete: 3, muscle: 2 } }
    ]
  },
  {
    id: 4,
    text: "Ton objectif principal cette année :",
    type: "radio",
    answers: [
      { text: "Améliorer la posture", weights: { senior: 4, beginner: 4 } },
      { text: "Gagner en force", weights: { muscle: 5, athlete: 2 } },
      { text: "Perdre du poids", weights: { cardio: 5 } },
      { text: "Performance pure", weights: { athlete: 5 } }
    ]
  }
];

const EXERCISES = [
  { id: 'sq1', name: 'Squat Assisté', cats: ['senior', 'beginner'], tag: 'Genoux protégés', img: '🪑' },
  { id: 'sq2', name: 'Air Squat', cats: ['cardio', 'muscle'], tag: 'Dos neutre', img: '🏋️' },
  { id: 'plank', name: 'Gainage Planche', cats: ['beginner', 'muscle', 'athlete'], tag: 'Sangle abdominale', img: '➖' },
  { id: 'lunges', name: 'Fentes Arrières', cats: ['cardio', 'athlete'], tag: 'Équilibre', img: '🦵' },
  { id: 'catcow', name: 'Chat-Vache', cats: ['senior', 'beginner'], tag: 'Mobilité dos', img: '🐈' },
  { id: 'burpee', name: 'Burpees Soft', cats: ['athlete', 'cardio'], tag: 'Cardio max', img: '🔥' }
];

const PRODUCTS = {
  senior: [{ name: "Tapis Confort 10mm", price: "15€" }, { name: "Bandes Élastiques", price: "8€" }],
  beginner: [{ name: "Tapis Fitness 100", price: "7€" }, { name: "Haltères 1kg", price: "10€" }],
  muscle: [{ name: "Kit Haltères 20kg", price: "50€" }, { name: "Pull Up Bar", price: "25€" }],
  cardio: [{ name: "Corde à sauter", price: "5€" }, { name: "Montre Connectée", price: "30€" }],
  athlete: [{ name: "Rouleau Massage", price: "18€" }, { name: "Kettlebell 12kg", price: "35€" }]
};

// --- COMPOSANT PRINCIPAL ---

function App() {
  const [step, setStep] = useState('intro'); // intro, quiz, result
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'plan' inside result step
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ senior: 0, muscle: 0, cardio: 0, beginner: 0, athlete: 0 });
  const [resultProfile, setResultProfile] = useState(null);
  const [userName, setUserName] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  const formRef = useRef(null);

  const startQuiz = () => {
    setStep('quiz');
  };

  const handleQuizComplete = (result) => {
    setUserName(result.userName);
    setScores(result.scores);
    setUserAnswers(result.answers);
    setResultProfile(result.profile);
    setStep('result');
    setViewMode('card');
    setTimeout(() => setShowCard(true), 100);
  };

  const handleQuizBack = () => {
    setStep('intro');
  };

  const handleOpenPlan = () => {
    setViewMode('plan');
  };

  const handleBackToCard = () => {
    setViewMode('card');
  };

  const reset = () => {
    setStep('intro');
    setViewMode('card');
    setCurrentQ(0);
    setScores({ senior: 0, muscle: 0, cardio: 0, beginner: 0, athlete: 0 });
    setResultProfile(null);
    setUserName('');
    setUserAnswers([]);
    setShowCard(false);
  };

  // Données dynamiques pour l'affichage résultat
  const profileData = resultProfile ? CATEGORIES[resultProfile.toUpperCase()] : null;
  const recommendedExercises = resultProfile ? EXERCISES.filter(e => e.cats.includes(resultProfile)) : [];
  const recommendedProducts = resultProfile ? PRODUCTS[resultProfile] : [];

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <div className="logo-badge">N</div>
          <div>
            Coach Posture
            <div className="tagline">Nuit de l&#39;Info × Decathlon Digital</div>
          </div>
        </div>
        <div className="header-right">
          <div className="chip">Défi : Santé posturale &amp; sport</div>
          <div className="chip desktop-only">Temps réel&nbsp;·&nbsp;Web app</div>
        </div>
      </header>

      <main>
        {step === 'quiz' ? (
          <QuizPage 
            questions={QUESTIONS}
            onComplete={handleQuizComplete}
            onBack={handleQuizBack}
          />
        ) : step === 'result' ? (
          // ZONE RESULTAT
          <div className="shell-result-container" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            
            {/* MODE 1 : LA CARTE 3D */}
            {viewMode === 'card' && (
              <div className="shell-result">
                {/* COLONNE GAUCHE : CARTE */}
                <section className="card left-card-result">
                  {showCard && (
                    <UserCard 
                      userName={userName}
                      answers={userAnswers}
                      categoryName={profileData.label}
                      categoryDesc={profileData.desc}
                      onOpenPlan={handleOpenPlan}
                    />
                  )}
                </section>

                {/* COLONNE DROITE : RESUME RAPIDE */}
                <aside className="card right-card-result">
                  <div className="card-content">
                    <div className="result-details animate-in">
                      <div className="eyebrow">Analyse Réussie</div>
                      <h1>Profil : {profileData.label}</h1>
                      <div className="tips-box">
                        <h4>🎯 Objectif principal</h4>
                        <p>{profileData.desc}</p>
                      </div>
                      
                      <div className="cta-row" style={{marginTop: '20px'}}>
                        <button className="btn-ghost" onClick={reset}>Refaire le test</button>
                      </div>
                      <p style={{marginTop: '15px', fontSize: '0.8rem', color: '#a8b2d1'}}>
                        ℹ️ Tournez la carte à gauche pour accéder à votre programme complet.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {/* MODE 2 : LE PROGRAMME SEMAINE */}
            {viewMode === 'plan' && (
              <WeeklyPlan 
                profile={profileData}
                exercises={recommendedExercises}
                products={recommendedProducts}
                onExerciseClick={setSelectedExercise}
                onBack={handleBackToCard}
              />
            )}

          </div>
        ) : (
          <div className="shell-intro">
            <section className="card left-card-intro">
              <div className="card-content">
                <>
                  <div className="eyebrow">💪 Bienvenue dans le programme santé posturale</div>
                  <h1>Deviens le CTO de ta santé posturale.</h1>
                  
                  <div className="intro-highlight">
                    <p className="intro-main-text">
                      ✨ <strong>Un diagnostic personnalisé en 4 questions</strong>
                    </p>
                    <p className="subtitle">
                      Réponds à quelques questions sur ton <strong>niveau sportif</strong>, tes <strong>habitudes</strong> 
                      et tes <strong>douleurs</strong>, et reçois un <strong>mini-programme adapté</strong> avec des mouvements 
                      exécutés de manière <strong>propre et sécurisée</strong> pour prévenir les blessures.
                    </p>
                  </div>

                  <div className="benefits-section">
                    <h3>📋 Ce que tu vas recevoir :</h3>
                    <div className="benefits-grid">
                      <div className="benefit-card">
                        <div className="benefit-icon">🎯</div>
                        <div className="benefit-title">Profil adapté</div>
                        <div className="benefit-desc">Analyse basée sur tes réponses</div>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">🏋️</div>
                        <div className="benefit-title">Exercices ciblés</div>
                        <div className="benefit-desc">6 mouvements pour ton objectif</div>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">📖</div>
                        <div className="benefit-title">Instructions détaillées</div>
                        <div className="benefit-desc">Technique et posture expliquées</div>
                      </div>
                      <div className="benefit-card">
                        <div className="benefit-icon">🛡️</div>
                        <div className="benefit-title">Prévention des blessures</div>
                        <div className="benefit-desc">Conseils d'exécution sécurisée</div>
                      </div>
                    </div>
                  </div>

                  <div className="pill-row">
                    <div className="pill">🦵 <strong>Squat</strong> &mdash; genoux protégés</div>
                    <div className="pill">💪 <strong>Gainage</strong> &mdash; dos droit</div>
                    <div className="pill">🧘 <strong>Yoga</strong> &mdash; posture contrôlée</div>
                  </div>

                  <div className="cta-row">
                    <button className="btn-primary" onClick={startQuiz}>
                      <span>▶</span> Commencer mon profil
                    </button>
                    <button className="btn-ghost">
                      <span>ⓘ</span> En savoir plus
                    </button>
                  </div>

                  <div className="status-badge">
                    <div className="status-dot"></div>
                    ✅ Analyse en local &nbsp;&bull;&nbsp; 🔒 Privacy first &nbsp;&bull;&nbsp; 🚀 100% gratuit
                  </div>
                </>
              </div>
            </section>
          </div>
        )}
      </main>

      <footer>
        Prototype React réalisé pour la Nuit de l&#39;Info &mdash; Défi Decathlon Digital.
      </footer>

      {/* Modal des détails d'exercice */}
      {selectedExercise && (
        <ExerciseDetail 
          exerciseId={selectedExercise} 
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}

export default App;