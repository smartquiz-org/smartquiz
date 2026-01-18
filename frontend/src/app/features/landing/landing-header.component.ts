import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="landing-header" [class.scrolled]="isScrolled()">
      <nav class="nav-container">
        <!-- Logo -->
        <a routerLink="/" class="logo">
          <span class="logo-icon">🧠</span>
          <span class="logo-text">SmartQuiz</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="nav-links">
          <a href="#features" class="nav-link">Fonctionnalités</a>
          <a href="#how-it-works" class="nav-link">Comment ça marche</a>
          <a href="#categories" class="nav-link">Catégories</a>
          <a href="#testimonials" class="nav-link">Témoignages</a>
        </div>

        <!-- CTA Buttons -->
        <div class="nav-actions">
          <a routerLink="/quizzes" class="btn-nav-secondary">Se connecter</a>
          <a routerLink="/quizzes" class="btn-nav-primary">Commencer</a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" (click)="mobileMenuOpen.set(!mobileMenuOpen())">
          @if (mobileMenuOpen()) {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          }
        </button>
      </nav>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="mobile-menu">
          <a href="#features" class="mobile-link" (click)="mobileMenuOpen.set(false)">Fonctionnalités</a>
          <a href="#how-it-works" class="mobile-link" (click)="mobileMenuOpen.set(false)">Comment ça marche</a>
          <a href="#categories" class="mobile-link" (click)="mobileMenuOpen.set(false)">Catégories</a>
          <a href="#testimonials" class="mobile-link" (click)="mobileMenuOpen.set(false)">Témoignages</a>
          <div class="mobile-actions">
            <a routerLink="/quizzes" class="btn-mobile-secondary">Se connecter</a>
            <a routerLink="/quizzes" class="btn-mobile-primary">Commencer</a>
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    $coral: #FF6B6B;
    $coral-dark: #E55A5A;
    $dark: #2D3436;
    $gray: #636E72;
    $cream: #FFFAF5;

    .landing-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: transparent;
      transition: all 0.3s ease;

      &.scrolled {
        background: rgba(white, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
      }
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;

      .logo-icon {
        font-size: 28px;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        color: $coral;
      }
    }

    .nav-links {
      display: flex;
      gap: 32px;

      @media (max-width: 968px) {
        display: none;
      }
    }

    .nav-link {
      color: $dark;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.3s ease;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: $coral;
        transition: width 0.3s ease;
      }

      &:hover {
        color: $coral;

        &::after {
          width: 100%;
        }
      }
    }

    .nav-actions {
      display: flex;
      gap: 12px;

      @media (max-width: 968px) {
        display: none;
      }
    }

    .btn-nav-secondary {
      padding: 10px 20px;
      color: $dark;
      font-weight: 500;
      font-size: 14px;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: $coral;
      }
    }

    .btn-nav-primary {
      padding: 10px 24px;
      background: $coral;
      color: white;
      font-weight: 600;
      font-size: 14px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background: $coral-dark;
        transform: translateY(-1px);
      }
    }

    .mobile-menu-btn {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
        color: $dark;
      }

      @media (max-width: 968px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .mobile-menu {
      display: none;
      padding: 24px;
      background: white;
      border-top: 1px solid rgba(0, 0, 0, 0.05);

      @media (max-width: 968px) {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    .mobile-link {
      padding: 12px 0;
      color: $dark;
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);

      &:hover {
        color: $coral;
      }
    }

    .mobile-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
    }

    .btn-mobile-secondary {
      padding: 14px 24px;
      text-align: center;
      color: $dark;
      font-weight: 500;
      text-decoration: none;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      transition: all 0.3s ease;

      &:hover {
        border-color: $coral;
        color: $coral;
      }
    }

    .btn-mobile-primary {
      padding: 14px 24px;
      text-align: center;
      background: $coral;
      color: white;
      font-weight: 600;
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.3s ease;

      &:hover {
        background: $coral-dark;
      }
    }
  `]
})
export class LandingHeaderComponent {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }
}
