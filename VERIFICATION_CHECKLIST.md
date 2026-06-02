# ✅ Checklist Vérification - Migration Inertia

## Avant de lancer l'application

### 1. Dépendances
- [ ] Vérifiez que `npm install` a été exécuté
- [ ] Vérifiez que `composer install` a été exécuté
- [ ] Vérifiez que la version de Node.js est 18+

### 2. Configuration
- [ ] `.env` file configuré avec DB_CONNECTION
- [ ] `APP_KEY` généré (`php artisan key:generate` si besoin)
- [ ] Base de données créée et migrations exécutées

---

## Lancement

```bash
# Terminal 1 - Server Laravel
php artisan serve

# Terminal 2 - Build Vite (dev)
npm run dev

# Terminal 3 (optionnel) - Queue (si nécessaire)
php artisan queue:work
```

---

## Tests Fonctionnels

### Page d'Accueil
- [ ] URL: `http://localhost:8000/`
- [ ] Header visible (logo + nav + "Demander un devis")
- [ ] Footer visible (liens + sociales)
- [ ] Scroll-to-top visible après scroll
- [ ] Liens de navigation cliquables
- [ ] Pas de rechargement page complète (Inertia)

### Header - Connexion
- [ ] Lien "Connexion" visible si **PAS connecté**
- [ ] Lien "Connexion" cliquable → redirect vers `/login`
- [ ] Après connexion: "Connexion" devient "Dashboard"
- [ ] Dashboard link cliquable → redirect vers `/dashboard`

### Pages Publiques (test sur chaque page)

#### A Propos (`/about`)
- [ ] Page charge correctement
- [ ] Header/Footer visibles
- [ ] Contenu s'affiche
- [ ] Images chargées

#### Nos Produits (`/nos-produits`)
- [ ] Tous les produits listés
- [ ] Boutons "Ajouter au devis" fonctionnent
- [ ] Panier flottant met à jour le compteur
- [ ] Boutons "Acheter" (WhatsApp) cliquables

#### Nos Services (`/nos-services`)
- [ ] Page charge correctement
- [ ] Sections s'affichent
- [ ] CTA (Call To Action) cliquables

#### Demander un Devis (`/demander-un-devis`)
- [ ] Formulaire visible
- [ ] Champs remplissables
- [ ] Submit → WhatsApp message
- [ ] Produits du panier included dans message

### Navigation
- [ ] Cliquer sur logo redirection `/` (sans refresh)
- [ ] Cliquer sur "Accueil" → redirection `/ ` (sans refresh)
- [ ] Cliquer sur "À propos" → redirection `/about` (sans refresh)
- [ ] Cliquer sur "Services" → redirection `/nos-services` (sans refresh)
- [ ] Cliquer sur "Produits" → redirection `/nos-produits` (sans refresh)
- [ ] Tous les liens de footer fonctionnent

### Thème Clair/Sombre
- [ ] Clic sur icône lune/soleil toggle le thème
- [ ] Thème persiste au rechargement (localStorage)
- [ ] Couleurs changent correctement

### Responsive
- [ ] Tester sur desktop (1920px)
- [ ] Tester sur tablet (768px)
- [ ] Tester sur mobile (375px)
- [ ] Menu mobile s'ouvre/ferme
- [ ] Tous les éléments visibles et cliquables

---

## Console Browser - Erreurs à Chercher

- [ ] PAS d'erreurs 404 dans Network
- [ ] PAS d'erreurs rouges dans Console
- [ ] PAS de warnings d'Inertia
- [ ] Réactions Inertia aux changements de page rapides

---

## Base de Données

- [ ] Users table existe
- [ ] Migrations exécutées: `php artisan migrate`
- [ ] Test user peut créer compte: `/auth/register`
- [ ] Test user peut se connecter: `/login`

---

## Performance

- [ ] Première visite: ~2-3s (normal)
- [ ] Navigation entre pages: ~500ms (Inertia est rapide)
- [ ] Images chargent sans lag
- [ ] Animations fluides

---

## En Cas de Problème

### Erreur: "Cannot find module 'public-layout'"
```bash
# Vérifiez que le fichier existe
ls resources/js/layouts/public-layout.tsx
# Vérifiez les imports dans app.tsx
```

### Erreur: "Page component not found"
```bash
# Les noms de pages doivent correspondre à la route
# /about → resources/js/pages/about.tsx
# /nos-produits → resources/js/pages/nos-produits.tsx
```

### Erreur: "Link is not defined"
```bash
# Vérifiez que Link est importé en haut du fichier
import { Link } from '@inertiajs/react'
```

### Page ne recharge pas correctement
```bash
# Nettoyez le cache
npm run build
php artisan cache:clear
# Redémarrez les serveurs (Ctrl+C puis relancez)
```

---

## Prochaines Étapes (Optionnel)

- [ ] Ajouter plus de pages publiques si nécessaire
- [ ] Optimiser les images (lazy loading)
- [ ] Ajouter tests unitaires/intégration
- [ ] Configurer CI/CD si déploiement prévu
- [ ] Sécuriser les routes (CSRF, rate limiting)

---

## Notes

- `TanStack Router` a été complètement remplacé par `Inertia`
- `Zustand store` fonctionne toujours normalement
- Authentification Laravel standard utilisée
- Layout system simple et extensible

Bonne chance! 🚀
