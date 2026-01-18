import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './layouts/header.component';
import { FooterComponent } from './layouts/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    @if (showLayout) {
      <div class="min-h-screen flex flex-col bg-background">
        <app-header />
        <main class="flex-1 container mx-auto px-4 py-6">
          <router-outlet />
        </main>
        <app-footer />
      </div>
    } @else {
      <router-outlet />
    }
  `,
  styles: []
})
export class AppComponent {
  title = 'SmartQuiz';
  showLayout = true;
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Hide layout for landing page
      this.showLayout = event.url !== '/' && event.url !== '';
    });
  }
}
