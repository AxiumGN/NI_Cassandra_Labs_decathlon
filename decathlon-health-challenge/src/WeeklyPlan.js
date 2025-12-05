import React from 'react';
import './WeeklyPlan.css';

const WeeklyPlan = ({ profile, exercises, products, onExerciseClick, onBack }) => {
  return (
    <div className="weekly-plan-container animate-in">
      <div className="plan-header">
        <button className="btn-back-small" onClick={onBack}>← Retour à la carte</button>
        <div className="plan-title-block">
          <h2>Votre Routine Hebdomadaire</h2>
          <span className="plan-badge">{profile.label}</span>
        </div>
      </div>

      <div className="plan-grid">
        {/* COLONNE GAUCHE : PLANNING */}
        <div className="plan-content">
          <div className="day-card">
            <div className="day-header">
              <h3>🗓️ Séance Type (3x / semaine)</h3>
              <span>Durée estimée : 25 min</span>
            </div>
            <div className="exercise-list">
              {exercises.map((ex, index) => (
                <div key={ex.id} className="plan-exercise-item" onClick={() => onExerciseClick(ex.id)}>
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
            <div className="plan-tip">
              💡 <strong>Conseil du Coach :</strong> Cliquez sur un exercice pour voir la vidéo d'exécution et les erreurs à éviter.
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
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlan;