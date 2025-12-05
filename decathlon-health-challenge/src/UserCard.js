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
    totalMovement: 0  // Pour distinguer clic précis vs drag
  });

  // Boucle d'animation physique
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const state = stateRef.current;
      
      if (!state.isMouseDown) {
        // --- SNAPPING DOUX ---
        // Quand on lâche, on va vers l'angle le plus proche (0 ou 180)
        // On ralentit le facteur de 0.1 à 0.05 pour que ce soit plus "smooth" et moins violent
        const snapTargetY = Math.round(state.targetY / 180) * 180;
        const snapTargetX = 0;

        state.targetY += (snapTargetY - state.targetY) * 0.08; // 0.08 = retour fluide
        state.targetX += (snapTargetX - state.targetX) * 0.08;
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

    // --- SENSIBILITÉ ---
    // Réduite à 0.35 pour donner l'impression de poids
    // "Grab for a bit longer" -> tourne moins vite
    stateRef.current.targetY += deltaX * 0.35; 
    stateRef.current.targetX -= deltaY * 0.35;

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
    // Si on a bougé de moins de 10px, c'est un clic valide, même si la souris a tremblé
    if (stateRef.current.totalMovement < 10) {
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
            
            {/* Bouton corrigé avec événement onMouseUp pour éviter les conflits */}
            <button 
              className="btn-plan" 
              onMouseUp={handleButtonClick}
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
