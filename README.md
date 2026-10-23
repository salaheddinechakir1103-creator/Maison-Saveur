# MAISON SAVEUR — Haute Gastronomie & Café

> *« L'Art du Goût »* — Une expérience digitale culinaire d'exception, d'inspiration étoilée au cœur de Marrakech et Casablanca.

---

## 🌟 Points Forts & Réalisations

- **Expérience 3D Culinaire Immersive (Three.js r160+)** :
  - Modélisation procédurale multi-composants haute fidélité (assiette en porcelaine noire bordée d'or 24K, médaillon de filet mignon glacé au romarin, quenelle de mousseline de panais, asperges et carottes glacées, copeaux de truffe noire de l'Atlas, feuilles d'or flottantes).
  - Cloche gastronomique en laiton doré animée par physique amortie (`THREE.MathUtils.damp`), relevable d'un clic ou au défilement.
  - Particules de vapeur et d'étincelles dorées ascendantes.
  - Éclairage studio avec réflextions PMREM `RoomEnvironment` et presets d'ambiance (Studio Or, Candélabres, Nuit Étoilée).
  - Dock ergonomique repliable au bas de l'écran pour une visibilité totale de la scène.
  - Détection automatique et gestion gracieuse du WebGL logiciel (`isSoftwareGl`) avec repli statique d'exception.

- **Direction Artistique & Typographie Éditoriale** :
  - Palette luxueuse : Noir obsidienne (`#0a0a0c`), ivoire chaud (`#fcfaf6`) et or champagne (`#d4af37`).
  - Sérif éditoriale haute couture (*Cormorant Garamond* et *Cinzel*) associée à un sans-sérif raffiné (*Plus Jakarta Sans*).
  - Typographie arabe soignée (*Amiri*) avec prise en charge intégrale du mode RTL (droite à gauche).

- **Fonctionnalités Clés & Expérience Utilisateur** :
  - **Plan de Salle Interactif (Floor Plan)** : Plan architectural avec 9 tables exclusives réparties entre le Grand Salon Impérial, la Terrasse Jardin et la Table Privée du Chef. Sélection visuelle de la table lors de la réservation et vue de disponibilité pour le Maître d'Hôtel.
  - **Simulateur d'Événements & Privatisation VIP** : Calculateur budgétaire en direct selon le type d'événement (Dîner d'Affaires, Fiançailles, Gala), le nombre d'invités (10 à 120), l'espace, la formule gastronomique et l'ambiance musicale (Luth & Oud, Cordes, Jazz). Transmission en un clic du dossier complet vers WhatsApp.
  - **Livre d'Or Interactif** : Formulaire de témoignages avec note étoilée, citation épicurienne et ville, persisté en mémoire locale et géré dans le Dashboard.
  - **Ambiance Sonore Procédurale (Web Audio API)** : Nappe harmonique lounge acoustique et chaleureuse sans aucun fichier mp3 externe, activable d'un clic dans la barre supérieure.
  - **Sélecteur Multi-Devises** : Bascule instantanée entre MAD (Dirham Marocain), EUR (€) et USD ($).
  - **Feuille de Service du Maître d'Hôtel (CSV)** : Export en un clic de toutes les réservations du soir pour les équipes de salle.
  - **La Carte Interactive & QR Code de Table** : Recherche textuelle, filtres, chevalet de table imprimable d'un clic via `window.print()`.
  - **Réservation de Table & Validation en Temps Réel** : Célébration de confettis dorés et génération du numéro de dossier unique.
  - **Dashboard de Direction (Admin)** : Suivi en direct du chiffre d'affaires prévisionnel en MAD, gestion des réservations, plan de salle et édition de la carte.
  - **Support Bilingue Français & Arabe (FR / AR avec mode RTL)**.

---

## 🚀 Technologies

- **Frontend** : React 19, TypeScript, Vite 8, Tailwind CSS v4
- **3D & Mathématiques** : Three.js, PMREMGenerator, RoomEnvironment
- **Effets & Célébration** : canvas-confetti, Lucide React Icons
- **Persistance Démo** : LocalStorage API

---

## 💻 Instructions de Déploiement & Démarrage Local

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Vérification TypeScript
npm run lint

# Compilation pour la production
npm run build
```
