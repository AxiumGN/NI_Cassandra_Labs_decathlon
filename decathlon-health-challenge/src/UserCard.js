import React, { useState, useRef } from 'react';
import './UserCard.css';

const UserCard = ({ userName, answers, categoryName, categoryDesc }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [initialMouse, setInitialMouse] = useState({ x: 0, y: 0 });
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [momentum, setMomentum] = useState(false);
  const cardRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setInitialMouse({ x: e.clientX, y: e.clientY });
    setInitialRotation({ ...rotation });
    setMomentum(false);
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    const deltaX = e.clientX - initialMouse.x;
    const deltaY = e.clientY - initialMouse.y;

    // Sensibilité de rotation - augmentée pour rotation 360°
    const sensitivity = 1.2;
    
    const newRotation = {
      x: initialRotation.x + deltaY * sensitivity,
      y: initialRotation.y + deltaX * sensitivity
    };

    // Calculer la vélocité pour l'effet momentum
    velocityRef.current = {
      x: deltaY * sensitivity,
      y: deltaX * sensitivity
    };

    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // Activer l'effet momentum
    if (Math.abs(velocityRef.current.x) > 0.5 || Math.abs(velocityRef.current.y) > 0.5) {
      setMomentum(true);
      applyMomentum(velocityRef.current);
    }
  };

  const applyMomentum = (vel) => {
    let currentVel = { x: vel.x, y: vel.y };
    let currentRot = { ...rotation };

    const interval = setInterval(() => {
      currentVel.x *= 0.95; // Friction
      currentVel.y *= 0.95;
      
      currentRot.x += currentVel.x;
      currentRot.y += currentVel.y;
      
      setRotation(currentRot);

      if (Math.abs(currentVel.x) < 0.01 && Math.abs(currentVel.y) < 0.01) {
        clearInterval(interval);
        setMomentum(false);
      }
    }, 16);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  // Format answers pour l'affichage
  const answersArray = Array.isArray(answers) ? answers : Object.values(answers || {});

  return (
    <div className="card-container">
      <div
        ref={cardRef}
        className="user-card"
        style={{
          transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          cursor: isMouseDown ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Face avant de la carte */}
        <div className="card-face card-front">
          <div className="card-header">
            <div className="card-logo">🏆</div>
            <span className="card-type">DECATHLON</span>
          </div>

          <div className="card-content">
            <div className="card-user-info">
              <h2 className="card-name">{userName}</h2>
              <p className="card-category">{categoryName}</p>
              <p className="card-desc">{categoryDesc}</p>
            </div>

            <div className="card-answers">
              <h3 className="answers-title">Vos réponses :</h3>
              <ul className="answers-list">
                {answersArray.slice(0, 4).map((answer, index) => (
                  <li key={index} className="answer-item">
                    <span className="answer-number">{index + 1}</span>
                    <span className="answer-text">{answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-footer">
            <span className="card-hint">💡 Cliquez et tirez pour tourner</span>
          </div>
        </div>

        {/* Face arrière (optionnel) */}
        <div className="card-face card-back">
          <div className="card-back-content">
            <h3>Conseils personnalisés</h3>
            <p className="back-tip">🎯 Retrouvez vos conseils et programmes spécialisés en fonction de vos réponses</p>
          </div>
        </div>
      </div>

      {/* Instruction d'interaction */}
      <div className="card-interaction-hint">
        Tirez la carte pour la faire tourner dans tous les sens
      </div>
    </div>
  );
};

export default UserCard;
