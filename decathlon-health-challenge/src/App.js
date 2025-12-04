import React, { useState, useRef } from 'react';
import './App.css';
import UserCard from './UserCard';
import ExerciseDetail from './ExerciseDetail'; 

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
    // Scroll automatique vers la droite (simulation visuelle)
    if(formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnswer = (weights, answerText) => {
    const newScores = { ...scores };
    Object.keys(weights).forEach(k => newScores[k] = (newScores[k] || 0) + weights[k]);
    setScores(newScores);
    
    // Enregistrer la réponse
    const newAnswers = [...userAnswers, answerText];
    setUserAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calcul du gagnant
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setResultProfile(winner);
      setStep('result');
      setShowCard(true);
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentQ(0);
    setScores({ senior: 0, muscle: 0, cardio: 0, beginner: 0, athlete: 0 });
    setResultProfile(null);
    setUserName('');
    setUserAnswers([]);
    setShowCard(false);
  };

  // Données dynamiques pour l'affichage résultat
  const profileData = resultProfile ? CATEGORIES[resultProfile.toUpperCase()] : null;
  const recommendedExercises = resultProfile ? EXERCISES.filter(e => e.cats.includes(resultProfile)).slice(0, 3) : [];
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
        {step === 'result' ? (
          // LAYOUT RÉSULTAT : Carte à gauche (principale)
          <div className="shell-result">
            {/* COLONNE GAUCHE : GRANDE CARTE INTERACTIVE */}
            <section className="card left-card-result">
              {showCard && (
                <UserCard 
                  userName={userName}
                  answers={userAnswers}
                  categoryName={profileData.label}
                  categoryDesc={profileData.desc}
                />
              )}
            </section>

            {/* COLONNE DROITE : DÉTAILS ET INFOS */}
            <aside className="card right-card-result">
              <div className="card-content">
                <div className="result-details animate-in">
                  <div className="eyebrow">Diagnostic Terminé</div>
                  <h1>Ton profil : {profileData.label}</h1>
                  <p className="subtitle">{profileData.desc}</p>
                  
                  <div className="tips-box">
                    <h4>🧠 Conseils personnalisés :</h4>
                    <ul>
                      {profileData.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>

                  <h4 style={{marginTop: '20px', marginBottom: '10px'}}>🛒 Matériel recommandé (Bonus)</h4>
                  <div className="product-grid">
                    {recommendedProducts.map((p, i) => (
                      <div className="product-card-mini" key={i}>
                        <div className="prod-name">{p.name}</div>
                        <div className="prod-price">{p.price}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cta-row" style={{marginTop: '20px'}}>
                    <button className="btn-ghost" onClick={reset}>Relancer le test</button>
                    <a href="https://www.decathlon.fr" target="_blank" rel="noreferrer" className="btn-primary">
                      Aller sur Decathlon.fr
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          // LAYOUT NORMAL : Quiz et intro
          <div className="shell">
          
          {/* COLONNE GAUCHE : Static info or Results details */}
          <section className="card left-card">
            <div className="card-content">
              {step !== 'result' ? (
                <>
                  <div className="eyebrow">Bienvenue</div>
                  <h1>Deviens le CTO de ta santé posturale.</h1>
                  <p className="subtitle">
                    Quelques questions sur ton niveau, tes habitudes sportives et tes éventuelles douleurs,
                    et on te propose un mini-programme de mouvements avec une exécution
                    <strong> propre</strong> pour limiter les blessures.
                  </p>
                  <div className="pill-row">
                    <div className="pill"><strong>Squat</strong> &mdash; genoux protégés</div>
                    <div className="pill"><strong>Gainage</strong> &mdash; dos droit</div>
                    <div className="pill"><strong>Yoga</strong> &mdash; posture contrôlée</div>
                  </div>
                  <div className="cta-row">
                    <button className="btn-primary" onClick={startQuiz}>
                      <span>▶</span> Commencer mon profil
                    </button>
                    <button className="btn-ghost">
                      <span>ⓘ</span> Voir le principe
                    </button>
                  </div>
                  <div className="status-badge">
                    <div className="status-dot"></div>
                    Analyse en local &nbsp;&bull;&nbsp; Privacy first.
                  </div>
                </>
              ) : (
                /* VUE RÉSULTAT (DÉTAILS) */
                <div className="result-details animate-in">
                  <div className="eyebrow">Diagnostic Terminé</div>
                  <h1>Ton profil : {profileData.label}</h1>
                  <p className="subtitle">{profileData.desc}</p>
                  
                  <div className="tips-box">
                    <h4>🧠 Conseils personnalisés :</h4>
                    <ul>
                      {profileData.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>

                  <h4 style={{marginTop: '20px', marginBottom: '10px'}}>🛒 Matériel recommandé (Bonus)</h4>
                  <div className="product-grid">
                    {recommendedProducts.map((p, i) => (
                      <div className="product-card-mini" key={i}>
                        <div className="prod-name">{p.name}</div>
                        <div className="prod-price">{p.price}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cta-row" style={{marginTop: '20px'}}>
                    <button className="btn-ghost" onClick={reset}>Relancer le test</button>
                    <a href="https://www.decathlon.fr" target="_blank" rel="noreferrer" className="btn-primary">
                      Aller sur Decathlon.fr
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* COLONNE DROITE : Quiz or Summary */}
          <aside className="card right-card" ref={formRef}>
            <div className="card-content">
              
              {step === 'intro' && (
                <div className="intro-placeholder">
                  <div className="side-card-title">
                    Profil sportif & postural
                    <span>En attente</span>
                  </div>
                  <div className="posture-preview blur-mode">
                    <div className="posture-card"><div className="posture-label">Analyse...</div></div>
                    <div className="posture-card"><div className="posture-label">En attente...</div></div>
                  </div>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '20px', textAlign: 'center'}}>
                    Clique sur "Commencer" à gauche pour lancer l'analyse algorithmique.
                  </p>
                </div>
              )}

              {step === 'quiz' && (
                <div className="quiz-container animate-in">
                  <div className="side-card-title">
                    Question {currentQ + 1} / {QUESTIONS.length + 1}
                    <span>Analyse en cours...</span>
                  </div>
                  <div className="progress-mini">
                    <div className="bar" style={{width: `${((currentQ+1)/(QUESTIONS.length+1))*100}%`}}></div>
                  </div>
                  
                  {currentQ === 0 && (
                    <div className="qcm-block">
                      <label className="qcm-label">Quel est ton nom ?</label>
                      <input
                        type="text"
                        className="name-input"
                        placeholder="Entre ton prénom ou ton nom..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <button 
                        className="btn-option" 
                        onClick={() => {
                          if (userName.trim()) {
                            setCurrentQ(1);
                          }
                        }}
                        style={{marginTop: '12px'}}
                      >
                        Continuer
                      </button>
                    </div>
                  )}
                  
                  {currentQ > 0 && (
                    <div className="qcm-block">
                      <label className="qcm-label">{QUESTIONS[currentQ - 1].text}</label>
                      <div className="qcm-options-vertical">
                        {QUESTIONS[currentQ - 1].answers.map((ans, idx) => (
                          <button key={idx} className="btn-option" onClick={() => handleAnswer(ans.weights, ans.text)}>
                            {ans.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'result' && (
                <div className="result-summary animate-in">
                  <div className="side-card-title">
                    Résultats
                    <span style={{color: 'var(--accent)'}}>Terminé</span>
                  </div>

                  <div className="analyse-card">
                    <div className="score-ring">
                      <span className="score-val">100%</span>
                    </div>
                    <div>
                      <strong>Profil Identifié</strong><br/>
                      <span style={{color: 'var(--accent)'}}>{profileData.label}</span>
                    </div>
                  </div>

                  <div className="side-card-title" style={{marginTop: '24px'}}>
                    Tes mouvements clés
                  </div>

                  <div className="posture-preview">
                    {recommendedExercises.map(ex => (
                      <div 
                        key={ex.id} 
                        className="posture-card"
                        onClick={() => setSelectedExercise(ex.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="posture-icon">{ex.img}</div>
                        <div className="posture-label">{ex.name}</div>
                        <div className="posture-tag">
                          <span className="posture-tag-dot"></span>
                          {ex.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

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