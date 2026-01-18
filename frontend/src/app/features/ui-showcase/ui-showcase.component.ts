import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
  BadgeComponent,
  AlertComponent,
  LoaderComponent
} from '../../shared/components/ui';

@Component({
  selector: 'app-ui-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    BadgeComponent,
    AlertComponent,
    LoaderComponent
  ],
  template: `
    <div class="space-y-12">
      <header>
        <h1 class="text-3xl font-bold text-text-primary mb-2">Composants UI</h1>
        <p class="text-text-secondary">Bibliothèque de composants réutilisables pour SmartQuiz</p>
      </header>

      <!-- BUTTONS -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Buttons</h2>
        
        <div class="space-y-6">
          <!-- Variants -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Variantes</h3>
            <div class="flex flex-wrap gap-3">
              <ui-button variant="primary" testId="btn-primary">Primary</ui-button>
              <ui-button variant="secondary" testId="btn-secondary">Secondary</ui-button>
              <ui-button variant="outline" testId="btn-outline">Outline</ui-button>
              <ui-button variant="ghost" testId="btn-ghost">Ghost</ui-button>
              <ui-button variant="danger" testId="btn-danger">Danger</ui-button>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Tailles</h3>
            <div class="flex flex-wrap items-center gap-3">
              <ui-button size="sm" testId="btn-sm">Small</ui-button>
              <ui-button size="md" testId="btn-md">Medium</ui-button>
              <ui-button size="lg" testId="btn-lg">Large</ui-button>
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">États</h3>
            <div class="flex flex-wrap gap-3">
              <ui-button [disabled]="true" testId="btn-disabled">Disabled</ui-button>
              <ui-button [loading]="true" testId="btn-loading">Loading</ui-button>
              <ui-button variant="primary" [fullWidth]="true" testId="btn-fullwidth">Full Width Button</ui-button>
            </div>
          </div>
        </div>
      </section>

      <!-- INPUTS -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Inputs</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <ui-input 
            label="Email" 
            type="email" 
            [(ngModel)]="email"
            hint="Votre adresse email"
            testId="input-email"
          />
          <ui-input 
            label="Mot de passe" 
            type="password"
            [(ngModel)]="password"
            testId="input-password"
          />
          <ui-input 
            label="Nom d'utilisateur" 
            [(ngModel)]="username"
            error="Ce champ est requis"
            testId="input-error"
          />
          <ui-input 
            label="Recherche" 
            type="search"
            [(ngModel)]="search"
            [disabled]="true"
            testId="input-disabled"
          />
        </div>
      </section>

      <!-- CARDS -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Cards</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ui-card variant="default" testId="card-default">
            <h4 class="font-semibold mb-2">Default Card</h4>
            <p class="text-text-secondary text-sm">Carte simple avec bordure standard.</p>
          </ui-card>
          
          <ui-card variant="elevated" testId="card-elevated">
            <h4 class="font-semibold mb-2">Elevated Card</h4>
            <p class="text-text-secondary text-sm">Carte avec ombre portée.</p>
          </ui-card>
          
          <ui-card variant="outlined" testId="card-outlined">
            <h4 class="font-semibold mb-2">Outlined Card</h4>
            <p class="text-text-secondary text-sm">Carte avec bordure épaisse.</p>
          </ui-card>
          
          <ui-card variant="interactive" testId="card-interactive">
            <h4 class="font-semibold mb-2">Interactive Card</h4>
            <p class="text-text-secondary text-sm">Carte cliquable avec effet hover.</p>
          </ui-card>
        </div>

        <!-- Card with header and footer -->
        <div class="mt-6 max-w-md">
          <ui-card 
            header="Quiz: JavaScript Basics" 
            subheader="10 questions • 15 minutes"
            [hasFooter]="true"
            testId="card-full">
            <p class="text-text-secondary">Testez vos connaissances en JavaScript avec ce quiz couvrant les bases du langage.</p>
            <div card-footer class="flex justify-end gap-2">
              <ui-button variant="secondary" size="sm">Détails</ui-button>
              <ui-button variant="primary" size="sm">Commencer</ui-button>
            </div>
          </ui-card>
        </div>
      </section>

      <!-- BADGES -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Badges</h2>
        
        <div class="space-y-6">
          <!-- Variants -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Variantes</h3>
            <div class="flex flex-wrap gap-2">
              <ui-badge variant="default" testId="badge-default">Default</ui-badge>
              <ui-badge variant="primary" testId="badge-primary">Primary</ui-badge>
              <ui-badge variant="success" testId="badge-success">Success</ui-badge>
              <ui-badge variant="warning" testId="badge-warning">Warning</ui-badge>
              <ui-badge variant="error" testId="badge-error">Error</ui-badge>
              <ui-badge variant="info" testId="badge-info">Info</ui-badge>
            </div>
          </div>

          <!-- Difficulty Levels -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Niveaux de difficulté</h3>
            <div class="flex flex-wrap gap-2">
              <ui-badge difficulty="easy" testId="badge-easy" />
              <ui-badge difficulty="medium" testId="badge-medium" />
              <ui-badge difficulty="hard" testId="badge-hard" />
            </div>
          </div>

          <!-- Status -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Status</h3>
            <div class="flex flex-wrap gap-2">
              <ui-badge status="draft" testId="badge-draft" />
              <ui-badge status="published" testId="badge-published" />
              <ui-badge status="archived" testId="badge-archived" />
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Tailles</h3>
            <div class="flex flex-wrap items-center gap-2">
              <ui-badge variant="primary" size="sm" testId="badge-sm">Small</ui-badge>
              <ui-badge variant="primary" size="md" testId="badge-md">Medium</ui-badge>
              <ui-badge variant="primary" size="lg" testId="badge-lg">Large</ui-badge>
            </div>
          </div>

          <!-- With Icons -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Avec icônes</h3>
            <div class="flex flex-wrap gap-2">
              <ui-badge variant="primary" icon="📚" testId="badge-icon-1">JavaScript</ui-badge>
              <ui-badge variant="success" icon="✓" testId="badge-icon-2">Complété</ui-badge>
              <ui-badge variant="warning" icon="⏱" testId="badge-icon-3">En cours</ui-badge>
            </div>
          </div>
        </div>
      </section>

      <!-- ALERTS -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Alerts</h2>
        
        <div class="space-y-4 max-w-2xl">
          <ui-alert variant="success" testId="alert-success">
            Votre quiz a été soumis avec succès !
          </ui-alert>
          
          <ui-alert variant="error" title="Erreur" testId="alert-error">
            Une erreur est survenue lors de la soumission. Veuillez réessayer.
          </ui-alert>
          
          <ui-alert variant="warning" [dismissible]="true" testId="alert-warning">
            Attention : Il vous reste 5 minutes pour terminer le quiz.
          </ui-alert>
          
          <ui-alert variant="info" title="Information" [dismissible]="true" testId="alert-info">
            Vous pouvez reprendre ce quiz à tout moment depuis votre historique.
          </ui-alert>
        </div>
      </section>

      <!-- LOADERS -->
      <section>
        <h2 class="text-xl font-semibold text-text-primary mb-4 border-b border-border pb-2">Loaders</h2>
        
        <div class="space-y-6">
          <!-- Spinner Variants -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Spinner - Tailles</h3>
            <div class="flex flex-wrap items-center gap-6">
              <ui-loader size="sm" testId="loader-sm" />
              <ui-loader size="md" testId="loader-md" />
              <ui-loader size="lg" testId="loader-lg" />
              <ui-loader size="xl" testId="loader-xl" />
            </div>
          </div>

          <!-- With Text -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Avec texte</h3>
            <div class="flex flex-wrap items-center gap-6">
              <ui-loader text="Chargement..." testId="loader-text" />
              <ui-loader variant="dots" text="Patientez" testId="loader-dots" />
              <ui-loader variant="pulse" text="Synchronisation" testId="loader-pulse" />
            </div>
          </div>

          <!-- Loader Variants -->
          <div>
            <h3 class="text-sm font-medium text-text-secondary mb-3">Variantes</h3>
            <div class="flex flex-wrap items-center gap-8">
              <div class="text-center">
                <ui-loader variant="spinner" size="lg" />
                <p class="text-xs text-text-secondary mt-2">Spinner</p>
              </div>
              <div class="text-center">
                <ui-loader variant="dots" size="lg" />
                <p class="text-xs text-text-secondary mt-2">Dots</p>
              </div>
              <div class="text-center">
                <ui-loader variant="pulse" size="lg" />
                <p class="text-xs text-text-secondary mt-2">Pulse</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class UiShowcaseComponent {
  // Input model values
  email = '';
  password = '';
  username = '';
  search = '';
}
