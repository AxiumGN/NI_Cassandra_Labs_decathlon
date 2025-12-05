# GitHub Pages Deployment Guide

Your Decathlon Health Challenge React application is now configured for GitHub Pages deployment!

## 📋 Setup Summary

✅ **Homepage configured** in `package.json`:
```json
"homepage": "https://AxiumGN.github.io/NI_Cassandra_Labs_decathlon"
```

✅ **NPM scripts added**:
- `npm run build` - Build the application
- `npm run deploy` - Deploy to GitHub Pages using gh-pages package
- `predeploy` hook - Automatically builds before deploying

✅ **GitHub Actions workflow** created at `.github/workflows/deploy.yml`:
- Automatically builds and deploys on push to main branch
- Uses Node.js 18 with npm cache
- Publishes to `gh-pages` branch

## 🚀 How to Deploy

### Option 1: Automatic Deployment (Recommended)
1. Commit your changes to the `main` branch
2. Push to GitHub
3. GitHub Actions will automatically:
   - Build your React application
   - Deploy to GitHub Pages
   - Your app will be live at: `https://AxiumGN.github.io/NI_Cassandra_Labs_decathlon`

### Option 2: Manual Deployment (Local Machine)

First, install gh-pages (if not already installed):
```bash
cd decathlon-health-challenge
npm install gh-pages --save-dev
```

Then deploy:
```bash
npm run deploy
```

## ✨ What Gets Deployed

- ✅ All React components (App.js, ExerciseDetail.js, WeeklyPlan.js, UserCard.js, QuizPage.js)
- ✅ All CSS styles (App.css, ExerciseDetail.css, etc.)
- ✅ All exercise data and GIF demonstrations
- ✅ All images and assets from the `public` folder
- ✅ Static assets and manifest.json

## 🌐 Accessing Your App

Once deployed, your application will be accessible at:
```
https://AxiumGN.github.io/NI_Cassandra_Labs_decathlon
```

You can share this link with anyone to access the health challenge from any computer!

## 📝 Important Notes

1. **GitHub Account**: Make sure you're logged into GitHub and have access to push to the repository
2. **Token**: GitHub Actions uses the automatic `GITHUB_TOKEN` - no manual setup needed
3. **Branch**: The `gh-pages` branch will be created automatically on first deployment
4. **Custom Domain** (Optional): You can add a custom domain in GitHub Pages settings

## 🔄 Workflow Trigger Events

The GitHub Actions workflow automatically runs when:
- You push to the `main` branch
- You create a pull request to `main`

## 📊 Deployment Status

You can check deployment status at:
`https://github.com/AxiumGN/NI_Cassandra_Labs_decathlon/actions`

Look for the "Deploy to GitHub Pages" workflow to see:
- Build status
- Deployment progress
- Any errors or logs

## 🆘 Troubleshooting

**App not showing after deployment?**
- Wait 5-10 minutes for GitHub to propagate the changes
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Actions tab for build errors

**Assets/images not loading?**
- Verify images are in `public/` folder
- Check the `homepage` URL in package.json is correct
- Ensure CSS paths are relative, not absolute

**Build fails?**
- Check GitHub Actions logs for error messages
- Run `npm run build` locally to test
- Ensure all dependencies are properly installed

---

**Your app is now ready for the world! 🌍**
