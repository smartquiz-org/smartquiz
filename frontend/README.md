# SmartQuiz Frontend

Application Angular 20+ SSR pour la plateforme SmartQuiz.

## 🛠️ Stack

- **Angular 20** avec SSR (Server-Side Rendering)
- **Standalone Components** (pas de NgModules)
- **Signals** pour le state management
- **TailwindCSS 3.4** avec Dark/Light themes
- **Lucide Icons**

## 📁 Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                # Services singleton, guards, interceptors
│   │   │   └── services/
│   │   │       └── theme.service.ts
│   │   ├── shared/              # Composants réutilisables
│   │   │   └── components/ui/
│   │   ├── features/            # Pages fonctionnelles
│   │   │   ├── dashboard/
│   │   │   ├── history/
│   │   │   └── quiz/
│   │   │       ├── quiz-catalog/
│   │   │       ├── quiz-take/
│   │   │       └── quiz-results/
│   │   ├── layouts/
│   │   │   ├── header.component.ts
│   │   │   └── footer.component.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── server.ts
├── angular.json
├── package.json
├── tailwind.config.js
├── Dockerfile
└── README.md
```

## 🚀 Démarrage

### Prérequis
- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Développement

```bash
# Dev server (port 4200)
npm start

# Build SSR
npm run build

# Serve SSR (port 4000)
npm run serve:ssr
```

## 🎨 Design System

### Themes

- **Dark mode** (défaut) : `data-theme="dark"`
- **Light mode** : `data-theme="light"`

Toggle automatique avec persistence localStorage.

### CSS Classes disponibles

```css
/* Buttons */
.btn-primary
.btn-secondary
.btn-outline

/* Cards */
.card
.card-hover

/* Badges */
.badge-success
.badge-error
.badge-warning
.badge-primary

/* Inputs */
.floating-input
.floating-label
.input-group

/* Quiz specific */
.answer-option
.answer-option.selected
.answer-option.correct
.answer-option.incorrect
```

## 🐳 Docker

```bash
# Build image
docker build -t smartquiz-frontend .

# Run
docker run -p 4000:4000 smartquiz-frontend
```

## 📖 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | DashboardComponent | Page d'accueil |
| `/quizzes` | QuizCatalogComponent | Catalogue des quiz |
| `/quizzes/:id` | QuizDetailComponent | Détails + sélection mode |
| `/quiz/:attemptId` | QuizTakeComponent | Interface de quiz |
| `/results/:attemptId` | QuizResultsComponent | Résultats |
| `/history` | HistoryComponent | Historique des tentatives |
