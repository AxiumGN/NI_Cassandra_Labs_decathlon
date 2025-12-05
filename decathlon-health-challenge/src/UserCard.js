import React, { useState, useRef, useEffect } from 'react';
import './UserCard.css';

const UserCard = ({ userName, answers, categoryName, categoryDesc, onOpenPlan }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Refs pour la physique
  const cardRef = useRef(null);
  const stateRef = useRef({
    isMouseDown: false,
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    startX: 0,
    startY: 0,
    startDragTime: 0, // Pour distinguer clic court vs long drag
    totalMovement: 0,  // Pour distinguer clic précis vs drag
    velocityY: 0,      // Vélocité pour l'inertie
    velocityX: 0       // Vélocité pour l'inertie
  });

  // Boucle d'animation physique
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const state = stateRef.current;
      
      if (!state.isMouseDown) {
        // --- INERTIE & SNAPPING INTELLIGENT ---
        // Applique l'inertie si la carte bouge vite
        state.targetY += state.velocityY;
        state.targetX += state.velocityX;
        
        // Ralentit l'inertie graduellement (friction)
        state.velocityY *= 0.96;
        state.velocityX *= 0.96;
        
        // Stop l'inertie si elle est très petite
        if (Math.abs(state.velocityY) < 0.1) state.velocityY = 0;
        if (Math.abs(state.velocityX) < 0.1) state.velocityX = 0;
        
        // --- SNAPPING DOUX (seulement si pas d'inertie) ---
        // Quand on lâche et que l'inertie s'est dissipée, on va vers l'angle le plus proche
        if (Math.abs(state.velocityY) < 0.5) {
          const snapTargetY = Math.round(state.targetY / 180) * 180;
          const snapTargetX = 0;

          state.targetY += (snapTargetY - state.targetY) * 0.08; // 0.08 = retour fluide
          state.targetX += (snapTargetX - state.targetX) * 0.08;
        }
      }

      // Application des valeurs
      setRotation({ x: state.targetX, y: state.targetY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseDown = (e) => {
    stateRef.current.isMouseDown = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
    stateRef.current.startDragTime = Date.now();
    stateRef.current.totalMovement = 0;
    stateRef.current.velocityY = 0;
    stateRef.current.velocityX = 0;
    
    setIsMouseDown(true);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!stateRef.current.isMouseDown) return;

    const deltaX = e.clientX - stateRef.current.startX;
    const deltaY = e.clientY - stateRef.current.startY;
    
    // Calcul du mouvement total pour savoir si c'est un vrai drag
    stateRef.current.totalMovement += Math.abs(deltaX) + Math.abs(deltaY);

    if (stateRef.current.totalMovement > 5) {
      setIsDragging(true);
    }

    // --- SENSIBILITÉ AMÉLIORÉE ---
    // Augmentée de 0.35 à 0.5 pour mieux répondre aux mouvements rapides
    const rotationDeltaX = deltaX * 0.5; 
    const rotationDeltaY = -deltaY * 0.5;
    
    stateRef.current.targetY += rotationDeltaX; 
    stateRef.current.targetX += rotationDeltaY;
    
    // Capture la vélocité pour l'inertie
    stateRef.current.velocityY = rotationDeltaX * 0.3;
    stateRef.current.velocityX = rotationDeltaY * 0.3;

    // Limiter l'inclinaison verticale (X) pour pas que la carte fasse des saltos bizarres
    const maxTilt = 25;
    if (stateRef.current.targetX > maxTilt) stateRef.current.targetX = maxTilt;
    if (stateRef.current.targetX < -maxTilt) stateRef.current.targetX = -maxTilt;

    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
  };

  const handleMouseUp = (e) => {
    const dragDuration = Date.now() - stateRef.current.startDragTime;
    const moved = stateRef.current.totalMovement;

    stateRef.current.isMouseDown = false;
    setIsMouseDown(false);
    // Réinitialiser le mouvement total pour le prochain clic
    stateRef.current.totalMovement = 0;
    
    // Si on a relâché rapidement et sans trop bouger, on considère que le drag est fini
    // Mais on laisse le useEffect faire le snapping
  };

  const handleMouseLeave = () => {
    stateRef.current.isMouseDown = false;
    setIsMouseDown(false);
  };

  // Gestion robuste du clic bouton
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Empêcher la propagation au container
    e.preventDefault(); // Empêcher les actions par défaut
    // Si on a bougé de moins de 15px, c'est un clic valide (augmenté de 10 à 15)
    // Cela tolère plus de tremblements de souris
    if (stateRef.current.totalMovement < 15) {
      onOpenPlan();
    }
  };

  const answersArray = Array.isArray(answers) ? answers : Object.values(answers || {});

  return (
    <div className="card-container">
      <div
        ref={cardRef}
        className="user-card"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          cursor: isMouseDown ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* FACE AVANT */}
        <div className="card-face card-front">
          <div className="card-header">
            <div className="card-logo">🏆</div>
            <span className="card-type">DECATHLON</span>
          </div>
          <div className="card-content">
            <div className="card-user-info">
              <h2 className="card-name">{userName || 'Sportif'}</h2>
              <p className="card-category">{categoryName}</p>
              <p className="card-desc">{categoryDesc}</p>
            </div>
            <div className="card-answers">
              <h3 className="answers-title">Vos réponses clés :</h3>
              <ul className="answers-list">
                {answersArray.slice(0, 3).map((answer, index) => (
                  <li key={index} className="answer-item">
                    <span className="answer-number">{index + 1}</span>
                    <span className="answer-text">{answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-hint">← Glissez vers la gauche pour retourner</span>
          </div>
        </div>

        {/* FACE ARRIÈRE */}
        <div className="card-face card-back">
          <div className="card-back-content">
            <div className="back-icon">📅</div>
            <h3>Votre Programme</h3>
            <p className="back-tip">
              Une routine personnalisée pour votre profil <strong>{categoryName}</strong>.
            </p>
            
            {/* Bouton corrigé avec onClick pour meilleure fiabilité */}
            <button 
              className="btn-plan" 
              onClick={handleButtonClick}
              onMouseDown={(e) => e.stopPropagation()} 
            >
              <span className="btn-text">Lancer l'entraînement</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
          <div className="card-footer">
            <span className="card-hint">Santé & Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
