# SmartQuiz Frontend

Application Angular 20+ SSR pour la plateforme SmartQuiz.

## 🛠️ Stack

- **Angular 20+** avec SSR
- **Standalone Components**
- **Signals** (State Management)
- **TailwindCSS**
- **Lucide Icons**

## 📁 Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                # Services singleton, guards, interceptors
│   │   │   ├── api/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── shared/              # Composants, pipes, directives réutilisables
│   │   │   ├── components/
│   │   │   │   └── ui/          # Button, Input, Card, Badge, etc.
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   ├── features/            # Modules fonctionnels
│   │   │   ├── quiz/
│   │   │   │   ├── quiz-catalog/
│   │   │   │   ├── quiz-take/
│   │   │   │   └── quiz-results/
│   │   │   ├── dashboard/
│   │   │   └── history/
│   │   ├── layouts/             # Header, Footer, Sidebar
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── styles.scss
├── angular.json
├── package.json
├── tailwind.config.js
├── Dockerfile
└── README.md
```

## 🚀 Démarrage

### Prérequis
- Node.js 20+
- npm ou pnpm

### Développement

```bash
# Installation
npm install

# Dev server
npm run start

# Build SSR
npm run build

# Serve SSR
npm run serve:ssr:smartquiz
```

## 🎨 Design System

- **Dark theme** par défaut
- **Light theme** disponible
- **Floating labels** sur les inputs
- **Lucide Icons** pour l'iconographie

### Thèmes

Toggle via le header. Préférence sauvegardée en localStorage.

## 🐳 Docker

```bash
# Build image
docker build -t smartquiz-frontend .

# Run
docker run -p 4000:4000 smartquiz-frontend
```

## 📖 Documentation

Voir [smartquiz-specifications](https://github.com/smartquiz-org/smartquiz-specifications) pour le design system complet.
