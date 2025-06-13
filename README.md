# 🍔 Mini Food Truck – Projet JavaScript Vanilla

Projet de commande de repas en ligne réalisé dans le cadre d’un TP d'intégration front avec JavaScript natif.

---

## 🎯 Objectifs pédagogiques

- Manipuler dynamiquement le DOM (`createElement`, `appendChild`, `addEventListener`)
- Utiliser `fetch`, `Promise`, `async/await`
- Structurer une SPA avec un pseudo-router
- Créer un workflow complet utilisateur :
    - Menu → Panier → Récapitulatif → Commande → Suivi

---

## 🛠️ Fonctionnalités

### 1. 📋 Menu dynamique
- Chargement depuis une API simulée (`menu.json`)
- Intégration d’images via l’API **Pexels** (bonus)
- Affichage sous forme de cartes stylées (Tailwind)

### 2. 🛒 Panier
- Ajout de plats avec gestion des quantités
- Total TTC dynamique
- Badge sur l'icône panier avec le nombre d’articles

### 3. 🧾 Récapitulatif avant commande
- Modal avec détails : quantités, prix TTC, calculs HT/TVA
- Validation ou annulation

### 4. 🚚 Suivi de commande
- Affichage des commandes en cours (Préparation → Livraison → Livré)
- Simulation d’envoi avec `setTimeout`
- Toasts à chaque changement d’état

### 5. 🗂 Historique
- Page dédiée à l’historique des commandes passées
- Routeur SPA basé sur `?page=/commandes`, compatible avec tous types de serveurs

### 6. 🔐 Règles métier
- Maximum de **5 commandes en cours**
- Annulation possible d’une commande si elle est en préparation

---

## 💡 Bonus réalisés

- ✅ API externe (Pexels) pour les visuels
- ✅ Composants JavaScript structurés façon React
- ✅ Système de store global (`useStore`) avec persistance `localStorage`
- ✅ Router SPA avec paramètre `?page=...` compatible `file://`
- ✅ Fragment + système de rendu JSX-like (`createElement`, `createDomNode`)

---

## ▶️ Lancer le projet

### ⚠️ Important : ce projet utilise `fetch()`, donc **l’ouverture directe du fichier `index.html` en `file://` NE FONCTIONNE PAS**.

Utilisez l’une des options suivantes :

### ✅ Option 1 – Live Server (recommandé)

Avec VSCode :
- Clic droit sur `index.html` → "Open with Live Server"

Avec IDE JetBrains (WebStorm, IntelliJ, etc.) :
- Clic droit sur `index.html` → "Open in Browser"

### ✅ Option 2 – Serveur local léger


```bash
npx serve .
```
ou
```bash
python3 -m http.server
```
Puis accédez à :
http://localhost:PORT/?page=/

## 🧪 Démo rapide
Naviguez vers ?page=/

Ajoutez quelques plats au panier

Validez une commande

Suivez la progression dans la page d’accueil

Visualisez l'historique dans ?page=/commandes

---

👨‍💻 Réalisé par
Hugo COMBE – 2025
Projet 100 % Vanilla JS + Tailwind CSS