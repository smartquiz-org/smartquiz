import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="landing-footer">
      <div class="footer-container">
        <div class="footer-main">
          <!-- Brand -->
          <div class="footer-brand">
            <a routerLink="/" class="logo">
              <span class="logo-icon">🧠</span>
              <span class="logo-text">SmartQuiz</span>
            </a>
            <p class="brand-description">
              La plateforme d'apprentissage interactive pour développer vos compétences
              et atteindre vos objectifs.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div class="footer-links">
            <div class="link-group">
              <h4>Produit</h4>
              <a routerLink="/quizzes">Catalogue</a>
              <a href="#features">Fonctionnalités</a>
              <a href="#">Tarifs</a>
              <a href="#">Entreprises</a>
            </div>
            <div class="link-group">
              <h4>Ressources</h4>
              <a href="#">Blog</a>
              <a href="#">Centre d'aide</a>
              <a href="#">Guides</a>
              <a href="#">API</a>
            </div>
            <div class="link-group">
              <h4>Entreprise</h4>
              <a href="#">À propos</a>
              <a href="#">Carrières</a>
              <a href="#">Contact</a>
              <a href="#">Presse</a>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="footer-bottom">
          <p class="copyright">© 2025 SmartQuiz. Tous droits réservés.</p>
          <div class="legal-links">
            <a href="#">Confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .landing-footer {
      background: #2D3436;
      color: white;
      padding: 80px 24px 32px;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 1.5fr 2fr;
      gap: 80px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 968px) {
      .footer-main {
        grid-template-columns: 1fr;
        gap: 48px;
      }
    }

    .footer-brand .logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      margin-bottom: 20px;
    }

    .footer-brand .logo-icon {
      font-size: 32px;
    }

    .footer-brand .logo-text {
      font-size: 28px;
      font-weight: 700;
      color: white;
    }

    .brand-description {
      color: #B2BEC3;
      font-size: 15px;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 320px;
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.3s ease;
    }

    .social-link svg {
      width: 20px;
      height: 20px;
    }

    .social-link:hover {
      background: #FF6B6B;
      transform: translateY(-2px);
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    @media (max-width: 640px) {
      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .link-group h4 {
      color: white;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .link-group a {
      display: block;
      color: #B2BEC3;
      text-decoration: none;
      font-size: 14px;
      padding: 8px 0;
      transition: color 0.3s ease;
    }

    .link-group a:hover {
      color: #FF6B6B;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 32px;
    }

    @media (max-width: 640px) {
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }

    .copyright {
      color: #B2BEC3;
      font-size: 14px;
    }

    .legal-links {
      display: flex;
      gap: 24px;
    }

    .legal-links a {
      color: #B2BEC3;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }

    .legal-links a:hover {
      color: #FF6B6B;
    }
  `]
})
export class LandingFooterComponent {}
