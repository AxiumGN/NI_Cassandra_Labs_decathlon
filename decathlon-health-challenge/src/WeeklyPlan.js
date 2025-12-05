import React from 'react';
import './WeeklyPlan.css';

const WeeklyPlan = ({ profile, exercises, products, onExerciseClick, onBack }) => {
  // Group exercises by body part
  const exercisesByBodyPart = exercises.reduce((acc, exercise) => {
    const bodyPart = exercise.bodyPart || 'Général';
    if (!acc[bodyPart]) {
      acc[bodyPart] = [];
    }
    acc[bodyPart].push(exercise);
    return acc;
  }, {});

  // Calculate total duration
  const totalDuration = exercises.length * 5; // Approximate 5 min per exercise
  
  return (
    <div className="weekly-plan-container animate-in">
      <div className="plan-header">
        <button className="btn-back-small" onClick={onBack}>← Retour à la carte</button>
        <div className="plan-title-block">
          <h2>Votre Routine Hebdomadaire Personnalisée</h2>
          <span className="plan-badge">{profile.label}</span>
        </div>
      </div>

      <div className="plan-grid">
        {/* COLONNE GAUCHE : PLANNING */}
        <div className="plan-content">
          <div className="day-card">
            <div className="day-header">
              <h3>🗓️ Séance Type (3x / semaine)</h3>
              <span>Durée estimée : {totalDuration}-{totalDuration + 10} min</span>
            </div>

            {/* Affichage des exercices par groupe musculaire */}
            {Object.entries(exercisesByBodyPart).map(([bodyPart, bodyPartExercises]) => (
              <div key={bodyPart} className="body-part-group">
                <h4 className="body-part-title">💪 {bodyPart}</h4>
                <div className="exercise-list">
                  {bodyPartExercises.map((ex, index) => (
                    <div 
                      key={ex.id} 
                      className="plan-exercise-item" 
                      onClick={() => onExerciseClick(ex.id)}
                    >
                      <div className="ex-index">{index + 1}</div>
                      <div className="ex-info">
                        <h4>{ex.name}</h4>
                        <span className="ex-tag">{ex.tag}</span>
                      </div>
                      <div className="ex-action">
                        <span className="btn-demo">Voir démo {ex.img}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="plan-tip">
              💡 <strong>Conseil du Coach :</strong> Cliquez sur un exercice pour voir les détails complets avec photos, postures, respiration et erreurs à éviter.
            </div>

            <div className="plan-stats">
              <div className="stat-item">
                <span className="stat-label">📊 Total d'exercices</span>
                <span className="stat-value">{exercises.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">⏱️ Par séance</span>
                <span className="stat-value">{totalDuration}-{totalDuration + 10} min</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">📅 Par semaine</span>
                <span className="stat-value">3x / semaine</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : BOUTIQUE / RECOMMANDATIONS */}
        <div className="plan-sidebar">
          <div className="shop-card">
            <h3>🛍️ Panier Recommandé</h3>
            <p>Les indispensables Decathlon pour réussir votre routine <strong>{profile.label}</strong>.</p>
            
            <div className="products-list">
              {products.map((prod, idx) => (
                <a key={idx} href="https://www.decathlon.fr" target="_blank" rel="noreferrer" className="shop-item">
                  <div className="shop-img-placeholder">🛒</div>
                  <div className="shop-info">
                    <div className="shop-name">{prod.name}</div>
                    <div className="shop-price">{prod.price}</div>
                  </div>
                  <div className="shop-arrow">→</div>
                </a>
              ))}
            </div>
            
            <a href="https://www.decathlon.fr" target="_blank" rel="noreferrer" className="btn-full-shop">
              Voir tout le catalogue
            </a>
          </div>

          {/* Programme recommandations */}
          <div className="tips-card">
            <h3>📋 Conseils pour réussir</h3>
            <ul className="tips-list">
              {profile.tips && profile.tips.map((tip, idx) => (
                <li key={idx}>✓ {tip}</li>
              ))}
              <li>✓ Réaliser 3 séances par semaine (lundi, mercredi, vendredi par exemple)</li>
              <li>✓ Laisser 1 jour de repos entre les séances</li>
              <li>✓ Commencer par les exercices faciles pour maîtriser la technique</li>
              <li>✓ Progresser graduellement en durée ou intensité</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlan;