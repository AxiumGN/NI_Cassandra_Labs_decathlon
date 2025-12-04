# 🏆 Coach Posture - Nuit de l'Info × Decathlon Digital

> Une application intelligente de coaching sportif personnalisé avec 3 niveaux d'enrichissement progressif.

## 🎯 Vue d'ensemble

**Coach Posture** est une web app React qui aide les utilisateurs à améliorer leur santé posturale et leur pratique sportive grâce à :

1. **📊 Niveau 1** : QCM de profilage sportif (5 catégories)
2. **📝 Niveau 2** : Instructions textuelles détaillées et précises  
3. **🎯 Niveau 3** : Visualisation avec postures illustrées

---

## 🚀 Démarrer Rapidement

### Installation

```bash
cd decathlon-health-challenge
npm install
npm start
```

L'app s'ouvrira sur http://localhost:3000

📖 **[Installation complète →](decathlon-health-challenge/INSTALLATION.md)**

---

## 📚 Documentation

### 🎓 Pour les Utilisateurs
- **[Guide Utilisateur Complet →](decathlon-health-challenge/USER_GUIDE.md)**
  - Comment utiliser l'app
  - Les 5 profils expliqués
  - Les 6 mouvements détaillés
  - Conseils de débutant

### 👨‍💻 Pour les Développeurs  
- **[Features & Architecture →](decathlon-health-challenge/FEATURES.md)**
  - 3 niveaux détaillés
  - Structure des données
  - Stack technique
  - Guide de style

---

## 🎮 Fonctionnalités

### Niveau 1️⃣ : Profilage Sportif
- ✅ QCM interactif (4 questions clés)
- ✅ Algorithme de pondération intelligent
- ✅ 5 profils générés automatiquement
- ✅ Analyse en local (privacy first)

### Niveau 2️⃣ : Instructions Détaillées
- ✅ Préparation étape-par-étape
- ✅ Exécution avec points critiques
- ✅ Guide respiratoire
- ✅ Erreurs courantes à éviter
- ✅ Données techniques (séries, repos, muscles)

### Niveau 3️⃣ : Visualisation
- ✅ Postures en 4-5 phases
- ✅ Emojis intuitifs
- ✅ Points clés visuels
- ✅ Variations et progressions

### 🎨 Bonus
- ✅ Carte 3D interactive avec rotation 360°
- ✅ Produits Decathlon recommandés
- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Animations fluides et transitions
- ✅ Thème sombre moderne

---

## 🏃 Flux Utilisateur

```
1. Accueil
   ↓ Clique "Commencer mon profil"
   
2. QCM (Niveau 1)
   ↓ 4 questions + nom utilisateur
   
3. Profil Résultat
   ↓ Carte 3D interactive
   ↓ 3 exercices personnalisés
   
4. Détail Exercice (Niveau 2 & 3)
   ↓ Clique sur un exercice
   ↓ Modal avec 4 onglets :
      📋 Aperçu
      📝 Instructions (détail complet)
      🎯 Postures (visualisation 4 phases)
      💡 Conseils (variations & progressions)
```

---

## 📊 Les 5 Profils

| Profil | Focus | Exemple |
|--------|-------|---------|
| 🧘 **Senior** | Équilibre & Souplesse | Yoga, Tai-Chi |
| 💪 **Muscle** | Force & Volume | Fitness, Haltères |
| 🏃 **Cardio** | Endurance & Perte | Running, HIIT |
| 🌱 **Débutant** | Bases & Sécurité | Remise en forme |
| ⚡ **Athlète** | Puissance & Explosivité | Performance, Cross-training |

---

## 🏋️ Les 6 Mouvements

1. **🪑 Squat Assisté** - Facile, genoux protégés
2. **🏋️ Air Squat** - Moyen, engagement total
3. **➖ Gainage Planche** - Moyen, abdominaux
4. **🦵 Fentes Arrières** - Moyen, équilibre
5. **🐈 Chat-Vache** - Facile, mobilité dos
6. **🔥 Burpees Soft** - Difficile, cardio max

---

## 💻 Stack Technique

- **Framework** : React 19.2.1
- **Styling** : CSS3 (Gradients, Animations, 3D Transforms)
- **State** : React Hooks (useState, useRef)
- **Build** : Create React App + Webpack
- **Responsive** : Mobile-first design

### Composants
- `App.js` - Logique principale + QCM
- `UserCard.js` - Carte 3D interactive
- `ExerciseDetail.js` - Modal détails exercice

### Données
- 5 catégories de profil
- 4 questions du QCM
- 6 exercices recommandés
- 42 instructions + postures complètes

---

## 🎨 Design & UX

### Palette de Couleurs
- **Accent** : #00b894 (Vert Decathlon)
- **Accent Hover** : #00cec9 (Cyan)
- **Background** : #050816 (Bleu très foncé)
- **Text** : #f5f7fb (Blanc cassé)
- **Muted** : #a8b2d1 (Gris bleu)

### Animations
- Transitions fluides 0.2-0.3s
- Effets 3D perspective
- Hover effects avec élévation
- Fade-in au chargement

---

## 📱 Compatibilité

| Dispositif | Support |
|-----------|---------|
| 🖥️ Desktop | ✅ Optimal |
| 📱 Mobile | ✅ Responsive |
| 📊 Tablet | ✅ Responsive |
| **Navigateurs** | |
| Chrome 120+ | ✅ |
| Firefox 121+ | ✅ |
| Safari 17+ | ✅ |
| Edge 120+ | ✅ |

---

## 🔄 Utiliser l'Application

### Interagir avec la Carte 3D
```
1. Clique sur la grande carte 3D
2. Tire ta souris dans n'importe quelle direction
3. La carte tourne à 360° (sans limites)
4. Momentum : elle continue à tourner après avoir lâché
5. Relâche pour arrêter
```

### Consulter les Exercices
```
1. Clique sur un exercice (carte small)
2. Une modal s'ouvre avec 4 onglets
3. 📋 Aperçu : vue générale
4. 📝 Instructions : détail textuel complet
5. 🎯 Postures : visualisation 4 phases
6. 💡 Conseils : variations & progressions
```

---

## 📖 Fichiers de Documentation

```
📁 decathlon-health-challenge/
├── 📄 USER_GUIDE.md           ← Guide utilisateur
├── 📄 FEATURES.md             ← Architecture & 3 niveaux
├── 📄 INSTALLATION.md         ← Setup & troubleshooting
├── 📄 README.md               ← Ce fichier
└── 📁 src/
    ├── 📝 App.js              ← Composant principal
    ├── 📝 UserCard.js         ← Carte 3D
    └── 📝 ExerciseDetail.js   ← Modal détails
```

---

## 🚀 Prochaines Étapes

### Développement
1. Lire **[INSTALLATION.md](decathlon-health-challenge/INSTALLATION.md)** pour setup
2. Lancer `npm start` pour développer
3. Consulter **[FEATURES.md](decathlon-health-challenge/FEATURES.md)** pour l'architecture

### Utilisation
1. Consulter **[USER_GUIDE.md](decathlon-health-challenge/USER_GUIDE.md)**
2. Faire le QCM pour découvrir ton profil
3. Cliquer sur les exercices pour voir les détails
4. Suivre les instructions et visualisations

---

## 🎓 Apprentissage

### Concepts React Utilisés
- **Hooks** : useState, useRef
- **Event Handlers** : onClick, onMouseDown, onMouseMove
- **Conditional Rendering** : {step === 'result' && ...}
- **Array Methods** : map, filter, reduce
- **3D CSS** : perspective, rotateX, rotateY

### Concepts CSS Utilisés
- **Gradients** : linear-gradient, radial-gradient
- **Transforms** : 3D rotations, translateY
- **Animations** : @keyframes, transitions
- **Flexbox & Grid** : Layouts responsifs
- **Backdrop Filter** : Effet blur

---

## 📌 Notes Importantes

- ✅ Tous les calculs restent **en local** (aucun serveur)
- ✅ **Privacy first** : aucune donnée envoyée
- ✅ **Responsive** : fonctionne sur tous les appareils
- ✅ **Performance** : chargement rapide <2s
- ✅ **Accessible** : contraste optimal, navigation claire

---

## 🙏 Crédits

Créé pour la **Nuit de l'Info** × **Decathlon Digital** 🏆

- **Design** : Décathlon Brand colors
- **UX** : Mobile-first, intuitive
- **Tech** : React 19, CSS3, Hooks

---

## 📞 Support

### Problèmes d'Installation ?
→ Voir **[INSTALLATION.md](decathlon-health-challenge/INSTALLATION.md)**

### Questions sur les Fonctionnalités ?
→ Voir **[FEATURES.md](decathlon-health-challenge/FEATURES.md)**

### Besoin d'Aide pour Utiliser l'App ?
→ Voir **[USER_GUIDE.md](decathlon-health-challenge/USER_GUIDE.md)**

---

## 📄 Licence

Open Source - Nuit de l'Info

---

**🚀 Prêt à démarrer ?** 

```bash
cd decathlon-health-challenge
npm install
npm start
```

Accède à http://localhost:3000 et profite ! 💪

---

**Coach Posture** - Ton assistant personnel pour une santé posturale optimale ✨