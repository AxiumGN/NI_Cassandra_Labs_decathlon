import React, { useState } from 'react';
import './QuizPage.css';

function QuizPage({ questions, onComplete, onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [userName, setUserName] = useState('');
  const [scores, setScores] = useState({ 
    senior: 0, muscle: 0, cardio: 0, beginner: 0, athlete: 0 
  });
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (weights, answerText) => {
    const newScores = { ...scores };
    Object.keys(weights).forEach(k => newScores[k] = (newScores[k] || 0) + weights[k]);
    setScores(newScores);

    const newAnswers = [...userAnswers, answerText];
    setUserAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calcul du gagnant
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      onComplete({
        profile: winner,
        scores: newScores,
        answers: newAnswers,
        userName: userName
      });
    }
  };

  const handleContinueName = () => {
    if (userName.trim()) {
      setCurrentQ(1);
    }
  };

  const handleBack = () => {
    if (currentQ === 0) {
      onBack();
    } else {
      setCurrentQ(currentQ - 1);
    }
  };

  const progressPercent = ((currentQ + 1) / (questions.length + 1)) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Header du quiz */}
        <div className="quiz-header">
          <button className="btn-back" onClick={handleBack}>
            ← Retour
          </button>
          <div className="quiz-info">
            <h2>Analyse de ton profil</h2>
            <p className="quiz-subtitle">
              Question {currentQ + 1} de {questions.length + 1}
            </p>
          </div>
          <div className="quiz-placeholder"></div>
        </div>

        {/* Barre de progression */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-text">{Math.round(progressPercent)}%</div>
        </div>

        {/* Contenu du quiz */}
        <div className="quiz-content">
          {currentQ === 0 ? (
            // Question du nom
            <div className="question-block name-block animate-in">
              <div className="question-icon">👤</div>
              <h3 className="question-title">Quel est ton nom ?</h3>
              <p className="question-desc">
                On aimerait bien te connaître pour personnaliser ton profil.
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Entre ton prénom ou ton nom..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleContinueName()}
              />
              <button 
                className="btn-primary-large"
                onClick={handleContinueName}
                disabled={!userName.trim()}
              >
                Continuer →
              </button>
            </div>
          ) : (
            // Questions QCM
            <div className="question-block animate-in">
              <div className="question-badge">Q{currentQ}</div>
              <h3 className="question-title">{questions[currentQ - 1].text}</h3>
              
              <div className="options-grid">
                {questions[currentQ - 1].answers.map((ans, idx) => (
                  <button
                    key={idx}
                    className="option-card"
                    onClick={() => handleAnswer(ans.weights, ans.text)}
                  >
                    <div className="option-content">
                      <div className="option-text">{ans.text}</div>
                      <div className="option-check">✓</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Indicateur visuel */}
        <div className="quiz-footer">
          <div className="step-indicators">
            {Array.from({ length: questions.length + 1 }).map((_, i) => (
              <div
                key={i}
                className={`step-dot ${i < currentQ + 1 ? 'active' : ''} ${i === currentQ ? 'current' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
