# Guide d'Installation - Site Web CNIGS

## 🚀 Démarrage Rapide

### Option 1: Serveur Web Simple (Recommandé)
Si vous avez Python installé :
```bash
cd site_web
python -m http.server 8000
```
Puis ouvrez http://localhost:8000 dans votre navigateur.

### Option 2: Serveur PHP
Si vous avez PHP installé :
```bash
cd site_web
php -S localhost:8000
```

### Option 3: Live Server (Pour développement)
Si vous avez Node.js installé :
```bash
npm install -g live-server
cd site_web
live-server --port=8000
```

## 📁 Structure des Fichiers

```
site_web/
├── index.html                  # Page principale (OBLIGATOIRE)
├── styles.css                  # Styles principaux (OBLIGATOIRE)
├── script.js                   # JavaScript interactif (OBLIGATOIRE)
├── additional-styles.css       # Styles supplémentaires (OPTIONNEL)
├── logo-placeholder.css        # Logo CSS temporaire (OPTIONNEL)
├── README.md                   # Documentation complète
├── INSTALLATION.md             # Ce guide
└── package.json               # Configuration Node.js (OPTIONNEL)
```

## ✅ Fichiers Essentiels

Pour que le site fonctionne, vous devez avoir au minimum :
1. **index.html** - La page principale
2. **styles.css** - Les styles CSS
3. **script.js** - Le JavaScript

## 🎨 Personnalisation Rapide

### 1. Changer le Titre et Description
Ouvrez `index.html` et modifiez :
```html
<title>VOTRE TITRE ICI</title>
<h1 class="hero-title">VOTRE TITRE PRINCIPAL</h1>
<p class="hero-subtitle">Votre description ici</p>
```

### 2. Ajouter Votre Logo
- Remplacez le logo CSS temporaire par votre vrai logo
- Ajoutez votre fichier logo (logo-cnigs.png) dans le dossier
- Le logo apparaîtra automatiquement

### 3. Modifier les Informations de Contact
Dans la section contact d'`index.html`, changez :
- L'adresse
- Le téléphone  
- L'email
- Les horaires

### 4. Personnaliser les Couleurs
Dans `styles.css`, recherchez et modifiez :
```css
/* Couleur principale */
#2563eb → VOTRE_COULEUR

/* Couleur secondaire */
#1d4ed8 → VOTRE_COULEUR_FONCEE
```

## 🌐 Mise en Production

### 1. Optimisation
- Compressez les images
- Minifiez le CSS et JavaScript
- Testez sur différents navigateurs

### 2. Hébergement
- Uploadez tous les fichiers sur votre serveur web
- Configurez HTTPS
- Testez tous les liens

### 3. SEO
- Ajoutez vos meta descriptions
- Configurez Google Analytics
- Créez un sitemap.xml

## 🔧 Dépannage

### Le site ne s'affiche pas ?
1. Vérifiez que tous les fichiers sont dans le même dossier
2. Assurez-vous que le serveur web fonctionne
3. Vérifiez la console du navigateur pour les erreurs

### Le menu mobile ne fonctionne pas ?
1. Vérifiez que `script.js` est bien chargé
2. Vérifiez qu'il n'y a pas d'erreurs JavaScript

### Le formulaire ne fonctionne pas ?
Le formulaire est configuré pour une démonstration. Pour le connecter :
1. Créez un script PHP/Node.js pour traiter les données
2. Modifiez l'action du formulaire dans `index.html`
3. Ajoutez votre logique de traitement côté serveur

## 📞 Support

Pour toute question ou problème :
1. Consultez d'abord le README.md complet
2. Vérifiez les commentaires dans le code
3. Testez les exemples de serveurs web ci-dessus

---
**Version 1.0 - Octobre 2025**