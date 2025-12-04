# ⚙️ Guide Installation & Lancement

## Prérequis

- **Node.js** 18+ (inclut npm)
- **npm** 9+ ou **yarn**
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Vérifier l'installation de Node.js

```bash
node --version
npm --version
```

Devrais voir quelque chose comme :
```
v18.x.x
9.x.x
```

---

## 📦 Installation

### Étape 1 : Cloner ou télécharger le projet

```bash
cd NI_Cassandra_Labs_decathlon/decathlon-health-challenge
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

Cela va télécharger et installer :
- React 19.2.1
- React DOM 19.2.1
- React Scripts 5.0.1
- Testing libraries
- Web Vitals

**Durée estimée** : 2-5 minutes selon ta connexion

---

## 🚀 Lancer l'Application

### Mode Développement

```bash
npm start
```

Cela va :
1. ✅ Compiler le projet
2. ✅ Ouvrir automatiquement http://localhost:3000
3. ✅ Activer le hot reload (rechargement automatique au changement de fichier)

Le navigateur doit s'ouvrir automatiquement avec l'application.

**Notes** :
- Les erreurs/warnings apparaîtront dans la console
- La page se recharge automatiquement au changement de code
- Appuie sur `r` dans le terminal pour forcer un rechargement

---

## 🧪 Exécuter les Tests

```bash
npm test
```

Lance le test runner en mode watch. Appuie sur `q` pour quitter.

---

## 🏗️ Construire pour Production

```bash
npm run build
```

Cela va :
1. Compiler et optimiser le code
2. Créer une version minifiée
3. Générer un dossier `build/` prêt pour la production

**Durée** : 30 secondes à 2 minutes

---

## 📂 Structure du Projet

```
decathlon-health-challenge/
├── public/
│   ├── index.html          # Template HTML
│   ├── favicon.ico         # Icône du site
│   └── manifest.json       # Config PWA
├── src/
│   ├── App.js              # Composant principal
│   ├── App.css             # Styles principaux
│   ├── App.test.js         # Tests de l'app
│   ├── UserCard.js         # Carte 3D interactive
│   ├── UserCard.css        # Styles de la carte
│   ├── ExerciseDetail.js   # Modal détails exercice
│   ├── ExerciseDetail.css  # Styles du modal
│   ├── index.js            # Point d'entrée React
│   ├── index.css           # Styles globaux
│   ├── setupTests.js       # Config tests
│   └── reportWebVitals.js  # Métriques de performance
├── package.json            # Dépendances et scripts
├── FEATURES.md             # Documentation des 3 niveaux
├── USER_GUIDE.md           # Guide utilisateur
└── README.md               # Présentation du projet
```

---

## 🐛 Troubleshooting

### Erreur : "npm: command not found"
**Solution** : Node.js n'est pas installé
```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# macOS avec Homebrew
brew install node

# Windows
# Télécharge depuis https://nodejs.org/
```

### Erreur : "Port 3000 already in use"
**Solution** : Un autre processus utilise le port 3000
```bash
# Tue le processus occupant le port
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Ou utilise un autre port
PORT=3001 npm start
```

### Erreur : "Module not found"
**Solution** : Réinstalle les dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

### Application blanche/vide
**Solution** :
1. Appuie sur `F12` pour ouvrir les dev tools
2. Cherche les erreurs rouges dans la console
3. Essaie un rechargement complet (`Ctrl+Shift+R` ou `Cmd+Shift+R`)

---

## 🌐 Accéder à l'Application

Une fois `npm start` lancé, ouvre :
```
http://localhost:3000
```

Si le navigateur ne s'ouvre pas automatiquement, copie-colle l'URL manuellement.

---

## 📊 Vérifier les Performances

### Mesurer les performances
L'app inclut la mesure de Web Vitals. Check la console pour voir :
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)

### Profiler l'application
Utilise React Developer Tools :
1. Télécharge l'extension pour ton navigateur
2. Ouvre les DevTools (`F12`)
3. Onglet "Profiler" ou "React"

---

## 🔒 Variables d'Environnement

Crée un fichier `.env` à la racine du projet si besoin :

```bash
# .env
REACT_APP_API_URL=http://localhost:3000
```

Accès dans le code :
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## 📚 Commandes Utiles

| Commande | Action |
|----------|--------|
| `npm start` | Lance l'app en dev |
| `npm test` | Exécute les tests |
| `npm run build` | Build pour production |
| `npm run eject` | Expose la config (⚠️ irréversible) |

---

## 🚢 Déploiement

### Sur Vercel (recommandé)
```bash
# Installe Vercel CLI
npm i -g vercel

# Déploie
vercel
```

### Sur Netlify
```bash
# Build localement
npm run build

# Upload le dossier 'build/' sur Netlify
```

### Sur un serveur personnel
```bash
# Build
npm run build

# Servis le contenu du dossier 'build/'
# Avec un serveur web comme Nginx ou Apache
```

---

## 💾 Développement Local

### Ajouter une nouvelle dépendance
```bash
npm install nom-du-package
```

### Supprimer une dépendance
```bash
npm uninstall nom-du-package
```

### Mettre à jour toutes les dépendances
```bash
npm update
```

### Vérifier pour les vulnérabilités
```bash
npm audit
npm audit fix
```

---

## 📝 Notes de Développement

### Style CSS
- Utilise les variables CSS du `:root` dans `App.css`
- Respecte le système de couleurs (accent, bg, text, etc.)
- Mobile-first : styles de base, puis media queries

### Composants React
- Utilise les hooks (`useState`, `useRef`)
- Props bien typées (commentaires JSDoc)
- Séparation des concerns (logique vs présentation)

### Performance
- Évite les re-renders inutiles
- Utilise `useCallback` et `useMemo` si nécessaire
- Lazy load les images si le projet grandit

---

## 🆘 Support & Questions

Si tu as des problèmes :
1. ✅ Vérifie que Node.js et npm sont bien installés
2. ✅ Réinstalle les dépendances (`npm install`)
3. ✅ Essaie un autre navigateur
4. ✅ Vérifie la console pour les erreurs

---

**Prêt à développer ?** 🚀

Commence par `npm start` et explore l'application !

Pour modifier le code, édite les fichiers `.js` et `.css` dans le dossier `src/`.

---

**Coach Posture** - Nuit de l'Info × Decathlon Digital
